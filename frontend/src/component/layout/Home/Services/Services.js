import React from "react";
import { Link } from "react-router-dom";
import "./Services.scss";
const imgServiceBg = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664684502/banner/banner8_u5mi9n.jpg"
const icon1 = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664983185/icon/bao-hanh-bao-duong_arbutt.png"
const icon2 = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664982991/icon/sua-chua-thay-the-phu-tung_ahsjt5.png"
const icon3 = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664983119/icon/dau-nhot_g9jftu.png"
const icon4 = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664983119/icon/sua-chua-luu-dong_xlxbp3.png"
const icon5 = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664983119/icon/bao-hiem_zxqnqc.png"
const icon6 = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1664983119/icon/tan-trang-xe_dgozhv.png"

const Services=()=> {
  const styleImg = {width:"40px"}
  const style = {
    background: `url(${imgServiceBg}) center no-repeat`,
    backgroundSize: "cover",
  };

  return (
    <div className="Services" style={style} id="service">
      <div className="blur"></div>
      <div className="heading">
        <div className="heading__title text-white">
          <h3>Dịch vụ của chúng tôi</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="container">
        <div className="post-grid">
            <div className="post-item">
              <div className="icon">
              <img src={icon1} style={styleImg}/>
              </div>
              <div className="title">BẢO HÀNH, BẢO DƯỠNG</div>
              <div className="description">
                Các quy trình bảo hành và bảo dưỡng được thực hiện theo các tiêu chuẩn,
                quy định của hãng nhằm 
                bảo đảm quyền lợi tốt nhất và mang lại sự hài lòng cho khách hàng
              </div>
              <div className="btn">
                <Link to={`/RegisterService`}>Đăng ký ngay</Link>
              </div>
            </div>
            <div className="post-item">
              <div className="icon">
                <img src={icon2} style={styleImg}/>
              </div>
              <div className="title">SỬA CHỮA THAY THẾ PHỤ TÙNG</div>
              <div className="description">
                Tuoi Hoa luôn tập trung chú trọng vào đội ngũ kỹ thuật
                viên có tay nghề cao, bên cạnh đó Tiến Thu còn đặc biệt quan tâm đến việc đầu tư cơ sở 
                vật chất, trang thiết bị
                hiện đại nhằm cải tiến chất lượng phục vụ hướng đến sự hài lòng của khách hàng
              </div>
              <div className="btn">
                <Link to={`/RegisterService`}>Đăng ký ngay</Link>
              </div>
            </div>
            <div className="post-item">
              <div className="icon">
              <img src={icon3} style={styleImg}/>
              </div>
              <div className="title">DẦU NHỚT</div>
              <div className="description">
                Tuoi Hoa là nhà phân phối chính thức các loại dầu nhớt xe máy chính hãng của Honda,
                Yamaha, Castrol và đặc biệt là dầu nhớt nhập khẩu trực tiếp từ Mỹ với chất lượng và hiệu suất vượt trội. Đáp ứng tất cả các nhu cầu 
                của khách hàng về dầu nhớt dành cho xe số, xe ga, xe côn tay, xe mô tô
              </div>
              <div className="btn">
                <Link to={`/RegisterService`}>Đăng ký ngay</Link>
              </div>
            </div>
            <div className="post-item">
              <div className="icon">
              <img src={icon4} style={styleImg}/>
              </div>
              <div className="title">SỬA CHỮA LƯU ĐỘNG</div>
              <div className="description">
              Khi gặp sự cố khi lưu thông trên đường hãy tìm ngay thông tin Đường dây
              nóng Dịch vụ Sửa chữa lưu động của Tuoi Hoa tại: Tem dán ở phía đuôi xe; Sổ bảo hành; 
              Website; Fanpage Xe Máy Tuoi Hoa hoặc gọi ngay đến số Hotline: 0283 929 379
              </div>
              <div className="btn">
                <Link to={`/RegisterService`}>Đăng ký ngay</Link>
              </div>
            </div>
            <div className="post-item">
              <div className="icon">
              <img src={icon5} style={styleImg}/>
              </div>
              <div className="title">BẢO HIỂM</div>
              <div className="description">
                Cung cấp gói bảo hiểm vật chất độc quyền chỉ có tại Tuoi Hoa với nhiều ưu điểm :
                Thủ tục nhanh gọn, Phụ tùng chính hãng, Sửa chữa nhanh chóng. Giúp cho khách hàng 
                giảm thiểu chi phí khắc phục khi xảy ra tai nạn và an tâm trên mọi nẻo đường.
              </div>
              <div className="btn">
                <Link to={`/RegisterService`}>Đăng ký ngay</Link>
              </div>
            </div>
            <div className="post-item">
              <div className="icon">
              <img src={icon6} style={styleImg}/>
              </div>
              <div className="title">TÂN TRANG XE</div>
              <div className="description">
                Tươi Hoa cung cấp các dịch vụ dành cho xe máy với các dịch vụ đi kèm như : 
                Bảo dưỡng toàn bộ, Thay toàn bộ vỏ xe với phụ tùng chính hãng, Sơn các vết xước, 
                Đổi màu sơn của xe, Dán tem chính hãng, Dán keo, Đánh bóng xe, 
                Thay thế các phụ kiện….nhằm mang lại một dáng vẻ hoàn toàn mới cho chiếc xe máy của bạn.
              </div>
              <div className="btn">
                <Link to={`/RegisterService`}>Đăng ký ngay</Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
export default Services
