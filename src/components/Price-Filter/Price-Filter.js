import style from './Price-Filter.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

const cx = classNames.bind(style);

function PriceFilter({ onPriceRangeChange }) {
    const [priceRange, setPriceRange] = useState([20, 150]);
    const [progress, setProgress] = useState({ left: '0%', right: '100%' });
    const [isDragging, setIsDragging] = useState(false);

    const handleChange = (e) => {
        const value = Number(e.target.value);
        const isMinSlider = e.target.id === 'min-price';

        let newRange;
        if (isMinSlider) {
            newRange = [Math.min(value, priceRange[1] - 10), priceRange[1]];
        } else {
            newRange = [priceRange[0], Math.max(value, priceRange[0] + 10)];
        }

        setPriceRange(newRange);

        const leftPercent = ((newRange[0] - 20) / (150 - 20)) * 100;
        const rightPercent = ((newRange[1] - 20) / (150 - 20)) * 100;
        setProgress({ left: `${leftPercent}%`, right: `${rightPercent}%` });
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            onPriceRangeChange(priceRange[0], priceRange[1]);
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, priceRange]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('price-inputs')}>
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
            </div>

            <div className={cx('slider')}>
                <div
                    className={cx('progress')}
                    style={{ left: progress.left, right: `${100 - parseInt(progress.right)}%` }}
                ></div>
                <input
                    type="range"
                    id="min-price"
                    min="20"
                    max="150"
                    value={priceRange[0]}
                    onChange={handleChange}
                    onMouseDown={handleMouseDown}
                />
                <input
                    type="range"
                    id="max-price"
                    min="20"
                    max="150"
                    value={priceRange[1]}
                    onChange={handleChange}
                    onMouseDown={handleMouseDown}
                />
            </div>
        </div>
    );
}

export default PriceFilter;