import { Container } from "@material-ui/core";
import React from "react";
import "./Gallery.scss";
const img1= "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664686797/banner/g1_vl5poa.jpg"
const img2= "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664686797/banner/g2_thmrea.jpg"
const img3= "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664686798/banner/g3_rkojou.jpg"
const img6= "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664686795/banner/g4_g7j7p3.jpg"
const img5= "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664686796/banner/g5_p0hzkw.jpg"
const img4= "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664684502/banner/banner8_u5mi9n.jpg"
const img7= "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664686796/banner/g7_qqmker.webp"
const img8= "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664686796/banner/g8_veap5t.webp"
const img9= "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664686795/banner/g6_rijn1o.jpg"
export default function Gallery() {
  return (
    <div className="Gallery">
      <div className="heading">
        <div className="heading__title">
          <h3>Phòng trưng bày ảnh</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <Container maxWidth="lg">
        <div className="post-grid">
            <div className="grid-item">
              <img src={img1} alt="" />
            </div>
            <div className="grid-item">
              <img src={img2} alt="" />
            </div>
            <div className="grid-item">
              <img src={img3} alt="" />
            </div>
            <div className="grid-item">
              <img src={img4} alt="" />
            </div>
            <div className="grid-item">
              <img src={img5} alt="" />
            </div>
            <div className="grid-item">
              <img src={img6} alt="" />
            </div>
            <div className="grid-item">
              <img src={img7} alt="" />
            </div>
            <div className="grid-item">
              <img src={img8} alt="" />
            </div>
            <div className="grid-item">
              <img src={img9} alt="" />
            </div>
        </div>
      </Container>
    </div>
  );
}
