import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import uncontrollable from 'uncontrollable';
import warning from 'warning';

import {
  bsStyles,
  bsClass,
  getClassSet,
  splitBsPropsAndOmit
} from './utils/bootstrapUtils';
import { State, Style } from './utils/StyleConfig';
import Body from './PanelBody';
import PanelContext from './PanelContext';
import PanelGroupContext from './PanelGroupContext';
import Heading from './PanelHeading';
import Title from './PanelTitle';
import Footer from './PanelFooter';
import Toggle from './PanelToggle';
import Collapse from './PanelCollapse';

const has = Object.prototype.hasOwnProperty;

const defaultGetId = (id, type) => (id ? `${id}--${type}` : null);

const propTypes = {
  /**
   * Controls the collapsed/expanded state ofthe Panel. Requires
   * a `Panel.Collapse` or `<Panel.Body collapsible>` child component
   * in order to actually animate out or in.
   *
   * @controllable onToggle
   */
  expanded: PropTypes.bool,
  /**
   * A callback fired when the collapse state changes.
   *
   * @controllable expanded
   */
  onToggle: PropTypes.func,
  eventKey: PropTypes.any,

  /**
   * An HTML `id` attribute uniquely identifying the Panel component.
   */
  id: PropTypes.string
};

class Panel extends React.Component {
  getExpanded() {
    const panelGroup = this.context;

    if (panelGroup && has.call(panelGroup, 'activeKey')) {
      warning(
        this.props.expanded == null,
        'Specifying `<Panel>` `expanded` in the context of an accordion ' +
          '`<PanelGroup>` is not supported. Set `activeKey` on the ' +
          '`<PanelGroup>` instead.'
      );

      return panelGroup.activeKey === this.props.eventKey;
    }

    return !!this.props.expanded;
  }

  handleToggle = e => {
    const panelGroup = this.context;
    const expanded = !this.getExpanded();

    if (panelGroup && panelGroup.onToggle) {
      panelGroup.onToggle(this.props.eventKey, expanded, e);
    } else {
      this.props.onToggle(expanded, e);
    }
  };

  render() {
    let { className, children } = this.props;
    const [bsProps, props] = splitBsPropsAndOmit(this.props, [
      'onToggle',
      'eventKey',
      'expanded'
    ]);

    const { eventKey, id } = this.props;
    const idKey = eventKey == null ? id : eventKey;

    let ids;

    if (idKey !== null) {
      const panelGroup = this.context;
      const getId = (panelGroup && panelGroup.getId) || defaultGetId;

      ids = {
        headingId: getId(idKey, 'heading'),
        bodyId: getId(idKey, 'body')
      };
    }

    const panelContext = {
      ...ids,
      bsClass: this.props.bsClass,
      expanded: this.getExpanded(),
      onToggle: this.handleToggle
    };

    return (
      <PanelContext.Provider value={panelContext}>
        <div {...props} className={classNames(className, getClassSet(bsProps))}>
          {children}
        </div>
      </PanelContext.Provider>
    );
  }
}

Panel.propTypes = propTypes;

Panel.contextType = PanelGroupContext;

const UncontrolledPanel = uncontrollable(
  bsClass(
    'panel',
    bsStyles(
      [...Object.values(State), Style.DEFAULT, Style.PRIMARY],
      Style.DEFAULT,
      Panel
    )
  ),
  { expanded: 'onToggle' }
);

Object.assign(UncontrolledPanel, {
  Heading,
  Title,
  Body,
  Footer,
  Toggle,
  Collapse
});

export default UncontrolledPanel;
