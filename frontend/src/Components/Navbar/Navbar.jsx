import React from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png'


export const Navbar = () => {

    const [menu, setMenu] = React.useState("shop");
    const { getTotalCartItems } = React.useContext(ShopContext);
    const menuRef = React.useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="Logo" className='nav-logo' />
            <p>R-SHOP</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown" />
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={() => setMenu("shop")}><Link style={{textDecoration: 'none'}} to="/">Boutique</Link> {menu=== "shop" ? <hr/> : <></> }</li>
            <li onClick={() => setMenu("men")}><Link style={{textDecoration: 'none'}} to="/men">Hommes</Link> {menu=== "men" ? <hr/> : <></> }</li>
            <li onClick={() => setMenu("women")}><Link style={{textDecoration: 'none'}} to="/women">Femmes</Link> {menu=== "women" ? <hr/> : <></> }</li>
            <li onClick={() => setMenu("kids")}><Link style={{textDecoration: 'none'}} to="/kids">Enfants</Link> {menu=== "kids" ? <hr/> : <></> }</li>
        </ul>
        <div className='nav-login-cart'>
            {localStorage.getItem("auth-token")
            ?<button style={{backgroundColor: 'red', color: 'white'}} onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}>Déconnexion</button>
            :<Link to="/login"><button>Connexion</button></Link>}
            <Link to="/cart"><img src={cart_icon} alt="Cart" /></Link>
            <span className='nav-cart-count'>{getTotalCartItems()}</span>
        </div>
    </div>
  )
}

export default Navbar;
