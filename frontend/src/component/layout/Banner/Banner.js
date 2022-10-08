import React from "react";
import "./Banner.scss";
const img1 = "https://res.cloudinary.com/dpwv0jwql/image/upload/v1665204885/banner/360_F_247962987_14TmyPShXeIkVAe6ZbAbze3VZs6CdLAU_vcv9t2.jpg"
export default function Banner() {
  return (
    <div className="Banner">
      <div className="blur"></div>
      <img src={img1} alt="" />
    </div>
  );
}
