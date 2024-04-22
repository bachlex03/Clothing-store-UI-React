import { useLayoutEffect } from 'react';
import { AdminHeader, AdminFooter, AdminSidebar } from '../components';

import style from './Admin.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Admin({ children }) {
  useLayoutEffect(() => {
    const styleTag = document.createElement('style');

    styleTag.innerHTML = `
      @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    `;

    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div className={cx('screen')}>
      <AdminSidebar />

      <div className={cx('container')}>
        <AdminHeader />
        <div className="">{children}</div>
      </div>
    </div>
  );
}

export default Admin;
