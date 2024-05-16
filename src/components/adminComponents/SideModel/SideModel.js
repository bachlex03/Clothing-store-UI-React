import style from './SideModel.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faAnglesRight, faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState, forwardRef, useImperativeHandle, Fragment } from 'react';

import { Button, Input } from '~/components/adminComponents';
import { ColorsHash, ColorsString } from '~/common/constants';
import * as productService from '~/services/api/productService';
import * as accessService from '~/services/api/accessService';
import * as categoryService from '~/services/api/categoryService';

const regexOnlyNumber = /^[0-9.]*$/;

const colorsArr = [
  ColorsHash.BROWN,
  ColorsHash.GREY,
  ColorsHash.YELLOW,
  ColorsHash.WHITE,
  ColorsHash.PINK,
  ColorsHash.RED,
];

const sizesArr = ['S', 'M', 'L', 'XL', '2XL'];
const brandsArr = ['Gucci', 'Louis Vuitton', 'Chanel', 'Dior', 'Prada'];
const typeArr = ['Clothe', 'Trousers', 'Shoes'];
const genderArr = ['Man', 'Woman', 'Unisex'];
const StatusArr = ['Draft', 'Published', 'Scheduled'];

const cx = classNames.bind(style);

function SideModel(props, ref) {
  const overlayRef = useRef(null);
  const addProductContainerRef = useRef(null);
  const [visible, setVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState('');
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState();
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [showImage, setShowImage] = useState([]);

  const [categoriesArr, setCategoriesArr] = useState([
    'Outerwear',
    'Dresses',
    'T-Shirts',
    'Blouses',
    'Knitwear',
    'Pant',
  ]);
  const [fetchCategory, setFetchCategory] = useState({});

  const handleSubmit = async (e) => {
    const formData = new FormData();

    let formSizes = sizes.map((size) => {
      return size.size;
    });

    let formCategoryId = fetchCategory.find((cate) => {
      return cate.category_name === category;
    });

    const test = JSON.stringify([
      {
        name: 'test',
        value: 'test',
      },
      {
        name: 'test2',
        value: 'test2',
      },
    ]);

    formData.append('name', name);
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('type', type);
    formData.append('gender', gender);
    formData.append('sizes', formSizes);
    formData.append('color', ColorsString[color]);
    formData.append('status', status);
    formData.append('categoryId', formCategoryId._id);
    formData.append('category', category);
    formData.append('price', price.toString().replace('$', ''));
    formData.append('quantity', quantity);
    formData.append('test', test);

    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      setLoading(true);

      const result = await productService.createProduct(formData);

      console.log(result);
    } catch (error) {
      console.log({
        error,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetching categories
  useEffect(() => {
    (async () => {
      let result = await categoryService.getChildren();

      let arr = result.map((category) => {
        return category.category_name;
      });

      setCategoriesArr(arr);

      setFetchCategory(result);
    })();
  }, []);

  useImperativeHandle(ref, () => ({
    openModel: () => {
      console.log('open');
      overlayRef.current.removeAttribute('close');

      addProductContainerRef.current.removeAttribute('close');
      addProductContainerRef.current.setAttribute('open', '');
    },
  }));

  return (
    <Fragment>
      {loading && (
        <div className={cx('loading')}>
          <i className={cx('icon-loading')}>
            <FontAwesomeIcon icon={faArrowsSpin} spin />
          </i>
        </div>
      )}
      <div
        className={cx('overlay')}
        onClick={(e) => {
          addProductContainerRef.current.removeAttribute('open');
          addProductContainerRef.current.setAttribute('close', '');
        }}
        onMouseOver={(e) => {
          e.target.setAttribute('style', 'cursor: pointer');
        }}
        ref={overlayRef}
        close={!visible ? '' : null}
      >
        <div
          className={cx('add-product-container')}
          ref={addProductContainerRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseOver={(e) => {
            e.stopPropagation();
            overlayRef.current.removeAttribute('style');
          }}
          onAnimationEnd={() => {
            if (addProductContainerRef.current.getAttribute('open') !== '') {
              overlayRef.current.setAttribute('close', '');
            }
          }}
        >
          <i
            className={cx('icon-close-model')}
            onClick={() => {
              addProductContainerRef.current.removeAttribute('open');
              addProductContainerRef.current.setAttribute('close', '');
            }}
          >
            <FontAwesomeIcon icon={faAnglesRight} />
          </i>
          <span className={cx('overlay-heading-text')}>Add New</span>

          <div className={cx('inner-container')}>
            {/* Start::: left-block */}
            <div className={cx('left-block')}>
              <div className="row">
                <div className="col c-12">
                  <Input
                    name="product_name"
                    value={name}
                    onChange={(e) => {
                      if (e.target.value.length > 40) return;

                      setName(e.target.value);
                    }}
                    hint="Do not exceed 40 characters when entering the name."
                    big
                  >
                    Product Title
                  </Input>
                </div>
              </div>

              <div className="row mt16">
                <div className="col c-4">
                  <Input
                    name="product_quantity"
                    placeholder="quantity"
                    value={quantity}
                    type="number"
                    onChange={(e) => {
                      if (!regexOnlyNumber.test(e.target.value)) {
                        return;
                      }

                      setQuantity(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (!parseInt(e.target.value)) return;

                      setQuantity(parseInt(e.target.value));
                    }}
                  >
                    Quantity
                  </Input>
                </div>

                <div className="col c-4">
                  <Input hint="Code generated automatically" placeholder="#GCOWU-3412523" readOnly disabled>
                    Product Code
                  </Input>
                </div>

                <div className="col c-4">
                  <Input selectOptions={brandsArr} setValue={setBrand}>
                    Brand
                  </Input>
                </div>
                <div className="col c-4">
                  <Input selectOptions={categoriesArr} placeholder="Select category" setValue={setCategory}>
                    Category
                  </Input>
                </div>

                <div className="col c-4">
                  <Input selectOptions={typeArr} placeholder="Select type" setValue={setType}>
                    Product Type
                  </Input>
                </div>

                <div className="col c-4">
                  <Input selectOptions={genderArr} placeholder="Select type" setValue={setGender}>
                    Gender
                  </Input>
                </div>
              </div>

              <div className="row mt16">
                <div className="col c-6">
                  <Input colors={colorsArr} setValue={setColor}>
                    Colors Variant
                  </Input>
                </div>
                <div className="col c-6">
                  <Input sizes={sizesArr} setValue={setSizes}>
                    Sizes
                  </Input>
                </div>
              </div>

              <div className="row">
                <div className="col c-12">
                  <Input type={'file'} image setValue={setImages}>
                    Product Images
                  </Input>

                  <div className={cx('img-preview-container')}>
                    {images.map((image, index) => {
                      return (
                        <div className={cx('image-container')} key={index}>
                          <div style={{ backgroundColor: '#1c2e45', padding: '8px', borderRadius: '6px' }}>
                            <img key={index} src={URL.createObjectURL(image)} alt="" className={cx('input-images')} />
                          </div>
                          <i>
                            <FontAwesomeIcon icon={faCircleNotch} className={cx('order-img-icon')} />
                            <i className={cx('order-text')}>{index + 1}</i>
                          </i>
                          <p className={cx('file-name')}>{image.name}</p>
                          <p className={cx('file-size')}>
                            <strong>{(image.size / (1024 * 1024)).toFixed(3)}</strong> MB
                          </p>

                          <div className="text-center mt-12px">
                            <Button
                              hover
                              del
                              onClick={(e) => {
                                let newImages = images.filter((img, idx) => {
                                  return idx !== index;
                                });

                                setImages(newImages);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* <div className={cx('img-preview-container')}>
                      {showImage.map((image, index) => {
                        return (
                          <div className={cx('image-container')} key={index}>
                            <img
                              key={index}
                              src={`http://localhost:3001/images/${image.filename}`}
                              alt=""
                              className={cx('input-images')}
                            />
                          </div>
                        );
                      })}
                    </div> */}
                </div>
              </div>

              <div className="row">
                <div className="col c-12">
                  <Input
                    placeholder="Enter Description"
                    textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  >
                    Product Description
                  </Input>
                </div>
              </div>

              <div className="row">
                <div className="col c-4">
                  <Input
                    name="product_quantity"
                    placeholder="$0.00"
                    value={price}
                    onChange={(e) => {
                      if (!regexOnlyNumber.test(e.target.value)) {
                        return;
                      }

                      setPrice(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (!parseInt(e.target.value)) {
                        return;
                      }

                      setPrice('$' + parseInt(e.target.value).toFixed(2));
                    }}
                  >
                    Price
                  </Input>
                </div>

                <div className="col c-4">
                  <Input
                    type="number"
                    placeholder="0%"
                    value={discount}
                    onChange={(e) => {
                      if (!regexOnlyNumber.test(e.target.value)) {
                        return;
                      }

                      setDiscount(e.target.value);
                    }}
                    onBlur={(e) => {
                      let value = parseInt(e.target.value);
                      if (!value || value <= 0 || value >= 100) {
                        setDiscount(0);

                        return;
                      }
                    }}
                  >
                    Discounts
                  </Input>
                </div>

                <div className="col c-4">
                  <Input selectOptions={StatusArr} placeholder="Select status" setValue={setStatus} dropdownTop>
                    Status
                  </Input>
                </div>
              </div>

              <div className={cx('left-block-footer', 'mt-16px')}>
                <Button reset hover>
                  Reset
                </Button>
                <Button hover onClick={handleSubmit}>
                  Create Product
                </Button>

                <Button
                  hover
                  onClick={async () => {
                    const user = await accessService.login({
                      email: 'lov3rinve146@gmail.com',
                      password: 'string',
                    });

                    localStorage.setItem('token', user.data.accessToken);

                    console.log(localStorage.getItem('token'));
                  }}
                >
                  Login
                </Button>

                <Button hover onClick={async () => {}}>
                  Socket
                </Button>
              </div>
            </div>

            {/* Start::: right-block */}
            <div className={cx('right-block')}>
              <p className={cx('heading-text')}>Product Card Preview</p>

              <div className={cx('img-block')}>
                <img src="https://themesdesign.in/tailwick/html-dark/assets/images/img-03.png" alt="" />
              </div>

              <p className={cx('sell-price')}>
                $145.99 <span className={cx('sale-price')}>299.99</span>
              </p>

              <p className={cx('name-text')}>Fast colors Typography Men</p>

              <p className={cx('category-text')}>Men's Fashion</p>

              <div className={cx('colors')}>
                <p className={cx('variant-text')}>Colors</p>

                <div className={cx('color-container')}>
                  <div className={cx('color-block')}>
                    <input className={cx('select-color', 'color-1')} name="right-" type="checkbox" />
                  </div>

                  <div className={cx('color-block')}>
                    <input className={cx('select-color', 'color-2')} name="right-" type="checkbox" />
                  </div>

                  <div className={cx('color-block')}>
                    <input className={cx('select-color', 'color-3')} name="right-" type="checkbox" />
                  </div>

                  <div className={cx('color-block')}>
                    <input className={cx('select-color', 'color-4')} name="right-" type="checkbox" />
                  </div>
                </div>
              </div>

              <div className={cx('sizes')}>
                <p className={cx('variant-text', 'mb-12px')}>Sizes</p>

                <span
                  className={cx('select-size', {
                    active: true,
                  })}
                >
                  XS
                </span>
                <span className={cx('select-size')}>S</span>
                <span className={cx('select-size')}>M</span>
                <span className={cx('select-size')}>L</span>
                <span className={cx('select-size')}>XL</span>
                <span className={cx('select-size')}>2XL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default forwardRef(SideModel);
