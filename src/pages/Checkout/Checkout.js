import style from './Checkout.module.scss';
import classNames from 'classnames/bind';
import Input from './Input';
import { useEffect, useState } from 'react';
import { getAllCity, getAllDistrictByCity } from '~/services/api/shippingService';

const cx = classNames.bind(style);

function Checkout() {
  const country = [
    {
      key: 1,
      value: 'Việt Nam',
    },
  ];
  const [city, setCity] = useState({});
  const [selectedCity, setSelectedCity] = useState('');
  const [district, setDistrict] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const getAllCityData = async () => {
    const result = await getAllCity();
    const data = result.data;
    const city = data.map((item) => {
      return {
        key: item.id,
        value: item.name,
      };
    });
    setCity(city);
    console.log(city);
  };

  const getAllDistrict = async (cityId) => {
    const result = await getAllDistrictByCity(cityId);
    const data = result.data;
    const district = data.map((item) => {
      return {
        key: item.id,
        value: item.name,
      };
    });
    setDistrict(district);
    console.log(district);
  };

  useEffect(() => {
    getAllCityData();
  }, []);

  useEffect(() => {
    console.log(selectedCity);
    setDistrict({});
    if (selectedCity) {
      getAllDistrict(selectedCity);
    }
  }, [selectedCity]);

  return (
    <>
      <div className={cx('checkout-container')}>
        <div className={cx('checkout-wrapper')}>
          <div className={cx('info-wrapper')}>
            <div className={cx('heading')}>Billing details</div>
            <div className={cx('name-area')}>
              <div className={cx('column')}>
                <Input name="firstName" label="First name" placeholder="First name..." isRequired required />
              </div>
              <div className={cx('column')}>
                <Input name="lastName" label="Last name" placeholder="Last name..." isRequired required />
              </div>
            </div>
            <div className={cx('address-area')}>
              <div>
                <Input name="country" label="Country" selection data={country} isRequired required />
              </div>
              <div>
                <Input
                  name="province/city"
                  label="Province / City"
                  selection
                  setOption={setSelectedCity}
                  data={city}
                  isRequired
                  required
                />
              </div>
              <div>
                <Input
                  name="district"
                  label="Districts"
                  selection
                  data={district}
                  setOption={setSelectedDistrict}
                  isRequired
                  required
                />
              </div>
              <div>
                <Input name="street" label="Street Address" placeholder="Street address..." isRequired required />
              </div>
            </div>
            <div className={cx('phone-area')}>
              <Input name="phone" label="Phone Number" placeholder="Phone number..." isRequired required />
            </div>
            <div className={cx('email-area')}>
              <Input name="email" label="Email Address" placeholder="Email address..." isRequired required />
            </div>
            <div className={cx('note-area')}>
              <Input name="note" label="Note" placeholder="note..." textarea isRequired required />
            </div>
            <div className={cx('update-area')}>
              <button className={cx('update-button')}>UPDATE INFORMATION</button>
            </div>
          </div>
          <div className={cx('invoice-wrapper')}>
            <div className={cx('heading')}>Your orders</div>
            <div className={cx('invoice-body')}>
              <table className={cx('invoice-table')}>
                <thead className={cx('thead')}>
                  <tr>
                    <th className={cx('product')}>Product</th>
                    <th className={cx('subtotal')}>Subtotal</th>
                  </tr>
                </thead>
                <tbody className={cx('tbody')}>
                  <tr>
                    <td className={cx('product')}>
                      <p className={cx('product-heading')}>Test</p>
                      <div className={cx('info-product')}>
                        <span>10000</span>
                        <div>
                          <p className={cx('variation-value')}>Color: Red</p>
                          <p className={cx('variation-value')}>Size: M</p>
                        </div>
                      </div>
                    </td>
                    <td className={cx('product-subtotal')}>$ 50000</td>
                  </tr>
                </tbody>
              </table>
              <div className={cx('total-field')}>
                <p className={cx('total-title')}>Subtotal</p>
                <p>$ 10000</p>
              </div>
              <div className={cx('total-field')}>
                <p className={cx('total-title')}>Shipping</p>
                <p>Flat rate: $ 30.00</p>
              </div>
              <div className={cx('total-field')}>
                <p className={cx('total-title')}>Total</p>
                <strong>$ 123123123</strong>
              </div>

              {/* Payment type */}
              <div className={cx('payment-type')}>
                <ul className={cx('payment-list')} style={{ display: 'flex', flexDirection: 'column' }}>
                  <li style={{ display: 'flex' }}>
                    <input type="radio" name="payment-radio" id="bank" />
                    <label htmlFor="bank">Direct bank transfer</label>
                  </li>
                  <li style={{ display: 'flex' }}>
                    <input type="radio" name="payment-radio" id="on-delivery" />
                    <label htmlFor="on-delivery">Cash on delivery</label>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="radio" name="payment-radio" id="VNPay" />
                    <label htmlFor="VNPay">VNPay</label>
                    <img
                      style={{ width: '50px', height: '30px', border: '1px solid black' }}
                      src="https://stcd02206177151.cloud.edgevnpay.vn/assets/images/logo-icon/logo-primary.svg"
                      alt="VNPay"
                    />
                  </li>
                </ul>

                <div>
                  <p className={cx('policy')}>
                    Your personal data will be used to process your order, support your experience throughout this
                    website, and other purposes described in our&nbsp;
                    <button className={cx('policy-button')}>privacy policy</button>
                  </p>

                  <div className={cx('term')}>
                    <div className={cx('term-inner')}>
                      <input type="checkbox" name="" id="" />
                      <p>I have read and agree to the website</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx('place-area')}>
                <button className={cx('place-button')}>PLACE ORDER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
