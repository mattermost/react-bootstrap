import { render, screen } from '@testing-library/react';
import React from 'react';

import ProgressBar from '../src/ProgressBar';

import { getOne, shouldWarn } from './helpers';

describe('<ProgressBar>', () => {
  it('Should output a progress bar with wrapper', () => {
    render(<ProgressBar min={0} max={10} now={0} />);

    assert.equal(document.querySelector('.progress').nodeName, 'DIV');
    assert.ok(
      document.querySelector('.progress').className.match(/\bprogress\b/)
    );
    assert.ok(
      screen.getByRole('progressbar').className.match(/\bprogress-bar\b/)
    );
    assert.equal(
      screen.getByRole('progressbar').getAttribute('role'),
      'progressbar'
    );
  });

  it('Should have the default class', () => {
    render(<ProgressBar min={0} max={10} now={0} />);

    assert.ok(
      screen.getByRole('progressbar').className.match(/\bprogress-bar\b/)
    );
  });

  it('Should have the success class', () => {
    render(<ProgressBar min={0} max={10} now={0} bsStyle="success" />);

    assert.ok(
      screen
        .getByRole('progressbar')
        .className.match(/\bprogress-bar-success\b/)
    );
  });

  it('Should have the warning class', () => {
    render(<ProgressBar min={0} max={10} now={0} bsStyle="warning" />);

    assert.ok(
      screen
        .getByRole('progressbar')
        .className.match(/\bprogress-bar-warning\b/)
    );
  });

  it('Should default to min:0, max:100', () => {
    render(<ProgressBar now={5} />);
    const bar = screen.getByRole('progressbar');

    assert.equal(bar.getAttribute('aria-valuemin'), '0');
    assert.equal(bar.getAttribute('aria-valuemax'), '100');
  });

  it('Should have 0% computed width', () => {
    render(<ProgressBar min={0} max={10} now={0} />);

    assert.equal(screen.getByRole('progressbar').style.width, '0%');
  });

  it('Should have 10% computed width', () => {
    render(<ProgressBar min={0} max={10} now={1} />);

    assert.equal(screen.getByRole('progressbar').style.width, '10%');
  });

  it('Should have 100% computed width', () => {
    render(<ProgressBar min={0} max={10} now={10} />);

    assert.equal(screen.getByRole('progressbar').style.width, '100%');
  });

  it('Should have 50% computed width with non-zero min', () => {
    render(<ProgressBar min={1} max={11} now={6} />);

    assert.equal(screen.getByRole('progressbar').style.width, '50%');
  });

  it('Should not have label', () => {
    render(<ProgressBar min={0} max={10} now={5} />);

    assert.equal(screen.getByRole('progressbar').textContent, '');
  });

  it('Should have label', () => {
    render(
      <ProgressBar
        min={0}
        max={10}
        now={5}
        bsStyle="success"
        label="progress bar label"
      />
    );

    assert.equal(
      screen.getByRole('progressbar'),
      screen.getByText('progress bar label')
    );
  });

  it('Should have screen reader only label', () => {
    render(
      <ProgressBar
        min={0}
        max={10}
        now={5}
        srOnly
        bsStyle="success"
        label="progress bar label"
      />
    );
    const srLabel = document.querySelector('.sr-only');

    assert.equal(srLabel.textContent, 'progress bar label');
  });

  it('Should have a label that is a React component', () => {
    const customLabel = <strong className="special-label">My label</strong>;

    render(<ProgressBar min={0} max={10} now={5} label={customLabel} />);

    assert.ok(
      screen.getByRole('progressbar').contains(screen.getByText('My label'))
    );
  });

  it('Should have screen reader only label that wraps a React component', () => {
    const customLabel = <strong className="special-label">My label</strong>;

    render(<ProgressBar min={0} max={10} now={5} label={customLabel} srOnly />);

    const srLabel = document.querySelector('.sr-only');
    const component = getOne(srLabel.getElementsByClassName('special-label'));

    assert.ok(component);
  });

  it('Should show striped bar', () => {
    render(<ProgressBar min={1} max={11} now={6} striped />);

    assert.ok(
      screen
        .getByRole('progressbar')
        .className.match(/\bprogress-bar-striped\b/)
    );
  });

  it('Should show animated striped bar', () => {
    render(<ProgressBar min={1} max={11} now={6} active />);

    const barClassName = screen.getByRole('progressbar').className;

    assert.ok(barClassName.match(/\bprogress-bar-striped\b/));
    assert.ok(barClassName.match(/\bactive\b/));
  });

  it('Should show stacked bars', () => {
    render(
      <ProgressBar>
        <ProgressBar key={1} now={50} />
        <ProgressBar key={2} now={30} />
      </ProgressBar>
    );
    const wrapper = document.querySelector('.progress');
    const bar1 = wrapper.firstChild;
    const bar2 = wrapper.lastChild;

    assert.ok(wrapper.className.match(/\bprogress\b/));
    assert.ok(bar1.className.match(/\bprogress-bar\b/));
    assert.equal(bar1.style.width, '50%');
    assert.ok(bar2.className.match(/\bprogress-bar\b/));
    assert.equal(bar2.style.width, '30%');
  });

  it('Should render active and striped children in stacked bar too', () => {
    render(
      <ProgressBar>
        <ProgressBar active key={1} now={50} />
        <ProgressBar striped key={2} now={30} />
      </ProgressBar>
    );
    const wrapper = document.querySelector('.progress');
    const bar1 = wrapper.firstChild;
    const bar2 = wrapper.lastChild;

    assert.ok(wrapper.className.match(/\bprogress\b/));

    assert.ok(bar1.className.match(/\bprogress-bar\b/));
    assert.ok(bar1.className.match(/\bactive\b/));
    assert.ok(bar1.className.match(/\bprogress-bar-striped\b/));

    assert.ok(bar2.className.match(/\bprogress-bar\b/));
    assert.ok(bar2.className.match(/\bprogress-bar-striped\b/));
    assert.notOk(bar2.className.match(/\bactive\b/));
  });

  it('Should forward className and style to nested bars', () => {
    render(
      <ProgressBar>
        <ProgressBar now={1} className="bar1" />
        <ProgressBar now={2} style={{ minWidth: 10 }} />
      </ProgressBar>
    );
    const wrapper = document.querySelector('.progress');
    const bar1 = wrapper.firstChild;
    const bar2 = wrapper.lastChild;

    assert.ok(bar1.className.match(/\bbar1\b/));
    assert.equal(bar2.style.minWidth, '10px');
  });

  it('allows only ProgressBar in children', () => {
    shouldWarn('can contain only ProgressBar');

    function NotProgressBar() {
      return null;
    }

    render(
      <ProgressBar>
        <ProgressBar key={1} />
        <NotProgressBar />
        foo
        <ProgressBar key={2} />
      </ProgressBar>
    );
  });
});
