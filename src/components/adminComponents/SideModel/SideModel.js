import style from './SideModel.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faAnglesRight, faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState, forwardRef, useImperativeHandle, Fragment } from 'react';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { AxiosError } from 'axios';

import { Button, Input } from '~/components/adminComponents';
import { ColorsHash, ColorsString } from '~/common/constants';
import * as productService from '~/services/api/productService';
import * as accessService from '~/services/api/accessService';
import * as categoryService from '~/services/api/categoryService';
import { renderCategories } from '~/utils/render-category';

const regexOnlyNumber = /^[0-9.]*$/;

const colorsArr = [ColorsHash.BROWN, ColorsHash.GREY, ColorsHash.YELLOW, ColorsHash.PINK, ColorsHash.RED];

const sizesArr = ['S', 'M', 'L', 'XL', '2XL'];
const brandsArr = ['Gucci', 'Louis Vuitton', 'Chanel', 'Dior', 'Prada'];
const typeArr = ['Clothe', 'Trousers', 'Shoes'];
const genderArr = ['Man', 'Woman', 'Unisex'];
const StatusArr = ['Draft', 'Published', 'Scheduled'];

const cx = classNames.bind(style);

function SideModel(props, ref) {
  const overlayRef = useRef(null);
  const addProductContainerRef = useRef(null);
  const [rightImg, setRightImg] = useState('https://themesdesign.in/tailwick/html-dark/assets/images/img-03.png');

  const [visible, setVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);

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
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [showImage, setShowImage] = useState([]);

  const [categoriesArr, setCategoriesArr] = useState([
    {
      name: 'Demo',
      slug: 'demo',
      children: [
        {
          name: 'Demo child',
          slug: 'demo-child',
          children: null,
        },
      ],
    },
  ]);
  const [fetchCategory, setFetchCategory] = useState([]);

  const handleSubmit = async () => {
    const formData = new FormData();

    let formSizes = sizes.map((size) => {
      return size.size;
    });

    let categoryData = fetchCategory.find((cate) => {
      return cate.category_name === category;
    });

    console.log('data', {
      name,
      description,
      brand,
      type,
      gender,
      formSizes,
      'ColorsString[color]': ColorsString[color],
      status,
      categoryData,
      category,
      price,
      quantity,
    });
    console.log('formData 1', formData);

    formData.append('name', name);
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('type', type);
    formData.append('gender', gender);
    formData.append('sizes', formSizes);
    formData.append('color', ColorsString[color]);
    formData.append('status', status);
    formData.append('categoryId', categoryData._id);
    formData.append('category', category);
    formData.append('price', price.toString().replace('$', ''));
    formData.append('quantity', quantity);
    formData.append('test', test);

    console.log('formData 2', formData);

    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    return await productService.createProduct(formData);
  };

  const createProductApi = useMutation({
    mutationFn: async () => {
      setLoading(true);

      return await handleSubmit();
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: 'Create successfully',
      });

      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }

      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
  });

  const fetchingCategories = useMutation({
    mutationFn: async () => {
      setLoading(true);

      return await categoryService.getCategories();
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: 'All categories have been fetched successfully',
      });

      setFetchCategory(data);

      setCategoriesArr(renderCategories(data));

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    },
  });

  useEffect(() => {
    console.log('images', images);
    if (images.length) {
      setRightImg(URL.createObjectURL(images[0]));
    } else {
      setRightImg('https://themesdesign.in/tailwick/html-dark/assets/images/img-03.png');
    }
  }, [images]);

  // Fetching categories
  useEffect(() => {
    fetchingCategories.mutate();
  }, []);

  useImperativeHandle(ref, () => ({
    openModel: () => {
      console.log('open');
      overlayRef.current.removeAttribute('close');

      addProductContainerRef.current.removeAttribute('close');
      addProductContainerRef.current.setAttribute('open', '');
    },
  }));

  const handleShowSalePrice = (price, discount) => {
    if (price && discount) {
      let priceArr = price.split('$');

      let newPrice = parseInt(priceArr[1]);

      let discountPrice = (newPrice * discount) / 100;

      return '$' + (newPrice - discountPrice).toFixed(2);
    }
  };

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

              <div className="row mt-20px">
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
                  <Input selectOptions={brandsArr} setValue={setBrand} reset={reset} setReset={setReset}>
                    Brand
                  </Input>
                </div>

                <div className="col c-4 mt-20px">
                  <Input
                    selectOptions={categoriesArr}
                    hasChild
                    placeholder="Select category"
                    setValue={setCategory}
                    reset={reset}
                    setReset={setReset}
                  >
                    Category
                  </Input>
                </div>

                <div className="col c-4 mt-20px">
                  <Input
                    selectOptions={typeArr}
                    placeholder="Select type"
                    setValue={setType}
                    reset={reset}
                    setReset={setReset}
                  >
                    Product Type
                  </Input>
                </div>

                <div className="col c-4 mt-20px">
                  <Input
                    selectOptions={genderArr}
                    placeholder="Select type"
                    setValue={setGender}
                    reset={reset}
                    setReset={setReset}
                  >
                    Gender
                  </Input>
                </div>
              </div>

              <div className="row mt-20px">
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

              {/* product_images */}
              <div className="row ">
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
                </div>
              </div>

              <div className="row mt-20px">
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

              {/* product_quantity */}
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
                  <Input
                    selectOptions={StatusArr}
                    placeholder="Select status"
                    setValue={setStatus}
                    dropdownTop
                    reset={reset}
                    setReset={setReset}
                  >
                    Status
                  </Input>
                </div>
              </div>

              <div className={cx('left-block-footer', 'mt-16px')}>
                {/* <Button
                  reset
                  hover
                  onClick={() => {
                    setName('');
                    setDescription('');
                    setBrand('');
                    setType('');
                    setGender('');
                    setQuantity(0);
                    setSizes([]);
                    setColor('');
                    setStatus('');
                    setPrice('');
                    setDiscount();
                    setCategory('');
                    setImages([]);

                    setReset(!reset);
                  }}
                >
                  Reset
                </Button> */}
                {/* <Button
                  hover
                  onClick={() => {
                    createProductApi.mutate();

                    console.log('createProductApi', createProductApi);
                  }}
                  active
                >
                  Create Product
                </Button> */}

                <button
                  onClick={() => {
                    createProductApi.mutate();
                  }}
                >
                  Create Product
                </button>

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

                <Button
                  hover
                  onClick={async () => {
                    toast.success('Event has been created', {
                      description: 'Monday, January 3rd at 6:00pm',
                    });
                  }}
                >
                  Socket
                </Button>
              </div>
            </div>

            {/* Start::: right-block */}
            <div className={cx('right-block')}>
              <p className={cx('heading-text')}>Product Card Preview</p>

              <div className={cx('img-block')}>
                <div className={cx('img-wrapper')}>
                  <img src={rightImg} alt="" />
                </div>
              </div>

              {discount ? (
                <p className={cx('sell-price')}>
                  {price ? handleShowSalePrice(price, discount) : '$100.99'}{' '}
                  {discount ? <span className={cx('sale-price')}>{price}</span> : ''}
                </p>
              ) : (
                <p className={cx('sell-price')}>{price ? price : '$200.99'}</p>
              )}

              <p className={cx('name-text')}>{name ? name : 'Default Product Name'}</p>

              <p className={cx('category-text')}>{description ? description : "Woman's Fashion"}</p>

              <div className={cx('colors')}>
                <p className={cx('variant-text')}>Colors</p>

                {console.log('color', color)}
                <div className={cx('color-container')}>
                  {colorsArr.map((hashColor, index) => {
                    return (
                      <input
                        key={index}
                        data-key={index}
                        type="checkbox"
                        className={cx('colors-right-block', {
                          active: color === hashColor ? true : false,
                        })}
                        style={{ backgroundColor: hashColor }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className={cx('sizes')}>
                <p className={cx('variant-text', 'mb-12px')}>Sizes</p>

                {sizesArr.map((size, index) => {
                  return (
                    <span
                      key={index}
                      className={cx('select-size', {
                        active: sizes.length
                          ? sizes.some((activeSize) => activeSize.index === index)
                            ? true
                            : false
                          : false,
                      })}
                    >
                      {size}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default forwardRef(SideModel);
