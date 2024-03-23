import style from './AdminSidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function AdminSidebar() {
  return (
    <div className={cx('w-259')} style={{ backgroundColor: '#132337' }}>
      Sidebar
    </div>
  );
}

export default AdminSidebar;
