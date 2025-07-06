import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchLocation, fetchStaffMember } from '../api/api';

interface Location {
  id: number;
  name: string;
  address: string;
  [key: string]: any;
}

interface Staff {
  id: number;
  name: string;
  roleId?: number | null;
  roleDescription?: string | null;
  [key: string]: any;
}

interface GlobalContextProps {
  currentLocationId: number | null;
  currentStaffId: number | null;
  currentLocation: Location | null;
  currentStaff: Staff | null;
  loading: boolean;
}

const GlobalContext = createContext<GlobalContextProps>({
  currentLocationId: null,
  currentStaffId: null,
  currentLocation: null,
  currentStaff: null,
  loading: true,
});

// Hardcoded for now
const LOCATION_ID = 1;
const USER_ID = 3;

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocationId] = useState<number>(LOCATION_ID);
  const [currentStaffId] = useState<number>(USER_ID);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = await fetchLocation(currentLocationId);
        const staff = await fetchStaffMember(currentStaffId);

        if (location) {
          setCurrentLocation(location);
        }

        if (staff) {
          setCurrentStaff(staff);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching global data:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentLocationId, currentStaffId]);

  return (
    <GlobalContext.Provider
      value={{
        currentLocationId,
        currentStaffId,
        currentLocation,
        currentStaff,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
