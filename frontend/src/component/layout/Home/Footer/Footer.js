import { Container, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { iconFooter } from "../../../svgIcon/IconSvg";
export default function Footer() {
  return (
    <div className="Footer">
      <Container>
        <Grid container className="footer-content">
          <Grid item lg={3} md={6} sm={12} className="footer-item">
            <div className="item-title">Giới thiệu</div>
            <div className="hr"></div>
            <div className="item-content about">Tuoi Hoa là đại lý độc quyền về xe máy, mô tô các hãng Honda, Suzuki, Yamaha, ....
            cung cấp cho khách hàng những dòng xe máy tốt và các dịch vụ chăm sóc chất lượng.
            </div>
          </Grid>
          <Grid item lg={3} md={6} sm={12} className="footer-item">
            <div className="item-title">Liên lạc với chúng tôi</div>
            <div className="hr"></div>
            <div className="item-content">
              <div className="address">
                Địa chỉ: <span>Điện An – Điện Bàn, Quảng Nam</span>
              </div>
              <div className="contact">
                <div className="phone">
                  Điện thoại: <span>0989999878</span>
                </div>
                <div className="email">
                  Email: <span>tuoihoa.showroom@gmail.com</span>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={6} sm={12} className="footer-item">
            <div className="item-title">Đường dẫn nhanh</div>
            <div className="hr"></div>
            <div className="item-content">
              <div className="item-link">
                <div className="link">
                  <div className="icon">{iconFooter}</div>
                  <Link to="#">Trang chủ</Link>
                </div>
                <div className="link">
                  <div className="icon">{iconFooter}</div>
                  <Link to="#">Dịch vụ</Link>
                </div>
                <div className="link">
                  <div className="icon">{iconFooter}</div>
                  <Link to="/Shop">Cửa hàng xe máy</Link>
                </div>
                <div className="link">
                  <div className="icon">{iconFooter}</div>
                  <Link to="#">Tin tức</Link>
                </div>
                <div className="link">
                  <div className="icon">{iconFooter}</div>
                  <Link to="#">Liên hệ</Link>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={6} sm={12} className="footer-item">
            <div className="item-title">Mạng xã hội </div>
            <div className="hr"></div>
            <div className="item-content">
                <div
                  className="icon"
                  style={{ background: "rgb(234, 66, 53)" }}
                  title="tuoihoa.showroom@gmail.com"
                ><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" class="svg-inline--fa fa-google fa-w-16 fa-4x"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" class=""></path></svg>
                </div>
                <div
                  className="icon"
                  style={{ background: "gray" }}
                  title="chưa cập nhật"
                ><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-facebook-f fa-w-10 fa-xs"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" class=""></path></svg>
                </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
