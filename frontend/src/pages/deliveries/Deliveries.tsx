import { useEffect, useState, useRef } from 'react';
import { fetchIngredients, processDelivery } from '../../../api/api';
import { useGlobalContext } from '../../context/GlobalContext';

import './deliveries.styles.css';

interface Ingredient {
  id: number;
  name: string;
  cost: string;
  unit_id: number;
  created_at: string;
  updated_at: string;
}

interface DeliverySummary {
  id: number;
  name: string;
  quantity?: number;
  cost?: number;
  total: number;
}

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
    <div className="deliveries-container">
      <div>
      <p><strong>Location ID:</strong> {currentLocationId}</p>
      <p><strong>Staff ID:</strong> {currentStaffId}</p>
    </div>
      <h1>Deliveries</h1>

      <div className="panels-container">
        <div className="panel ingredient-list-panel">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
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
     
        <div className="panel selected-ingredient-panel">
          <h3>Selected Ingredient</h3>
          {selected ? (
            <>
              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Cost:</strong> {selected.cost}</p>
              <div className="quantity-input-container">
                <label htmlFor="quantity" className="quantity-label">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  min={0}
                  ref={quantityRef}
                  className="quantity-input"
                />
                <button onClick={handleAddStock} className="add-stock-btn">
                  Add Stock
                </button>
              </div>
            </>
            ) : (
            <p>Please select an ingredient from the list.</p>
          )}
        </div>
  
        {deliverySummary.length > 0 && (
          <div className="panel delivery-summary-panel">
            <h2>Total Delivery</h2>
            <ul className="summary-list">
              {deliverySummary.map((item, index) => (
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

export default Deliveries;
