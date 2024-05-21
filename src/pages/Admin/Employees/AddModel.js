import style from './AddModel.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState, forwardRef, useImperativeHandle, Fragment } from 'react';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';

import { Button, Input } from '~/components/adminComponents';
import * as productService from '~/services/api/productService';
import * as userService from '~/services/api/userService';
import * as rbacService from '~/services/api/rbacService';

const cx = classNames.bind(style);

function AddModel(props, ref) {
  const overlayRef = useRef(null);
  const addEmployeesContainerRef = useRef(null);

  const [visible, setVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('66434d1afd0d76dfa0eee8af');
  const [roles, setRoles] = useState([]);

  // const { fetchingProduct } = props;

  const addAccountApi = useMutation({
    mutationFn: async () => {
      return await handleAddAccount();
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: 'Add member successfully',
      });

      console.log('data', data);
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

  const getRolesApi = useMutation({
    mutationFn: async () => {
      return await rbacService.getRoles();
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: 'Fetching successfully',
      });

      setRoles(data.data);
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
    getRolesApi.mutate();
  }, []);

  const handleAddAccount = () => {
    console.log('data', {
      firstName,
      lastName,
      phone,
      email,
      password,
      role: role.id,
    });

    if (!firstName || !lastName || !phone || !email || !password || !role) {
      toast.error('Error', {
        description: 'Please fill all fields',
      });

      return;
    }

    return userService.addAccount({
      firstName,
      lastName,
      phoneNumber: phone,
      email,
      password,
      role: role.id,
    });
  };

  useImperativeHandle(ref, () => ({
    openModel: () => {
      overlayRef.current.removeAttribute('close');

      addEmployeesContainerRef.current.removeAttribute('close');
      addEmployeesContainerRef.current.setAttribute('open', '');
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
          addEmployeesContainerRef.current.removeAttribute('open');
          addEmployeesContainerRef.current.setAttribute('close', '');
        }}
        onMouseOver={(e) => {
          e.target.setAttribute('style', 'cursor: pointer');
        }}
        ref={overlayRef}
        close={!visible ? '' : null}
      >
        <div
          className={cx('delete-product-container')}
          ref={addEmployeesContainerRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseOver={(e) => {
            e.stopPropagation();
            overlayRef.current.removeAttribute('style');
          }}
          onAnimationEnd={() => {
            if (addEmployeesContainerRef.current.getAttribute('open') !== '') {
              overlayRef.current.setAttribute('close', '');
            }
          }}
        >
          <div>
            <h3 className={cx('title')}>Add employee to business</h3>
          </div>

          <div className="row w100 mt-16px">
            <div className="col l-6">
              <Input
                name="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              >
                First name
              </Input>
            </div>
            <div className="col l-6">
              <Input
                name="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              >
                Last name
              </Input>
            </div>
          </div>

          <div className="row w100 mt-12px">
            <div className="col l-12">
              <Input
                name="Email"
                value={email}
                onChange={(e) => {
                  if (e.target.value.length > 30) {
                    return;
                  }
                  setEmail(e.target.value);
                }}
                hint="Password must be at least 30 characters"
              >
                Email
              </Input>
            </div>
            <div className="col l-12 mt-8px">
              <Input
                name="Password"
                type={'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              >
                Password
              </Input>
            </div>
          </div>

          <div className="row w100 mt-12px">
            <div className="col l-12">
              <Input
                type="number"
                name="Phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              >
                Phone number
              </Input>
            </div>
          </div>

          <div className="row w100 mt-12px">
            <div className="col l-12">
              <Input selectOptions={roles.length === 0 ? [] : roles} name="Choose role" setValue={setRole}>
                Choose role
              </Input>
            </div>
          </div>

          {/* Button */}
          <div className="flex mt-16px">
            <div
              className={cx('btn-component')}
              onClick={() => {
                addEmployeesContainerRef.current.removeAttribute('open');
                addEmployeesContainerRef.current.setAttribute('close', '');

                // deleteProductApi.mutate();
              }}
            >
              <Button danger>Cancel</Button>
            </div>

            <div
              className={cx('btn-component')}
              onClick={() => {
                addEmployeesContainerRef.current.removeAttribute('open');
                addEmployeesContainerRef.current.setAttribute('close', '');
              }}
            >
              <Button
                onClick={() => {
                  addAccountApi.mutate();
                }}
              >
                Add Employee
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default forwardRef(AddModel);
