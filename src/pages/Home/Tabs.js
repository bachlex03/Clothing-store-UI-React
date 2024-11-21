import React, { useEffect, useState } from 'react';
import style from './Tabs.module.scss';
import classNames from 'classnames/bind';
import { Product } from '~/components';
import * as productService from '~/services/api/productService';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Tabs() {
    const [tab, setTab] = useState(0);
    const [hotItems, setHotItems] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [onSaleItems, setOnSaleItems] = useState([]);

    const updateTab = (index) => {
        setTab(index);
    };

    console.log(newArrivals);

    const fetchingHotItems = useMutation({
        mutationFn: async () => {
            return await productService.getBestSellers();
        },
        onSuccess: (data) => {
            setHotItems(data);
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(`Error ${error.response?.status}`, {
                    description: `${error.response?.data?.message}`,
                });
            }
        },
    });

    const fetchingNewArrivals = useMutation({
        mutationFn: async () => {
            return await productService.getNewArrivals();
        },
        onSuccess: (data) => {
            setNewArrivals(data);
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(`Error ${error.response?.status}`, {
                    description: `${error.response?.data?.message}`,
                });
            }
        },
    });

    const fetchingOnSaleItems = useMutation({
        mutationFn: async () => {
            return await productService.getOnSaleProducts();
        },
        onSuccess: (data) => {
            setOnSaleItems(data);
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(`Error ${error.response?.status}`, {
                    description: `${error.response?.data?.message}`,
                });
            }
        },
    });

    useEffect(() => {
        fetchingHotItems.mutate();
        fetchingNewArrivals.mutate();
        fetchingOnSaleItems.mutate();
    }, []);

    const NoProductsMessage = () => (
        <div className={cx('no-products')}>
            <img src="/notfoundproduct.png" alt="No products found" className={cx('no-products-img')} />
            <p className={cx('no-products-text')}>Please check back later or browse other categories</p>
        </div>
    );

    const ProductList = ({ products }) => {
        if (!products || products.length === 0) {
            return <NoProductsMessage />;
        }

        return (
            <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col l-3">
                        <div className={cx('product-component')}>
                            <Product product={product} />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={cx('container-tabs')}>
            <div className={cx('containter-content')}>
                <div className={cx('tab')}>
                    <ul>
                        <li className={tab === 0 ? cx('active') : cx('no-active')} onClick={() => updateTab(0)}>
                            Hot Items
                        </li>
                        <li className={tab === 1 ? cx('active') : cx('no-active')} onClick={() => updateTab(1)}>
                            New Arrivals
                        </li>
                        <li className={tab === 2 ? cx('active') : cx('no-active')} onClick={() => updateTab(2)}>
                            On Sale
                        </li>
                    </ul>
                </div>
                <div className={tab === 0 ? cx('show-content') : cx('content')}>
                    <div className={cx('products-container')}>
                        <ProductList products={hotItems.slice(0, 4)} />
                    </div>
                </div>
                <div className={tab === 1 ? cx('show-content') : cx('content')}>
                    <div className={cx('products-container')}>
                        <ProductList products={newArrivals.slice(0, 4)} />
                    </div>
                </div>
                <div className={tab === 2 ? cx('show-content') : cx('content')}>
                    <div className={cx('products-container')}>
                        <ProductList products={onSaleItems.slice(0, 4)} />
                    </div>
                </div>
                <div className={cx('button-viewall')}>
                    <Link to="/shop" className={cx('btn', 'btn-accent', 'text-black', 'btn-hover-primary')}>
                        View All
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Tabs;
