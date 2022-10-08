import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.scss";
import Loader from "../layout/Loader/Loader";
import { Link, useLocation } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userActions";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData"
import {eyeHidenLogin,eyeShowLogin} from '../svgIcon/IconSvg'
import { useNavigate } from 'react-router-dom'
const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const location =useLocation()
  const { error, loading, isAuthenticated} = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [showPass, setShowPass] = useState("password");
  const clickShowPass = () => {
    setShowPass(showPass === "password" ? "text" : "password");
  };
  // check pass at register form : 
  const [passRe,setPassRe]=useState("")
  const [showPass1, setShowPass1] = useState("password");
  const clickShowPass1 = () => {
    setShowPass1(showPass1 === "password" ? "text" : "password");
  };
  const [showRePass, setShowRePass] = useState("password");
  const clickShowRePass = () => {
    setShowRePass(showRePass === "password" ? "text" : "password");
  };
  const changePassRe = (e)=>{
    setPassRe(e.target.value)
  }
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("https://res.cloudinary.com/dpwv0jwql/image/upload/v1652190780/avatars/Profile_oimxos.png");
  const [avatarPreview, setAvatarPreview] = useState("https://res.cloudinary.com/dpwv0jwql/image/upload/v1652190780/avatars/Profile_oimxos.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if (password !== passRe){
      return alert.error('Kiểm tra mật khẩu nhập lại!')
    }

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const shipping =location.search.split("=")[1];

  const redirect = location.search ? shipping : "/account";

  const navigate=useNavigate()
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }

  }, [dispatch, error, alert, isAuthenticated,redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <MetaData title="Đăng Nhập | Tuoi Hoa"/>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>ĐĂNG NHẬP</p>
                  <p onClick={(e) => switchTabs(e, "register")}>ĐĂNG KÝ</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={`${showPass}`}
                    placeholder="Mật khẩu"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <div className="icon-show" onClick={clickShowPass}>
                    {showPass === "password" ? eyeHidenLogin : eyeShowLogin}
                  </div>
                </div>
                <Link to="/password/forgot">Quên mật khẩu ?</Link>
                <input type="submit" value="Đăng nhập" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Tên tài khoản"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type={`${showPass1}`}
                    placeholder="Mật khẩu"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <div className="icon-show" onClick={clickShowPass1}>
                    {showPass1 === "password" ? eyeHidenLogin : eyeShowLogin}
                  </div>
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type={showRePass}
                    placeholder="Nhập lại mật khẩu"
                    required
                    name="password"
                    value={passRe}
                    onChange={changePassRe}
                  />
                  <div className="icon-show" onClick={clickShowRePass}>
                    {showRePass === "password" ? eyeHidenLogin : eyeShowLogin}
                  </div>
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="avatar" className="avatarPerview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Đăng ký" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
