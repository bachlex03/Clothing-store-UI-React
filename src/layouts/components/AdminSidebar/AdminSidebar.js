import style from './AdminSidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faFileInvoiceDollar,
  faLayerGroup,
  faReceipt,
  faShirt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import { SidebarMenu, MenuItem } from '~/components/adminComponents';

const cx = classNames.bind(style);

function AdminSidebar() {
  return (
    <div className={cx('menu', 'w-259')} style={{ backgroundColor: '#132337' }}>
      <div>
        <SidebarMenu name="MENU" shine>
          <MenuItem name="Dashboard" icon={<FontAwesomeIcon icon={faChartLine} />} to="/admin/products" />

          <MenuItem name="Landing pages" />
        </SidebarMenu>

        <SidebarMenu name="USUALLY">
          <MenuItem name="Products" icon={<FontAwesomeIcon icon={faShirt} />} to="/admin/products" />
          <MenuItem name="Invoices" icon={<FontAwesomeIcon icon={faFileInvoiceDollar} />} to="/admin/invoices" />
          <MenuItem name="Customers" icon={<FontAwesomeIcon icon={faUsers} />} />
          <MenuItem name="Employees" />
        </SidebarMenu>

        <SidebarMenu name="OTHERS">
          <MenuItem name="Categories" icon={<FontAwesomeIcon icon={faLayerGroup} />} />
          <MenuItem name="Promotions" icon={<FontAwesomeIcon icon={faReceipt} />} />
        </SidebarMenu>
      </div>
    </div>
  );
}

export default AdminSidebar;
