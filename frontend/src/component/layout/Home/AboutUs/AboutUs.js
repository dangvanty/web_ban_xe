import { Container } from "@material-ui/core";
import React from "react";
import "./AboutUs.scss";
const imgAbout = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664681871/banner/banner5_timice.jpg"
const imgCustomer = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664681873/banner/banner6_ipw9kd.jpg"
const imgService = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664681872/banner/banner7_iaiygm.jpg"
const AboutUs =()=> {
  return (
    <div className="AboutUs">
      <Container maxWidth="lg">
        <div className="post-gird">
          <div className="post-item">
            <img src={imgAbout} alt="" />
          </div>
          <div className="post-item">
            <h1>
              Tuoi Hoa mang đến cho bạn 
              <span className="text-oranger">Sự Hài Lòng</span>
            </h1>
            <span>
            <span className="text-oranger">"TUOI HOA"</span> đã, đang và luôn cập nhật những dòng xe máy có 
            chất lượng tốt nhất về giá và chất lượng đến tay của người tiêu dùng,
            đồng thời mở rộng các dịch vụ chăm sóc khách hàng đầy mới mẻ đáp ứng nhu cầu của khách hàng
            </span>
          </div>
          <div className="post-item">
            <img src={imgCustomer} alt="" />
            <div className="item-content">
              <div className="text">
                <h2>Uy tín, hài lòng</h2>
                <span>
                  Xe moto, phụ kiện chính hãng, giá cả hợp lý cho khách hàng
                </span>
              </div>
            </div>
            <div className="blur"></div>
          </div>
          <div className="post-item">
            <img src={imgService} alt="" />
            <div className="item-content">
              <div className="text">
                <h2>Dịch vụ chất lượng</h2>
                <span>
                Tuoi Hoa cung cấp nhiều dịch vụ từ sửa chữa, bảo dưỡng đến nâng cấp cho phong cách của bạn
                </span>
              </div>
            </div>
            <div className="blur"></div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AboutUs