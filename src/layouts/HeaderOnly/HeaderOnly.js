import { Header, Footer } from '../components';

function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div className="page-container">
        <div className="page-content">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default HeaderOnly;
