import style from './SidebarMenu.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function SidebarMenu({ name = 'Default', shine, children }) {
  return (
    <div className={cx('menu')}>
      <span className={cx('label', { shine })}>{name}</span>

      {children.map((Comp, index) => {
        return <div key={index}>{Comp}</div>;
      })}
    </div>
  );
}

export default SidebarMenu;
