import style from './CustomerLayout.module.scss';
import classNames from 'classnames/bind';
import { Header, Footer, CustomerSidebar } from '../components';

const cx = classNames.bind(style);

function CustomerLayout({ children }) {
  return (
    <>
      <Header />
      <main className={cx('container-fluid px-0')}>
        <div className={cx('container-fluid', 'topbar')}>
          <h1 className={cx('title', 'text-center')}>My Account</h1>
        </div>
        <div className={cx('container')}>
          <div className={cx('d-flex')}>
            <CustomerSidebar />
            <div className={cx('w-100')}>{children}</div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default CustomerLayout;
