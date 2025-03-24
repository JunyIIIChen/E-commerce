import React, { useContext } from 'react'
import { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { useRef } from 'react'
import nav_dropdown from '../Assets/nav_dropdown.png'

export const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
      }

  return (
      <div className='navbar'>
          <div className='nav-logo'>
              <img src={logo} alt="" />
              <p>SHOPPER</p>
          </div> 
          <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
          <ul ref={menuRef}  className='nav-menu'>
              <li onClick={() => { setMenu("shop") }}><Link to='/' style={{textDecoration:'none'}}>Shop</Link>{menu==="shop"?<hr></hr>:<></>}</li>
              <li onClick={() => { setMenu("mens") }}><Link to='/mens' style={{textDecoration:'none'}} >Men</Link>{menu==="mens"?<hr></hr>:<></>}</li>
              <li onClick={() => { setMenu("women") }}><Link to='/women' style={{textDecoration:'none'}} >Women</Link>{menu==="women"?<hr></hr>:<></>}</li>
              <li onClick={() => { setMenu("kids") }}><Link to='/kids' style={{textDecoration:'none'}} >Kid</Link>{menu==="kids"?<hr></hr>:<></>}</li>
          </ul>
          <div className='nav-login-cart'>
              <Link to='login'><button>Login</button></Link>
              <Link to='/cart'><img src={cart_icon} alt=""></img></Link>
              <div className='nav-cart-count'>{ getTotalCartItems()}</div>
          </div>
        </div>
  )
}
