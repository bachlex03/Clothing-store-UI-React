import style from './Category-Header.module.scss';
import classNames from 'classnames/bind';
import { SubCategoryItemHeader, ImgCategoryItemHeader } from '~/components';
import images from '~/assets/images';
const cx = classNames.bind(style);

function CategoryHeader() {
  return (
    <div className={cx('container')}>
      <div className="row">
        <div className="col l-6">
          <div className="row">
            <div className="col l-4">
              <SubCategoryItemHeader />
            </div>
            <div className="col l-4">
              <SubCategoryItemHeader />
            </div>
            <div className="col l-4">
              <SubCategoryItemHeader />
            </div>
            <div className="col l-4">
              <SubCategoryItemHeader />
            </div>
            <div className="col l-4">
              <SubCategoryItemHeader />
            </div>
          </div>
        </div>
        <div className="col l-6">
          <h3 className={cx('new-collection')}>New Collections</h3>
          <div className="row">
            <div className="col l-6">
              <ImgCategoryItemHeader />
            </div>
            <div className="col l-6">
              <ImgCategoryItemHeader />
            </div>
            <div className="col l-6">
              <ImgCategoryItemHeader />
            </div>
            <div className="col l-6">
              <ImgCategoryItemHeader />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryHeader;
