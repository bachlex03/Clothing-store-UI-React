// import style from './Cart.module.scss';
// import classNames from 'classnames/bind';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';

// // import { Price, Button } from "~/components";

// // import { remove } from '~/redux/features/cart/cartSlice';

// const cx = classNames.bind(style);

// function Cart() {
//   const dispatch = useDispatch();

//   const cartItems = useSelector((state) => state.cart.values);

//   const colors = ['Gold', 'Silver', 'Bronze'];
//   const sizes = ['16.0', '17.0', '18.0', '19.0'];

//   let total = 0;

//   return (
//     <div className={cx('cart')}>
//       <h3 className={cx('cart-heading')}>Cart</h3>
//       <div>
//         {cartItems.map((item, index) => {
//           const subtotal = item.quantity * (item.price - item.price * (item.promotion / 100));

//           total += subtotal;
//           return (
//             <div key={index} className={cx('cart-item')}>
//               <i
//                 onClick={(e) => {
//                   // dispatch(remove(index));
//                 }}
//               >
//                 <svg
//                   className={cx('icon')}
//                   xmlns="http://www.w3.org/2000/svg"
//                   height="14px"
//                   viewBox="-100 -100 584 712"
//                 >
//                   <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
//                 </svg>
//               </i>
//               <div className={cx('item-info')}>
//                 <Link to={`/products/${item.slug}`}>
//                   <img src={item.imageUrls[0]} alt="" className={cx('item-img')} />
//                 </Link>
//                 <div className="flex-1">
//                   <Link to={`/products/${item.slug}`}>
//                     <h4 className={cx('item-heading')}>{item.name}</h4>
//                   </Link>
//                   <div className={cx('variation-wrapper')}>
//                     <div>Color: {colors[item.color - 1]}</div>
//                     <div className="mt-5">Size: {sizes[item.size - 1]}</div>
//                   </div>
//                 </div>
//               </div>
//               <div className={cx('item-price')}>
//                 <div className={cx('quantity-price')}>
//                   <span className={cx('item-quantity')}>{item.quantity} ×</span>
//                   {/* <Price promotion={item.promotion} value={item.price} /> */}
//                 </div>
//                 <span className={cx('sub-total')}>$ {subtotal.toFixed(2)}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="flex justify-between mt-20">
//         <span>Total: </span>
//         <span className={cx('total-price')}>$ {total.toFixed(2)}</span>
//       </div>
//       <div className="mt-20 text-center">
//         {/* <Button to="/cart" large hover>
//           VIEW CART
//         </Button> */}
//       </div>
//       <div className="mt-10 text-center">
//         {/* <Button to="/checkout" large hover>
//           CHECKOUT
//         </Button> */}
//       </div>
//     </div>
//   );
// }

// export default Cart;
