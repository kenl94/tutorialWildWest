import React from 'react';

import 'semantic-ui-css/semantic.min.css';

const products = [
  {
    "id": 1,
    "title": "Yellow Lorem",
    "description": "Lorem Ipsum is simply dummy text of the printing industry.",
    "url": "#",
    "votes": 41,
    "submitterAvatarUrl": "images/avatars/avatar1.png",
    "productImageUrl": "images/products/yellow.jpeg"
  },
  {
    "id": 2,
    "title": "Red Lorem",
    "description": "Lorem Ipsum is simply dummy text of the printing industry.",
    "url": "#",
    "votes": 13,
    "submitterAvatarUrl": "images/avatars/avatar2.png",
    "productImageUrl": "images/products/red.png"
  },
  {
    "id": 3,
    "title": "Blue Lorem",
    "description": "Lorem Ipsum is simply dummy text of the printing industry.",
    "url": "#",
    "votes": 26,
    "submitterAvatarUrl": "images/avatars/avatar3.png",
    "productImageUrl": "images/products/blue.png"
  },
  {
    "id": 4,
    "title": "Green Lorem",
    "description": "Lorem Ipsum is simply dummy text of the printing industry.",
    "url": "#",
    "votes": 9,
    "submitterAvatarUrl": "images/avatars/avatar2.png",
    "productImageUrl": "images/products/green.png"
  }
]

class ProductList extends React.Component {

  constructor(props) {
    super(props);

    // initialize state with empty products array
    this.state = {
      products: []
    };

    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }

  // set initial state after component mounts
  componentDidMount() {
    this.setState({ products: products })
  }

  handleProductUpVote(productId) {
    // create new array of products with single updated product
    const updatedProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        // copy product object & update its votes
        return Object.assign({}, product, { votes: product.votes + 1 });
      } else {
        return product;
      }
    })
    // update state in immutable way by replacing previous products with new updatedProducts
    this.setState({ products: updatedProducts })
    console.log('Product ' + productId + ' was upvoted.');
  }

  render() {
    const productsOrdered = this.state.products.sort((a, b) => (b.votes - a.votes));
    // immutability
    // map creates new array & productsList doesn't reference the same object as this.state.products
    const productsList = productsOrdered.map((product) =>
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    );

    return (
      <div className="ui unstackable items">
        {productsList}
      </div>
    );
  }
}

export default ProductList;


class Product extends React.Component {

  constructor(props) {
    super(props);

    this.handleUpVote = this.handleUpVote.bind(this);
  }

  handleUpVote() {
    this.props.onVote(this.props.id);
  }

  render() {
    return (
      <div className='item'>

        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>

        <div className='middle aligned content'>

          <div className='header'>
            <a onClick={this.handleUpVote}>
            <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>

          <div className='description'>
            <a href={this.props.url}>
            {this.props.title}
            </a>
            <p>
            {this.props.description}
            </p>
          </div>

          <div className='extra'>
            <span>Submitted by:</span>
            <img
            className='ui avatar image'
            src={this.props.submitterAvatarUrl}
            />
          </div>

        </div>

      </div>
    );
  }
}
