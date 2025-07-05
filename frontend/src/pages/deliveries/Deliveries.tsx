import { useEffect, useState, useRef } from 'react';
import { fetchIngredients, processDelivery, updateStock } from '../../api/api';
import { useGlobalContext } from '../../context/GlobalContext';

import type { Ingredient, DeliverySummary, StockBatchUpdateRequest } from '../../types/types';
import { STOCK_MODE } from '../../types/types';

import searchIcon from '../../assets/search.svg';

import './deliveries.styles.css';

const Deliveries = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Ingredient | null>(null);
  const [loading, setLoading] = useState(true);
  const [deliverySummary, setDeliverySummary] = useState<DeliverySummary[]>([]);
  const quantityRef = useRef<HTMLInputElement>(null);

  const { currentLocationId, currentStaffId } = useGlobalContext();

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const data = await fetchIngredients();
        setIngredients(data);
      } catch (error) {
        if(error instanceof Error) {
          console.error('Error fetching ingredients:', error.message);
        }
        
      } finally {
        setLoading(false);
      }
    };
    getIngredients();
  }, []);

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddStock = async () => {
    const quantityValue = quantityRef.current?.value;
    
    if (!quantityValue || !selected) {
      return;
    }

    const quantity = parseFloat(quantityValue);
    const cost = parseFloat(selected.cost);
    const total = quantity * cost;

    if (isNaN(quantity) || quantity <= 0) {
      return;
    }

    if (!currentLocationId || !currentStaffId) {
      return;
    }

    try {
      const stockUpdatePayload: StockBatchUpdateRequest = {
        mode: STOCK_MODE.INCREASE,
        data: [{
          ingredientId: selected.id,
          locationId: currentLocationId,
          quantity: quantity,

        }],
      };

      await updateStock(stockUpdatePayload);

      await processDelivery({
        ingredientId: selected.id,
        quantity: quantity.toString(),
        cost: total.toString(),
        staffId: currentStaffId,
        locationId: currentLocationId
      });

      if (quantityRef.current) {
        quantityRef.current.value = '';
      }

      setDeliverySummary(prev => [
        ...prev,
        {
          id: selected.id,
          name: selected.name,
          total
        }
      ]);

      setSelected(null);
    } catch (error) {
      if(error instanceof Error) {
        console.error('Error processing delivery:', error.message);
      }
    }
  };

  return (
    <>
      <div>
      <p><strong>Location ID:</strong> {currentLocationId}</p>
      <p><strong>Staff ID:</strong> {currentStaffId}</p>
      </div>
      <h1>Deliveries</h1>

      <div className="panels-container">
        <div className="panel">
          <div className="panel-header">
            Items
          </div>
          <div className="search-bar">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search ingredients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <img src={searchIcon} alt="Search" className="search-icon" />
            </div>
          </div>
          <div className="panel-body">
            <div className="ingredients-list">
              {loading ? (
                <p className="loading-text">Loading...</p>
              ) : (
                filteredIngredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    onClick={() => setSelected(ingredient)}
                    className={`ingredient-item ${selected?.id === ingredient.id ? 'selected' : ''}`}
                  >
                    {ingredient.name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="panel selected-ingredient-panel">
          <div className="panel-header">
            Selected Item
          </div>         
            <div className="panel-body">
              <p><strong>Name:</strong> {selected ? selected.name : ''}</p>
              <p><strong>Cost:</strong> {selected ? selected.cost : ''}</p>
              <div className="input-container">
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  min={0}
                  ref={quantityRef}
                  className="quantity-input"
                />
              </div>
            </div>
            <div className="panel-footer">
              <button onClick={handleAddStock} className="add-stock-btn">
                Process Delivery
              </button>
            </div>
        </div>
          <div className="panel delivery-summary-panel">
            <div className="panel-header">
              Delivery Summary
            </div>
            <div className="panel-body">
              {deliverySummary.length > 0 && (
              <ul className="summary-list">
                {deliverySummary.map((item, index) => (
                  <li key={index} className="summary-item">
                    {item.name} - ${item.total.toFixed(2)}
                  </li>
                ))}
              </ul>
              )}
            </div>
          </div>
      </div>
    </>
  );
};

export default Deliveries;
