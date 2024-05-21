import classNames from 'classnames/bind';
import styles from './Employees.module.scss';
import {
  faAngleLeft,
  faAngleRight,
  faEdit,
  faEye,
  faPlus,
  faTrash,
  faRotateRight,
  faArrowsSpin,
} from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Button, Search } from '~/components/adminComponents';
import SideModel from './SideModel';
import * as productService from '~/services/api/productService';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import DeleteModel from './DeleteModel';
import AddModel from './AddModel';
import * as userService from '~/services/api/userService';

const cx = classNames.bind(styles);

function Employees() {
  const decentralizeRef = useRef(null);
  const deleteEmployeesRef = useRef(null);
  const addEmployeesRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [members, setMembers] = useState([]);

  const getMemberApi = useMutation({
    mutationFn: async () => {
      return await userService.getMember();
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: 'Fetching successfully',
      });

      console.log('data', data.data);

      setMembers(data.data);
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
    getMemberApi.mutate();
  }, []);

  return (
    <Fragment>
      {loading && (
        <div className={cx('loading')}>
          <i className={cx('icon-loading')}>
            <FontAwesomeIcon icon={faArrowsSpin} spin />
          </i>
        </div>
      )}
      <div className={cx('container', 'h-screen')} style={{ backgroundColor: '#0f1824', width: '' }}>
        <p className={cx('heading-text')}>List view</p>
        <div className={cx('table-container')}>
          <div className={cx('header-table', 'flex justify-between items-center')}>
            <div className="flex justify-center items-center">
              <Search />
            </div>

            <div className="flex">
              <div className={cx('btn-comp')}>
                <Button
                  hover
                  onClick={() => {
                    addEmployeesRef.current.openModel();
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Employee
                </Button>
              </div>

              <div className={cx('btn-comp', 'ml-8px')}>
                <Button
                  hover
                  onClick={() => {
                    decentralizeRef.current.openModel();
                  }}
                >
                  Decentralize
                </Button>
              </div>
            </div>
          </div>

          <div
            className={cx('refresh-container')}
            onClick={() => {
              getMemberApi.mutate();
            }}
          >
            <i className={cx('repeat-icon mr-12px')}>
              <FontAwesomeIcon icon={faRotateRight} />
            </i>
            Refresh
          </div>

          <table className={cx('product-table')}>
            <thead className={cx('table-head')}>
              <tr>
                <th className="account">Account</th>
                <th className="first-name">First Name</th>
                <th className="last-name">Last Name</th>
                <th className="phone">Phone Number</th>
                <th className="role">Role</th>
                <th className="action">Action</th>
              </tr>
            </thead>

            <tbody className={cx('table-body')}>
              {members.map((member, index) => {
                return (
                  <tr key={index}>
                    <td className="code">{member?.email ?? 'Default'}</td>
                    <td className="first-name">{member.user_profile?.profile_firstName ?? 'Default FN'}</td>
                    <td className="last-name">{member.user_profile?.profile_lastName ?? 'Default LN'}</td>
                    <td className="phone">{member.user_profile?.profile_phoneNumber ?? '081642****'}</td>
                    <td className="role">{member.roles[0]?.role_name ?? 'Default role'}</td>

                    <td className="action">
                      <span className={cx('actions')}>
                        <FontAwesomeIcon className={cx('edit')} icon={faEye} />
                      </span>
                      <span className={cx('actions')}>
                        <FontAwesomeIcon className={cx('edit')} icon={faEdit} />
                      </span>
                      <span
                        className={cx('actions')}
                        data-id={member._id}
                        onClick={(e) => {
                          const id = e.currentTarget.getAttribute('data-id');

                          deleteEmployeesRef.current.openModel(id, member.member_name);
                        }}
                      >
                        <FontAwesomeIcon className={cx('delete')} icon={faTrash} />
                      </span>
                    </td>
                  </tr>
                );
              })}
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

        <SideModel ref={decentralizeRef} />
        <DeleteModel ref={deleteEmployeesRef} />
        <AddModel ref={addEmployeesRef} />
      </div>
    </Fragment>
  );
}

export default Employees;
