import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Tab from '../src/Tab';
import Tabs from '../src/Tabs';

describe('<Tabs>', () => {
  it('Should show the correct tab', () => {
    render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(screen.getByText('Tab 1 content').className.match(/\bactive\b/));
    assert.ok(!screen.getByText('Tab 2 content').className.match(/\bactive\b/));

    assert.equal(
      screen.getByRole('tab', { name: 'Tab 1' }).getAttribute('aria-selected'),
      'true'
    );
    assert.equal(
      screen.getByRole('tab', { name: 'Tab 2' }).getAttribute('aria-selected'),
      'false'
    );
  });

  it('Should only show the tabs with `Tab.props.title` set', () => {
    render(
      <Tabs id="test" defaultActiveKey={3}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab eventKey={2}>Tab 2 content</Tab>
        <Tab title="Tab 2" eventKey={3}>
          Tab 3 content
        </Tab>
      </Tabs>
    );

    assert.ok(screen.queryByText('Tab 1'));
    assert.ok(screen.queryByText('Tab 2'));
  });

  it('Should allow tab to have React components', () => {
    const tabTitle = <strong className="special-tab">Tab 2</strong>;
    render(
      <Tabs id="test" defaultActiveKey={2}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title={tabTitle} eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(screen.getByText('Tab 2').classList.contains('special-tab'));
  });

  it('Should call onSelect when tab is selected', done => {
    function onSelect(key) {
      assert.equal(key, '2');
      done();
    }

    const tab2 = <span className="tab2">Tab2</span>;
    render(
      <Tabs id="test" onSelect={onSelect} activeKey={1}>
        <Tab title="Tab 1" eventKey="1">
          Tab 1 content
        </Tab>
        <Tab title={tab2} eventKey="2">
          Tab 2 content
        </Tab>
      </Tabs>
    );

    userEvent.click(screen.getByText('Tab2'));
  });

  it('Should have children with the correct DOM properties', () => {
    render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" className="custom" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" tabClassName="tcustom" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(screen.getByText('Tab 1 content').className.match(/\bcustom\b/));
    assert.ok(
      screen.getByText('Tab 2').parentElement.className.match(/\btcustom\b/)
    );
    assert.equal(screen.getByText('Tab 1 content').id, 'test-pane-1');
  });

  it('Should show the correct first tab with no active key value', () => {
    render(
      <Tabs id="test">
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(screen.getByText('Tab 1 content').className.match(/\bactive\b/));
    assert.ok(!screen.getByText('Tab 2 content').className.match(/\bactive\b/));

    assert.equal(
      screen.getByRole('tab', { name: 'Tab 1' }).getAttribute('aria-selected'),
      'true'
    );
    assert.equal(
      screen.getByRole('tab', { name: 'Tab 2' }).getAttribute('aria-selected'),
      'false'
    );
  });

  it('Should show the correct first tab with children array', () => {
    const panes = [0, 1].map(index => (
      <Tab key={index} eventKey={index} title={`Tab #${index}`}>
        <div>content</div>
      </Tab>
    ));

    render(
      <Tabs id="test">
        {panes}
        {null}
      </Tabs>
    );

    assert.equal(
      screen.getByRole('tab', { name: 'Tab #0' }).getAttribute('aria-selected'),
      'true'
    );
    assert.equal(
      screen.getByRole('tab', { name: 'Tab #1' }).getAttribute('aria-selected'),
      'false'
    );
  });

  it('Should show the correct tab when selected', async () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    render(
      <Tabs id="test" defaultActiveKey={2} animation={false}>
        <Tab title={tab1} eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    await userEvent.click(screen.getByText('Tab 1'));

    assert.ok(screen.getByText('Tab 1 content').className.match(/\bactive\b/));
    assert.ok(!screen.getByText('Tab 2 content').className.match(/\bactive\b/));

    assert.equal(
      screen.getByRole('tab', { name: 'Tab 1' }).getAttribute('aria-selected'),
      'true'
    );
    assert.equal(
      screen.getByRole('tab', { name: 'Tab 2' }).getAttribute('aria-selected'),
      'false'
    );
  });

  it('Should mount initial tab and no others when unmountOnExit is true and animation is false', () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    render(
      <Tabs id="test" defaultActiveKey={1} animation={false} unmountOnExit>
        <Tab title={tab1} eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
        <Tab title="Tab 3" eventKey={3}>
          Tab 3 content
        </Tab>
      </Tabs>
    );

    expect(screen.queryByText('Tab 1 content')).to.exist;
    expect(screen.queryByText('Tab 2 content')).not.to.exist;
    expect(screen.queryByText('Tab 3 content')).not.to.exist;
  });

  it('Should mount the correct tab when selected and unmount the previous when unmountOnExit is true and animation is false', async () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    render(
      <Tabs id="test" defaultActiveKey={2} animation={false} unmountOnExit>
        <Tab title={tab1} eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    await userEvent.click(screen.getByRole('tab', { name: 'Tab 1' }));

    expect(screen.queryByText('Tab 1 content')).to.exist;
    expect(screen.queryByText('Tab 2 content')).to.not.exist;

    assert.equal(
      screen.getByRole('tab', { name: 'Tab 1' }).getAttribute('aria-selected'),
      'true'
    );
    assert.equal(
      screen.getByRole('tab', { name: 'Tab 2' }).getAttribute('aria-selected'),
      'false'
    );
  });

  it('Should treat active key of null as nothing selected', () => {
    render(
      <Tabs id="test" activeKey={null} onSelect={() => {}}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.equal(
      screen.getByRole('tab', { name: 'Tab 1' }).getAttribute('aria-selected'),
      'false'
    );
    assert.equal(
      screen.getByRole('tab', { name: 'Tab 2' }).getAttribute('aria-selected'),
      'false'
    );
  });

  it('Should pass default bsStyle (of "tabs") to Nav', () => {
    render(
      <Tabs id="test" defaultActiveKey={1} animation={false}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(document.querySelector('.nav-tabs'));
  });

  it('Should pass bsStyle to Nav', () => {
    render(
      <Tabs id="test" bsStyle="pills" defaultActiveKey={1} animation={false}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(document.querySelector('.nav-pills'));
  });

  it('Should pass disabled to Nav', () => {
    render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(document.querySelector('.disabled'));
  });

  it('Should not show content when clicking disabled tab', () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    render(
      <Tabs id="test" defaultActiveKey={2} animation={false}>
        <Tab title={tab1} eventKey={1} disabled>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    userEvent.click(screen.getByRole('tab', { name: 'Tab 1' }));

    assert.ok(
      !screen.queryByText('Tab 1 content').className.match(/\bactive\b/)
    );
    assert.ok(
      screen.queryByText('Tab 2 content').className.match(/\bactive\b/)
    );

    assert.equal(
      screen.getByRole('tab', { name: 'Tab 1' }).getAttribute('aria-selected'),
      'false'
    );
    assert.equal(
      screen.getByRole('tab', { name: 'Tab 2' }).getAttribute('aria-selected'),
      'true'
    );
  });

  describe('active state invariants', () => {
    [true, false].forEach(animation => {
      it(`should correctly set "active" after Tab is removed with "animation=${animation}"`, () => {
        const { rerender } = render(
          <Tabs
            id="test"
            activeKey={2}
            animation={animation}
            onSelect={() => {}}
          >
            <Tab title="Tab 1" eventKey={1}>
              Tab 1 content
            </Tab>
            <Tab title="Tab 2" eventKey={2}>
              Tab 2 content
            </Tab>
          </Tabs>
        );

        assert.ok(
          !screen.queryByText('Tab 1 content').className.match(/\bactive\b/)
        );
        assert.ok(
          screen.queryByText('Tab 2 content').className.match(/\bactive\b/)
        );

        // second tab has been removed
        rerender(
          <Tabs
            id="test"
            activeKey={1}
            animation={animation}
            onSelect={() => {}}
          >
            <Tab title="Tab 1" eventKey={1}>
              Tab 1 content
            </Tab>
          </Tabs>
        );

        assert.ok(
          screen.queryByText('Tab 1 content').className.match(/\bactive\b/)
        );
      });
    });
  });

  describe('Web Accessibility', () => {
    beforeEach(() => {
      render(
        <Tabs defaultActiveKey={2} id="test">
          <Tab title="Tab 1" eventKey={1}>
            Tab 1 content
          </Tab>
          <Tab title="Tab 2" eventKey={2}>
            Tab 2 content
          </Tab>
        </Tabs>
      );
    });

    it('Should generate ids from parent id', () => {
      const tabs = screen.getAllByRole('tab');

      tabs.every(tab => assert.ok(tab.getAttribute('aria-controls') && tab.id));
    });

    it('Should add aria-labelledby', () => {
      const panes = screen.getAllByRole('tabpanel', { hidden: true });

      assert.equal(panes[0].getAttribute('aria-labelledby'), 'test-tab-1');
      assert.equal(panes[1].getAttribute('aria-labelledby'), 'test-tab-2');
    });

    it('Should add aria-controls', () => {
      const tabs = screen.getAllByRole('tab');

      assert.equal(tabs[0].getAttribute('aria-controls'), 'test-pane-1');
      assert.equal(tabs[1].getAttribute('aria-controls'), 'test-pane-2');
    });

    it('Should add role=tablist to the nav', () => {
      const nav = document.querySelector('.nav.nav-tabs');

      assert.equal(nav.role, 'tablist');
    });

    it('Should add aria-selected to the nav item for the selected tab', () => {
      const link1 = screen.getByRole('tab', { name: 'Tab 1' });
      const link2 = screen.getByRole('tab', { name: 'Tab 2' });

      assert.equal(link1.getAttribute('aria-selected'), 'false');
      assert.equal(link2.getAttribute('aria-selected'), 'true');
    });
  });

  it('Should not pass className to Nav', () => {
    render(
      <Tabs id="test" bsStyle="pills" defaultActiveKey={1} animation={false}>
        <Tab title="Tab 1" eventKey={1} className="my-tab-class">
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const myTabClass = screen.getByRole('tab', { name: 'Tab 1' });
    const myNavItem = document.querySelector('.nav-pills');

    assert.notDeepEqual(myTabClass, myNavItem);
  });

  it('Should pass className, Id, and style to Tabs', () => {
    render(
      <Tabs
        bsStyle="pills"
        defaultActiveKey={1}
        animation={false}
        className="my-tabs-class"
        id="my-tabs-id"
        style={{ opacity: 0.5 }}
      />
    );

    assert.equal(
      document.getElementById('my-tabs-id').getAttribute('class'),
      'my-tabs-class'
    );
    assert.equal(
      document.querySelector('.my-tabs-class').getAttribute('id'),
      'my-tabs-id'
    );
    // Decimal point string depends on locale
    assert.equal(
      parseFloat(document.getElementById('my-tabs-id').style.opacity),
      0.5
    );
  });

  it('should derive bsClass from parent', () => {
    render(
      <Tabs id="test" bsClass="my-tabs">
        <Tab eventKey={1} title="Tab 1" />
        <Tab eventKey={2} title="Tab 2" bsClass="my-pane" />
      </Tabs>
    );

    assert.lengthOf(document.querySelectorAll('.my-tabs-pane'), 2);
    assert.lengthOf(document.querySelectorAll('.my-pane'), 0);
  });
});
