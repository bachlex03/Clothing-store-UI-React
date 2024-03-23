import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

function Dashboard() {
  return (
    <div className="h-screen text-blue-400" style={{ backgroundColor: '#0f1824', width: '' }}>
      <div>Dashboard</div>
    </div>
  );
}

export default Dashboard;
