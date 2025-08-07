import { render, screen } from '@testing-library/react';
import React from 'react';

import Jumbotron from '../src/Jumbotron';

describe('<Jumbotron>', () => {
  it('Should output a div with content', () => {
    render(
      <Jumbotron>
        <strong>Content</strong>
      </Jumbotron>
    );

    assert.equal(document.querySelector('.jumbotron').nodeName, 'DIV');
    assert.ok(screen.getByText('Content'));
  });

  it('Should have a jumbotron class', () => {
    render(<Jumbotron>Content</Jumbotron>);
    assert.ok(
      document.querySelector('.jumbotron').className.match(/\bjumbotron\b/)
    );
  });

  it('Should override node class', () => {
    render(
      <Jumbotron componentClass="section">
        <strong>Content</strong>
      </Jumbotron>
    );
    assert.equal(document.querySelector('.jumbotron').nodeName, 'SECTION');
  });
});
