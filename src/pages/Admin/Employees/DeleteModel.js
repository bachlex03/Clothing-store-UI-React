import style from './DeleteModel.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState, forwardRef, useImperativeHandle, Fragment } from 'react';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { Button, Input } from '~/components/adminComponents';
import * as productService from '~/services/api/productService';
const cx = classNames.bind(style);

function DeleteModel(props, ref) {
  const [deleteId, setDeleteId] = useState(null);
  const overlayRef = useRef(null);
  const deleteEmployeesContainerRef = useRef(null);
  const productNameRef = useRef('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(null);

  const { fetchingProduct } = props;

  const deleteProductApi = useMutation({
    mutationFn: async () => {
      // setLoading(true);

      return await productService.removeProduct(deleteId);
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: 'Delete product successfully',
      });

      console.log('fetchingProduct', fetchingProduct);
      fetchingProduct.mute();

      // setTimeout(() => {
      //   setLoading(false);
      // }, 500);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }

      // setTimeout(() => {
      //   setLoading(false);
      // }, 500);
    },
  });

  useImperativeHandle(ref, () => ({
    openModel: (delete_id, productName) => {
      console.log('overlayRef.current', overlayRef.current);
      overlayRef.current.removeAttribute('close');

      deleteEmployeesContainerRef.current.removeAttribute('close');
      deleteEmployeesContainerRef.current.setAttribute('open', '');

      productNameRef.current.innerText = productName;

      setDeleteId(delete_id);
    },
  }));

  return (
    <Fragment>
      {loading && (
        <div className={cx('loading')}>
          <i className={cx('icon-loading')}>
            <FontAwesomeIcon icon={faArrowsSpin} spin />
          </i>
        </div>
      )}
      <div
        className={cx('overlay')}
        onClick={(e) => {
          deleteEmployeesContainerRef.current.removeAttribute('open');
          deleteEmployeesContainerRef.current.setAttribute('close', '');
        }}
        onMouseOver={(e) => {
          e.target.setAttribute('style', 'cursor: pointer');
        }}
        ref={overlayRef}
        close={!visible ? '' : null}
      >
        <div
          className={cx('delete-product-container')}
          ref={deleteEmployeesContainerRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseOver={(e) => {
            e.stopPropagation();
            overlayRef.current.removeAttribute('style');
          }}
          onAnimationEnd={() => {
            if (deleteEmployeesContainerRef.current.getAttribute('open') !== '') {
              overlayRef.current.setAttribute('close', '');
            }
          }}
        >
          <i className={cx('trash-icon')}>
            <FontAwesomeIcon icon={faTrashCan} />
          </i>
          <h3 className={cx('title')}>Are you sure to delete ?</h3>
          <h3 className={cx('product-name')} ref={productNameRef}>
            Product Name
          </h3>
          <span className={cx('text')}>If you delete, products include product inventory will be deleted !</span>

          <div className="flex">
            <div
              className={cx('btn-component')}
              onClick={() => {
                deleteEmployeesContainerRef.current.removeAttribute('open');
                deleteEmployeesContainerRef.current.setAttribute('close', '');

                deleteProductApi.mutate();
              }}
            >
              <Button danger>Delete</Button>
            </div>

            <div
              className={cx('btn-component')}
              onClick={() => {
                deleteEmployeesContainerRef.current.removeAttribute('open');
                deleteEmployeesContainerRef.current.setAttribute('close', '');
              }}
            >
              <Button>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default forwardRef(DeleteModel);
