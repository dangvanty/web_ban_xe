import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
  getAdminProduct,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productContant";
import {useNavigate, useParams} from "react-router-dom"
import './UpdateProduct.scss'
import CreatableSelect from 'react-select/creatable';
let value=""
const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  const {id} = useParams();

  const { error, product } = useSelector((state) => state.productDetails);
  const { error: lisproductError, products } = useSelector((state) => state.products);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
console.log('products',products)
  const productId = id;
  const createOption = (label) => ({
    label,
    value: label.toLowerCase()
  });
  const productCateGory = [...new Set(products.map(item => item.category))]
  // // console.log("product:::::", productCateGory)
  // const defaultOptions = [...new Set(productCateGory.map(item => createOption(item)))]

  // // console.log('defaultOptions::::::',defaultOptions)
  // const handleSelect =  (newValue)=>{
  //   const newValueInput=createOption(`${newValue.label}`)    
  //   value=newValueInput.value
  // }
  // const handleChange = (newValue) => {
  //   handleSelect(newValue)
  // };

  // const valueCategory = createOption(product.category)
  // console.log('valueCate',valueCategory)
  // const handleCreate = (inputValue) => {      
  // }
  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Sửa sản phẩm thành công!");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct())
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Cập nhật thông tin sản phẩm</h1>

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
                placeholder="Giá - đơn vị triệu đồng"
                min={0}
                max={10000}
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Chọn loại sản phẩm</option>
                {productCateGory.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
               {/* <CreatableSelect
                  isClearable
                  onChange={handleChange}
                  onInputChange={handleCreate}
                  options={defaultOptions}
                /> */}
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Số lượng"
                min={0}
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
              Cập nhật 
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
