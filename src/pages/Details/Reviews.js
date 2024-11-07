import React, { useState, useEffect, useCallback } from 'react';
import style from './Reviews.module.scss';
import classNames from 'classnames/bind';
import Rating from 'react-rating';
import { RiStarLine, RiStarSFill } from 'react-icons/ri';
import Pagination from './Pagination/Pagination';
import { getProductReviews } from '~/services/api/productService';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(style);

function Reviews() {
  const { slug } = useParams();
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1
  });

  const loadReviews = useCallback(async (page, limit = 3) => {
    try {
      const response = await getProductReviews(slug, { page, limit });
      setReviews(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  }, [slug]);

  useEffect(() => {
    loadReviews(1);
  }, [loadReviews]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handlePageChange = (newPage) => {
    loadReviews(newPage);
  };

  return (
    <>
      <div className={cx('reviews')}>
        <div className={cx('title-review')}>
          <span>{pagination.total} reviews for this product</span>
        </div>
        <ol className={cx('reviewlist')}>
          {reviews.map((review) => (
            <div key={review.review_id} className={cx('review-container')}>
              <div className={cx('avatar')}>
                <img
                  src={review.review_user.image_url || "https://demo.cmssuperheroes.com/themeforest/chani/wp-content/uploads/avatar-1.jpg"}
                  alt="avatar"
                />
              </div>
              <div className={cx('review-content')}>
                <Rating
                  start={0}
                  stop={5}
                  fractions={10}
                  initialRating={review.review_rating}
                  readonly={true}
                  emptySymbol={<RiStarLine size={20} />}
                  fullSymbol={<RiStarSFill size={20} />}
                />
                <div className={cx('heading-review')}>
                  <div className={cx('user-review')}>{review.review_user.display_name}</div>
                  <div className={cx('seperator')}></div>
                  <div className={cx('date-review')}>
                    {formatDate(review.review_date)}
                  </div>
                </div>
                <div className={cx('text-review')}>
                  <p>{review.review_content}</p>
                </div>
              </div>
            </div>
          ))}
        </ol>
      </div>
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
      <div className={cx('review-form-container')}>
        <div className={cx('review-form')}>
          <div className={cx('review-reply-title')}>Add A Review</div>
          <p className={cx('review-note')}>Your email address will not be published.</p>
          <form>
            <div className={cx('rating-area')}>
              <div>Your rating *</div>
              <Rating
                start={0}
                stop={5}
                emptySymbol={<RiStarLine size={20} />}
                fullSymbol={<RiStarSFill size={20} />}
              />
            </div>
            <div className={cx('content-area')}>
              <textarea
                id="comment"
                name="comment"
                cols="45"
                rows="8"
                maxlength="65525"
                required=""
                placeholder="Your Review *"
              ></textarea>
            </div>
            <div className={cx('name-email-area')}>
              <div className={cx('column')}>
                <input
                  type="text"
                  size="30"
                  maxlength="245"
                  autocomplete="name"
                  required=""
                  placeholder="Your Name *"
                />
              </div>
              <div className={cx('column')}>
                <input
                  type="email"
                  size="30"
                  maxlength="100"
                  autocomplete="email"
                  required=""
                  placeholder="Your Email *"
                />
              </div>
            </div>
            <div className={cx('submit-area')}>
              <button className={cx('submit-button')}>SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Reviews;
