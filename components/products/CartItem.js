import { Component } from 'react';

// import Shelf from '../Shelf';
import PropTypes from 'prop-types';

class CartItem extends Component {
  state = {
    quantity: this.props.cart.quantity,
    price: this.props.cart.product.price,
    total_price: 0,
    cart : this.props.cart
  }

  componentDidMount(){
    this.setState({total_price: this.state.quantity * this.state.price})

  }

  calculateItemTotal = (e) =>{
    let quantity = $(e.target).val();
    let total_price;
    let prev_total = this.state.total_price;
    if(isNaN(quantity)){
      quantity = this.start.quantity;
      $(e.target).val(quantity)
      total_price = quantity * this.props.cart.product.price;
       this.setState({total_price});
       this.props.calculateCartTotal(prev_total, total_price)
       return alert("Quantity is not a valid number");
    }
     total_price = quantity * this.state.price;
    this.setState({total_price, quantity});
    this.props.calculateCartTotal(prev_total, total_price)
  }



  render() {
    const { cart } = this.state;
    return (
      <tr>
        <td className="product-thumbnail">
          <img src={"/static/images/"+cart.product.image} alt="Image" className="img-fluid" />
        </td>
        <td className="product-name">
          <h2 className="h5 text-black">{cart.product.name}</h2>
        </td>
        <td>${cart.product.price}</td>
        <td>
          <div className="input-group mb-3" style={{maxWidth: '120px'}}>
            <div className="input-group-prepend">
              <button className="btn btn-outline-primary js-btn-minus" type="button">−</button>
            </div>
            <input type="text" onChange={this.calculateItemTotal} className="form-control text-center" defaultValue={cart.quantity} placeholder={1} aria-label="Example text with button addon" aria-describedby="button-addon1" />
            <div className="input-group-append">
              <button className="btn btn-outline-primary js-btn-plus" type="button">+</button>
            </div>
          </div>
        </td>
        <td id="total_price">${this.state.total_price}</td>
        <td><a  className="btn btn-primary btn-sm" onClick={this.props.deleteItemFromCart.bind(this, cart._id, this.state.quantity, this.state.price)} style={{color:'white'}}>X</a></td>
      </tr>

    );
  }
}


///prop Types
CartItem.propTypes = {
cart : PropTypes.object.isRequired
}

export default CartItem;
