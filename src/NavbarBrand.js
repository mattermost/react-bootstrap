import classNames from 'classnames';
import React from 'react';

import NavbarContext from './NavbarContext';
import { prefix } from './utils/bootstrapUtils';

class NavbarBrand extends React.Component {
  render() {
    const { className, children, ...props } = this.props;
    const navbarProps = this.context || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'brand');

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: classNames(children.props.className, className, bsClassName)
      });
    }

    return (
      <span {...props} className={classNames(className, bsClassName)}>
        {children}
      </span>
    );
  }
}

NavbarBrand.contextType = NavbarContext;

export default NavbarBrand;
