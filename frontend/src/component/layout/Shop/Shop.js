import React, { Fragment, useEffect,useState } from 'react';
import './Shop.css';
import {clearErrors,getProduct} from '../../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux';
import Loader from "../Loader/Loader";
import ProductCard from '../Home/ProductCard/ProductCard';
import MetaData from '../MetaData';
import {useParams, Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import {FaSearch} from "react-icons/fa"
import Box from '@material-ui/core/Box';
import Input from "@material-ui/core/Input";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from 'react-router-dom'
import Banner from '../Banner/Banner';
const categories=[
    { id: 1,
      search: "Nội thất phòng khách",
      content: "Nội thất phòng khách"
    },
    {
      id: 2,
      search: "",
      content: "Tất cả"
    }
]
const Shop = () => {
    const navigate=useNavigate();
    const {keyword} =useParams();
    const dispatch =useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 1000]);


    const [category, setCategory] = useState("");
    const [searchcategory, setsearchCategory] = useState("Tất cả");
    const [ratings, setRatings] = useState(0);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
    const priceHandler=(event,newPrice)=>{
        setPrice(newPrice);
    }
    const handlerReturn=()=>{
        setPrice([0,1000]);
        setRatings(0);
        setCategory("");
        setCurrentPage(1)
        setName("")
    }
    const [name, setName] = useState("")

    const buttonSerchName = () => {
        navigate(name.trim() ? `/products/${name}` : "/products");
      };
    
    const keyEnter = (event)=>{
      if (event.key === 'Enter') {
        navigate(name.trim() ? `/products/${name}` : "/products");
        }
    }
    const {loading, error,products, productsCount,resultPerPage,filteredProductsCount}= useSelector(state=>state.products)
    let count =filteredProductsCount;
    console.log(products)
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }

     dispatch(getProduct(keyword, currentPage,price,category,ratings))
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error])

  return (
    <Fragment>
      
        {loading ? (<Loader />):(
            <Fragment>
                <MetaData title="Cửa hàng Tuoi Hoa!"/>
                <Banner/>
               <Link onClick={handlerReturn} className='productsHeadingLink' to="/products"><h2 className='productsHeading'><span style={{color:"#EAB543"}}>{searchcategory}</span> - Sản phẩm của Tuoi Hoa
                    <div className='productsHeading-line' ></div>
                </h2>
                </Link>
            <div className="products">
                {products &&
                products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className='filterBox'>

            <fieldset>
               <Typography component="legend">Tìm kiếm <FaSearch style={{color :"#EAB543", cursor:"pointer"}} onClick={buttonSerchName} /></Typography>
                    <Box component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: 'auto' },
                        }}
                        noValidate
                        autoComplete="off">
                        <span>
                        <Input
                            id="component-helper"
                            onChange={(e) => setName(e.target.value)}
                            placeholder='tên sản phẩm'
                            onKeyPress={keyEnter}
                            />


                        </span>


                    </Box>
            </fieldset>
            <fieldset>
               <Typography component="legend">Giá <small style={{fontSize:10, color:"tomato"}}>(đvt: triệu đồng)</small>:</Typography>

               <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={1000}
            />
            </fieldset>

               <fieldset>
                <Typography component="legend">Sản phẩm</Typography>
                <ul className="categoryBox">
                {categories.map((category) => (
                    <li className="category-link"
                        key={category.id}
                        onClick={() => {setCategory(category.search); setsearchCategory(category.content)}}
                    >
                        {category.content}
                    </li>
                ))}
                </ul>
                </fieldset>
                <fieldset>
                <Typography component="legend">Đánh giá</Typography>
                <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                    setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                />
                 </fieldset>
            </div>


            {resultPerPage < count && (
            <div className='paginationBox'>
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
            </div>)}
            </Fragment>
        )}
    </Fragment>
  )
}

export default Shop
