import React from 'react'
import {Link} from 'react-router-dom'
import { Rating } from "@material-ui/lab";
import {formatNumber} from "../../../helper/formatPrice"
import {to_slug} from "../../../helper/formatToSlug"
import './ProductCard.scss'
const ProductCard = ({product}) => {
  const options={
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size:`${window.innerWidth <600 ?15 : 20}`,
}

  return (
    <Link className='productCard' to={`/Shop/product/${to_slug(product.name)}.${product._id}.html`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>{" "} <span className='productCardSpan'>({product.numOfReviews} đánh giá)</span>
        <div>
           <Rating {...options }/>{" "}
            
        </div>
        {product.category ==="xe máy" ?(<span className='contact-buy'>Liên hệ mua hàng</span>):(
          <span className='price'>{`${formatNumber(product.price)} đ`}</span>

        )}
    </Link>
  )
}

export default ProductCard