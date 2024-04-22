import style from './WishlistItem.module.scss';
import className from 'classnames/bind';

const cx = className.bind(style);

function Wishlist() {
  return (
    <>
      <div className={cx('col border', 'row-cols')}>
        <div className={cx('row d-flex align-items-center')} style={{padding: '20px'}}>
          <div className={cx('col-2', 'figure')}>
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
            <a href="#">
              <i className={cx('bi bi-trash3-fill', 'trashcan-icon')}></i>
            </a>
          </div>
          <div className={cx('col-8 px-5')}>
            <h3 className={cx('product-title')}>BLUE COTTON LEGGINGS</h3>
            <p className={cx('product-price')}>$30.00</p>
            <p className={cx('product-description')}>
              Design inspiration lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed
              pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim....
            </p>
          </div>
          <div className={cx('col-2 d-flex flex-column align-items-center')}>
            <div className={cx('button-block')}>
              <a
                href="#"
                className={cx('btn btn-lg btn-outline-dark rounded-0', 'button', 'addtocart-btn', 'text-btn')}
                style={{ width: '100%' }}
              >
                Add to cart
              </a>
              <p></p>
              <a
                href="#"
                className={cx('btn btn-lg btn-outline-dark rounded-0', 'button', 'quickview-btn', 'text-btn')}
                style={{ width: '100%' }}
              >
                Quick view
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
