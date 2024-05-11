import style from './Price.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function Price({ value = 0, promotion = 0, pos__shop, old_new_price, fs_15 }) {
  const classes = {
    pos__shop,
    old_new_price,
    fs_15,
  };

  let formatPrice = value ? value.toFixed(2) : 'NaN';
  let priceOnPromotion = value ? value - value * (promotion / 100) : 0;
  let formatSalePrice = value ? priceOnPromotion.toFixed(2) : 'NaN';

  const renderPrice = {
    current: <span className={cx('price', { ...classes })}>$ {formatPrice}</span>,
    sale: (
      <>
        <span className={cx('new-price', { ...classes })}>$ {formatSalePrice}</span>
        <span className={cx('old-price', { ...classes })}>$ {formatPrice}</span>
      </>
    ),
    old_new_price: (
      <>
        <span className={cx('old-price', { ...classes })}>$ {formatPrice}</span>
        <span className={cx('new-price', { ...classes })}>$ {formatSalePrice}</span>
      </>
    ),
  };

  return (
    <>
      <div
        className={cx('wrapper', {
          pos__shop,
        })}
      >
        {promotion ? (old_new_price ? renderPrice.old_new_price : renderPrice.sale) : renderPrice.current}
      </div>
    </>
  );
}

export default Price;
