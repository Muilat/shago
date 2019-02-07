import { Component } from "react";
import Router from 'next/router';

import Layout from '../components/layout';
// import ProductItem from '../components/products/ProductItem';
// import Sizes from './Sizes';

import axios from 'axios';

class View extends Component {
  state = {
    product : {},
    sizes :[]
  }
  static getInitialProps ({ query: { id } }) {
    return { id };
  }
  
  componentDidMount() {
    this.fetchData();
  }


//fetch data from api
  fetchData = async() => {
    this.setState({loading: true}, () => {
      axios.get('/api/shops/'+this.props.id)
      .then((response) => {
        let product = response.data;

        this.setState({
          product: response.data,
          sizes : product.sizes,
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

  //add product to cart
  addToCart = (e)=>{
    e.preventDefault();
    let quantity = $('#quantity').val();
    if(isNaN(quantity))
      return alert("Quantity can only be number");
    let size = $("input[name='shop-sizes']:checked").val();
    if(!size)
      return alert("Select size");
    axios.get('/api/carts/add', {
      params: {
        product_id: this.state.product._id,
        size,
        quantity
      }
    })
    .then((response) => {
      alert(response.data.msg);
      if (response.data.status === "success") {
        // Router.push(`/carts`)
        document.location = "/carts";
      }

    });
  }


  render() {
    const { loading, product, sizes } = this.state;
    let sizes_view = [];
    for(var i = 0; i < sizes.length; i++) {
      sizes_view.push(<label htmlFor="option-sm" className="d-flex mr-3 mb-3" key={sizes[i]._id}>
        <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-sm" name="shop-sizes" value={sizes[i]._id} /></span> <span className="d-inline-block text-black ">{ sizes[i].name}</span>
      </label>)
    }

      return (

        <Layout>
        <div>
  <div className="bg-light py-3">
    <div className="container">
      <div className="row">
        <div className="col-md-12 mb-0"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">{product.name}</strong></div>
      </div>
    </div>
  </div>
  <div className="site-section">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={"/static/images/"+product.image} alt="Image" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2 className="text-black">{product.name}</h2>
          <p>{product.description}</p>
          <p><strong className="text-primary h4">${product.price}</strong></p>
          <div className="mb-1 d-flex">

          { sizes_view  }


          </div>
          <div className="mb-5">
            <div className="input-group mb-3" style={{maxWidth: '120px'}}>
              <div className="input-group-prepend">
                <button className="btn btn-outline-primary js-btn-minus" type="button">−</button>
              </div>
              <input type="text" id="quantity"  className="form-control text-center"  placeholder={1} defaultValue={1}  aria-label="Example text with button addon" aria-describedby="button-addon1" />
              <div className="input-group-append">
                <button className="btn btn-outline-primary js-btn-plus" type="button">+</button>
              </div>
            </div>
          </div>
          <p><a href="" className="buy-now btn btn-sm btn-primary" onClick={this.addToCart}>Add To Cart</a></p>
        </div>
      </div>
    </div>
  </div>
  <div className="site-section block-3 site-blocks-2 bg-light">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 site-section-heading text-center pt-4">
          <h2>Featured Products</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="nonloop-block-3 owl-carousel">
            <div className="item">
              <div className="block-4 text-center">
                <figure className="block-4-image">
                  <img src="/static/images/cloth_1.jpg" alt="Image placeholder" className="img-fluid" />
                </figure>
                <div className="block-4-text p-4">
                  <h3><a href="#">Tank Top</a></h3>
                  <p className="mb-0">Finding perfect t-shirt</p>
                  <p className="text-primary font-weight-bold">$50</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="block-4 text-center">
                <figure className="block-4-image">
                  <img src="/static/images/shoe_1.jpg" alt="Image placeholder" className="img-fluid" />
                </figure>
                <div className="block-4-text p-4">
                  <h3><a href="#">Corater</a></h3>
                  <p className="mb-0">Finding perfect products</p>
                  <p className="text-primary font-weight-bold">$50</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="block-4 text-center">
                <figure className="block-4-image">
                  <img src="/static/images/cloth_2.jpg" alt="Image placeholder" className="img-fluid" />
                </figure>
                <div className="block-4-text p-4">
                  <h3><a href="#">Polo Shirt</a></h3>
                  <p className="mb-0">Finding perfect products</p>
                  <p className="text-primary font-weight-bold">$50</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="block-4 text-center">
                <figure className="block-4-image">
                  <img src="/static/images/cloth_3.jpg" alt="Image placeholder" className="img-fluid" />
                </figure>
                <div className="block-4-text p-4">
                  <h3><a href="#">T-Shirt Mockup</a></h3>
                  <p className="mb-0">Finding perfect products</p>
                  <p className="text-primary font-weight-bold">$50</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="block-4 text-center">
                <figure className="block-4-image">
                  <img src="/static/images/shoe_1.jpg" alt="Image placeholder" className="img-fluid" />
                </figure>
                <div className="block-4-text p-4">
                  <h3><a href="#">Corater</a></h3>
                  <p className="mb-0">Finding perfect products</p>
                  <p className="text-primary font-weight-bold">$50</p>
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


export default View;
