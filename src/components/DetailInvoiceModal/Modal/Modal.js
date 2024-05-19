import { useEffect, useContext, createContext } from 'react';
import { useSpring, useTransition } from '@react-spring/core';
import { animated } from '@react-spring/web';
import style from './Modal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const ModalContext = createContext();

function Modal({ children, isOpen, onClose }) {
  const handleEscape = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const modalTransition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    config: {
      duration: 300,
    },
  });

  const springs = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
    config: {
      duration: 300,
    },
  });

  return modalTransition(
    (styles, isOpen) =>
      isOpen && (
        <animated.div style={styles} className={cx('react-modal-overlay')} onClick={onClose}>
          <animated.div style={springs} className={cx('react-modal-wrapper')} onClick={(e) => e.stopPropagation()}>
            <div className={cx('react-modal-content')}>
              <ModalContext.Provider value={{ onClose }}>{children}</ModalContext.Provider>
            </div>
          </animated.div>
        </animated.div>
      ),
  );
}

const DismissButton = ({ children, className }) => {
  const { onClose } = useContext(ModalContext);

  return (
    <button type="button" className={cx(className)} onClick={onClose}>
      {children}
    </button>
  );
};

const ModalHeader = ({ children }) => {
  return (
    <div className={cx('react-modal-header')}>
      <div className={cx('react-modal-title')}>{children}</div>
      <DismissButton className={cx('btn-close')}>&times;</DismissButton>
    </div>
  );
};

const ModalBody = ({ children }) => {
  return <div className={cx('react-modal-body')}>{children}</div>;
};

const ModalFooter = ({ children }) => {
  return <div className={cx('react-modal-footer')}>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.DismissButton = DismissButton;

export default Modal;
