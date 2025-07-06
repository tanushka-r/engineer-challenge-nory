import './report-panel.styles.css';

const ReportPanel = ({ title, amount }: {title: string, amount: string | undefined}) => {
  return (
    <div className="report-panel">
      <div className="panel-body">
        <div className="report-amount">&euro; {amount ? amount : '0'}</div>
        <div className="report-title">{title}</div>
      </div>
    </div>
  );
};

export default ReportPanel;