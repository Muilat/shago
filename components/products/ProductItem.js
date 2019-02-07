import { Component } from 'react';

// import Shelf from '../Shelf';
import PropTypes from 'prop-types';

class ProductItem extends Component {


  render() {
  	const {_id, name, price, description, image} = this.props.product;
    return (

      <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
        <div className="block-4 text-center border">
          <figure className="block-4-image">
            <a href={"shops/"+_id}><img src={"/static/images/"+image} alt="Image placeholder" className="img-fluid" /></a>
          </figure>
          <div className="block-4-text p-4">
            <h3><a href={"shops/"+_id}>{name}</a></h3>
            <p className="mb-0">{description}</p>
            <p className="text-primary font-weight-bold">${price}</p>
          </div>
        </div>
      </div>
    );
  }
}


///prop Types
ProductItem.propTypes = {
product : PropTypes.object.isRequired
}

export default ProductItem;
