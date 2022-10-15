import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.scss";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct, getAdminProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productContant";
import {  useNavigate } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';
let value =""
const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { error : lisproductError, products } = useSelector((state) => state.products);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  
  const createOption = (label) => ({
    label,
    value: label.toLowerCase()
  });
  
  const productCateGory = [...new Set(products.map(item => item.category))]
  // console.log("product:::::", productCateGory)
  const defaultOptions = [...new Set(productCateGory.map(item => createOption(item)))]
  const [category,setCategory]=useState(defaultOptions)

  // console.log('defaultOptions::::::',defaultOptions)
  const handleSelect =  (newValue)=>{
    const newValueInput=createOption(`${newValue.label}`)
    // console.log('hihii',newValueInput)
    
    value=newValueInput.value
   
    // // console.log('value::::',value)
    // let check=false
    // category.map(item=>{
    //   if(item.value === newValue.value.toLowerCase()){
    //     check=true
    //   }
      
    // })
    // check ===false && setCategory([newValueInput,...category]) 
  }
  const handleChange = (newValue) => {
    // console.log("newValue",newValue);
    handleSelect(newValue)
    // console.log(':::cata',category)

    // console.log('valueinput::::',newValue)
   
  };

  const handleCreate = (inputValue) => {
    // console.log("::::::inputValue",inputValue)
      
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(defaultOptions){
      setCategory(defaultOptions)
    }

    if (success) {
      alert.success("thêm mới sản phẩm thành công");
      navigate("/admin/product");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
    dispatch(getAdminProduct())
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", value);
    myForm.set("Stock", Stock);
    if (images.length === 0){
      return alert.error("Bạn cần thêm hình ảnh sản phẩm")
    }
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Thêm mới sản phẩm | Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Thêm mới sản phẩm</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Tên sản phẩm"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                step="0.01"
                min={0}
                placeholder="Giá - đơn vị triệu đồng"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              {/* <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Chọn loại sản phẩm</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select> */}
             <CreatableSelect
                  isClearable
                  onChange={handleChange}
                  onInputChange={handleCreate}
                  options={defaultOptions}
                />
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Số lượng"
                min={0}
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Thêm mới
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
