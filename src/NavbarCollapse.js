import React from 'react';

import Collapse from './Collapse';
import NavbarContext from './NavbarContext';
import { prefix } from './utils/bootstrapUtils';

class NavbarCollapse extends React.Component {
  render() {
    const { children, ...props } = this.props;
    const navbarProps = this.context || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'collapse');

    return (
      <Collapse in={navbarProps.expanded} {...props}>
        <div className={bsClassName}>{children}</div>
      </Collapse>
    );
  }
}

NavbarCollapse.contextType = NavbarContext;

export default NavbarCollapse;
