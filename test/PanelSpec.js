import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import Panel from '../src/Panel';

import { assertSingle, assertNone } from './helpers';

describe('<Panel>', () => {
  it('Should have class and body', () => {
    const { container } = render(
      <Panel>
        <Panel.Body>Panel content</Panel.Body>
      </Panel>
    );

    assertSingle(container, 'div.panel.panel-default');
    assertSingle(container, 'div.panel-body');
  });

  it('Should have bootstrap style class', () => {
    const { container } = render(
      <Panel bsStyle="primary">
        <Panel.Body>Panel content</Panel.Body>
      </Panel>
    );

    assertSingle(container, 'div.panel-primary');
  });

  it('Should honor additional classes passed in; adding not overriding', () => {
    const { container } = render(<Panel className="foo" />);

    assertSingle(container, 'div.foo');
  });

  it('Should have unwrapped header', () => {
    const { container } = render(
      <Panel>
        <Panel.Heading>Heading</Panel.Heading>
      </Panel>
    );

    assertSingle(container, 'div.panel-heading').textContent.should.equal(
      'Heading'
    );
  });

  it('Should have custom component header', () => {
    const { container } = render(
      <Panel>
        <Panel.Heading componentClass="h3">Heading</Panel.Heading>
      </Panel>
    );

    assertSingle(container, 'h3.panel-heading').textContent.should.equal(
      'Heading'
    );
  });

  describe('<PanelTitle>', () => {
    it('Should render a title', () => {
      const { container } = render(<Panel.Title>foo</Panel.Title>);

      assertSingle(container, 'div.panel-title').textContent.should.equal(
        'foo'
      );
    });

    it('Should render a custom component', () => {
      const { container } = render(
        <Panel.Title componentClass="h3">foo</Panel.Title>
      );

      assertSingle(container, 'h3.panel-title');
    });

    it('Should render with a toggle', () => {
      const { container } = render(<Panel.Title toggle>foo</Panel.Title>);

      // The toggle renders a `SafeAnchor` (an `<a>`) directly inside the title.
      assertSingle(container, '.panel-title > a');
    });
  });

  describe('<PanelToggle>', () => {
    it('Should render a Toggle a SafeAnchor', () => {
      const { container } = render(<Panel.Toggle>foo</Panel.Toggle>);

      assertSingle(container, 'a[role="button"][href="#"]');
    });

    it('Should render a custom component', () => {
      const { container } = render(
        <Panel.Toggle componentClass="h3">foo</Panel.Toggle>
      );

      assertSingle(container, 'h3');
    });

    it('Should simulate onToggle', done => {
      const { container } = render(
        <Panel onToggle={() => done()}>
          <Panel.Toggle>foo</Panel.Toggle>
        </Panel>
      );

      fireEvent.click(assertSingle(container, 'a'));
    });
  });

  it('Should have a footer', () => {
    const { container } = render(
      <Panel>
        <Panel.Footer>foo</Panel.Footer>
      </Panel>
    );

    assertSingle(container, 'div.panel-footer');
  });

  it('Should have collapse classes', () => {
    const { container } = render(
      <Panel defaultExpanded>
        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    assertSingle(container, 'div.panel-collapse.collapse.in');
  });

  it('Should pass through dom properties', () => {
    const { container } = render(<Panel id="testid">Panel content</Panel>);

    assertSingle(container, 'div#testid');
  });

  it('Should set ids on toggle and collapse', () => {
    const { container } = render(
      <Panel id="testid">
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    assertSingle(container, '#testid--body.panel-collapse');
    assertSingle(container, '#testid--heading.panel-heading');
  });

  it('Should be open', () => {
    const { container } = render(
      <Panel defaultExpanded>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    assertSingle(container, '.in.panel-collapse');
    assertNone(container, 'a.collapsed');
  });

  it('Should be closed', () => {
    const { container } = render(
      <Panel defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    assertNone(container, '.in.panel-collapse');
    assertSingle(container, 'a.collapsed');
  });

  it('Should toggle when uncontrolled', () => {
    const { container } = render(
      <Panel defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    fireEvent.click(assertSingle(container, 'a'));

    assertSingle(container, 'a')
      .getAttribute('aria-expanded')
      .should.equal('true');
  });

  describe('Web Accessibility', () => {
    it('Should be aria-expanded=true', () => {
      const { container } = render(
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      );

      assertSingle(container, '.panel-title a[aria-expanded="true"]');
    });

    it('Should be aria-expanded=false', () => {
      const { container } = render(
        <Panel defaultExpanded={false}>
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      );

      assertSingle(container, '.panel-title a[aria-expanded="false"]');
    });

    it('Should add aria-controls with id', () => {
      const { container } = render(
        <Panel id="testid">
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      );

      assertSingle(container, 'a[aria-controls="testid--body"]');
      assertSingle(
        container,
        '.panel-collapse[aria-labelledby="testid--heading"]'
      );
    });
  });
});
