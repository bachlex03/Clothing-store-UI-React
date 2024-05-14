import style from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { Category, PriceFilter, Variation, SideProduct } from '~/components';
const cx = classNames.bind(style);

function Sidebar() {
  return (
    <aside className={cx('sidebar')}>
      <div>
        <h3 className={cx('heading')}>Product Categories</h3>
        {/* {categories.map((category, index) => {
          return <Category category={category} key={index} />;
        })} */}

        <Category name="Category" />

        <span className={cx('separate')}></span>
      </div>

      <div>
        <h3 className={cx('heading')}>Filter By Price</h3>

        {/* <PriceFilter /> */}

        <span className={cx('separate')}></span>
      </div>

      <div>
        <h3 className={cx('heading')}>Filter By Color</h3>
        {/* {colorsFilter.map((color, index) => {
          return <VariationItem name="colors" key={index} colorObj={color} />;
        })} */}

        <Variation name="Color" />
        <Variation name="Color" />
        <Variation name="Color" />
        <Variation name="Color" />
        <Variation name="Color" />

        <span className={cx('separate')}></span>
      </div>

      <div>
        <h3 className={cx('heading')}>Filter By Size</h3>
        {/* {sizesFilter.map((size, index) => {
          return <VariationItem name="sizes" key={index} colorObj={size} />;
        })} */}

        <Variation name="Size" />
        <Variation name="Size" />
        <Variation name="Size" />
        <Variation name="Size" />
        <Variation name="Size" />

        <span className={cx('separate')}></span>
      </div>

      <div>
        <h3 className={cx('heading')}>Best Selling Products</h3>
        {/* {products ? <SideProduct product={products[4]} /> : <SideProduct name="Product" price sale />} */}

        <div className={cx('side-product-component')}>
          <SideProduct name="Product" />
        </div>

        <div className={cx('side-product-component')}>
          <SideProduct name="Product" />
        </div>

        <div className={cx('side-product-component')}>
          <SideProduct name="Product" />
        </div>

        {/* {products ? <SideProduct product={products[3]} /> : <SideProduct name="Product" price sale />} */}

        {/* {products ? <SideProduct product={products[2]} /> : <SideProduct name="Product" price sale />} */}

        <span className={cx('separate')}></span>
      </div>
    </aside>
  );
}

export default Sidebar;
