import React from 'react';
import style from './Pagination.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Pagination({ currentPage, totalPages, onPageChange }) {

  const renderPageNumbers = () => {
    const pages = [];

    // Luôn hiển thị trang đầu
    if (currentPage > 2) {
      pages.push(
        <button
          key={1}
          type="button"
          className={cx('page')}
          onClick={() => onPageChange(1)}
        >
          01
        </button>
      );
      if (currentPage > 3) {
        pages.push(<span key="dots1" className={cx('dots')}>...</span>);
      }
    }

    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pages.push(
        <button
          key={i}
          type="button"
          className={cx('page', { active: i === currentPage })}
          onClick={() => onPageChange(i)}
        >
          {i.toString().padStart(2, '0')}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pages.push(<span key="dots2" className={cx('dots')}>...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          type="button"
          className={cx('page')}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages.toString().padStart(2, '0')}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav className={cx('pagination')} aria-label="Pagination">
      {currentPage > 1 && (
        <button
          type="button"
          className={cx('arrow', 'prev')}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt;
        </button>
      )}
      <div className={cx('pages')}>
        {renderPageNumbers()}
      </div>
      {currentPage < totalPages && (
        <button
          type="button"
          className={cx('arrow', 'next')}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &gt;
        </button>
      )}
    </nav>
  );
}

export default Pagination;
