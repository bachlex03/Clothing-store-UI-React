import { useLayoutEffect } from 'react';
import { AdminHeader, AdminFooter, AdminSidebar } from '../components';

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
    <div>
      <AdminHeader />
      <div className="container">
        <div className="left-block">
          <AdminSidebar />
        </div>
        <div className="right-block">{children}</div>
      </div>
      <AdminFooter />
    </div>
  );
}

export default Admin;
