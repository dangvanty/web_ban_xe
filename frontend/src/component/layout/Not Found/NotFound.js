import React, { Fragment } from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MetaData from "../MetaData";
const banner = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664678300/banner/banner4_eki4jm.jpg"
const NotFound = () => {
  return (
      <Fragment>
      <MetaData title="Không tìm thấy " />
    <div className="PageNotFound" style={{background:`url(${banner}) no-repeat `, backgroundSize:"cover"}} >
      <ErrorIcon />
 
      <Typography>Không tìm thấy trang này</Typography>
      <Link to="/">Trang chủ</Link>
    </div>
    </Fragment>
  );
};

export default NotFound;
