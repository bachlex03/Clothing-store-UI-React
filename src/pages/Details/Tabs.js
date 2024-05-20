import React, { useState } from 'react';
import style from './Tabs.module.scss';
import classNames from 'classnames/bind';
import Reviews from './Reviews';

const cx = classNames.bind(style);

function Tabs() {
  const [tab, setTab] = useState(0);

  const updateTab = (index) => {
    setTab(index);
  };

  return (
    <div className={cx('container-tabs')}>
      <div className={cx('containter-content')}>
        <div className={cx('tab')}>
          <ul>
            <li className={tab === 0 ? cx('active') : cx('no-active')} onClick={() => updateTab(0)}>
              Description
            </li>
            <li className={tab === 1 ? cx('active') : cx('no-active')} onClick={() => updateTab(1)}>
              Why Buy From Us
            </li>
            <li className={tab === 2 ? cx('active') : cx('no-active')} onClick={() => updateTab(2)}>
              Reviews
            </li>
          </ul>
        </div>
        <div className={tab === 0 ? cx('show-content') : cx('content')}>
          <p className={cx('description-content')}>
            Starting with our core, we are replacing the conventional composition of our Essentials Collection with more
            sustainable fibres in each product. An action only contributing to the longevity of the classic styles,
            designed to last and stand the test of time. Moving forward, we are committed to increasing percentage of
            the more sustainable fibres used in seasonal collections. Transformative colours partner bold textiles and
            unique prints, natural fibres paired with high our quality craftsmanship and thoughtful design remains at
            the forefront textile care labelling drying and taking care of our clothes.
          </p>
        </div>
        <div className={tab === 1 ? cx('show-content') : cx('content')}>
          <strong>5 Reasons To Be Our Customer:</strong>
          <div className={cx('table-reason')}>
            <table>
              <tbody>
                <tr>
                  <th style={{ width: '72px' }}>
                    <img
                      style={{ width: '51px', height: '51px' }}
                      src="https://cdn.shopify.com/s/files/1/0011/9521/2866/files/reasons_1.png?15737560157770889133"
                      alt="reasons_1"
                    />
                  </th>
                  <td>
                    <p>
                      <strong>Exceptional Support</strong> Our friendly support staff are available all the time to help
                      customers with any questions or concerns. We want our products to deliver the most joy and value
                      with zero hassle. That’s why we insist on being available to assist when the need arises.
                    </p>
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '72px' }}>
                    <img
                      style={{ width: '51px', height: '51px' }}
                      src="https://cdn.shopify.com/s/files/1/0011/9521/2866/files/reasons_2.png?15737560157770889133"
                      alt="reasons_2"
                    />
                  </th>
                  <td>
                    <p>
                      <strong>30-Day Money Back Guarantee</strong> We are so confident that you will love our products
                      that we offer a 30-day money back guarantee. If elgible product doesn't meet your needs, just ask
                      for your money back.
                    </p>
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '72px' }}>
                    <img
                      style={{ width: '51px', height: '51px' }}
                      src="https://cdn.shopify.com/s/files/1/0011/9521/2866/files/reasons_3.png?15737560157770889133"
                      alt="reasons_3"
                    />
                  </th>
                  <td>
                    <p>
                      <strong>Quality and Affordable</strong> We believe in combining both quality and affordability in
                      our products. There’s no reason to pay exorbitant prices when our products do more for less. You
                      won't find better price to quality ratio.
                    </p>
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '72px' }}>
                    <img
                      style={{ width: '51px', height: '51px' }}
                      src="https://cdn.shopify.com/s/files/1/0011/9521/2866/files/reasons_4.png?15737560157770889133"
                      alt="reasons_4"
                    />
                  </th>
                  <td>
                    <p>
                      <strong>Unbeatable Price</strong> - Years of expiriences in pet clothing and accessories industry
                      gives us uniqe position to work directly with factories to ensure quality control and the best
                      price possible.
                    </p>
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '72px' }}>
                    <img
                      style={{ width: '51px', height: '51px' }}
                      src="https://cdn.shopify.com/s/files/1/0011/9521/2866/files/reasons_5.png?15737560157770889133"
                      alt="reasons_5"
                    />
                  </th>
                  <td>
                    <p>
                      <strong>Secure, Easy Ordering</strong> - Orders can be placed online using either a credit/debit
                      card or PayPal. All transactions are SSL-secured and guarantee your privacy.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={tab === 2 ? cx('show-content') : cx('content')}>
          <Reviews />
        </div>
      </div>
    </div>
  );
}

export default Tabs;
