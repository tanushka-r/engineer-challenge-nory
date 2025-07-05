import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { fetchMenus, checkStockForRecipe, updateStock } from '../../api/api';
import { generateStockUpdatePayload } from '../../lib/utils';
import Message from '../../components/message/Message';

import type { RecipeIngredient, StockItem, MenuItem, SaleSummary } from '../../types/types';
import { STOCK_MODE } from '../../types/types';

import searchIcon from '../../assets/search.svg';

import './sales.styles.css';


const Sales = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saleSummary, setSaleSummary] = useState<SaleSummary[]>([]);
  const [currentItemIngredients, setCurrentItemIngredients] = useState<RecipeIngredient[]>([]);
  const [outOfStockIngredients, setOutOfStockIngredients] = useState<RecipeIngredient[]>([]);
  const [stockToUpdate, setStockToUpdate] = useState<StockItem[]>([]);


  const { currentLocationId, currentStaffId } = useGlobalContext();

  useEffect(() => {
    const getMenuItems = async () => {
      if (!currentLocationId) {
        return;
      } 

      try {
        const data: MenuItem[] = await fetchMenus(currentLocationId);

        setMenuItems(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching products:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getMenuItems();
  }, [currentLocationId]);
  
  console.log(menuItems);

  const filteredItems = menuItems.filter(item =>
    item.recipe_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectItem = async (item: MenuItem) => {
    setSelected(item);

    try {
      const { ingredients, stock, outOfStock } = await checkStockForRecipe(item.recipe_id, currentLocationId);

      setCurrentItemIngredients(ingredients);
      setOutOfStockIngredients(outOfStock);
      setStockToUpdate(stock);
    

      console.log('Ingredients for selected recipe:', ingredients);
      console.log("STOCK", stockToUpdate);
      // TODO: check stock
    } catch (error) {
      console.error('Failed to check ingredients in stock:', error);
    }
  };

  const handleProcessSale = async () => {

    if (!selected || !currentLocationId || !currentStaffId) {
      return;
    }

    const price = parseFloat(selected.price);

    try {
      const stockUpdatePayload = generateStockUpdatePayload(currentItemIngredients, stockToUpdate, STOCK_MODE.DECREASE);

      updateStock(stockUpdatePayload);

      // TODO: record sale

    // setSaleSummary(prev => [
    //   ...prev,
    //   {
    //     id: selected.recipe_id,
    //     name: selected.recipe_name,
    //     price
    //   }
    // ]);

      setSelected(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error processing sale:', error.message);
      }
    }
  };

  return (
    <div className="sales-container">
      <div>
        <p><strong>Location ID:</strong> {currentLocationId}</p>
        <p><strong>Staff ID:</strong> {currentStaffId}</p>
      </div>
      <h1>Sales</h1>

      <div className="panels-container">
        <div className="panel">
          <div className="panel-header">
            Menu Items
          </div>
          <div className="search-bar">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search menu items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <img src={searchIcon} alt="Search" className="search-icon" />
            </div>
          </div>
          <div className="panel-body padding-0">
            <div className="item-list">
              {loading ? (
                <p className="loading-text">Loading...</p>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.recipe_id}
                    onClick={() => handleSelectItem(item)}
                    className={`product-item ${selected?.recipe_id === item.recipe_id ? 'selected' : ''}`}
                  >
                    {item.recipe_name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            Selected Menu Item
          </div>
          <div className="panel-body padding-0">
          {selected ? (
            <>
              <p><strong>Name:</strong> {selected.recipe_name}</p>
              <p><strong>Price:</strong> {selected.price}</p>
              
              {outOfStockIngredients.length > 0 && ( 
                <Message type="error" message="not enough ingredients" />
              )}
            </>
          ) : (
            <p>Please select a product from the list.</p>
          )}
          </div>
          <div className="panel-footer">
            <button onClick={handleProcessSale} className="add-sale-btn" disabled={outOfStockIngredients.length > 0}>
              Process Sale
            </button>
          </div>
        </div>
        {saleSummary.length > 0 && (
          <div className="panel">
            <h2>Sales Summary</h2>
            <ul className="summary-list">
              {saleSummary.map((item, index) => (
                <li key={index} className="summary-item">
                  {item.name} - ${item.total.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
