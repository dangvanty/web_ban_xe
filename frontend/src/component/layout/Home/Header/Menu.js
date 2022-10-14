import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import Backdrop from '@material-ui/core/Backdrop'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { logout } from '../../../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import './Menu.scss'
import { bar } from '../../../svgIcon/IconSvg'

const Menu = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart)
  // const [load, setLoad] = useState(true);
  const MenuEl = useRef(null)
  const MenuHidentEl = useRef(null)
  const MenuBarEl = useRef(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch()
  const options = [
    { icon: <ListAltIcon />, name: 'Đơn hàng', func: orders },
    { icon: <PersonIcon />, name: 'Cá nhân', func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? '#EAB543' : 'unset' }}
        />
      ),
      name: `Giỏ hàng(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: 'Đăng xuất', func: logoutUser },
  ]

  if (user.role === 'admin') {
    options.unshift({
      icon: <DashboardIcon />,
      name: 'Quản trị',
      func: dashboard,
    })
  }
  function dashboard() {
    navigate('/admin/dashboard')
  }

  function orders() {
    navigate('/orders')
  }
  function account() {
    navigate('/account')
  }
  function cart() {
    navigate('/cart')
  }
  function logoutUser() {
    dispatch(logout())
    localStorage.removeItem("cartItems")
    window.location.reload()
    alert.success('Đăng xuất thành công!')
  }

  useEffect(() => {
    // menuJs(MenuEl.current, MenuHidentEl.current, MenuBarEl.current);
    let menuHide = MenuHidentEl.current
    let menuBar = MenuBarEl.current
    let Menu = MenuEl.current
    let indexShowMenu = 'no'

    const resizeMenu = (n) => {
      if (n <= 937) {
        menuHide.style.height = '0px'
        indexShowMenu = 'no'
      } else {
        menuHide.style.height = 'auto'
        indexShowMenu = 'yes'
      }
    }
    menuBar.onclick = () => {
      clickBar()
    }
    const clickBar = () => {
      if (indexShowMenu === 'no') {
        menuHide.style.height = '350px'
        indexShowMenu = 'yes'
      } else {
        menuHide.style.height = '0'
        indexShowMenu = 'no'
      }
    }
    const scrollDestop = () => {
      if (window.pageYOffset >= 16) {
        Menu.classList.add('menu-scroll')
      } else {
        Menu.classList.remove('menu-scroll')
      }
    }
    const resizeDestop = () => {
      var widthScreen = window.innerWidth
      resizeMenu(widthScreen)
    }
    window.addEventListener('scroll', scrollDestop)
    window.addEventListener('resize', resizeDestop)
    return () => {
      window.removeEventListener('resize', resizeDestop)
      window.removeEventListener('scroll', scrollDestop)
    }
  }, [])

  return (
    <>
      <>
        {!user.avatar.url ? (
          <div className="Menu" ref={MenuEl}>
            <div className="menu-logo">
              <div className="logo">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dpwv0jwql/image/upload/v1665303469/banner/tuoi_hoa_zuzzop.png"
                    className="imgLogo"
                  ></img>
                  <p className="titleLogo">Tuoi Hoa </p>
                </Link>
              </div>
            </div>
            <div className="menu-bar" ref={MenuBarEl}>
              <div className="icon-bar">{bar}</div>
            </div>
            <div id="menu-hide" ref={MenuHidentEl} style={{ display: 'flex' }}>
              <div className="menu-item">
                <div className="list-item">
                  <ul>
                    <li className="item">
                      <Link to="">Trang chủ</Link>
                    </li>
                    <li className="item">
                      <Link to="/Shop">Cửa hàng</Link>
                    </li>
                    {/* <li className="item">
                      <Link to="">Giới thiệu</Link>
                    </li> */}
                    <li className="item">
                      <Link to="/contact">Liên hệ</Link>
                    </li>
                    <li className="item">
                      <Link to="/cart" style={{ display: 'flex' }}>
                        Giỏ hàng
                        <div className="number">{cartItems?.length}</div>
                        <ShoppingCartIcon
                          style={{
                            color: cartItems.length > 0 ? '#EAB543' : 'inherit',
                            fontSize: '20px',
                          }}
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="menu-account">
                <div className="avatar">
                  <Link to="/login">
                    <img
                      src="https://res.cloudinary.com/dpwv0jwql/image/upload/v1652190780/avatars/Profile_oimxos.png"
                      alt=""
                    />
                    <p>Đăng nhập</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="Menu" ref={MenuEl}>
            <div className="menu-logo">
              <div className="logo">
                <Link to="/">
                  <img src="https://res.cloudinary.com/dpwv0jwql/image/upload/v1665303469/banner/tuoi_hoa_zuzzop.png" className="imgLogo"></img>
                  <p className="titleLogo">Tuoi Hoa </p>
                </Link>
              </div>
            </div>
            <div className="menu-bar" ref={MenuBarEl}>
              <div className="icon-bar">{bar}</div>
            </div>
            <div id="menu-hide" ref={MenuHidentEl} style={{ display: 'flex' }}>
              <div className="menu-item">
                <div className="list-item">
                  <ul>
                    <li className="item">
                      <Link to="">Trang chủ</Link>
                    </li>
                    <li className="item">
                      <Link to="/Shop">Cửa hàng</Link>
                    </li>
                    {/* <li className="item">
                      <Link to="">Giới thiệu</Link>
                    </li> */}
                    <li className="item">
                      <Link to="/contact">Liên hệ</Link>
                    </li>
                    <li className="item">
                      <Link to="/cart" style={{ display: 'flex' }}>
                        Giỏ hàng
                        <div className="number">{cartItems?.length}</div>
                        <ShoppingCartIcon
                          style={{
                            color: cartItems.length > 0 ? '#EAB543' : 'inherit',
                            fontSize: '20px',
                          }}
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      {user.avatar.url && (
        <>
          <Backdrop open={open} style={{ zIndex: '10' }} />
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ zIndex: '11' }}
            open={open}
            direction="down"
            className="speedDial"
            icon={
              <img
                className="speedDialIcon"
                src={user.avatar.url ? user.avatar.url : '/Profile.png'}
                alt="Profile"
              />
            }
          >
            {options.map((item) => (
              <SpeedDialAction
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                tooltipOpen={window.innerWidth <= 600 ? true : false}
              />
            ))}
          </SpeedDial>
        </>
      )}
    </>
  )
}

export default Menu
