import style from './Checkout.module.scss';
import classNames from 'classnames/bind';
import Input from './Input';
import { useEffect, useState } from 'react';
import { getAllCity, getAllDistrictByCity } from '~/services/api/shippingService';
import { getInfoCheckout, paymentCash, paymentVNPay, updateInfo } from '~/services/api/paymenService';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '~/redux/features/cart/cartSlice';

const cx = classNames.bind(style);

function Checkout() {
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]{2,}$/; // Allow letters and spaces only, including Vietnamese characters, at least 2 characters
  const phoneRegex = /^[0-9]{10,11}$/; // Numbers only, between 10 and 11 digits
  const streetRegex = /^[a-zA-Z0-9À-ỹ\s,.-/]{5,}$/; // Allow letters, numbers, and special characters, at least 5 characters

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
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.values);
  const userInformation = useSelector((state) => state.user.information);
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    const boughtItems = cartItems.map((item) => {
      total = total + item.final_price * item.quantity;
      return {
        name: item.name,
        slug: item.slug,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
        final_price: item.final_price,
        discount: item.discount,
      };
    });
    setListItems(boughtItems);
    setTotal(total);
  }, []);

  useEffect(() => {
    if (!userInformation) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    getCheckoutInfoMutate.mutate();
  }, []);

  const getCheckoutInfoMutate = useMutation({
    mutationFn: async () => {
      return await getCheckoutInfo();
    },
    onSuccess: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }
    },
  });

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
    getAllCityDataMutate.mutate();
  }, []);

  const getAllCityDataMutate = useMutation({
    mutationFn: async () => {
      return await getAllCityData();
    },
    onSuccess: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }
    },
  });

  useEffect(() => {
    if (selectedCity) {
      getDetailProductMutate.mutate();
    }
  }, [selectedCity]);

  const getDetailProductMutate = useMutation({
    mutationFn: async () => {
      let objectCity;
      if (selectedCity && selectedCity.startsWith('{') && selectedCity.endsWith('}')) {
        objectCity = JSON.parse(selectedCity);
      }
      setDistrict({});
      return await getAllDistrict(objectCity?.key);
    },
    onSuccess: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }
    },
  });

  const validateCheckoutInfo = () => {
    let isValid = true;
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedStreet = street.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedFirstName || !trimmedLastName || !trimmedStreet || !selectedCountry || !userCity || !userDistrict) {
      toast.error('Error', {
        description: 'Please fill in all required fields',
      });
      isValid = false;
      return isValid;
    }

    if (!nameRegex.test(trimmedFirstName)) {
      toast.error('Error', {
        description: 'First name can only contain letters and spaces, at least 2 characters',
      });
      isValid = false;
    }

    if (!nameRegex.test(trimmedLastName)) {
      toast.error('Error', {
        description: 'Last name can only contain letters and spaces, at least 2 characters',
      });
      isValid = false;
    }

    if (!streetRegex.test(trimmedStreet)) {
      toast.error('Error', {
        description: 'Please enter a valid street address, at least 5 characters',
      });
      isValid = false;
    }

    if (!phoneRegex.test(trimmedPhone)) {
      toast.error('Error', {
        description: 'Phone number can only contain numbers, between 10 and 11 digits',
      });
      isValid = false;
    }

    return isValid;
  };

  const handleUpdateInfo = async () => {
    if (!validateCheckoutInfo()) {
      throw new Error('Invalid input');
    }

    const data = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phone.trim(),
      addressLine: street.trim(),
      province: userCity,
      district: userDistrict,
      country: selectedCountry,
    };

    const response = await updateInfo(data);
    if (response.status === 200) {
      if (response.data?.redirect) {
        console.log('Update success');
      } else {
        console.log('Update failed');
      }
    }
  };

  const updateInfoMutate = useMutation({
    mutationFn: async () => {
      return await handleUpdateInfo();
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: 'Update information successfully',
      });

      console.log('data', data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }
    },
  });

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);

  const handlePlaceOrder = async () => {
    if (!validateCheckoutInfo()) {
      throw new Error('Invalid input');
    }

    console.log('Place order', listItems);
    const boughtItems = listItems.map((item) => {
      return {
        name: item.name,
        slug: item.slug,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
        final_price: item.final_price,
        discount: item.discount,
      };
    });

    const data = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phone.trim(),
      country: selectedCountry,
      province: userCity,
      district: userDistrict,
      addressLine: street.trim(),
      boughtItems: boughtItems,
      totalPrice: total,
    };

    if (method === 0) {
      const response = await paymentCash(data);
      console.log('response', response);
      if (response.status == 200) {
        dispatch(clearCart());
        await new Promise((resolve) => setTimeout(resolve, 0));

        navigate('/cart');
        toast.success('Success', {
          description: 'Checkout successfully!',
        });
      } else {
        navigate('/cart');
        toast.error('Error', {
          description: 'Checkout failed!',
        });
      }
    } else if (method === 1) {
      const response = await paymentVNPay(data);
      window.location.href = response.data.url;
    }
  };

  const placeOrderMutate = useMutation({
    mutationFn: async () => {
      return await handlePlaceOrder();
    },
    onSuccess: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }
    },
  });

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
                type="number"
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
              />
            </div>
            <div className={cx('update-area')}>
              <button className={cx('update-button')} onClick={() => updateInfoMutate.mutate()}>
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
                              {item?.discount ? (
                                <div>
                                  <span style={{ color: '#d7422d', marginRight: '10px', fontSize: '1.4rem' }}>
                                    $ {parseFloat(item.final_price).toFixed(2)}
                                  </span>
                                  <span
                                    style={{ color: '#9e9e9e', textDecoration: 'line-through', fontSize: '1.2rem' }}
                                  >
                                    $ {parseFloat(item.price).toFixed(2)}
                                  </span>
                                </div>
                              ) : (
                                <span style={{ fontSize: '1.4rem' }}>$ {parseFloat(item.price).toFixed(2)}</span>
                              )}
                              <div>
                                <p className={cx('variation-value')}>Color: {item.color}</p>
                                <p className={cx('variation-value')}>Size: {item.size}</p>
                                <p className={cx('variation-value')}>Quantity: {item.quantity}</p>
                              </div>
                            </div>
                          </td>
                          <td className={cx('product-subtotal')} style={{ fontSize: '1.6rem' }}>
                            $ {parseFloat(item.final_price * item.quantity).toFixed(2)}
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
                <button className={cx('place-button')} onClick={() => placeOrderMutate.mutate()}>
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
