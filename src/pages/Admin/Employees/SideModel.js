import style from './SideModel.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleNotch,
  faAnglesRight,
  faArrowsSpin,
  faCalendar,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState, forwardRef, useImperativeHandle, Fragment } from 'react';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { AxiosError } from 'axios';

import { Button, Input } from '~/components/adminComponents';
import { ColorsHash, ColorsString } from '~/common/constants';
import * as productService from '~/services/api/productService';
import * as accessService from '~/services/api/accessService';
import * as categoryService from '~/services/api/categoryService';
import { renderCategories } from '~/utils/render-category';

const regexOnlyNumber = /^[0-9.]*$/;

const colorsArr = [ColorsHash.BROWN, ColorsHash.GREY, ColorsHash.YELLOW, ColorsHash.PINK, ColorsHash.RED];

const sizesArr = ['S', 'M', 'L', 'XL', '2XL'];
const brandsArr = ['Gucci', 'Louis Vuitton', 'Chanel', 'Dior', 'Prada'];
const typeArr = ['Clothe', 'Trousers', 'Shoes'];
const genderArr = ['Man', 'Woman', 'Unisex'];
const StatusArr = ['Draft', 'Published', 'Scheduled'];

const cx = classNames.bind(style);

function SideModel(props, ref) {
  const overlayRef = useRef(null);
  const decentralizeRef = useRef(null);
  const [grants, setGrants] = useState({});

  const [visible, setVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    openModel: () => {
      console.log('open');
      overlayRef.current.removeAttribute('close');

      decentralizeRef.current.removeAttribute('close');
      decentralizeRef.current.setAttribute('open', '');
    },
  }));

  const handleUpdateRoles = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const grants = {};

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const roleName = checkbox.getAttribute('data-role-name');
        const roleId = checkbox.getAttribute('data-role-id');
        const roleAction = checkbox.getAttribute('data-role-action');

        if (!grants[roleName]) {
          grants[roleName] = {
            name: roleName,
            description: roleName,
            grants: [],
          };
        }

        const grant = grants[roleName].grants.find((g) => g.resource === roleId);

        if (!grant) {
          grants[roleName].grants.push({
            resource: roleId,
            actions: [roleAction],
          });
        } else {
          if (checkbox.checked) {
            if (!grant.actions.includes(roleAction)) {
              grant.actions.push(roleAction);
            }
          } else {
            grant.actions = grant.actions.filter((action) => action !== roleAction);
            if (grant.actions.length === 0) {
              grants[roleName].grants = grants[roleName].grants.filter((g) => g.resource !== roleId);
            }
          }
        }

        if (grants[roleName].grants.length === 0) {
          delete grants[roleName];
        }

        console.log(JSON.stringify(grants, null, 2));
      });
    });

    console.log(JSON.stringify(grants, null, 2));
  };

  const handleCheckboxChange = (event) => {
    const { roleName, roleId, roleAction } = event.target.dataset;
    const checked = event.target.checked;

    setGrants((prevGrants) => {
      const newGrants = { ...prevGrants };

      if (!newGrants[roleName]) {
        newGrants[roleName] = {
          name: roleName,
          description: roleName,
          grants: [],
        };
      }

      let grant = newGrants[roleName].grants.find((g) => g.resource === roleId);

      if (!grant) {
        grant = {
          resource: roleId,
          actions: [],
        };
        newGrants[roleName].grants.push(grant);
      }

      if (checked) {
        if (!grant.actions.includes(roleAction)) {
          grant.actions.push(roleAction);
        }
      } else {
        grant.actions = grant.actions.filter((action) => action !== roleAction);
        if (grant.actions.length === 0) {
          newGrants[roleName].grants = newGrants[roleName].grants.filter((g) => g.resource !== roleId);
        }
      }

      if (newGrants[roleName].grants.length === 0) {
        delete newGrants[roleName];
      }

      return newGrants;
    });
  };

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
          decentralizeRef.current.removeAttribute('open');
          decentralizeRef.current.setAttribute('close', '');
        }}
        onMouseOver={(e) => {
          e.target.setAttribute('style', 'cursor: pointer');
        }}
        ref={overlayRef}
        close={!visible ? '' : null}
      >
        <div
          className={cx('add-product-container')}
          ref={decentralizeRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseOver={(e) => {
            e.stopPropagation();
            overlayRef.current.removeAttribute('style');
          }}
          onAnimationEnd={() => {
            if (decentralizeRef.current.getAttribute('open') !== '') {
              overlayRef.current.setAttribute('close', '');
            }
          }}
        >
          <i
            className={cx('icon-close-model')}
            onClick={() => {
              decentralizeRef.current.removeAttribute('open');
              decentralizeRef.current.setAttribute('close', '');
            }}
          >
            <FontAwesomeIcon icon={faAnglesRight} />
          </i>
          <span className={cx('overlay-heading-text')}>Decentralize</span>

          <div className={cx('inner-container')}>
            {/* Start::: left-block */}
            <div className={cx('left-block')}>
              <div className={cx('table-wrapper')}>
                <div className={cx('tabs')}>
                  <p>User role manager</p>
                </div>
                <table className={cx('table')}>
                  <thead>
                    <tr>
                      <th className={cx('actions')}>Actions</th>
                      <th className={cx('')}>Staff</th>
                      <th className={cx('')}>Manager</th>
                      <th className={cx('')}>Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*    Users management */}
                    <tr>
                      <th className={cx('title')} colspan="4">
                        <i className={cx('title-icon')}>
                          {' '}
                          <FontAwesomeIcon icon={faCalendarCheck} />
                        </i>{' '}
                        Users management
                      </th>
                    </tr>
                    <tr>
                      <td className={cx('permission')}>
                        <p className="ml-8px">View customers information</p>
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="STAFF"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="read:any"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="MANAGER"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="read:any"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="ADMIN"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="read:any"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={cx('permission')}>
                        <p className="ml-8px">Edit customers information</p>
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="STAFF"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="update:any"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="MANAGER"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="update:any"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="ADMIN"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="update:any"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={cx('permission')}>
                        <p className="ml-8px">Create users account</p>
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="STAFF"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="create:any"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="MANAGER"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="create:any"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="ADMIN"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="create:any"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={cx('permission')}>
                        <p className="ml-8px">Delete users account</p>
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="STAFF"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="delete:any"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="MANAGER"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="delete:any"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          data-role-name="ADMIN"
                          data-role-id="663d08f7053547ac3b8f9c52"
                          onChange={handleCheckboxChange}
                          data-role-action="delete:any"
                        />
                      </td>
                    </tr>

                    {/* Product management */}
                    <tr>
                      <th className={cx('title')} colspan="4">
                        <i className={cx('title-icon')}>
                          {' '}
                          <FontAwesomeIcon icon={faCalendarCheck} />
                        </i>{' '}
                        Products management
                      </th>
                    </tr>
                    <tr>
                      <td className={cx('permission')}>
                        <p className="ml-8px">Create a new product</p>
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="create:any"
                          data-role-name="STAFF"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="create:any"
                          data-role-name="MANAGER"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="create:any"
                          data-role-name="ADMIN"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={cx('permission')}>
                        <p className="ml-8px">Edit a new product</p>
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="update:any"
                          data-role-name="STAFF"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="update:any"
                          data-role-name="MANAGER"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="update:any"
                          data-role-name="ADMIN"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={cx('permission')}>
                        <p className="ml-8px">Delete a product</p>
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="delete:any"
                          data-role-name="STAFF"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="delete:any"
                          data-role-name="MANAGER"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="delete:any"
                          data-role-name="ADMIN"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={cx('permission')}>
                        <p className="ml-8px">Change Product status</p>
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="update:any"
                          data-role-name="STAFF"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="update:any"
                          data-role-name="MANAGER"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="663d0924053547ac3b8f9c54"
                          data-role-action="update:any"
                          data-role-name="ADMIN"
                        />
                      </td>
                    </tr>

                    {/*    Roles management */}
                    <tr>
                      <th className={cx('title')} colspan="4">
                        <i className={cx('title-icon')}>
                          {' '}
                          <FontAwesomeIcon icon={faCalendarCheck} />
                        </i>{' '}
                        Roles management
                      </th>
                    </tr>
                    <tr>
                      <td className={cx('permission')}>
                        <p className="ml-8px">Create a new role</p>
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="66406e98fbb4096d621bfe48"
                          data-role-action="create:any"
                          data-role-name="STAFF"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="66406e98fbb4096d621bfe48"
                          data-role-action="create:any"
                          data-role-name="MANAGER"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="66406e98fbb4096d621bfe48"
                          data-role-action="create:any"
                          data-role-name="ADMIN"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={cx('permission')}>
                        <p className="ml-8px">Edit user role</p>
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="66406e98fbb4096d621bfe48"
                          data-role-action="update:any"
                          data-role-name="STAFF"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="66406e98fbb4096d621bfe48"
                          data-role-action="update:any"
                          data-role-name="MANAGER"
                        />
                      </td>
                      <td className={cx('checkbox-wrapper')}>
                        <input
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          data-role-id="66406e98fbb4096d621bfe48"
                          data-role-action="update:any"
                          data-role-name="ADMIN"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className={cx('btn-wrapper')}
                onClick={() => {
                  console.log('update');
                  console.log('grants', grants);
                  // handle();
                }}
              >
                <Button>Update</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default forwardRef(SideModel);
