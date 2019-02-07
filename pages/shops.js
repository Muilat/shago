import { Component } from "react";
import Layout from '../components/layout';
import ProductItem from '../components/products/ProductItem';
import Sizes from './Sizes';

import axios from 'axios';

class Shops extends Component {
  state = {
    loading: true,
    products : [],
    reference: "-created_at",
    min_price: 0,
    max_price: 500,
    sizes: [],
    selected_sizes: [],

  }
  componentDidMount() {


    //ntial checkof all sizes
    // $(':checkbox').ready(()=>$(':checkbox').prop('checked', true));
    $('.s_sm').ready(()=>$('s_sm').prop('checked', true));

    this.fetchData();

    //onchange doe not work for hidden input (min_price, max_price)
    //explicitly create there separate change function,
    //the function is triggered from main.js where the input value s are set
    $('#min_price').change(()=>{
      this.setState({
        min_price: $("#min_price").val(),
        max_price: $("#max_price").val(),
        loading: true
      }, ()=>this.fetchData());
    })

  }


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
    }
    this.fetchData();

  }

  //set and change Sizes
  setSizesState = async(_id, remove) =>{
     if(remove){
          await this.setState({ sizes: [...this.state.sizes.filter(size => {
            return size !== _id
          })]});
    }
    else {
        let sizes = [...this.state.sizes];
        sizes.push(_id);
        await this.setState({ sizes });
    }
    this.fetchData();
  }

  render() {
    const { loading, products } = this.state;

      return (

        <Layout>
        <div>
          <div className="bg-light py-3">
            <div className="container">
              <div className="row">
                <div className="col-md-12 mb-0"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Shop</strong></div>
              </div>
            </div>
          </div>
          <div className="site-section">
            <div className="container">
              <div className="row mb-5">
                <div className="col-md-9 order-2">
                  <div className="row">
                    <div className="col-md-12 mb-5">
                      <div className="float-md-left mb-4"><h2 className="text-black h5">Shop All</h2></div>
                      <div className="d-flex">
                        <div className="dropdown mr-1 ml-md-auto">
                          <button type="button" className="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Latest
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                            <a className="dropdown-item" href="#">Men</a>
                            <a className="dropdown-item" href="#">Women</a>
                            <a className="dropdown-item" href="#">Children</a>
                          </div>
                        </div>
                        <div className="btn-group">
                          <button type="button" className="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuReference" data-toggle="dropdown">Reference</button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                            <a className="dropdown-item" href="#">Relevance</a>
                            <a className="dropdown-item" name="reference" href="#" onClick={this.changeState} ><input value="name" type="hidden" />Name, A to Z</a>
                            <a className="dropdown-item" name="reference" href="#" onClick={this.changeState} ><input value="-name" type="hidden" />Name, Z to A</a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" name="reference" href="#" onClick={this.changeState} ><input value="price" type="hidden" />Price, low to high</a>
                            <a className="dropdown-item" name="reference" href="#" onClick={this.changeState} ><input value="-price" type="hidden" />Price, high to low</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-5">
                    {products.map(product =>
                      <ProductItem key={product._id} product={product} />
                    )}
                  </div>
                  <div className="row" data-aos="fade-up">
                    <div className="col-md-12 text-center">
                      <div className="site-block-27">
                        <ul>
                          <li><a href="#">&lt;</a></li>
                          <li className="active"><span>1</span></li>
                          <li><a href="#">2</a></li>
                          <li><a href="#">3</a></li>
                          <li><a href="#">4</a></li>
                          <li><a href="#">5</a></li>
                          <li><a href="#">&gt;</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 order-1 mb-5 mb-md-0">
                  <div className="border p-4 rounded mb-4">
                    <h3 className="mb-3 h6 text-uppercase text-black d-block">Categories</h3>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-1"><a href="#" className="d-flex"><span>Men</span> <span className="text-black ml-auto">(2,220)</span></a></li>
                      <li className="mb-1"><a href="#" className="d-flex"><span>Women</span> <span className="text-black ml-auto">(2,550)</span></a></li>
                      <li className="mb-1"><a href="#" className="d-flex"><span>Children</span> <span className="text-black ml-auto">(2,124)</span></a></li>
                    </ul>
                  </div>
                  <div className="border p-4 rounded mb-4">
                    <div className="mb-4">
                      <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Price</h3>
                      <div id="slider-range" className="border-primary" />
                      <input type="hidden" id="min_price"  value={this.state.min_price} />
                      <input type="hidden" id="max_price"  value={this.state.mx_price}  />
                      <input type="text" name="text" id="amount"  className="form-control border-0 pl-0 bg-white" disabled />
                    </div>
                        {/* Size component */}
                    <Sizes setSizesState={this.setSizesState}  setSizesState={this.setSizesState} initializeSizesState={this.initializeSizesState}/>

                    <div className="mb-4">
                      <h3 className="mb-3 h6 text-uppercase text-black d-block">Color</h3>
                      <a href="#" className="d-flex color-item align-items-center">
                        <span className="bg-danger color d-inline-block rounded-circle mr-2" /> <span className="text-black">Red (2,429)</span>
                      </a>
                      <a href="#" className="d-flex color-item align-items-center">
                        <span className="bg-success color d-inline-block rounded-circle mr-2" /> <span className="text-black">Green (2,298)</span>
                      </a>
                      <a href="#" className="d-flex color-item align-items-center">
                        <span className="bg-info color d-inline-block rounded-circle mr-2" /> <span className="text-black">Blue (1,075)</span>
                      </a>
                      <a href="#" className="d-flex color-item align-items-center">
                        <span className="bg-primary color d-inline-block rounded-circle mr-2" /> <span className="text-black">Purple (1,075)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="site-section site-blocks-2">
                    <div className="row justify-content-center text-center mb-5">
                      <div className="col-md-7 site-section-heading pt-4">
                        <h2>Categories</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0" data-aos="fade" data-aos-delay>
                        <a className="block-2-item" href="#">
                          <figure className="image">
                            <img src="/static/images/women.jpg" alt="" className="img-fluid" />
                          </figure>
                          <div className="text">
                            <span className="text-uppercase">Collections</span>
                            <h3>Women</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay={100}>
                        <a className="block-2-item" href="#">
                          <figure className="image">
                            <img src="/static/images/children.jpg" alt="" className="img-fluid" />
                          </figure>
                          <div className="text">
                            <span className="text-uppercase">Collections</span>
                            <h3>Children</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay={200}>
                        <a className="block-2-item" href="#">
                          <figure className="image">
                            <img src="/static/images/men.jpg" alt="" className="img-fluid" />
                          </figure>
                          <div className="text">
                            <span className="text-uppercase">Collections</span>
                            <h3>Men</h3>
                          </div>
                        </a>
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


export default Shops;
