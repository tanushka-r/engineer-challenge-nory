import { useEffect, useState, useRef } from 'react';
import { fetchIngredients, processDelivery, updateStock } from '../../api/api';
import { useGlobalContext } from '../../context/GlobalContext';

import SummaryPanel from '../../components/summary-panel/SummaryPanel';
import Message from '../../components/message/Message';

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
  const [isValidQuantity, setIsValidQuantity] = useState(false);

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

  const handleQuantityChange = () => {
    const valueStr = quantityRef.current?.value ?? '0';
    const value = parseInt(valueStr, 10);
    setIsValidQuantity(!isNaN(value) && value > 0);
  };


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
        setIsValidQuantity(false);
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
          <div className="panel-body padding-0">
            {loading && <p className="loading-text">Loading...</p>}
            <ul>
              {!loading &&
                filteredIngredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    onClick={() => setSelected(ingredient)}
                    className={`list-item ${selected?.id === ingredient.id ? 'selected' : ''}`}
                  >
                    {ingredient.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="panel selected-ingredient-panel">
          <div className="panel-header">
            Selected Item
          </div>      
          <div className="panel-body">
            {selected ? (
              <>
                <p><strong>Name:</strong> {selected.name}</p>
                <p><strong>Cost:</strong> {selected.cost}</p>
                <div className="input-container">
                  <label htmlFor="quantity">Quantity ({selected.unit_name})</label>
                  <input
                    id="quantity"
                    type="number"
                    min={0}
                    ref={quantityRef}
                    onChange={handleQuantityChange}
                  />
                </div>
              </>
            ) : (
              <Message
                type="info"
                message="Please select a ingredient from the list"
              />
            )}
          </div>
          <div className="panel-footer">
            <button
              onClick={handleAddStock}
              className="add-stock-btn"
              disabled={!selected || !isValidQuantity}
              >
              Process Delivery
            </button>
          </div>
        </div>
        <SummaryPanel
          data={deliverySummary}
          title="Delivery Summary"
          placeholder="There are no deliveries yet"
        />
      </div>
    </>
  );
};

export default Deliveries;
