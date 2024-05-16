import style from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { Category, PriceFilter, SizeVariation, ColorVariation, SideProduct } from '~/components';
import { sizesArr, ColorsHash, ColorsString } from '~/common/constants';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function Sidebar() {
  const [sizesArray, setSizesArray] = useState(sizesArr);
  const [colorsArray, setColorsArray] = useState([]);

  useEffect(() => {
    const objColorKeys = Object.keys(ColorsHash);

    setColorsArray(objColorKeys);
  }, []);

  return (
    <aside className={cx('sidebar')}>
      <div className="mt-50px">
        <h3 className={cx('heading')}>Product Categories</h3>
        {/* {categories.map((category, index) => {
            return <Category category={category} key={index} />;
        })} */}

        <div className={cx('category-components-wrapper')}>
          <Category name="Category" />
        </div>

        <span className={cx('separate')}></span>
      </div>

      <div>
        <h3 className={cx('heading')}>Filter By Color</h3>
        {colorsArray.map((color, index) => {
          return <ColorVariation valueStr={color} key={index} />;
        })}

        <span className={cx('separate')}></span>
      </div>

      <div>
        <h3 className={cx('heading')}>Filter By Size</h3>
        {sizesArray.map((size, index) => {
          return <SizeVariation valueStr={size} key={index} quantity={index} />;
        })}

        <span className={cx('separate')}></span>
      </div>

      <div>
        <h3 className={cx('heading')}>Best Selling Products</h3>

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
