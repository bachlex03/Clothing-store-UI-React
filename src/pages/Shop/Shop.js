import { Sidebar } from '~/layouts/components';

import style from './Shop.module.scss';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { Pagination, Product, Text } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import * as productService from '~/services/api/productService';
import { getCategories } from '~/services/api/categoryService';
import { renderCategories } from '~/utils/render-category';

import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Shop() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('default');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [filterProducts, setFilterProducts] = useState([]);
    const productsPerPage = 12;

    function bySizes(wantedSizes) {
        return (product) => {
            let toKeep = false;
            product.product_sizes.forEach((productSize) => {
                wantedSizes.forEach((wantedSize) => {
                    if (productSize.toLowerCase() === wantedSize.toLowerCase()) toKeep = true;
                });
            });
            return toKeep;
        };
    }

    function byColors(wantedColors) {
        return (product) => {
            let toKeep = false;
            product.product_colors.forEach((productColor) => {
                wantedColors.forEach((wantedColor) => {
                    if (productColor.toLowerCase() === wantedColor.toLowerCase()) toKeep = true;
                });
            });
            return toKeep;
        };
    }

    useEffect(() => {
        if (selectedSizes.length === 0 && selectedColors.length === 0) {
            setFilterProducts(products);
        } else if (selectedSizes.length === 0 && selectedColors.length > 0) {
            const filteredProducts = products.filter(byColors(selectedColors));
            setFilterProducts(filteredProducts);
        } else if (selectedSizes.length > 0 && selectedColors.length === 0) {
            const filteredProducts = products.filter(bySizes(selectedSizes));
            setFilterProducts(filteredProducts);
        } else if (selectedSizes.length > 0 && selectedColors.length > 0) {
            const filteredProducts = products.filter(byColors(selectedColors));
            const filteredProducts2 = filteredProducts.filter(bySizes(selectedSizes));
            setFilterProducts(filteredProducts2);
        }
    }, [selectedSizes, selectedColors, products]);

    const handlePriceRangeChange = (min, max) => {
        setPriceRange({ min, max });
    };

    // Lọc theo giá và sắp xếp
    const getFilteredProducts = () => {
        let filtered = [...filterProducts];

        // Filter by price range
        filtered = filtered.filter(
            (product) => product.product_price >= priceRange.min && product.product_price <= priceRange.max,
        );

        // Sort products
        if (sortOrder === 'asc') {
            filtered.sort((a, b) => a.product_price - b.product_price);
        } else if (sortOrder === 'desc') {
            filtered.sort((a, b) => b.product_price - a.product_price);
        }

        return filtered;
    };

    // Tính toán sản phẩm cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = getFilteredProducts().slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(getFilteredProducts().length / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    const fetchingCategory = useMutation({
        mutationFn: async () => {
            return await getCategories();
        },
        onSuccess: (data) => {
            setCategories(renderCategories(data));
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(`Error ${error.response?.status}`, {
                    description: `${error.response?.data?.message}`,
                });
            }
        },
    });

    const fetchingProduct = useMutation({
        mutationFn: async () => {
            return await productService.getAllProducts();
        },
        onSuccess: (data) => {
            // Lọc bỏ sản phẩm Draft
            const activeProducts = data.filter(product => product.product_status !== 'Draft');
            setProducts(activeProducts);
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
        fetchingCategory.mutate();
        fetchingProduct.mutate();
    }, []);

    return (
        <Fragment>
            <div
                className={cx('breadcrumb')}
                style={{ background: `url(${images.breadcrumb}) 50% / cover no-repeat`, backgroundAttachment: 'fixed' }}
            >
                <div className={cx('content')}>
                    <h2 className={cx('text')}>Our Shop</h2>
                    <span className={cx('context')}>
                        <p className={cx('start')}>Home</p>
                        <FontAwesomeIcon icon={faAngleRight} className={cx('breadcrumb-icon')} />
                        <p className={cx('current')}>Shop</p>
                    </span>
                </div>
            </div>

            <div className="grid wide">
                <div className="row">
                    <div className="col l-3">
                        <div className={cx('sidebar-component')}>
                            <Sidebar
                                categories={categories}
                                setColors={setSelectedColors}
                                setSizes={setSelectedSizes}
                                onPriceRangeChange={handlePriceRangeChange}
                            />
                        </div>
                    </div>
                    <div className="col l-9">
                        {getFilteredProducts().length > 0 ? (
                            <>
                                <div className={cx('shop-header')}>
                                    <div className="flex justify-between align-center mb-10px mt-12px">
                                        <div className={cx('counter-product')}>
                                            Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, getFilteredProducts().length)}{' '}
                                            of {getFilteredProducts().length} products
                                        </div>
                                        <div className={cx('sorting')}>
                                            <select
                                                value={sortOrder}
                                                onChange={(e) => handleSortChange(e.target.value)}
                                                className={cx('sort-select')}
                                            >
                                                <option value="default">Default sorting</option>
                                                <option value="asc">Price: Low to High</option>
                                                <option value="desc">Price: High to Low</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {currentProducts.map((product) => (
                                        <div key={product._id} className="m-4 col l-4 c-6">
                                            <div className={cx('product-component')}>
                                                <Product product={product} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={cx('pagination')}>
                                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                </div>
                            </>
                        ) : (
                            <div className={cx('no-products')}>
                                <img src="/notfoundproduct.png" alt="No products found" className={cx('no-products-img')} />
                                <p className={cx('no-products-text')}>Please check back later or browse other categories</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Shop;
