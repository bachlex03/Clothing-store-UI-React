import style from './SideModel.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { Button, Input } from '~/components/adminComponents';
import { Colors } from '~/common/constants';
import * as productService from '~/services/api/productService';
import * as accessService from '~/services/api/accessService';

const regexOnlyNumber = /^[0-9.]*$/;

const colorsArr = [Colors.BROWN, Colors.GREY, Colors.YELLOW, Colors.WHITE, Colors.PINK, Colors.RED];

const cx = classNames.bind(style);

function SideModel() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [showImage, setShowImage] = useState([]);

  const handleSubmit = async (e) => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('size', 'S');
    formData.append('color', 'Red');
    formData.append('price', price.replace('$', ''));
    formData.append('quantity', quantity);

    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      const result = await productService.createProduct(formData);

      console.log(result);
    } catch (error) {
      console.log({
        error,
      });
    }
  };

  return (
    <div className={cx('overlay')}>
      <div className={cx('add-product-container')}>
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
                <Input hint="Code generated automatically" readOnly>
                  Product Code
                </Input>
              </div>

              <div className="col c-4">
                <Input selectOptions={['Gucci', 'Louis Vuitton', 'Chanel', 'Dior', 'Prada']} setValue={setCategory}>
                  Brand
                </Input>
              </div>
              <div className="col c-4">
                <Input
                  selectOptions={['Outerwear', 'Dresses', 'T-Shirts', 'Blouses', 'Knitwear', 'Pant']}
                  placeholder="Select category"
                  setValue={setCategory}
                >
                  Category
                </Input>
              </div>

              <div className="col c-4">
                <Input selectOptions={['Clothe', 'Trousers', 'Shoes']} placeholder="Select type" setValue={setCategory}>
                  Product Type
                </Input>
              </div>

              <div className="col c-4">
                <Input selectOptions={['Man', 'Woman', 'Unisex']} placeholder="Select type" setValue={setCategory}>
                  Gender
                </Input>
              </div>
            </div>

            <div className="row mt16">
              <div className="col c-6">
                <Input colors={colorsArr}>Colors Variant</Input>
              </div>
              <div className="col c-6">
                <Input sizes={['S', 'M', 'L', 'XL', '2XL']}>Sizes</Input>
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
                        <img key={index} src={URL.createObjectURL(image)} alt="" className={cx('input-images')} />
                        <i>
                          <FontAwesomeIcon icon={faCircleNotch} className={cx('order-img-icon')} />
                          <i className={cx('order-text')}>{index + 1}</i>
                        </i>
                      </div>
                    );
                  })}
                </div>

                <div className={cx('img-preview-container')}>
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
                </div>
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
                <Input
                  selectOptions={['Draft', 'Published', 'Scheduled', 'Out of Stock']}
                  placeholder="Select status"
                  setValue={setCategory}
                  dropdownTop
                >
                  Status
                </Input>
              </div>
            </div>

            <div className={cx('left-block-footer', 'mt16')}>
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
  );
}

export default SideModel;
