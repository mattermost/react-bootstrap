import { render } from '@testing-library/react';
import React from 'react';

import Grid from '../src/Grid';

describe('<Grid>', () => {
  it('uses "div" by default', () => {
    render(<Grid />);

    assert.equal(document.querySelector('.container').nodeName, 'DIV');
  });

  it('has "container" class by default', () => {
    render(<Grid />);
    assert.equal(document.querySelector('.container').className, 'container');
  });

  it('turns grid into "full-width" layout via "fluid" property set', () => {
    render(<Grid fluid />);
    assert.equal(
      document.querySelector('.container-fluid').className,
      'container-fluid'
    );
  });

  it('should merge additional classes passed in', () => {
    render(<Grid className="whatever" fluid />);
    assert.ok(
      document.querySelector('.container-fluid').className.match(/\bwhatever\b/)
    );
    assert.ok(
      document
        .querySelector('.container-fluid')
        .className.match(/\bcontainer-fluid\b/)
    );
  });

  it('allows custom elements instead of "div"', () => {
    render(<Grid componentClass="section" />);

    assert.equal(document.querySelector('.container').nodeName, 'SECTION');
  });
});
