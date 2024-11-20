import classNames from 'classnames/bind';
import style from './SizeChartModal.module.scss';
import Modal from '../DetailInvoiceModal/Modal';

const cx = classNames.bind(style);

function SizeChartModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Header>
                <h3 className={cx('heading')}>Size Chart</h3>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('content')}>
                    <img
                        src={require('~/assets/images/size-chart.webp')}
                        alt="Size Chart"
                        className={cx('size-chart-image')}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default SizeChartModal; 