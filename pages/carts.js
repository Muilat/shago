import { Component } from "react";
import Router from 'next/router';

import Layout from '../components/layout';
import Header from "../components/Header";
import CartItem from '../components/products/CartItem';
import Sizes from './Sizes';

import axios from 'axios';

class Carts extends Component {
  static getInitialProps ({ req: { carts } }) {
    return { carts };
  }
  state = {
    loading: true,
    total_price : 0,
    carts: this.props.carts
  }
  componentDidMount() {
    let {carts} = this.state;
    let total_price = 0;
    for (var i = 0; i < carts.length; i++) {
      total_price = total_price + carts[i].product.price * carts[i].quantity;
      // console.log("total_price "+total_price);
    }
    this.setState({total_price});
    // this.fetchData();
  }

/*
//fetch data from api
  fetchData() {
    this.setState({loading: true}, () => {
      axios.get('/api/shops', {
        params: {
          reference: this.state.reference,
          min_price: this.state.min_price,
          max_price: this.state.max_price,
          sizes: this.state.sizes,
          // offset: this.state.offset
        }
      })
      .then((response) => {
        const { products } = response.data;
        this.setState({
          products: response.data,
          loading: false
        });

      })
      .catch((error) => {
        this.setState({loading: false});
      });
    });
  }

  checkLoading(){
    if (this.state.loading) {
       return <div className='alert alert-info'>loading....</div>
    } else {
      return products.map(product =>
       <ProductItem key={product.id} product={product} />

      )
    }
  }

  //change this.state. from form event (onchange, onclick)
  changeState = (e)=>{
    e.preventDefault();
    // console.log(e.target.id);
    let value;
    if(e.target.name === "reference")
      value = e.target.firstElementChild.value;
   else {
      value = e.target.value;
    }

      this.setState({
        [e.target.name]: value,
        loading: true
      }, ()=>{
        // console.log(this.state.reference);
        this.fetchData();
      });
  }

  //set and change Sizes
  initializeSizesState = async(data) =>{
     if(data){
       let sizes = [];
        for (var i = 0; i < data.length; i++) {
         sizes.push(data[i]._id);
       }
          await this.setState({ sizes });
        console.log("state "+this.state.sizes);
    }
    this.fetchData();

  }
*/

  proceedToCheckout = () =>{
    document.location='/checkout';
  }

  continueshopping = () =>{
    Router.push(`/shops`)
    // document.location='/shops';
  }

  calculateCartTotal = (prev_total, new_itemTotal) =>{
    this.setState({total_price: (this.state.total_price - prev_total) + new_itemTotal})
  }

  //delete item called from CartItem
   deleteItemFromCart = (id, quantity, price) => {
     //remove cart through api
         this.setState({loading: true}, () => {
           axios.get('/api/carts/remove/'+id)
           .then((response) => {
             if(response.data.success){
               this.setState({
                 loading: false,
                 carts: [...this.state.carts.filter(cart => cart._id !== id)],
                 total_price: this.state.total_price - (price * quantity)
               }
               ,/*fix the icon badge on the header*/
               () =>$("#cart-count").val(this.state.carts.length)
             )

             }

           })
           .catch((error) => {
             this.setState({loading: false});
           });
         });

    }


  render() {
    const { loading, products } = this.state;
    const { carts } = this.state;

    let displayCarts ="";
      if(carts.length == 0 ){
        displayCarts = <div >Your Shop Cart is empty, add products to it</div>
      }else {
       displayCarts =  <div className="site-blocks-table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="product-thumbnail">Image</th>
                <th className="product-name">Product</th>
                <th className="product-price">Price</th>
                <th className="product-quantity">Quantity</th>
                <th className="product-total">Total</th>
                <th className="product-remove">Remove</th>
              </tr>
            </thead>
            <tbody>
              {carts.map(cart =>
                <CartItem  key={cart._id} cart={cart} calculateCartTotal={this.calculateCartTotal} deleteItemFromCart={this.deleteItemFromCart}/>

              )}
            </tbody>
          </table>
        </div>
      // )
      }
      return (

        <Layout>
        <div>
          <div className="bg-light py-3">
            <div className="container">
              <div className="row">
                <div className="col-md-12 mb-0"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Cart</strong></div>
              </div>
            </div>
          </div>
          <div className="site-section">
            <div className="container">
              <div className="row mb-5">
                <form className="col-md-12" method="post">
                  {displayCarts}
                </form>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="row mb-5">
                  {/*}  <div className="col-md-6 mb-3 mb-md-0">
                      <button className="btn btn-primary btn-sm btn-block">Update Cart</button>
                    </div> */}
                    <div className="col-md-6">
                      <button className="btn btn-outline-primary btn-sm btn-block" onClick={this.continueshopping}>Continue Shopping</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="text-black h4" htmlFor="coupon">Coupon</label>
                      <p>Enter your coupon code if you have one.</p>
                    </div>
                    <div className="col-md-8 mb-3 mb-md-0">
                      <input type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code" />
                    </div>
                    <div className="col-md-4">
                      <button className="btn btn-primary btn-sm">Apply Coupon</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 pl-5">
                  <div className="row justify-content-end">
                    <div className="col-md-7">
                      <div className="row">
                        <div className="col-md-12 text-right border-bottom mb-5">
                          <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                        </div>
                      </div>
                      {/*<div className="row mb-3">
                        <div className="col-md-6">
                          <span className="text-black">Subtotal</span>
                        </div>
                        <div className="col-md-6 text-right">
                          <strong className="text-black">$230.00</strong>
                        </div>
                      </div>*/}
                      <div className="row mb-5">
                        <div className="col-md-6">
                          <span className="text-black">Total</span>
                        </div>
                        <div className="col-md-6 text-right">
                          <strong className="text-black">${this.state.total_price}</strong>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <button className="btn btn-primary btn-lg py-3 btn-block" onClick={this.proceedToCheckout}>Proceed To Checkout</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        </Layout>
      )
    }
}


export default Carts;
