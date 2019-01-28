import { Component } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';



class Sizes extends Component {

  state = {
    sizes: [],

  }
  componentDidMount() {
    this.fetchData();

    //ntial checkof all sizes
    $(':checkbox').ready(()=>{
      console.log("dsfghjk");
      $(':checkbox').prop('checked', true);
    })

  }

  //fetch data from api
  fetchData = () => {
    this.setState({loading: true}, () => {
      axios.get('/api/shops/sizes')
      .then((response) => {
        let data = response.data;
        this.setState({
          sizes: data,
        },()=>this.props.initializeSizesState(this.state.sizes));


      })
      .catch((error) => {
      });

    });
  }





  //toggle size checkbox checked and unchecked
  toggleCheckbox  = (e)=> {
    this.props.setSizesState(e.target.value,  e.target.checked ? false : true)
  }

td = ()=>{}

  render() {
    return(
      <div className="mb-4">
        <h3 className="mb-3 h6 text-uppercase text-black d-block">Size</h3>
        {this.state.sizes.map(size =>
          <label htmlFor="s_sm" className="d-flex" key={size._id}>
            <input type="checkbox"  value={size._id} className="mr-2 mt-1 s_sm"
            onChange={this.toggleCheckbox}/> <span className="text-black">{size.name} (2,319)</span>
          </label>
         )}

      </div>
    );
  }
}


  ///prop Types
  // Sizes.propTypes = {
  //   setSizesState : PropTypes.func.isRequired,
  //   initSizes : PropTypes.funct.isRequired
  // }

export default Sizes;
