import style from './Checkout.module.scss';
import classNames from 'classnames/bind';
import Input from './Input';
import { useEffect, useState } from 'react';
import { getAllCity, getAllDistrictByCity } from '~/services/api/shippingService';
import { getInfoCheckout, paymentVNPay, updateInfo } from '~/services/api/paymenService';

const cx = classNames.bind(style);

function Checkout() {
  const [checkoutInfo, setCheckoutInfo] = useState({});
  const [city, setCity] = useState({});
  const [selectedCity, setSelectedCity] = useState('');
  const [district, setDistrict] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [street, setStreet] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userDistrict, setUserDistrict] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartList')) || []);
  const [listItems, setListItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [method, setMethod] = useState(0);

  useEffect(() => {
    let total = 0;
    const boughtItems = cartList.map((item) => {
      total = total + item.product_price * item.quantity;
      return {
        name: item.product_name,
        slug: item.product_slug,
        size: item.selectedSize,
        color: item.selectedColor,
        quantity: item.quantity,
        price: item.product_price,
      };
    });
    setListItems(boughtItems);
    setTotal(total);
  }, []);

  useEffect(() => {
    getCheckoutInfo();
  }, []);

  const getCheckoutInfo = async () => {
    const result = await getInfoCheckout();
    setCheckoutInfo(result);
    console.log(result);
  };

  useEffect(() => {
    setSelectedCountry(checkoutInfo.address_country || '');
    setStreet(checkoutInfo.address_addressLine || '');
    setFirstName(checkoutInfo.profile_firstName || '');
    setLastName(checkoutInfo.profile_lastName || '');
    setUserCity(checkoutInfo.address_province || '');
    setUserDistrict(checkoutInfo.address_district || '');
    setStreet(checkoutInfo.address_addressLine || '');
    setPhone(checkoutInfo.profile_phoneNumber || '');
    console.log('checkout info: -->>', checkoutInfo);
  }, [checkoutInfo]);

  const country = [
    {
      key: 1,
      value: 'Việt Nam',
    },
  ];

  useEffect(() => {
    if (selectedCity && selectedCity.startsWith('{') && selectedCity.endsWith('}')) {
      try {
        const objectCity = JSON.parse(selectedCity);
        setUserCity(objectCity?.value);
        console.log(objectCity);
      } catch (error) {
        console.error('Error parsing selectedCity:', error);
      }
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict && selectedDistrict.startsWith('{') && selectedDistrict.endsWith('}')) {
      try {
        const objectDistrict = JSON.parse(selectedDistrict);
        setUserDistrict(objectDistrict?.value);
        console.log(objectDistrict);
      } catch (error) {
        console.error('Error parsing selectedDistrict:', error);
      }
    }
  }, [selectedDistrict]);

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
  };

  useEffect(() => {
    getAllCityData();
  }, []);

  useEffect(() => {
    let objectCity;
    if (selectedCity && selectedCity.startsWith('{') && selectedCity.endsWith('}')) {
      objectCity = JSON.parse(selectedCity);
    }
    setDistrict({});
    if (selectedCity) {
      console.log(objectCity?.key);
      getAllDistrict(objectCity?.key);
    }
  }, [selectedCity]);

  const handleUpdateInfo = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
      addressLine: street,
      province: userCity,
      district: userDistrict,
      country: selectedCountry,
    };
    console.log('check info: ', data);
    const response = await updateInfo(data);
    if (response.status === 200) {
      if (response.data?.redirect) {
        console.log('Update success');
      } else {
        console.log('Update failed');
      }
    }
  };

  const handlePlaceOrder = async () => {
    console.log('Place order', listItems);
    const boughtItems = listItems.map((item) => {
      return {
        slug: item.slug,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
      };
    });
    const data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
      country: selectedCountry,
      province: userCity,
      district: userDistrict,
      addressLine: street,
      boughtItems: boughtItems,
      totalPrice: total,
    };
    if (method === 1) {
      const response = await paymentVNPay(data);
      console.log('response: ', response.data.url);
      window.location.href = response.data.url;
    }
  };

  return (
    <>
      <div className={cx('checkout-container')}>
        <div className={cx('checkout-wrapper')}>
          <div className={cx('info-wrapper')}>
            <div className={cx('heading')}>Billing details</div>
            <div className={cx('name-area')}>
              <div className={cx('column')}>
                <Input
                  name="firstName"
                  label="First name"
                  placeholder="First name..."
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  isRequired
                  required
                />
              </div>
              <div className={cx('column')}>
                <Input
                  name="lastName"
                  label="Last name"
                  placeholder="Last name..."
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  isRequired
                  required
                />
              </div>
            </div>
            <div className={cx('address-area')}>
              <div>
                <Input
                  name="country"
                  label="Country"
                  selectValue={selectedCountry}
                  selection
                  data={country}
                  isRequired
                  required
                />
              </div>
              <div>
                <Input
                  name="province/city"
                  label="Province / City"
                  selection
                  setOption={setSelectedCity}
                  data={city}
                  selectValue={userCity}
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
                  selectValue={userDistrict}
                  setOption={setSelectedDistrict}
                  isRequired
                  required
                />
              </div>
              <div>
                <Input
                  name="street"
                  label="Street Address"
                  placeholder="Street address..."
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  isRequired
                  required
                />
              </div>
            </div>
            <div className={cx('phone-area')}>
              <Input
                name="phone"
                label="Phone Number"
                placeholder="Phone number..."
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                isRequired
                required
              />
            </div>
            {/* <div className={cx('email-area')}>
              <Input name="email" label="Email Address" placeholder="Email address..." isRequired required />
            </div> */}
            <div className={cx('note-area')}>
              <Input
                name="note"
                label="Note"
                placeholder="note..."
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                textarea
                isRequired
                required
              />
            </div>
            <div className={cx('update-area')}>
              <button className={cx('update-button')} onClick={() => handleUpdateInfo()}>
                UPDATE INFORMATION
              </button>
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
                  {listItems &&
                    listItems.length > 0 &&
                    listItems.map((item) => {
                      return (
                        <tr>
                          <td className={cx('product')}>
                            <p className={cx('product-heading')}>{item.name}</p>
                            <div className={cx('info-product')}>
                              <span>$ {parseFloat(item.price).toFixed(2)}</span>
                              <div>
                                <p className={cx('variation-value')}>Color: {item.color}</p>
                                <p className={cx('variation-value')}>Size: {item.size}</p>
                                <p className={cx('variation-value')}>Quantity: {item.quantity}</p>
                              </div>
                            </div>
                          </td>
                          <td className={cx('product-subtotal')}>
                            $ {parseFloat(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className={cx('total-field')}>
                <p className={cx('total-title')}>Subtotal</p>
                <p>$ {parseFloat(total).toFixed(2)}</p>
              </div>
              <div className={cx('total-field')}>
                <p className={cx('total-title')}>Shipping</p>
                <p>Flat rate: $ 0.00</p>
              </div>
              <div className={cx('total-field')}>
                <p className={cx('total-title')}>Total</p>
                <strong>$ {parseFloat(total).toFixed(2)}</strong>
              </div>

              {/* Payment type */}
              <div className={cx('payment-type')}>
                <ul className={cx('payment-list')} style={{ display: 'flex', flexDirection: 'column' }}>
                  <li style={{ display: 'flex' }}>
                    <input type="radio" name="payment-radio" id="on-delivery" checked onClick={() => setMethod(0)} />
                    <label htmlFor="on-delivery">Cash on delivery</label>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="radio" name="payment-radio" id="VNPay" onClick={() => setMethod(1)} />
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
                <button className={cx('place-button')} onClick={() => handlePlaceOrder()}>
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
