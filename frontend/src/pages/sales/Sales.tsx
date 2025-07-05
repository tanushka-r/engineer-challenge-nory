import { useEffect, useState, useRef } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { fetchMenus } from '../../../api/api';
import searchIcon from '../../assets/search.svg';

import './sales.styles.css';

interface MenuItem {
  created_at: string;
  updated_at: string;
  location_id: number;
  modifier_id: number;
  price: string;
  recipe_id: number;
  recipe_name: string;
}

interface SaleSummary {
  id: number;
  name: string;
  quantity?: number;
  price?: number;
  total: number;
}

const Sales = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saleSummary, setSaleSummary] = useState<SaleSummary[]>([]);
  const quantityRef = useRef<HTMLInputElement>(null);

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

  const handleAddSale = async () => {
    const quantityValue = quantityRef.current?.value;

    if (!quantityValue || !selected) {
      return;
    }

    const quantity = parseFloat(quantityValue);
    const price = parseFloat(selected.price);
    const total = quantity * price;

    if (isNaN(quantity) || quantity <= 0) {
      return;
    }

    if (!currentLocationId || !currentStaffId) {
      return;
    }

    try {
      // TODO: Replace with actual sale processing API
      // Placeholder logic

      if (quantityRef.current) {
        quantityRef.current.value = '';
      }

      setSaleSummary(prev => [
        ...prev,
        {
          id: selected.recipe_id,
          name: selected.recipe_name,
          total
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
            <div className="item-list">
              {loading ? (
                <p className="loading-text">Loading...</p>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.recipe_id}
                    onClick={() => setSelected(item)}
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
              <div className="quantity-input-container">
                <label htmlFor="quantity" className="quantity-label">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  min={0}
                  ref={quantityRef}
                  className="quantity-input"
                />
              </div>
            </>
          ) : (
            <p>Please select a product from the list.</p>
          )}
          </div>
          <div className="panel-footer">
            <button onClick={handleAddSale} className="add-sale-btn">
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
