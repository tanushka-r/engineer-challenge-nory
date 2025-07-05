import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchLocation, fetchStaffMember } from '../api/api';

interface GlobalContextProps {
  currentLocationId: number | null;
  currentLocationName: string | null;
  currentStaffId: number | null;
  currentStaffName: string | null;
  loading: boolean;
}

const GlobalContext = createContext<GlobalContextProps>({
  currentLocationId: null,
  currentLocationName: null,
  currentStaffName: null,
  currentStaffId: null,
  loading: true,
});

/**
 *  Hardcoded location id and user id
 *  Normally, user would be able to coose location from the list of all locations
 *  Then, users would be able to attempt to login
 *  Upons successful login, user details and location details would be set in global context
 */
const LOCATION_ID = 2;
const USER_ID = 3;

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocationId, setCurrentLocationId] = useState<number>(LOCATION_ID);
  const [currentStaffId, setCurrentStaffId] = useState<number>(USER_ID);
  const [currentLocationName, setCurrentLocationName] = useState<string | null>(null);
  const [currentStaffName, setCurrentStaffName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = await fetchLocation(currentLocationId);
        const staff = await fetchStaffMember(currentStaffId);

        if (location?.name) {
          setCurrentLocationName(location.name);
        }

        if (staff?.name) {
          setCurrentStaffName(staff.name);
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
        currentLocationName,
        currentStaffName,
        loading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
