import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import {
  faAngleLeft,
  faAngleRight,
  faEdit,
  faEye,
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import { Button, Input } from '~/components/adminComponents';

const cx = classNames.bind(styles);
const regexOnlyNumber = /^[0-9.]*$/;

function Dashboard() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState('$0.00');
  const [categories, setCategories] = useState([]);
  const [valueCategory, setValueCategory] = useState('');

  return (
    <div className={cx('container', 'h-screen')} style={{ backgroundColor: '#0f1824', width: '' }}>
      <p className={cx('heading-text')}>List view</p>
      <div className={cx('table-container')}>
        <div className={cx('header-table', 'flex justify-between items-center')}>
          <div className={cx('search')}>
            <span className={cx('search-icon')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>

            <input className={cx('search-input', 'py-8px pl-32px pr-16px')} type="text" placeholder="Search for ..." />
          </div>

          <div className={cx('btn-comp')}>
            <Button hover>
              <FontAwesomeIcon icon={faPlus} /> Add Product
            </Button>
          </div>
        </div>

        <table className={cx('product-table')}>
          <thead>
            <tr>
              <th className="code">Product Code</th>
              <th className="name">Product Name</th>
              <th className="category">Category</th>
              <th className="price">Price</th>
              <th className="stock">Stock</th>
              <th className="status">Status</th>
              <th className="action">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="code">#TAD-232100071</td>
              <td className="name">Smartest Printed T-shirt</td>
              <td className="category">
                <span className={cx('box')}>Fashion</span>
              </td>
              <td className="price">$79.99</td>
              <td className="stock">500</td>
              <td className="status">
                <span className={cx('box', 'inactive')}>Fashion</span>
              </td>
              <td className="action">
                <span className={cx('actions')}>
                  <FontAwesomeIcon className={cx('edit')} icon={faEye} />
                </span>
                <span className={cx('actions')}>
                  <FontAwesomeIcon className={cx('edit')} icon={faEdit} />
                </span>
                <span className={cx('actions')}>
                  <FontAwesomeIcon className={cx('delete')} icon={faTrash} />
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div className={cx('flex justify-between items-center mt-8')}>
          <span className={cx('showing')}>
            Showing <strong>7</strong> of <strong>11</strong> Results
          </span>

          <div className={cx('flex justify-center items-center')}>
            <div className={cx('paging', 'prev')}>
              <FontAwesomeIcon icon={faAngleLeft} /> Prev
            </div>
            <div className={cx('paging', 'active')}>1</div>
            <div className={cx('paging')}>2</div>
            <div className={cx('paging', 'next')}>
              Next <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </div>
        </div>
      </div>

      <div className={cx('footer')}>
        <div className="flex justify-between">
          <div className={cx('footer-left')}>@tailwindcss</div>

          <div className={cx('footer-right')}>Design & Develop by Group 1</div>
        </div>
      </div>

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
                  {/* <Input
                    name="product_quantity"
                    placeholder="$00.00"
                    value={price}
                    onChange={handlePrice}
                    onBlur={handlePriceInputOnBlur}
                  >
                    Price
                  </Input> */}

                  <Input
                    name="product_quantity"
                    placeholder="quantity"
                    value={quantity}
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
                  <Input hint="Code will be generated automatically" readOnly>
                    Product Code
                  </Input>
                </div>

                <div className="col c-4">
                  <Input selectOptions={['Gucci', 'LV', 'Chanel', 'Dior', 'Prada']} setValue={setValueCategory}>
                    Brand
                  </Input>
                </div>

                <div className="col c-4">
                  <Input
                    selectOptions={['Outerwear', 'Dresses', 'T-Shirts', 'Blouses', 'Knitwear', 'Pant']}
                    placeholder="Select category"
                    setValue={setValueCategory}
                  >
                    Category
                  </Input>
                </div>

                <div className="col c-4">
                  <Input
                    selectOptions={['Clothe', 'Trousers', 'Shoes']}
                    placeholder="Select type"
                    setValue={setValueCategory}
                  >
                    Product Type
                  </Input>
                </div>

                <div className="col c-4">
                  <Input
                    selectOptions={['Man', 'Woman', 'Unisex']}
                    placeholder="Select type"
                    setValue={setValueCategory}
                  >
                    Gender
                  </Input>
                </div>
              </div>

              {/* <div className="row mt16">
                <div className="col c-6">
                  <Input
                    colors={[
                      '#0ca5e9',
                      '#f97315',
                      '#259782',
                      '#a855f7',
                      '#ebb305',
                      '#ef4444',
                      '#64758b',
                      '#0f172a',
                      '#e2e8f0',
                    ]}
                  >
                    Colors Variant
                  </Input>
                </div>
                <div className="col c-6">
                  <Input sizes={['XS', 'S', 'M', 'L', 'XL', '2XL']}>Sizes</Input>
                </div>
              </div>

              <div className="row">
                <div className="col c-12">
                  <Input image>Product Images</Input>
                </div>
              </div>

              <div className="row">
                <div className="col c-12">
                  <Input placeholder="Enter Description" textarea>
                    Product Description
                  </Input>
                </div>
              </div>

              <div className="row">
                <div className="col c-4">
                  <Input type="number" placeholder="$00.00">
                    Price
                  </Input>
                </div>

                <div className="col c-4">
                  <Input type="number" placeholder="0%">
                    Discounts
                  </Input>
                </div>

                <div className="col c-4">
                  <Input type="number" placeholder="0%">
                    TAX Applicable
                  </Input>
                </div>

                <div className="col c-4">
                  <Input>Publish Date & Time</Input>
                </div>

                <div className="col c-4">
                  <Input>Status</Input>
                </div>

                <div className="col c-4">
                  <Input selectOptions={['Publish', 'Hidden']}>Visibility</Input>
                </div>
              </div>

              <div className={cx('left-block-footer', 'mt16')}>
                <Button reset hover>
                  Reset
                </Button>
                <Button hover>Create Product</Button>
              </div> */}
            </div>

            {/* Start::: right-block */}
            {/* <div image className={cx('right-block')}>
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
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
