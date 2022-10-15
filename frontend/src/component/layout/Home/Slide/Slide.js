import React from "react";
import "./Slide.scss";
import { useRef } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom'
const imgService = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664678300/banner/banner1_wvt6kj.jpg"
const imgMoto = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664678300/banner/banner2_i1am0u.jpg"
const imgGloves = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664678300/banner/banner3_jim8uw.jpg"
const Slide =()=> {
  const slideEl = useRef(null);

  useEffect(() => {
    let slides = slideEl.current.querySelectorAll(".slide-item");
    let slideIndex = 0;
    const slideShow = (n) => {
      let slideActive = slideEl.current.querySelector(
        ".slide-item.slide-active"
      );
      slideActive.classList.remove("slide-active");
      slides[n].classList.add("slide-active");
    };
    const AutoSlide = () => {
      if (slideIndex === slides.length - 1) {
        slideIndex = 0;
      } else if (slideIndex >= 0) {
        slideIndex += 1;
      }
      slideShow(slideIndex);
    };
    let a = setInterval(() => {
      AutoSlide();
    }, 4000);
    return () => {
      clearInterval(a);
    };
  }, []);

  return (
    <div className="Slide">
      <div className="slideWrapper">
        <div className="slides" ref={slideEl}>
          <div className="blur"></div>
          <div
            className="slide-item slide-active"
            style={{ color: "#978e79 " }}
          >
            <img src={imgMoto} alt="" />
            <div className="slide-content">
              <h1>01</h1>
              <h3>Xe Moto</h3>
              <div className="hr"></div>
              <span>
                Cung cấp mẫu xe phong cách, thời trang
              </span>
              <br />
              <Link to='/Shop'>
              <button>Xem ngay</button>
              </Link>
            </div>
          </div>
          <div className="slide-item " style={{ color: "#724c3d " }}>
            <img src={imgService} alt="" />
            <div className="slide-content">
              <h1>02</h1>
              <h3>Dịch vụ</h3>
              <div className="hr"></div>
              <span>
                Cung cấp các dịch vụ sửa chữa, nâng cấp chất lượng           </span>
              <br />
              <a href="#service">
              <button>Xem ngay</button>
              </a>
            </div>
          </div>
          <div className="slide-item " style={{ color: "#4c433c " }}>
            <img src={imgGloves} alt="" />
            <div className="slide-content">
              <h1>03</h1>
              <h3>Phụ kiện</h3>
              <div className="hr"></div>
              <span>
                Cung cấp phụ kiện cực "CHÁY" cho đam mê của bạn
              </span>
              <br />
              <Link to='/Shop'>
              <button>Xem ngay</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide