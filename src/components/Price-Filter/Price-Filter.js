import style from './Price-Filter.module.scss';
import classNames from 'classnames/bind';
import { useState, useRef } from 'react';

import { Button } from '~/components';

const cx = classNames.bind(style);

const maxPrice = 1000;

function PriceFilter() {
  const [leftPrice, setLeftPrice] = useState(0);
  const [rightPrice, setRightPrice] = useState(1000);
  const leftRef = useRef();
  const rightRef = useRef();
  const wrapperRef = useRef();

  let isDraggingLeft = false;
  let isDraggingRight = false;

  const handleMouseMove = (e) => {
    let wrapperWidth = wrapperRef.current.getBoundingClientRect().width;

    if (isDraggingLeft) {
      const newLeft = e.clientX - wrapperRef.current.getBoundingClientRect().left;

      leftRef.current.style.left = `${Math.max(0, Math.min(newLeft, rightRef.current.offsetLeft - 10))}px`;

      let percentage = Math.floor((newLeft / wrapperWidth) * 100);

      if (maxPrice * (percentage / 100) >= 0 && maxPrice * (percentage / 100) <= 900) {
        setLeftPrice(maxPrice * (percentage / 100));
      }
    }

    if (isDraggingRight) {
      const newRight = e.clientX - wrapperRef.current.getBoundingClientRect().left;

      rightRef.current.style.left = `${Math.max(
        leftRef.current.offsetLeft + 10,
        Math.min(newRight, wrapperRef.current.offsetWidth - 10),
      )}px`;

      let percentage = Math.floor((newRight / wrapperWidth) * 100);

      console.log(percentage);

      if (maxPrice * (percentage / 100) >= 100 && maxPrice * (percentage / 100) <= 1000) {
        setRightPrice(maxPrice * (percentage / 100));
      }
    }
  };

  const handleLeft = (e) => {
    isDraggingLeft = true;
    document.addEventListener('mousemove', handleMouseMove);

    document.addEventListener('mouseup', () => {
      isDraggingLeft = false;
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  const handleRight = (e) => {
    isDraggingRight = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      isDraggingRight = false;
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  return (
    <>
      <div className={cx('wrapper')} ref={wrapperRef}>
        <span className={cx('left')} onMouseDown={handleLeft} ref={leftRef}></span>
        <span className={cx('right')} onMouseDown={handleRight} ref={rightRef}></span>
      </div>
      <div className="flex align-center justify-between mt-20">
        <div className="mr-20">
          <Button small bold hover>
            FILTER
          </Button>
        </div>
        <div className={cx('price-range')}>
          <span className={cx('left-price')}>$ {leftPrice}.00</span>
          &nbsp;-&nbsp;
          <span className={cx('right-price')}>$ {rightPrice}.00</span>
        </div>
      </div>
    </>
  );
}

export default PriceFilter;
