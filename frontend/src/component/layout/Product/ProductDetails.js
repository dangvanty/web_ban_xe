import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.scss'

import { useSelector, useDispatch } from 'react-redux'
import {
  getProductDetails,
  clearErrors,
  newReview,
  getProductForCata,
} from '../../../actions/productAction'

import MetaData from '../MetaData'
import { Link, useParams } from 'react-router-dom'
import ReviewCard from './ReviewCard '
import Loader from '../Loader/Loader'
import Footer from '../Home/Footer/Footer'
import { useAlert } from 'react-alert'
import { addItemsToCart } from '../../../actions/cartAction'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { formatNumber } from '../../helper/formatPrice'
import { NEW_PRODUCT_RESET } from '../../../constants/productContant'
import ProductCard from '../Home/ProductCard/ProductCard'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const alert = useAlert()
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  )
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  )
  const { user } = useSelector((state) => state.user)
  const test= ()=>{
    if(!user){
      return false
    }
    if(
      product.review
    ){
      for (let review of product.reviews) {
      
        if (user._id === review.userID) {
          return true
        }
        
      }
    }
  }
  const {
    products,
  } = useSelector((state) => state.productCata)

  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  }

  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return

    const qty = quantity + 1
    setQuantity(qty)
  }

  const decreaseQuantity = () => {
    if (1 >= quantity) return

    const qty = quantity - 1
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    if (product.Stock === 0) {
      return alert.error('Sản phẩm đã bán hết, mời bạn chọn sản phẩm khác!')
    }
    const checkItems = JSON.parse(localStorage.getItem('cartItems'))||[]
    for (let item of checkItems) {
      console.log(item)
      if (item.product === id) {
        return alert.info('Sản phẩm đã có trong giỏ hàng!')
      }
    }
    dispatch(addItemsToCart(id, quantity))
    alert.success('Thêm vào giỏ hàng thành công!')
  }
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }

  const reviewSubmitHandler = () => {
    if(!user){
      return alert.error("Bạn phải đăng nhập mới gửi đánh giá!")
    }
    const myForm = new FormData()

    myForm.set('rating', rating)
    myForm.set('comment', comment)
    myForm.set('productId', id)

    dispatch(newReview(myForm))

    setOpen(false)
  }

  let arr=[]
  const check = ()=>{
    let b = products.sort(() => Math.random() - 0.5)
    let a =0 
    b.map(item=>{
      if(a<4){
        if(item.category === product.category){
          if(item._id !== product._id){
            arr.push(item)
            a++
          }
        }
      }
    })
    
  } 
  check()
  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (reviewError) {
      alert.error('Không gửi được!')
      dispatch(clearErrors())
    }

    if (success) {
      alert.success('Gửi đánh giá thành công!')
      dispatch({ type: NEW_PRODUCT_RESET })
    }
    dispatch(getProductDetails(id))
    dispatch(getProductForCata())
  }, [dispatch, id, error, alert, reviewError, success])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} | Tuoi Hoa`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {' '}
                  ({product.numOfReviews} lượt đánh giá)
                </span>
              </div>
              {product.category ==="xe máy" ? (
                <div className="detailsBlock-3">
                <div className="btn-lienhe">
                <Link to={`/contact`}>Liên hệ mua hàng</Link>
               </div>

                <p>
                  Trạng thái:
                  <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.Stock < 1 ? ' Bán hết' : ' Còn hàng'}
                  </b>
                </p>
              </div>
              ):(
                <div className="detailsBlock-3">
                <h1>{`${formatNumber(product.price)} đ`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Thêm vào giỏ</button>
                </div>

                <p>
                  Trạng thái:
                  <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.Stock < 1 ? ' Bán hết' : ' Còn hàng'}
                  </b>
                </p>
              </div>
              )}
              <div className="detailsBlock-4">
                Mô tả : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
              {test()===true ? "Sửa đánh giá" : "Gửi đánh giá"}
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">Đánh giá sản phẩm</h3>
          <div className="reviewsHeading-line"></div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Gửi đánh giá</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Hủy
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Đánh giá
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">Chưa có đánh giá nào!</p>
          )}
          <h3 className="reviewsHeading">Sản phẩm liên quan</h3>
           <div className="reviewsHeading-line"></div>
           <div className="products">
           
              {arr &&
                arr.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        </Fragment>
      )}
      <Footer />
    </Fragment>
  )
}

export default ProductDetails
