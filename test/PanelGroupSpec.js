import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import Panel from '../src/Panel';
import PanelGroup from '../src/PanelGroup';

import { assertSingle, shouldWarn } from './helpers';

describe('<PanelGroup>', () => {
  it('Should pass bsStyle to Panels', () => {
    render(
      <PanelGroup bsStyle="default" id="panel">
        <Panel>
          <Panel.Body>Panel 1</Panel.Body>
        </Panel>
      </PanelGroup>
    );

    let panel = document.querySelector('.panel');

    assert.equal(panel.className, 'panel panel-default');
  });

  it('Should not override bsStyle on Panel', () => {
    render(
      <PanelGroup bsStyle="default" id="panel">
        <Panel bsStyle="primary">
          <Panel.Body>Panel 1</Panel.Body>
        </Panel>
      </PanelGroup>
    );

    let panel = document.querySelector('.panel');

    assert.equal(panel.className, 'panel panel-primary');
  });

  describe('accordion', () => {
    it('Should not collapse panel by bubbling onSelect callback', () => {
      const { container } = render(
        <PanelGroup
          accordion
          id="panel"
          onSelect={() => {
            throw new Error();
          }}
        >
          <Panel>
            <input type="text" className="changeme" />
          </Panel>
        </PanelGroup>
      );

      fireEvent.select(assertSingle(container, 'input.changeme'));
    });

    it('Should call onSelect handler with eventKey', done => {
      function handleSelect(eventKey, e) {
        e.should.exist;
        eventKey.should.equal('1');
        done();
      }

      const { container } = render(
        <PanelGroup accordion onSelect={handleSelect} id="panel">
          <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>foo</Panel.Title>
            </Panel.Heading>

            <Panel.Body collapsible>Panel 1</Panel.Body>
          </Panel>
        </PanelGroup>
      );

      fireEvent.click(assertSingle(container, 'a'));
    });

    it('Should manage expanded panels', () => {
      const { container } = render(
        <PanelGroup accordion defaultActiveKey="1" id="panel">
          <Panel id="panel1" eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>foo</Panel.Title>
            </Panel.Heading>

            <Panel.Body collapsible>Panel 1</Panel.Body>
          </Panel>
          <Panel id="panel2" eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle>foo</Panel.Title>
            </Panel.Heading>

            <Panel.Body collapsible>Panel 2</Panel.Body>
          </Panel>
        </PanelGroup>
      );

      const panel1Dom = container.querySelector('#panel1 a');
      const panel2Dom = container.querySelector('#panel2 a');

      fireEvent.click(panel2Dom);
      assert.equal(panel1Dom.getAttribute('class'), 'collapsed');
      assert.equal(panel2Dom.getAttribute('class'), '');

      fireEvent.click(panel1Dom);
      assert.equal(panel1Dom.getAttribute('class'), '');
      assert.equal(panel2Dom.getAttribute('class'), 'collapsed');

      fireEvent.click(panel1Dom);
      assert.equal(panel1Dom.getAttribute('class'), 'collapsed');
      assert.equal(panel2Dom.getAttribute('class'), 'collapsed');
    });

    it('Should warn if panel has explicit expanded', () => {
      shouldWarn('`<Panel>` `expanded`');

      render(
        <PanelGroup accordion defaultActiveKey="1" id="panel">
          <Panel id="panel1" eventKey="1" />
          <Panel id="panel2" eventKey="2" expanded onToggle={() => {}} />
        </PanelGroup>
      );
    });
  });

  describe('Web Accessibility', () => {
    let panelBodies, panelGroup, headers, links; // eslint-disable-line

    beforeEach(() => {
      const { container } = render(
        <PanelGroup accordion defaultActiveKey="1" id="panel">
          <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>foo</Panel.Title>
            </Panel.Heading>

            <Panel.Body collapsible>Panel 1</Panel.Body>
          </Panel>
          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle>foo</Panel.Title>
            </Panel.Heading>

            <Panel.Body collapsible>Panel 2</Panel.Body>
          </Panel>
        </PanelGroup>
      );

      panelGroup = container.querySelector('.panel-group');
      panelBodies = Array.from(container.querySelectorAll('.panel-collapse'));
      headers = Array.from(container.querySelectorAll('.panel-heading'));
      links = Array.from(container.querySelectorAll('.panel-heading a'));
    });

    it('Should have a role of tablist', () => {
      assert.equal(panelGroup.getAttribute('role'), 'tablist');
    });

    it('Should provide each header tab with role of tab', () => {
      assert.equal(headers[0].getAttribute('role'), 'tab');
      assert.equal(headers[1].getAttribute('role'), 'tab');
    });

    it('Should provide the panelBodies with role of tabpanel', () => {
      assert.equal(panelBodies[0].getAttribute('role'), 'tabpanel');
    });

    it('Should provide each panel with an aria-labelledby referencing the corresponding header', () => {
      assert.equal(panelBodies[0].id, links[0].getAttribute('aria-controls'));
      assert.equal(panelBodies[1].id, links[1].getAttribute('aria-controls'));
    });

    it('Should maintain each tab aria-expanded state', () => {
      assert.equal(links[0].getAttribute('aria-expanded'), 'true');
      assert.equal(panelBodies[0].getAttribute('aria-expanded'), 'true');

      assert.equal(links[1].getAttribute('aria-expanded'), 'false');
      assert.equal(panelBodies[1].getAttribute('aria-expanded'), 'false');
    });
  });
});
