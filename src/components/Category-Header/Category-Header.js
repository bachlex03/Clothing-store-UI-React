import style from './Category-Header.module.scss';
import classNames from 'classnames/bind';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { AxiosError } from 'axios';

import { SubCategoryItemHeader, ImgCategoryItemHeader } from '~/components';
import images from '~/assets/images';
import { renderCategories } from '~/utils/render-category';
import { getCategories } from '~/services/api/categoryService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function CategoryHeader({ handleClose }) {
  const [categories, setCategories] = useState([]);

  const fetchingCategory = useMutation({
    mutationFn: async () => {
      return await getCategories();
    },
    onSuccess: (data) => {
      console.log('data', renderCategories(data));
      setCategories(renderCategories(data));
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }
    },
  });

  useEffect(() => {
    fetchingCategory.mutate();
  }, []);

  return (
    <div className={cx('container')}>
      <div className="row">
        <div className="col l-6">
          <div className="row">
            {categories.map((category) => {
              return (
                <div className="col l-4">
                  <SubCategoryItemHeader category={category} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col l-6">
          <h3 className={cx('new-collection')}>New Collections</h3>
          <div className="row">
            <div className="col l-6">
              <ImgCategoryItemHeader title="Asymmetric" thumb={images.headerCategory_1} />
            </div>
            <div className="col l-6">
              <ImgCategoryItemHeader title="One Shoulder" thumb={images.headerCategory_2} />
            </div>
            <div className="col l-6">
              <ImgCategoryItemHeader title="Dressy Blouses" thumb={images.headerCategory_3} />
            </div>
            <div className="col l-6">
              <ImgCategoryItemHeader title="Palazzos" thumb={images.headerCategory_4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryHeader;
