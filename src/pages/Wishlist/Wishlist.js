import style from './Wishlist.module.scss';
import classNames from 'classnames/bind';
import { WishlistItem } from '~/components';

const cx = classNames.bind(style);

function Wishlist() {
  return (
    <div className={cx('container-fl')}>
      <div className={cx('topbar')}>
        <h1 className={cx('title')}>View your wishlist products</h1>
      </div>
      <div className={cx('container-fl-content')}>
        <div className={cx('content-wishlist')}>
          {/* <div className={cx('row row-cols-1 mx-0')}>
            <WishlistItem />
            <WishlistItem />
            <WishlistItem />
          </div> */}
          <div className={cx('site-blocks-table')}>
            <h2 className={cx('sub-title')}>
              My Wishlist <i class="bi bi-suit-heart"></i>
            </h2>
            <table className={cx('table')}>
              <thead>
                <tr>
                  <th className={cx('product-remove')}></th>
                  <th class="product-thumbnail"></th>
                  <th className={cx('product-name')}>Product</th>
                  <th class="product-price">Price</th>
                  <th className={cx('product-quantity')}>Stock Status</th>
                  <th className={cx('product-total')}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('product-remove')}>
                    <a href="#">
                      <i class="bi bi-x" style={{ fontSize: '20px' }}></i>
                    </a>
                  </td>
                  <td class={cx('product-thumbnail')}>
                    {/* <img src={require('../../assets/images/header-category-1.webp')} alt="Image" class="img-fluid" /> */}
                    <div className={cx('figure')}>
                      <img
                        src="https://demo-gecko6.myshopify.com/cdn/shop/products/p-46_1a4bbde3-f6bf-47e7-a830-ff8b7616c644.jpg?v=1665680803&width=200"
                        alt="product"
                        className={cx('image-main')}
                        loading="lazy"
                      />
                      <img
                        src="https://demo-gecko6.myshopify.com/cdn/shop/products/p-45_53293929-2bdd-40d2-9b1b-9bc7cd079da0.jpg?v=1665680803&width=360"
                        alt="product"
                        className={cx('image-hover')}
                        loading="lazy"
                      />
                    </div>
                  </td>
                  <td className={cx('product-name')}>Product 1</td>
                  <td>$49.00</td>
                  <td className={cx('product-quantity')}>In Stock</td>
                  <td className={cx('product-total')}>
                    <div className={cx('button-block')}>
                      <a href="#" className={cx('button', 'addtocart-btn', 'text-btn')} style={{ width: '100%' }}>
                        Add to cart
                      </a>
                      <p style={{ margin: '10px' }}></p>
                      <a href="#" className={cx('button', 'quickview-btn', 'text-btn')} style={{ width: '100%' }}>
                        View Detail
                      </a>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className={cx('product-remove')}>
                    <a href="#" class="btn btn-black btn-sm">
                      <i class="bi bi-x" style={{ fontSize: '20px' }}></i>
                    </a>
                  </td>
                  <td class={cx('product-thumbnail')}>
                    {/* <img src={require('../../assets/images/header-category-1.webp')} alt="Image" class="img-fluid" /> */}
                    <div className={cx('figure')}>
                      <img
                        src="https://demo-gecko6.myshopify.com/cdn/shop/products/p-46_1a4bbde3-f6bf-47e7-a830-ff8b7616c644.jpg?v=1665680803&width=200"
                        alt="product"
                        className={cx('image-main')}
                        loading="lazy"
                      />
                      <img
                        src="https://demo-gecko6.myshopify.com/cdn/shop/products/p-45_53293929-2bdd-40d2-9b1b-9bc7cd079da0.jpg?v=1665680803&width=360"
                        alt="product"
                        className={cx('image-hover')}
                        loading="lazy"
                      />
                    </div>
                  </td>
                  <td className={cx('product-name')}>Product 1</td>
                  <td>$49.00</td>
                  <td className={cx('product-quantity')}>In Stock</td>
                  <td className={cx('product-total')}>
                    <div className={cx('button-block')}>
                      <a href="#" className={cx('button', 'addtocart-btn', 'text-btn')} style={{ width: '100%' }}>
                        Add to cart
                      </a>
                      <p style={{ margin: '10px' }}></p>
                      <a href="#" className={cx('button', 'quickview-btn', 'text-btn')} style={{ width: '100%' }}>
                        View Detail
                      </a>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className={cx('product-remove')}>
                    <a href="#" class="btn btn-black btn-sm">
                      <i class="bi bi-x" style={{ fontSize: '20px' }}></i>
                    </a>
                  </td>
                  <td class={cx('product-thumbnail')}>
                    {/* <img src={require('../../assets/images/header-category-1.webp')} alt="Image" class="img-fluid" /> */}
                    <div className={cx('figure')}>
                      <img
                        src="https://demo-gecko6.myshopify.com/cdn/shop/products/p-46_1a4bbde3-f6bf-47e7-a830-ff8b7616c644.jpg?v=1665680803&width=200"
                        alt="product"
                        className={cx('image-main')}
                        loading="lazy"
                      />
                      <img
                        src="https://demo-gecko6.myshopify.com/cdn/shop/products/p-45_53293929-2bdd-40d2-9b1b-9bc7cd079da0.jpg?v=1665680803&width=360"
                        alt="product"
                        className={cx('image-hover')}
                        loading="lazy"
                      />
                    </div>
                  </td>
                  <td className={cx('product-name')}>Product 1</td>
                  <td>$49.00</td>
                  <td className={cx('product-quantity')}>In Stock</td>
                  <td className={cx('product-total')}>
                    <div className={cx('button-block')}>
                      <a href="#" className={cx('button', 'addtocart-btn', 'text-btn')} style={{ width: '100%' }}>
                        Add to cart
                      </a>
                      <p style={{ margin: '10px' }}></p>
                      <a href="#" className={cx('button', 'quickview-btn', 'text-btn')} style={{ width: '100%' }}>
                        View Detail
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={cx('social-icon')}>
          <ul>
            <li>
              <a href="#" class="btn btn-black btn-sm">
                <i class="bi bi-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#" class="btn btn-black btn-sm">
                <i class="bi bi-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#" class="btn btn-black btn-sm">
                <i class="bi bi-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#" class="btn btn-black btn-sm">
                <i class="bi bi-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
