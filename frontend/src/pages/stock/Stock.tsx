import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { fetchAllStockForLocation, updateStock, updateWaste } from '../../api/api';
import Message from '../../components/message/Message';

import type { StockItemForLocation, WasteItem } from '../../types/types';
import { STOCK_MODE } from '../../types/types';

const Stock = () => {
  const { currentLocationId, currentStaffId } = useGlobalContext();
  const [stockItems, setStockItems] = useState<StockItemForLocation[]>([]);
  const [loadingStock, setLoadingStock] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  useEffect(() => {
    const getStock = async () => {
      if (!currentLocationId) {
        return;
      }

      setLoadingStock(true);
      setError(null);

      try {
        const quantityMap: Record<string, string> = {};

        const data: StockItemForLocation[] = await fetchAllStockForLocation(currentLocationId);

        const sortedData = data.sort((a, b) => a.ingredient_name.localeCompare(b.ingredient_name));

        setStockItems(sortedData);

        sortedData.forEach((item) => {
          const key = `${item.ingredient_id}-at-${item.location_id}`;
          quantityMap[key] = item.quantity; // store as string for input flexibility
        });

        setQuantities(quantityMap);
      } catch (err) {
        setError('Failed to fetch stock data');
      } finally {
        setLoadingStock(false);
      }
    };

    getStock();
  }, [currentLocationId]);

  const handleQuantityChange = (id: string, value: string) => {
    // Store raw string value so user can clear input and type naturally
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdate = async (ingredientId: number, locationId: number) => {
    const uniqueId = `${ingredientId}-at-${locationId}`;
    const newQuantityStr = quantities[uniqueId];
    
    if (newQuantityStr === undefined){
      return;
    }

    // if (currentStaffId === null || currentLocationId === null) {
    //   return <p>Error: Staff or Location not set.</p>;
    // }

    const newQuantity = Number(newQuantityStr);

    if (newQuantityStr.trim() === '' || isNaN(newQuantity) || newQuantity < 0) {
      alert('Invalid quantity');
      return;
    }

    const stockItem = stockItems.find(
      (item) => item.ingredient_id === ingredientId && item.location_id === locationId
    );

    if (!stockItem) {
      return;
    }

    const oldQuantity = Number(stockItem.quantity);

    setUpdatingId(uniqueId);

    try {
      if (newQuantity < oldQuantity) {
        const wasteQuantity = oldQuantity - newQuantity;
  
        if (currentStaffId === null) {
          throw new Error('Staff ID is not available. Please log in.');
        }

        const wastePayload: WasteItem = {
          ingredientId,
          locationId,
          quantity: wasteQuantity,
          cost: parseFloat(stockItem.ingredient_cost) * wasteQuantity,
          staffId: currentStaffId,
        };

        await updateWaste(wastePayload);
      }

      await updateStock({
        mode: STOCK_MODE.OVERWRITE,
        data: [{
          ingredientId,
          locationId,
          quantity: newQuantity,
        }],
      });

      // Update local state quantity as string to stay consistent with input
      setStockItems((prev) =>
        prev.map((item) =>
          item.ingredient_id === ingredientId && item.location_id === locationId
            ? { ...item, quantity: newQuantity.toString() }
            : item
        )
      );

      // update quantities state with validated number string
      setQuantities((prev) => ({
        ...prev,
        [uniqueId]: newQuantity.toString(),
      }));
    } catch (err) {
      alert('Failed to update stock');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loadingStock) {
    return <p>Loading stock data...</p>;
  }

  if (error) {
    return <Message type="error" message={error} />;
  }

  if (stockItems.length === 0) {
    return <p>No stock found for this location.</p>;
  }

  return (
    <div className="content-wrapper">
      <h1>Stock</h1>
      <table className="stock-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ingredient Name</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map(({ ingredient_id, location_id, ingredient_name, unit_name }) => {
            const uniqueId = `${ingredient_id}-at-${location_id}`;

            return (
              <tr key={uniqueId}>
                <td>{ingredient_id}</td>
                <td>{ingredient_name}</td>
                <td>{unit_name}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    value={quantities[uniqueId] ?? ''}
                    onChange={(e) => handleQuantityChange(uniqueId, e.target.value)}
                    disabled={updatingId === uniqueId}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleUpdate(ingredient_id, location_id)}
                    disabled={updatingId === uniqueId}
                  >
                    {updatingId === uniqueId ? 'Updating...' : 'Update'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
