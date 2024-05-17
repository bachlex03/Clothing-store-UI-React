import React, { useState } from 'react';
import style from './Reviews.module.scss';
import classNames from 'classnames/bind';
import Rating from 'react-rating';
import { RiStarLine, RiStarSFill } from 'react-icons/ri';

const cx = classNames.bind(style);

function Reviews() {
  return (
    <>
      <div className={cx('reviews')}>
        <div className={cx('title-review')}>
          <span>1 review for Sunflower Jumpsuit</span>
        </div>
        <ol className={cx('reviewlist')}>
          <div className={cx('review-container')}>
            <div className={cx('avatar')}>
              <img src="https://demo.cmssuperheroes.com/themeforest/chani/wp-content/uploads/avatar-1.jpg" alt="avt" />
            </div>
            <div className={cx('review-content')}>
              <Rating
                start={0}
                stop={5}
                fractions={10}
                initialRating={5}
                readonly={true}
                emptySymbol={<RiStarLine size={20} />}
                fullSymbol={<RiStarSFill size={20} />}
              />
              <div className={cx('heading-review')}>
                <div className={cx('user-review')}>JENA PETER</div>
                <div className={cx('seperator')}></div>
                <div className={cx('date-review')}>DEC 15, 2023</div>
              </div>
              <div className={cx('text-review')}>
                <p>
                  Great features include double welded slanting flap pockets, adjustable cuffs and a fishtail hem. The
                  look is finished with snap fastenings, under-arm eyelets, and a back yoke with concealed vents.
                </p>
              </div>
            </div>
          </div>
        </ol>
      </div>
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
