import { render, screen } from '@testing-library/react';
import React from 'react';

import ListGroup from '../src/ListGroup';
import ListGroupItem from '../src/ListGroupItem';

describe('<ListGroup>', () => {
  describe('All children are of type ListGroupItem', () => {
    it('Should output a "div" with the class "list-group"', () => {
      render(<ListGroup />);
      assert.equal(document.querySelector('.list-group').nodeName, 'DIV');
    });

    it('Should support a single "ListGroupItem" child', () => {
      render(
        <ListGroup>
          <ListGroupItem>Only Child</ListGroupItem>
        </ListGroup>
      );

      assert.ok(screen.getByText('Only Child'));
    });

    it('Should support a single "ListGroupItem" child contained in an array', () => {
      let child = [<ListGroupItem key={42}>Only Child in array</ListGroupItem>];
      render(<ListGroup>{child}</ListGroup>);

      assert.ok(screen.getByText('Only Child in array'));
    });

    it('Should output a "ul" when single "ListGroupItem" child is a list item', () => {
      render(
        <ListGroup>
          <ListGroupItem>Only Child</ListGroupItem>
        </ListGroup>
      );

      assert.equal(document.querySelector('.list-group').nodeName, 'UL');
      assert.equal(
        document.querySelector('.list-group').firstChild.nodeName,
        'LI'
      );
    });

    it('Should output a "div" when single "ListGroupItem" child is an anchor', () => {
      render(
        <ListGroup>
          <ListGroupItem href="#test">Only Child</ListGroupItem>
        </ListGroup>
      );

      assert.equal(document.querySelector('.list-group').nodeName, 'DIV');
      assert.equal(
        document.querySelector('.list-group').firstChild.nodeName,
        'A'
      );
    });

    it('Should support multiple "ListGroupItem" children', () => {
      render(
        <ListGroup>
          <ListGroupItem>1st Child</ListGroupItem>
          <ListGroupItem>2nd Child</ListGroupItem>
        </ListGroup>
      );

      assert.ok(screen.getByText('1st Child'));
      assert.ok(screen.getByText('2nd Child'));
    });

    it('Should support multiple "ListGroupItem" children including a subset contained in an array', () => {
      let itemArray = [
        <ListGroupItem key={0}>2nd Child nested</ListGroupItem>,
        <ListGroupItem key={1}>3rd Child nested</ListGroupItem>
      ];

      render(
        <ListGroup>
          <ListGroupItem>1st Child</ListGroupItem>
          {itemArray}
          <ListGroupItem>4th Child</ListGroupItem>
        </ListGroup>
      );

      assert.ok(screen.getByText('1st Child'));
      assert.ok(screen.getByText('2nd Child nested'));
    });

    it('Should output a "ul" when children are list items', () => {
      render(
        <ListGroup>
          <ListGroupItem>1st Child</ListGroupItem>
          <ListGroupItem>2nd Child</ListGroupItem>
        </ListGroup>
      );
      assert.ok(document.querySelector('.list-group'));
      assert.equal(document.querySelector('.list-group').nodeName, 'UL');
      assert.equal(
        document.querySelector('.list-group').firstChild.nodeName,
        'LI'
      );
      assert.equal(
        document.querySelector('.list-group').lastChild.nodeName,
        'LI'
      );
    });

    it('Should output a "div" when "ListGroupItem" children are anchors and spans', () => {
      render(
        <ListGroup>
          <ListGroupItem href="#test">1st Child</ListGroupItem>
          <ListGroupItem>2nd Child</ListGroupItem>
        </ListGroup>
      );
      assert.equal(document.querySelector('.list-group').nodeName, 'DIV');
      assert.equal(
        document.querySelector('.list-group').firstChild.nodeName,
        'A'
      );
      assert.equal(
        document.querySelector('.list-group').lastChild.nodeName,
        'SPAN'
      );
    });

    it('Should output a "div" when "ListGroupItem" children have an onClick handler', () => {
      render(
        <ListGroup>
          <ListGroupItem onClick={() => null}>1st Child</ListGroupItem>
          <ListGroupItem>2nd Child</ListGroupItem>
        </ListGroup>
      );
      assert.equal(document.querySelector('.list-group').nodeName, 'DIV');
      assert.equal(
        document.querySelector('.list-group').firstChild.nodeName,
        'BUTTON'
      );
      assert.equal(
        document.querySelector('.list-group').lastChild.nodeName,
        'SPAN'
      );
    });

    it('Should support an element id through "id" prop', () => {
      render(
        <ListGroup id="testItem">
          <ListGroupItem>Child</ListGroupItem>
        </ListGroup>
      );
      assert.equal(document.querySelector('.list-group').nodeName, 'UL');
      assert.equal(document.querySelector('.list-group').id, 'testItem');
    });
  });

  describe('Some or all children are user-defined custom components', () => {
    it('Should output a div by default when children are custom components', () => {
      class CustomComponent extends React.Component {
        render() {
          return (
            <li>
              <ListGroupItem>{this.props.children}</ListGroupItem>
            </li>
          );
        }
      }

      render(
        <ListGroup id="testItem">
          <CustomComponent>Child</CustomComponent>
        </ListGroup>
      );
      assert.ok(document.querySelector('.list-group'));
      assert.equal(document.querySelector('.list-group').nodeName, 'DIV');
      assert.equal(
        document.querySelector('.list-group').firstChild.nodeName,
        'LI'
      );
    });

    it('Should use a "componentClass" prop if specified if any children are custom components', () => {
      class CustomComponent extends React.Component {
        render() {
          return (
            <li>
              <ListGroupItem>{this.props.children}</ListGroupItem>
            </li>
          );
        }
      }

      render(
        <ListGroup id="testItem" componentClass="ul">
          <CustomComponent>Custom Child</CustomComponent>
          <CustomComponent>Custom Child</CustomComponent>
          <ListGroupItem listItem>RB Child</ListGroupItem>
        </ListGroup>
      );
      assert.ok(document.querySelector('.list-group'));
      assert.equal(document.querySelector('.list-group').nodeName, 'UL');
      assert.equal(
        document.querySelector('.list-group').lastChild.nodeName,
        'LI'
      );
    });
  });
});
