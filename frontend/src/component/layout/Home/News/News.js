import { Container } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./News.scss";
const News = ()=> {
  const data = [{
    id:1,
    avatar: "https://cdn.24h.com.vn/upload/4-2022/images/2022-10-05/255x170/resizer_16649652157621-1664965238-679-width740height555_anh_cat_3_2.jpeg",
    name: 'Giá Honda Scoopy nhập khẩu vẫn chưa "hạ nhiệt"',
    samary: "Hiện tại giá bán của Scoopy nhập khẩu Indonesia vẫn dao động từ 53-55 triệu đồng, còn Scoopy nhập..."
  },{
    id:2,
    avatar: "https://cdn.24h.com.vn/upload/4-2022/images/2022-10-05/255x170/ka1--1--1664969461-145-width740height555_anh_cat_3_2.jpg",
    name: "Nguyên mẫu môtô điện Kawasaki EV lộ diện, nhìn cực kỳ tinh xảo",
    samary: "Kawasaki EV xuất hiện tại một triển lãm xe quốc tế Intermot 2022 với thiết kế tinh xảo, tạo sự tò mò..."
  },{
    id:3,
    avatar: "https://cdn.24h.com.vn/upload/4-2022/images/2022-10-04/255x170/hd--5--1664860215-940-width740height555_anh_cat_3_2.jpg",
    name: "Bộ đôi Harley Davidson ra mắt khách hàng Việt, giá hơn 1,2 tỷ đồng",
    samary: "Bộ đôi xe tiền tỷ Harley Davidson vừa có thêm phiên bản đặc biệt phối màu Apex Factory Custom Paint..."
  },
  {
    id:4,
    avatar: "https://cdn.24h.com.vn/upload/4-2022/images/2022-10-03/255x170/scop6--1--1664810946-469-width740height555_anh_cat_3_2.jpg",
    name: "Ngắm xe ga Honda Scoopy mới ra mắt, giá từ 31,2 triệu đồng",
    samary: "Xe tay ga cỡ nhỏ Honda Scoopy vừa được cập nhật ấn bản mới tại thị trường Thái Lan, có giá bán khởi.."
  },
  {
    id:5,
    avatar: "https://cdn.24h.com.vn/upload/4-2022/images/2022-10-03/255x170/20221003_213341_0000-1664807663-188-width740height555_anh_cat_3_2.jpg",
    name: 'Loạt xe ga 50cc dành cho "con nhà giàu"',
    samary: "Mặc dù có bề ngoài rất đơn giản, nhưng các mẫu tay ga này đều có giá ngang ngửa các mẫu tay hạng..."
  },
  {
    id:6,
    avatar: "https://cdn.24h.com.vn/upload/3-2022/images/2022-09-28/255x170/adt1664378451-153629c1c879ec80e3d7780ec9d01e14_anh_cat_3_2.jpg",
    name: 'So kè bộ ba xe mô tô thể thao giá rẻ tại Việt Nam',
    samary: "Khi muốn mua một chiếc xe côn tay thể thao cỡ nhỏ, Yamaha R15, Honda CBR150 hay Suzuki GSX-R150 được..."
  },
  {
    id:7,
    avatar: "https://cdn.24h.com.vn/upload/4-2022/images/2022-10-03/255x170/20221003_201457_0000-1664802922-553-width740height555_anh_cat_3_2.jpg",
    name: 'Huyền thoại Honda CB400SF sẽ tiếp tục được sản xuất?',
    samary: 'Vừa thông báo bị "khai tử" hồi tháng 4, nhưng có lẽ Honda sẽ kéo dài lịch sử hơn 30 năm của CB400SF.'
  },
  {
    id:8,
    avatar: "https://cdn.24h.com.vn/upload/4-2022/images/2022-10-02/255x170/20221002_100853_0000-1664680263-46-width740height555_anh_cat_3_2.jpg",
    name: 'Yamaha R15 V4 vừa trình làng có "ăn đứt" Honda CBR150R?',
    samary: "Sau gần 1 năm trình làng thì R15 V4 mới đây đã được bán ra chính hãng tại Việt Nam. Sự có mặt của..."
  },
]
  return (
    <div className="News">
      <div className="heading">
        <div className="heading__title">
          <h3>
            <Link to="/ListNews" className="link-color-orange">
              Tin tức
            </Link>{" "}
            xe máy
          </h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <Container maxWidth="lg">
        <div className="new-content">
          {data?.map((ok, index) => (
            <div className="new-item" key={index}>
              <div className="img">
                <img src={ok.avatar} alt="" />
              </div>
              <div className="text">
                <div className="text-title">
                  <Link to={`/ListNews/${ok.id}`} title={ok.name}>
                    {ok.name}
                  </Link>
                </div>
                <div className="text-content">{ok.samary}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
export default News