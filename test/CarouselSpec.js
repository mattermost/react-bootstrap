import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Carousel from '../src/Carousel';

describe('<Carousel>', () => {
  const items = [
    <Carousel.Item key={1}>Item 1 content</Carousel.Item>,
    <Carousel.Item key={2}>Item 2 content</Carousel.Item>
  ];

  it('Should show the correct item', async () => {
    render(<Carousel activeIndex={1}>{items}</Carousel>);

    assert.equal(
      screen.getByText('Item 1 content').classList.contains('active'),
      false
    );
    assert.equal(
      screen.getByText('Item 2 content').classList.contains('active'),
      true
    );
  });

  it('Should show the correct item with defaultActiveIndex', () => {
    render(<Carousel defaultActiveIndex={1}>{items}</Carousel>);

    assert.equal(
      screen.getByText('Item 1 content').classList.contains('active'),
      false
    );
    assert.equal(
      screen.getByText('Item 2 content').classList.contains('active'),
      true
    );
    assert.equal(
      document.querySelectorAll('.carousel-indicators > li').length,
      2
    );
  });

  it('Should handle null children', () => {
    render(
      <Carousel activeIndex={1}>
        <Carousel.Item>Item 1 content</Carousel.Item>
        {null}
        {false}
        <Carousel.Item>Item 2 content</Carousel.Item>
      </Carousel>
    );

    assert.equal(
      screen.getByText('Item 1 content').classList.contains('active'),
      false
    );
    assert.equal(
      screen.getByText('Item 2 content').classList.contains('active'),
      true
    );
    assert.equal(
      document.querySelectorAll('.carousel-indicators > li').length,
      2
    );
  });

  it('Should call onSelect when indicator selected', done => {
    function onSelect(index, ...args) {
      expect(index).to.equal(0);

      // By using rest arguments here, we can avoid triggering the logic to
      // persist and decorate the event.
      const [event] = args;
      expect(event).to.not.exist;

      done();
    }

    render(
      <Carousel activeIndex={1} onSelect={onSelect}>
        {items}
      </Carousel>
    );

    userEvent.click(document.querySelectorAll('.carousel-indicators > li')[0]);
  });

  it('Should call onSelect with direction', done => {
    function onSelect(index, event) {
      expect(index).to.equal(0);
      expect(event.direction).to.equal('prev');
      expect(event.isPersistent()).to.be.true;

      done();
    }

    render(
      <Carousel activeIndex={1} onSelect={onSelect}>
        {items}
      </Carousel>
    );

    userEvent.click(document.querySelectorAll('.carousel-indicators > li')[0]);
  });

  it('Should call onSelect with direction when there is no event', done => {
    function onSelect(index, event) {
      expect(index).to.equal(0);
      expect(event.direction).to.equal('next');
      expect(event.target).to.not.exist;

      done();
    }

    let instance;
    render(
      <Carousel
        ref={element => (instance = element)}
        activeIndex={1}
        onSelect={onSelect}
      >
        {items}
      </Carousel>
    );

    instance.handleNext();
  });

  it('Should show back button control on the first image if wrap is true', async () => {
    let instance;
    render(
      <Carousel
        ref={element => (instance = element)}
        defaultActiveIndex={0}
        controls
        wrap
      >
        {items}
      </Carousel>
    );

    const prevButton = screen.getByText('Previous');
    assert.ok(prevButton);

    assert.equal(instance.state.activeIndex, 0);
    await userEvent.click(prevButton);
    assert.equal(instance.state.activeIndex, 1);
  });

  it('Should show next button control on the last image if wrap is true', async () => {
    let instance;
    render(
      <Carousel
        ref={element => (instance = element)}
        defaultActiveIndex={1}
        controls
        wrap
      >
        {items}
      </Carousel>
    );

    const nextButton = screen.getByText('Next');
    assert.ok(nextButton);

    assert.equal(instance.state.activeIndex, 1);
    await userEvent.click(nextButton);
    assert.equal(instance.state.activeIndex, 0);
  });

  it('Should not show the prev button on the first image if wrap is false', async () => {
    let instance;
    render(
      <Carousel
        ref={element => (instance = element)}
        defaultActiveIndex={0}
        controls
        wrap={false}
      >
        {items}
      </Carousel>
    );

    const prevButton = screen.queryByText('Previous');
    const nextButton = screen.queryByText('Next');

    assert.ok(!prevButton);
    assert.ok(nextButton);

    assert.equal(instance.state.activeIndex, 0);
    await userEvent.click(nextButton);
    assert.equal(instance.state.activeIndex, 1);
  });

  it('Should not show the next button on the last image if wrap is false', async () => {
    let instance;
    render(
      <Carousel
        ref={element => (instance = element)}
        defaultActiveIndex={1}
        controls
        wrap={false}
      >
        {items}
      </Carousel>
    );

    const prevButton = screen.queryByText('Previous');
    const nextButton = screen.queryByText('Next');

    assert.ok(prevButton);
    assert.ok(!nextButton);

    assert.equal(instance.state.activeIndex, 1);
    await userEvent.click(prevButton);
    assert.equal(instance.state.activeIndex, 0);
  });

  it('Should allow user to specify a previous and next icon', () => {
    render(
      <Carousel
        activeIndex={1}
        controls
        wrap={false}
        prevIcon={<span className="ficon ficon-left" />}
        nextIcon={<span className="ficon ficon-right" />}
      >
        <Carousel.Item>Item 1 content</Carousel.Item>
        <Carousel.Item>Item 2 content</Carousel.Item>
        <Carousel.Item>Item 3 content</Carousel.Item>
      </Carousel>
    );

    const prevButtons = document.querySelectorAll('.ficon-left');
    const nextButtons = document.querySelectorAll('.ficon-right');

    assert.equal(prevButtons.length, 1);
    assert.equal(nextButtons.length, 1);
  });

  it('Should allow user to specify a previous and next SR label', () => {
    render(
      <Carousel
        activeIndex={1}
        controls
        wrap={false}
        prevLabel="Previous awesomeness"
        nextLabel="Next awesomeness"
      >
        <Carousel.Item>Item 1 content</Carousel.Item>
        <Carousel.Item>Item 2 content</Carousel.Item>
        <Carousel.Item>Item 3 content</Carousel.Item>
      </Carousel>
    );

    const prevButton = screen.getByText('Previous awesomeness');
    const nextButton = screen.getByText('Next awesomeness');

    assert.ok(prevButton);
    assert.ok(nextButton);
  });

  it('Should not render labels when values are falsy', () => {
    [null, ''].forEach(falsyValue => {
      render(
        <Carousel
          activeIndex={1}
          controls
          wrap={false}
          prevLabel={falsyValue}
          nextLabel={falsyValue}
        >
          <Carousel.Item>Item 1 content</Carousel.Item>
          <Carousel.Item>Item 2 content</Carousel.Item>
          <Carousel.Item>Item 3 content</Carousel.Item>
        </Carousel>
      );

      const labels = document.querySelectorAll('.sr-only');
      assert.equal(
        labels.length,
        0,
        `should not render labels for value ${falsyValue}`
      );
    });
  });

  it('Should transition properly when slide animation is disabled', async () => {
    let instance;
    render(
      <Carousel
        ref={element => (instance = element)}
        defaultActiveIndex={0}
        slide={false}
      >
        {items}
      </Carousel>
    );

    const nextButton = screen.getByText('Next');
    assert.ok(nextButton);

    const prevButton = screen.getByText('Previous');
    assert.ok(prevButton);

    assert.equal(instance.state.activeIndex, 0);

    await userEvent.click(nextButton);
    assert.equal(instance.state.activeIndex, 1);

    await userEvent.click(prevButton);
    assert.equal(instance.state.activeIndex, 0);
  });

  it('Should render on update, default active item > new child length', () => {
    // default active is the 2nd item, which will be removed on
    // subsequent render
    const { rerender } = render(
      <Carousel defaultActiveIndex={1}>{items}</Carousel>
    );

    const item1 = screen.getByText('Item 1 content');
    const item2 = screen.getByText('Item 2 content');

    assert.equal(item1.classList.contains('active'), false);
    assert.equal(item2.classList.contains('active'), true);
    assert.equal(
      document.querySelectorAll('.carousel-indicators > li').length,
      2
    );

    let fewerItems = items.slice();
    fewerItems.pop();
    rerender(<Carousel defaultActiveIndex={0}>{fewerItems}</Carousel>);

    const item3 = screen.getByText('Item 1 content');

    assert.equal(
      document.querySelectorAll('.carousel-indicators > li').length,
      1
    );
    assert.equal(document.querySelectorAll('.item').length, 1);
    assert.equal(item3.classList.contains('active'), true);
  });

  it('Should render on update, active item > new child length', () => {
    // default active is the 2nd item, which will be removed on
    // subsequent render
    const { rerender } = render(<Carousel activeIndex={1}>{items}</Carousel>);

    const item1 = screen.getByText('Item 1 content');
    const item2 = screen.getByText('Item 2 content');

    assert.equal(item1.classList.contains('active'), false);
    assert.equal(item2.classList.contains('active'), true);
    assert.equal(
      document.querySelectorAll('.carousel-indicators > li').length,
      2
    );

    let fewerItems = items.slice();
    fewerItems.pop();
    rerender(<Carousel>{fewerItems}</Carousel>);

    const item3 = screen.getByText('Item 1 content');

    assert.equal(
      document.querySelectorAll('.carousel-indicators > li').length,
      1
    );
    assert.equal(document.querySelectorAll('.item').length, 1);
    assert.equal(item3.classList.contains('active'), true);
  });
});
