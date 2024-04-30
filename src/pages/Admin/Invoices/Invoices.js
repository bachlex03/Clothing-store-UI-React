import { Fragment, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames/bind';

import style from './Invoices.module.scss';

import { Search } from '~/components/adminComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Invoices() {
  return (
    <div className={cx('container')}>
      <p className={cx('heading-text')}>List view</p>

      <div>
        <div className="row">
          <div className="col l-3">
            <div className={cx('left-container')}>
              <div>
                <p className={cx('left-heading-text')}>Invoice List</p>
                <div className={cx('search-wrapper', 'flex items-center justify-between')}>
                  <Search />
                  <i className={cx('filter-icon')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      data-lucide="sliders-horizontal"
                      class="lucide lucide-sliders-horizontal size-4"
                    >
                      <line x1="21" x2="14" y1="4" y2="4"></line>
                      <line x1="10" x2="3" y1="4" y2="4"></line>
                      <line x1="21" x2="12" y1="12" y2="12"></line>
                      <line x1="8" x2="3" y1="12" y2="12"></line>
                      <line x1="21" x2="16" y1="20" y2="20"></line>
                      <line x1="12" x2="3" y1="20" y2="20"></line>
                      <line x1="14" x2="14" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="10" y2="14"></line>
                      <line x1="16" x2="16" y1="18" y2="22"></line>
                    </svg>
                  </i>
                </div>
                <div className={cx('list')}>
                  <div className={cx('item')}>
                    <div className={cx('item-heading')}>
                      <p className={cx('item-code')}>#TW15090251</p>
                      <span className={cx('item-status')}>Paid</span>
                    </div>

                    <p className={cx('item-customer')}>Paula Keenan</p>
                    <div className={cx('item-footer')}>
                      <p className={cx('item-price')}>$873.96</p>
                      <span className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          color="#92afd3"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          data-lucide="calendar-clock"
                          class="lucide lucide-calendar-clock inline-block size-4 ltr:mr-1 rtl:ml-1"
                        >
                          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path>
                          <path d="M16 2v4"></path>
                          <path d="M8 2v4"></path>
                          <path d="M3 10h5"></path>
                          <path d="M17.5 17.5 16 16.25V14"></path>
                          <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                        </svg>
                        <p className={cx('item-date', 'ml-4px')}>21 Jan, 2024</p>
                      </span>
                    </div>
                  </div>

                  <div className={cx('item')}>
                    <div className={cx('item-heading')}>
                      <p className={cx('item-code')}>#TW15090251</p>
                      <span className={cx('item-status')}>Paid</span>
                    </div>

                    <p className={cx('item-customer')}>Paula Keenan</p>
                    <div className={cx('item-footer')}>
                      <p className={cx('item-price')}>$873.96</p>
                      <span className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          color="#92afd3"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          data-lucide="calendar-clock"
                          class="lucide lucide-calendar-clock inline-block size-4 ltr:mr-1 rtl:ml-1"
                        >
                          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path>
                          <path d="M16 2v4"></path>
                          <path d="M8 2v4"></path>
                          <path d="M3 10h5"></path>
                          <path d="M17.5 17.5 16 16.25V14"></path>
                          <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                        </svg>
                        <p className={cx('item-date', 'ml-4px')}>21 Jan, 2024</p>
                      </span>
                    </div>
                  </div>

                  <div className={cx('item')}>
                    <div className={cx('item-heading')}>
                      <p className={cx('item-code')}>#TW15090251</p>
                      <span className={cx('item-status')}>Paid</span>
                    </div>

                    <p className={cx('item-customer')}>Paula Keenan</p>
                    <div className={cx('item-footer')}>
                      <p className={cx('item-price')}>$873.96</p>
                      <span className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          color="#92afd3"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          data-lucide="calendar-clock"
                          class="lucide lucide-calendar-clock inline-block size-4 ltr:mr-1 rtl:ml-1"
                        >
                          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path>
                          <path d="M16 2v4"></path>
                          <path d="M8 2v4"></path>
                          <path d="M3 10h5"></path>
                          <path d="M17.5 17.5 16 16.25V14"></path>
                          <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                        </svg>
                        <p className={cx('item-date', 'ml-4px')}>21 Jan, 2024</p>
                      </span>
                    </div>
                  </div>

                  <div className={cx('item')}>
                    <div className={cx('item-heading')}>
                      <p className={cx('item-code')}>#TW15090251</p>
                      <span className={cx('item-status')}>Paid</span>
                    </div>

                    <p className={cx('item-customer')}>Paula Keenan</p>
                    <div className={cx('item-footer')}>
                      <p className={cx('item-price')}>$873.96</p>
                      <span className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          color="#92afd3"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          data-lucide="calendar-clock"
                          class="lucide lucide-calendar-clock inline-block size-4 ltr:mr-1 rtl:ml-1"
                        >
                          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path>
                          <path d="M16 2v4"></path>
                          <path d="M8 2v4"></path>
                          <path d="M3 10h5"></path>
                          <path d="M17.5 17.5 16 16.25V14"></path>
                          <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                        </svg>
                        <p className={cx('item-date', 'ml-4px')}>21 Jan, 2024</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col l-9">
            <div className={cx('right-container')}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoices;
