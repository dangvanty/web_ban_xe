import { Container, TextField } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import DateFnsUtils from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import "./RegisterService.scss";
import Banner from "../Banner/Banner";
import Footer from "../Home/Footer/Footer";
import MetaData from "../MetaData";
import {send} from 'emailjs-com'
import { useAlert } from "react-alert";

export default function RegisterService() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dataType = [
    { value: "dịch vụ", label: "Dịch vụ" },
    { value: "mua hàng", label: "Mua hàng" },
  ];
  const [typeTopic, setTypeTopic] = useState("dịch vụ");
  const [date, setDate] = useState(new Date());

  const onchangeTypeTopic = (e) => {
    setTypeTopic(e.label);
  };
  const alert = useAlert();
  const onSubmit = (data) => {
    data.service = typeTopic
    data.date=date.toLocaleDateString('en-US')
    console.log(':::::::',data)
    send('service_7xwxglc', 'template_oznphsr',data, '5lY3encKIfwplgmlB')
      .then(() => {
        alert.success('Tuoi Hoa đã nhận được thông tin liên hệ của bạn!')
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className="RegisterService">
        <MetaData title={`Liên hệ với chúng tôi | Tuoi Hoa`} />
      <Banner />
      <Container>
        <Container className="content">
          <div className="title">
            <div className="title_header">Liên hệ với chúng tôi</div>
            <small className="title_small">
            Xin quý khách vui lòng để lại thông tin cần hỗ trợ, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất
            </small>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-admin">
                <label htmlFor="">Họ và tên</label>
                <input
                  type="text"
                  name="name"
                  {...register("name", {
                    required: "Không được bỏ trống!",
                    maxLength: {
                      value: 255,
                      message: "Vượt quá ký tự cho phép",
                    },
                  })}
                />
                {errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Số điện thoại</label>
                <input
                  type="number"
                  name="phone"
                  {...register("phone", {
                    required: "Không được bỏ trống!",
                    maxLength: {
                      value: 10,
                      message: "Số điện thoại chỉ 10 số!",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-danger">{errors.phone.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Email liên hệ</label>
                <input
                  type="text"
                  name="email"
                  {...register("email", {
                    required: "Không được bỏ trống!",
                    maxLength: {
                      value: 255,
                      message: "Vượt quá ký tự cho phép",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  {...register("address", {
                    required: "Không được bỏ trống!",
                    maxLength: {
                      value: 255,
                      message: "Vượt quá ký tự cho phép",
                    },
                  })}
                />
                {errors.address && (
                  <span className="text-danger">{errors.address.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Chủ đề gửi</label>
                <Select
                  closeMenuOnSelect={false}
                  onChange={onchangeTypeTopic}
                  name="service"
                  defaultValue={[{ value: "dịch vụ", label: "Dịch vụ" }]}
                  options={dataType}
                />
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Ngày đặt lịch"
                  inputFormat="MM/dd/yyyy"
                  name="date"
                  minDate={new Date().setDate(new Date().getDate() + 1)}
                  value={date}
                  onChange={(e) => setDate(e)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <div className="input-admin">
                <label htmlFor="">Nhập nội dung gửi</label>
                <textarea
                  id=""
                  cols="30"
                  rows="10"
                  name="note"
                  placeholder="Nhập nội dung "
                  {...register("note", {
                    required: "Không được bỏ trống!",
                    maxLength: {
                      value: 500,
                      message: "Vượt quá ký tự cho phép",
                    },
                  })}
                ></textarea>
                {errors.note && (
                  <span className="text-danger">{errors.note.message}</span>
                )}
              </div>
              <div className="btn-wrap">
                <button className="btn-reset" type="reset">
                    Làm mới
                </button>
                <button className="btn" type="submit">
                    GỬI YÊU CẦU
                </button>
              </div>
              <small className="title_small">
                Bạn sẽ sớm được liện hệ từ đội ngũ nhân viên của chúng tôi.
                xin cảm ơn
              </small>
            </form>
          </div>
        </Container>
      </Container>
      <Footer/>
    </div>
  );
}
