import React from 'react';
import cn from 'classnames';

import PanelContext from './PanelContext';
import { prefix, bsClass, splitBsProps } from './utils/bootstrapUtils';

class PanelFooter extends React.Component {
  render() {
    let { children, className } = this.props;
    let { bsClass: _bsClass } = this.context || {};

    const [bsProps, elementProps] = splitBsProps(this.props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    return (
      <div
        {...elementProps}
        className={cn(className, prefix(bsProps, 'footer'))}
      >
        {children}
      </div>
    );
  }
}

PanelFooter.contextType = PanelContext;

export default bsClass('panel', PanelFooter);
