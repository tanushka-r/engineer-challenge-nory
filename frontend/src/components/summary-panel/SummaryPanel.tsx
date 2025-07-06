import React from 'react';
import type { SaleSummary } from '../../types/types';

import Message from '../message/Message';

interface SummaryProps {
  data: SaleSummary[];
  title?: string;
  placeholder?: string;
}

const SummaryPanel: React.FC<SummaryProps> = ({ data, title = 'Summary', placeholder = 'No data' }) => {
  const total = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="panel">
      <div className="panel-header">{title}</div>
      <div className="panel-body padding-0">
        {data.length > 0 ? (
          <ul>
            {data.map((item, index) => (
              <li key={index} className="list-item">
                {item.name} - ${item.total.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <Message type="info" message={placeholder} classNames="margin-24" />
        )}
      </div>
      <div className="panel-footer summary">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default SummaryPanel;
