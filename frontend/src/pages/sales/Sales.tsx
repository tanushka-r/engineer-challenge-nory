import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { fetchMenus, checkStockForRecipe, updateStock, processSale } from '../../api/api';
import { generateStockUpdatePayload } from '../../lib/utils';
import Message from '../../components/message/Message';
import SummaryPanel from '../../components/summary-panel/SummaryPanel';

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

    try {
      const stockUpdatePayload = generateStockUpdatePayload(currentItemIngredients, stockToUpdate, STOCK_MODE.DECREASE);

      await updateStock(stockUpdatePayload);

      await processSale({
        recipeId: selected.recipe_id,
        quantity: "1", // Hardcoded for now, multiple items sale is out of scope of assignment
        cost: selected.price,
        staffId: currentStaffId,
        locationId: currentLocationId
      });

      setSaleSummary(prev => [
        ...prev,
        {
          id: selected.recipe_id,
          name: selected.recipe_name,
          total: parseFloat(selected.price), // assuming selected.price is string
        }
      ]);

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
            {loading && <p className="loading-text">Loading...</p>}
            <ul>
              {!loading &&
                filteredItems.map((item) => (
                  <li
                    key={item.recipe_id}
                    onClick={() => handleSelectItem(item)}
                    className={`list-item ${selected?.recipe_id === item.recipe_id ? 'selected' : ''}`}
                  >
                    {item.recipe_name}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            Selected Menu Item
          </div>
          <div className="panel-body">
          {selected ? (
            <>
              <p><strong>Name:</strong> {selected.recipe_name}</p>
              <p><strong>Price:</strong> {selected.price}</p>
              
              {outOfStockIngredients.length > 0 && ( 
                <Message type="error" message="There are not enough ingredients" />
              )}
            </>
          ) : (
            <Message
              type="info"
              message="Please select a product from the list"
            />
          )}
          </div>
          <div className="panel-footer">
            <button
              onClick={handleProcessSale}
              disabled={!selected || outOfStockIngredients.length > 0}
            >
              Process Sale
            </button>
          </div>
        </div>
        <SummaryPanel
          data={saleSummary}
          title="Sales Summary"
          placeholder="There are no sales yet"
        />
      </div>
    </div>
  );
};

export default Sales;
