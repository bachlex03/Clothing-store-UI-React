import { Header, Sidebar, Footer } from '../components';

function Shop({ children }) {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="left-block"></div>
        <div className="right-block">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
