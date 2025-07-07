import { useEffect, useState } from 'react';
import {
  fetchAllSaleRevenueForLocation,
  fetchAllDeliveryCostForLocation,
  fetchAllWasteCostForLocation,
  fetchAllStockCostForLocation
} from '../../api/api';
import { useGlobalContext } from '../../context/GlobalContext';

import ReportPanel from '../../components/report-panel/ReportPanel';

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
    <div className="content-wrapper" data-cy="page-reports">
      <h1>Reports</h1>
      <div className="panels-container reports-container">
        <ReportPanel
          title="Sales Revenue"
          amount={saleRevenue?.toFixed(2)}
        />
        <ReportPanel
          title="Delivery Cost"
          amount={deliveryCost?.toFixed(2)}
        />
        <ReportPanel
          title="Waste Cost"
          amount={wasteCost?.toFixed(2)}
        />
        <ReportPanel
          title="Stock Value"
          amount={stockCost?.toFixed(2)}
        />
      </div>
    </div>
  );
};

export default Reports;
