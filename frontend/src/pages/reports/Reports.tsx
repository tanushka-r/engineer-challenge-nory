import { useEffect, useState } from 'react';
import {
  fetchAllSaleRevenueForLocation,
  fetchAllDeliveryCostForLocation,
  fetchAllWasteCostForLocation,
  fetchAllStockCostForLocation
} from '../../api/api';
import { useGlobalContext } from '../../context/GlobalContext';

import './reports.styles.css';

const Reports = () => {
  const { currentLocationId } = useGlobalContext();

  const [saleRevenue, setSaleRevenue] = useState<number | null>(null);
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);
  const [wasteCost, setWasteCost] = useState<number | null>(null);
  const [stockCost, setStockCost] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentLocationId) {
        setError('Location ID is not set');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [
          saleData,
          deliveryData,
          wasteData,
          stockData
        ] = await Promise.all([
          fetchAllSaleRevenueForLocation(currentLocationId),
          fetchAllDeliveryCostForLocation(currentLocationId),
          fetchAllWasteCostForLocation(currentLocationId),
          fetchAllStockCostForLocation(currentLocationId)
        ]);

        // Assuming each returns an object like { totalCost: number }
        setSaleRevenue(saleData.totalCost ?? 0);
        setDeliveryCost(deliveryData.totalCost ?? 0);
        setWasteCost(wasteData.totalCost ?? 0);
        setStockCost(stockData.totalCost ?? 0);
      } catch (err) {
        setError('Failed to load report data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentLocationId]);

  if (loading) {
    return <p>Loading reports...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="content-wrapper">
      <h1>Reports</h1>
      <div className="panels-container reports-container">
        <div className="panel">
          <div className="panel-body">
            <p><strong>Sales Revenue:</strong> ${saleRevenue?.toFixed(2)}</p>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <p><strong>Delivery Cost:</strong> ${deliveryCost?.toFixed(2)}</p>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <p><strong>Waste Cost:</strong> ${wasteCost?.toFixed(2)}</p>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <p><strong>Stock Cost:</strong> ${stockCost?.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
