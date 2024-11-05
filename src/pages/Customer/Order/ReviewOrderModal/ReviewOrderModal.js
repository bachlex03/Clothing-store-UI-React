import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/DetailInvoiceModal/Modal/Modal';
import style from './ReviewOrderModal.module.scss';
import classNames from 'classnames/bind';
import * as accountService from '~/services/api/accountService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

const Star = ({ filled, onClick }) => (
  <span
    onClick={onClick}
    className={cx('star', { filled })}
  >
    ★
  </span>
);

function ReviewOrderModal({ isOpen, onClose, orderId }) {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && orderId) {
      fetchReviewData();
    } else {
      setEditingId(null);
    }
  }, [isOpen, orderId]);

  const fetchReviewData = async () => {
    try {
      setLoading(true);
      const response = await accountService.getInvoiceReviews(orderId);
      if (response.status === 200) {
        const fetchedProducts = response.data.invoice_products;
        setProducts(fetchedProducts);
        setReviews(fetchedProducts.map(product => ({
          id: product._id,
          review_id: product.product_review?.review_id || null,
          rating: product.product_review?.review_rating || 0,
          comment: product.product_review?.review_content || '',
          date: product.product_review?.review_date || null,
          user: product.product_review?.review_user || ''
        })));
      } else {
        console.error('Failed to fetch reviews:', response.message);
      }
    } catch (error) {
      console.error('Error fetching review data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (productId, rating) => {
    setReviews(reviews.map(review =>
      review.id === productId ? { ...review, rating } : review
    ));
    setShowWarning(false);
  };

  const handleCommentChange = (productId, comment) => {
    setReviews(reviews.map(review =>
      review.id === productId ? { ...review, comment } : review
    ));
    setShowWarning(false);
  };

  const handleSave = async (productId) => {
    const review = reviews.find(r => r.id === productId);
    if (!review) return;

    try {
      if (review.review_id) {
        const response = await accountService.updateProductReview({
          review_id: review.review_id,
          review_rating: review.rating,
          review_content: review.comment
        });

        if (response.status === 200) {
          setEditingId(null);
        } else {
          console.error('Failed to update review:', response.message);
        }
      } else {
        const response = await accountService.createProductReview({
          order_id: orderId,
          product_id: productId,
          review_date: new Date().toISOString(),
          review_rating: review.rating,
          review_content: review.comment
        });

        if (response.status === 200) {
          setEditingId(null);
          fetchReviewData();
        } else {
          console.error('Failed to create review:', response.message);
        }
      }
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  const handleEdit = (productId) => {
    setEditingId(productId);
  };

  const handleSubmitAll = async (e) => {
    e.preventDefault();
    if (!areAllReviewsComplete) {
      setShowWarning(true);
      return;
    }

    try {
      for (const review of reviews) {
        if (!review.date) {
          const response = await accountService.createProductReview({
            order_id: orderId,
            product_id: review.id,
            review_date: new Date().toISOString(),
            review_rating: review.rating,
            review_content: review.comment
          });

          if (response.status !== 200) {
            console.error('Failed to submit review:', response.message);
            return;
          }
        }
      }
      fetchReviewData();
    } catch (error) {
      console.error('Error submitting reviews:', error);
    }
  };

  const handleCloseModal = () => {
    setEditingId(null);
    onClose();
  };

  const isAnyReviewSubmitted = reviews.some(review => review.date !== null);
  const areAllReviewsComplete = reviews.every(review => review.rating > 0);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>
        <h3 className={cx('heading')}>Order Review</h3>
      </Modal.Header>
      <Modal.Body>
        <div className={cx('content')}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmitAll} className={cx('review-form')}>
              {products.map((product, index) => {
                const review = reviews.find(r => r.id === product._id) || { rating: 0, comment: '', date: null, user: '' };
                const isLastElement = index === products.length - 1;
                return (
                  <div key={product._id} className={cx('product-review')} style={isLastElement ? { borderBottom: 'none' } : undefined}>
                    <div className={cx('product-info')}>
                      <img src={product.product_image} alt={product.product_name} className={cx('product-image')} />
                      <div className={cx('product-details')}>
                        <h3>{product.product_name}</h3>
                        <p>Product Type: {product.product_category_name} | {product.product_color[0]} | {product.product_size[0]}</p>
                      </div>
                      {review.date && editingId !== product._id && (
                        <button onClick={() => handleEdit(product._id)} className={cx('edit-button')}>
                          Edit
                        </button>
                      )}
                    </div>
                    {(editingId === product._id || !review.date) && (
                      <div>
                        <div className={cx('rating')}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              filled={review.rating >= star}
                              onClick={() => handleRatingChange(product._id, star)}
                            />
                          ))}
                        </div>
                        <textarea
                          value={review.comment}
                          onChange={(e) => handleCommentChange(product._id, e.target.value)}
                          placeholder="Enter your review (optional)..."
                          className={cx('comment-input')}
                        />
                        {review.date && (
                          <div className={cx('button-group')}>
                            <button onClick={() => handleSave(product._id)} className={cx('save-button')}>
                              Save Changes
                            </button>
                            <button onClick={() => setEditingId(null)} className={cx('cancel-button')}>
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {review.date && editingId !== product._id && (
                      <div className={cx('saved-review')}>
                        <div className={cx('user-info')}>
                          <div className={cx('user-avatar')}>
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                          <div>
                            <p className={cx('user-name')}>{review.user.toUpperCase()}</p>
                            <div className={cx('rating')}>
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star key={star} filled={review.rating >= star} />
                              ))}
                            </div>
                          </div>
                          <p className={cx('review-date')}>{new Date(review.date).toLocaleString('en-US')}</p>
                        </div>
                        {review.comment && <p className={cx('review-comment')}>{review.comment}</p>}
                        <div className={cx('seller-response')}>
                          <h4>Seller's Response</h4>
                          <p>
                            Thank you for trusting and choosing to shop with us. Please visit our shop regularly to
                            experience the best products and services. If you have any issues or concerns,
                            please message us right away for quick support and resolution. We always hope
                            to continue accompanying you in the future.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {!isAnyReviewSubmitted && (
                <div className={cx('submit-section')}>
                  <button
                    type="submit"
                    className={cx('submit-button', { 'disabled': !areAllReviewsComplete })}
                  >
                    Submit All Reviews
                  </button>
                  {showWarning && !areAllReviewsComplete && (
                    <p className={cx('warning-message')}>Please rate all products before submitting.</p>
                  )}
                </div>
              )}
            </form>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={cx('footer')}>
          <p>Thank you for reviewing our products!</p>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewOrderModal;
