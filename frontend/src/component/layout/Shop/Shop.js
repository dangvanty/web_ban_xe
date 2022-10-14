import React, { Fragment, useEffect, useState } from 'react'
import './Shop.scss'
import { clearErrors, getProduct, getProductForCata } from '../../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loader/Loader'
import ProductCard from '../Home/ProductCard/ProductCard'
import MetaData from '../MetaData'
import { useParams, Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from '@material-ui/core/Slider'
import { FaSearch } from 'react-icons/fa'
import Box from '@material-ui/core/Box'
import Input from '@material-ui/core/Input'
import { useAlert } from 'react-alert'
import Typography from '@material-ui/core/Typography'
import { useNavigate } from 'react-router-dom'
import Banner from '../Banner/Banner'
import Footer from '../Home/Footer/Footer'
const reviewOptions = [
  { id: 1,  content: 'Tất cả đánh giá',value: 0 },
  { id: 2,  content: 'Từ 1 - 5 sao',value: 1 },
  { id: 3,  content: 'Từ 2 - 5 sao',value: 2 },
  { id: 4,  content: 'Từ 3 - 5 sao',value: 3 },
  { id: 5,  content: 'Từ 4 - 5 sao',value: 4 },
  { id: 6,  content: 'Đánh giá 5 sao',value: 5 },
]
const productPrice = [
    {
        id:0, content:"Tất cả giá", value: [0,1000]
    },
    {
        id:1, content:"dưới 10 triệu", value: [0,10]
    },
    {
        id:2, content:"Từ 10 đến 30 triệu", value: [10,30]
    },
    {
        id:3, content:"Từ 30 triệu đến 60 triệu", value: [30,60]
    },
    {
        id:4, content:"Từ 60 đến 150 triệu", value: [60,150]
    },
    {
        id:5, content:"Trên 150 triệu", value: [150,1000]
    }
]
const Shop = () => {
  const navigate = useNavigate()
  // const { keyword } = useParams()
  const dispatch = useDispatch()
  const alert = useAlert()
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 100000])

  const [category, setCategory] = useState('')
  const [searchcategory, setsearchCategory] = useState('Tất cả')
  const [ratings, setRatings] = useState(0)
  const [checkPrice, setCheckPrice]= useState('Tất cả')
  const [checkReviews, setCheckReviews]= useState('Tất cả')
  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }
  const priceHandler = (e) => {
    const input= e.target.value
    const inputPrice = JSON.parse("[" + input + "]");
    setPrice(inputPrice)
    switch (input){
      case '10,30':
        setCheckPrice('Từ 10 đến 30 triệu')
        break
      case '0,10':
        setCheckPrice('dưới 10 triệu')
        break
      case '30,60':
        setCheckPrice('Từ 30 triệu đến 60 triệu')
        break
      case '60,150':
        setCheckPrice('Từ 60 đến 150 triệu')
        break
      case '150,1000':
        setCheckPrice('Trên 150 triệu')
        break
      default:
        setCheckPrice('Tất cả')
        break
    }
    // console.log("Newprice:::::::::",newPrice)
  }
  const ratingsHandler = (e) => {
    const input = +e.target.value
    setRatings(input)
    switch (input){
      case 1:
        setCheckReviews('Từ 1 - 5 sao')
        break
      case 2:
        setCheckReviews('Từ 2 - 5 sao')
        break
      case 3:
        setCheckReviews('Từ 3 - 5 sao')
        break
      case 4:
        setCheckReviews('Từ 4 - 5 sao')
        break
      case 5:
        setCheckReviews('Đánh giá 5 sao')
        break
      default:
        setCheckReviews('Tất cả')
        break
    }
  }
  const handlerReturn = () => {
    setPrice([0, 1000])
    setRatings(0)
    setCategory('')
    setCurrentPage(1)
    setKeyword('')
    setName('')
    setCheckPrice('Tất cả')
    setCheckReviews('Tất cả')
  }
  const [name, setName] = useState('')
  const [keyword, setKeyword] = useState('')

  const buttonSerchName = () => {
    setKeyword(name)
  }
  const keyEnter = (event) => {
    if (event.charCode === 13) {
      setKeyword(name)
    }
  }
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products)
  const {products:productCata} = useSelector((state) => state.productCata)
  const productCateGory = [...new Set(productCata.map(item => item.category))]
  const productCateGorySelect=[...productCateGory]
  let count = filteredProductsCount
  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings))
    dispatch(getProductForCata())
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Cửa hàng Tuoi Hoa!" />
          <Banner />
          <div className='productsHeading-wrap'>
            <Link
              onClick={handlerReturn}
              className="productsHeadingLink"
              to="/Shop"
            >
              <h2 className="productsHeading">
                Sản
                phẩm của Tuoi Hoa
                <div className="productsHeading-line"></div>
              </h2>
            </Link>
          </div>
          <div className="shop-wrap">
            <div className="filterBox">
              <fieldset>
                <Typography component="legend">
                  Tìm kiếm{' '}
                  <FaSearch
                    style={{ color: '#EAB543', cursor: 'pointer' }}
                    onClick={buttonSerchName}
                  />
                </Typography>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: 'auto' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {/* <span>
                    <Input
                      id="component-helper"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="tên sản phẩm"
                      onKeyPress={keyEnter}
                    />
                  </span> */}
                  <span>
                    <Input
                      id="component-helper"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="tên sản phẩm"
                      value={name}
                      onKeyPress={keyEnter}
                      
                    />
                  </span>
                </Box>
              </fieldset>
              <fieldset>
                <Typography component="legend">
                  Giá{' '}
                  <small style={{ fontSize: 10, color: 'tomato' }}>
                    (đvt: triệu đồng)
                  </small>
                  :
                </Typography>

                {/* <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={1000}
                /> */}
                <select
                    value={price}
                    onChange={priceHandler}
                        // setsearchCategory(e.target.value)}}
                    >
                {/* <option v}>Tất cả giá</option> */}
                {productPrice.map((cate) => (
                  <option key={cate.id} value={cate.value}>
                    {cate.content}
                  </option>
                ))}
                </select>

              </fieldset>

              <fieldset>
                <Typography component="legend">Sản phẩm</Typography>
                {/* <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category.id}
                      onClick={() => {
                        setCategory(category.search)
                        setsearchCategory(category.content)
                      }}
                    >
                      {category.content}
                    </li>
                  ))}
                </ul> */}
                <select
                value={category}
                onChange={(e) => {setCategory(e.target.value)
                    setsearchCategory(e.target.value!==""?e.target.value:"Tất cả")}}
              >
                <option value="">Tất cả loại sản phẩm</option>
                {productCateGorySelect.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
              </fieldset>
              <fieldset>
                <Typography component="legend">Đánh giá</Typography>
                {/* <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating)
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                /> */}
                <select
                    value={ratings}
                    onChange={ratingsHandler}
                        // setsearchCategory(e.target.value)}}
                    >
                {/* <option v}>Tất cả giá</option> */}
                {reviewOptions.map((cate) => (
                  <option key={cate.id} value={cate.value}>
                    {cate.content}
                  </option>
                ))}
                </select>
              </fieldset>
            </div>
            <div className='result-filer'><u>Kết quả tìm kiếm</u> 
            {keyword && (
                <span style={{ color: '#EAB543' }}>tên sản phẩm: <span style={{color: 'tomato' }}>{keyword}</span></span> 
            )} {searchcategory && (
                <span style={{ color: '#EAB543' }}>loại sản phẩm: <span style={{color: 'tomato' }}>{searchcategory}</span></span>
            )} {price && (
                <span style={{ color: '#EAB543' }}>giá sản phẩm: <span style={{color: 'tomato' }}>{checkPrice}</span></span>
            )} {checkReviews && (
                <span style={{ color: '#EAB543' }}>đánh giá sản phẩm: <span style={{color: 'tomato' }}>{checkReviews}</span></span>
            )}
            </div>
            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText=">>"
                prevPageText="<<"
                firstPageText="1"
                lastPageText="Trang cuối"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
      <Footer/>
    </Fragment>
  )
}

export default Shop
