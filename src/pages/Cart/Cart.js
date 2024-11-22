import style from './Cart.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { TbCurrencyDollar } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import { vnpayIPN } from '~/services/api/paymenService';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { update, remove, clearCart } from '~/redux/features/cart/cartSlice';
import { getDetailProduct, getDetails } from '~/services/api/productService';

const cx = classNames.bind(style);

function Cart() {
    const [total, setTotal] = useState(0);
    const [originalTotal, setOriginalTotal] = useState(0);
    const [skuData, setSkuData] = useState([]);

    //handle
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.values);

    const handleIncrease = (index, item) => {
        const productSkus = skuData[index];
        if (!productSkus) {
            toast.error('Error', {
                description: 'Product data not found',
            });
            return;
        }

        const sku = productSkus.find((s) => s.sku_color === item.color && s.sku_size === item.size);

        if (!sku) {
            toast.error('Error', {
                description: 'Product variant not found',
            });
            return;
        }

        if (item.quantity >= sku.sku_quantity) {
            toast.error('Error', {
                description: 'Maximum quantity reached',
            });
            return;
        }

        let updatedObj = {
            index,
            item: {
                ...item,
                quantity: +item.quantity + 1,
            },
        };

        dispatch(update(updatedObj));
    };

    const handleDecrease = (index, item) => {
        let updatedObj = {
            index,
            item: {
                ...item,
                quantity: +item.quantity - 1,
            },
        };
        if (item.quantity === 1) return;

        dispatch(update(updatedObj));
    };

    useEffect(() => {
        const params = window.location.search;
        if (params && params.includes('vnp_BankCode')) {
            getVNpayIpnMutate.mutate();
        }
    }, []);

    const getVNpayIpnMutate = useMutation({
        mutationFn: async () => {
            return await getVNPayIpn();
        },
        onSuccess: (data) => {
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

    const getVNPayIpn = async () => {
        const params = window.location.search;
        console.log(params);
        const response = await vnpayIPN(params);
        console.log(response);
        if (response.RspCode === '00') {
            dispatch(clearCart());
            toast.success('Success', {
                description: 'Checkout successfully!',
            });
        } else {
            toast.error(`Error`, {
                description: `Checkout failed!`,
            });
        }
    };

    const handleChangeQuantity = (index, item, value) => {
        if (!value || +value === 0) {
            let updatedObj = {
                index,
                item: {
                    ...item,
                    quantity: 1,
                },
            };
            dispatch(update(updatedObj));
            return;
        }

        if (+value < 0) return;

        const productSkus = skuData[index];
        if (!productSkus) {
            toast.error('Error', {
                description: 'Product data not found',
            });
            return;
        }

        const sku = productSkus.find((s) => s.sku_color === item.color && s.sku_size === item.size);

        if (!sku) {
            toast.error('Error', {
                description: 'Product variant not found',
            });
            return;
        }

        if (+value > sku.sku_quantity) {
            toast.error('Error', {
                description: 'Quantity exceeds available stock',
            });
            return;
        }

        let updatedObj = {
            index,
            item: {
                ...item,
                quantity: +value,
            },
        };

        dispatch(update(updatedObj));
    };

    useEffect(() => {
        let total = 0;
        let originalTotal = 0;
        cartItems.map((item) => {
            total += item.final_price * item.quantity;
            originalTotal += item.price * item.quantity;
        });
        setTotal(total);
        setOriginalTotal(originalTotal);
    }, [cartItems]);

    useEffect(() => {
        const fetchSkuData = async () => {
            try {
                const skuPromises = cartItems.map((item) => getDetailProduct(item.slug));
                const products = await Promise.all(skuPromises);
                setSkuData(products.map((product) => product.skus));
            } catch (error) {
                console.error('Error fetching SKU data:', error);
            }
        };

        if (cartItems.length > 0) {
            fetchSkuData();
        }
    }, [cartItems]);

    useEffect(() => {
        const syncCartItems = async () => {
            try {
                for (let i = cartItems.length - 1; i >= 0; i--) {
                    try {
                        const productData = await getDetails(cartItems[i].slug);

                        // Nếu không tìm thấy sản phẩm, xóa khỏi cart
                        if (!productData) {
                            dispatch(remove(i));
                            toast.error('Product removed', {
                                description: `${cartItems[i].name} has been removed because it no longer exists`,
                            });
                            continue;
                        }

                        // Kiểm tra xem variant còn tồn tại không
                        const variantExists = productData.skus.some(
                            sku => sku.sku_color === cartItems[i].color && sku.sku_size === cartItems[i].size
                        );

                        if (!variantExists) {
                            dispatch(remove(i));
                            toast.error('Product variant removed', {
                                description: `${cartItems[i].name} (${cartItems[i].color}, ${cartItems[i].size}) has been removed because this variant is no longer available`,
                            });
                            continue;
                        }

                        // Cập nhật thông tin giá và discount nếu có thay đổi
                        if (productData.product_price !== cartItems[i].price || productData.final_price !== cartItems[i].final_price) {
                            dispatch(update({
                                index: i,
                                item: {
                                    ...cartItems[i],
                                    price: productData.product_price,
                                    final_price: productData.final_price,
                                    discount: productData.current_discount,
                                    name: productData.product_name,
                                    image: productData.product_imgs[0].secure_url,
                                }
                            }));
                        }
                    } catch (error) {
                        // Nếu API call thất bại (404 hoặc lỗi khác), xóa sản phẩm
                        dispatch(remove(i));
                        toast.error('Product removed', {
                            description: `${cartItems[i].name} has been removed due to an error`,
                        });
                    }
                }
            } catch (error) {
                console.error('Error syncing cart items:', error);
                toast.error('Error updating cart items');
            }
        };

        if (cartItems.length > 0) {
            syncCartItems();
        }
    }, []);

    return (
        <div className={cx('cart-container')}>
            <form>
                <table className={cx('table-container')}>
                    <thead>
                        <tr>
                            <th className="thumbnail"></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th className="remove"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item, index) => {
                                return (
                                    <tr className={cx('cart-item')}>
                                        <td className={cx('product-thumbnail')}>
                                            <img
                                                width="110"
                                                height="138"
                                                loading="lazy"
                                                src={item && item.image ? item.image : ''}
                                                alt="thumbnail"
                                            />
                                        </td>
                                        <td className="product-name">
                                            <Link to={`/products/${item.slug}`} style={{ fontSize: '2rem', marginBottom: '8px' }}>
                                                {item.name}
                                            </Link>
                                            <div style={{ marginBottom: '8px' }}>Color: {item.color} </div>
                                            <div style={{ marginBottom: '8px' }}>Size: {item.size}</div>
                                        </td>
                                        <td className={cx('product-price')} data-title="Price">
                                            {item?.discount ? (
                                                <>
                                                    <span style={{ color: '#d7422d', marginRight: '10px' }}>
                                                        $ {parseFloat(item.final_price).toFixed(2)}
                                                    </span>
                                                    <span style={{ color: '#9e9e9e', textDecoration: 'line-through', fontSize: '16px' }}>
                                                        $ {parseFloat(item.price).toFixed(2)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span>$ {parseFloat(item.price).toFixed(2)}</span>
                                            )}
                                        </td>
                                        <td className={cx('product-quantity')} data-title="Quantity">
                                            <div className={cx('quantity')}>
                                                <input
                                                    type="number"
                                                    className={cx('qty')}
                                                    id
                                                    name
                                                    value={item.quantity}
                                                    onChange={(e) => handleChangeQuantity(index, item, e.target.value)}
                                                    size="4"
                                                    min="0"
                                                    max=""
                                                    step="1"
                                                    placeholder=""
                                                    inputMode="numeric"
                                                    autoComplete="off"
                                                />
                                                <span
                                                    className={cx('cms-qty-act', 'cms-qty-up')}
                                                    onClick={() => handleIncrease(index, item)}
                                                ></span>
                                                <span
                                                    className={cx('cms-qty-act', 'cms-qty-down')}
                                                    onClick={() => handleDecrease(index, item)}
                                                ></span>
                                            </div>
                                        </td>
                                        <td className={cx('product-subtotal')}>
                                            <span className={cx('subtotal-value')}>
                                                $ {parseFloat(item.final_price * item.quantity).toFixed(2)}
                                            </span>
                                        </td>
                                        <td className={cx('product-remove')} onClick={() => dispatch(remove(index))}>
                                            X
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} align="center">
                                    No product in cart
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </form>
            <div className={cx('cart-collaterals')}>
                <div className={cx('cart_totals')}>
                    <h2 style={{ textAlign: 'right' }}>Cart totals</h2>
                    <table className={cx('table-container')} style={{ textAlign: 'right' }}>
                        <tbody>
                            <tr className={cx('cart-subtotal')}>
                                <th>Subtotal</th>
                                <td data-title="Subtotal">$ {parseFloat(total).toFixed(2)}</td>
                            </tr>
                            <tr className={cx('cart-discount')}>
                                <th>Discount</th>
                                <td data-title="Discount">
                                    {originalTotal > total ? (
                                        <>
                                            <span className={cx('original-price')}>$ {parseFloat(originalTotal).toFixed(2)}</span>
                                            <span className={cx('saved-amount')}>Save $ {parseFloat(originalTotal - total).toFixed(2)}</span>
                                        </>
                                    ) : (
                                        'No discount applied'
                                    )}
                                </td>
                            </tr>
                            <tr class={cx('order-total')} style={{ marginTop: '10px' }}>
                                <th>Total</th>
                                <td data-title="Total">
                                    <strong>$ {parseFloat(total).toFixed(2)}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={cx('proceed-to-checkout')}>
                        <Link to="/checkout" className={cx('btn', 'btn-accent', 'text-white', 'btn-hover-primary')}>
                            Proceed to checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
