import classNames from 'classnames';
import React from 'react';

import NavbarContext from './NavbarContext';
import { prefix } from './utils/bootstrapUtils';

class NavbarHeader extends React.Component {
  render() {
    const { className, ...props } = this.props;
    const navbarProps = this.context || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'header');

    return <div {...props} className={classNames(className, bsClassName)} />;
  }
}

NavbarHeader.contextType = NavbarContext;

export default NavbarHeader;
