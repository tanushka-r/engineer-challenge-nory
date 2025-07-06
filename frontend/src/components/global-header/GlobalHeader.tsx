import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext'; 

import { LocationPinIcon } from '../../assets/icons';
import avatar from '../../assets/staff.svg';

import './global-header.styles.css';

const GlobalHeader: React.FC = () => {
  const { currentLocation, currentStaff } = useGlobalContext();

  return (
    <div className="global-header">
    <div className="location">
      <LocationPinIcon />
      <span className="address">{currentLocation?.address}</span>
    </div>

    <div className="staff-info">
      <img
        src={avatar}
        alt=""
        className="w-6 h-6 rounded-full object-cover"
      />
      <span className="staff-info-text">
        <span className="staff-name">{currentStaff?.name}</span>
        <span className="staff-role">{currentStaff?.role_name}</span>
      </span>
    </div>
</div>
  );
};

export default GlobalHeader;
