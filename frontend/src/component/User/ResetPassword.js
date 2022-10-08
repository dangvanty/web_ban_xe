import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.scss";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userActions";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import {useParams, useNavigate} from 'react-router-dom'
import {eyeHidenLogin,eyeShowLogin} from '../svgIcon/IconSvg'
const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {token} =useParams();
  const navigate = useNavigate()

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState("password");
  const clickShowPass = () => {
    setShowPass(showPass === "password" ? "text" : "password");
  };
  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Cập nhật mật khẩu thành công");

      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Đổi mật khẩu| Tuoi hoa" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Thay đổi mật khẩu</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="passwordWrap">
                  <LockOpenIcon />
                  <input
                    type={`${showPass}`}
                    placeholder="Mật khẩu mới"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="icon-show" onClick={clickShowPass}>
                    {showPass === "password" ? eyeHidenLogin : eyeShowLogin}
                  </div>
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="xác nhận mật khẩu"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Cập nhật"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
