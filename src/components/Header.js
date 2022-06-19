import { useContext } from "react";
import { Link } from "react-router-dom";
import { useCart } from '../hooks/useCart';

function Header(props) {
    const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center">
            <Link to='/'>
                <div className="headerLeft d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="logo" />
                    <div className="headerInfo">
                        <h3>React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="headerRight d-flex">
                <li className="mr-30">
                    <img onClick={props.onClickCart} className="cu-p" width={18} height={18} src="/img/cart.svg" alt="cart" />
                    <span>{totalPrice}</span>
                </li>
                <li>
                    <Link to='favorites'><img className="mr-20 cu-p" width={18} height={18} src="/img/favorite.svg" alt="favorites" /></Link>
                </li>
                <li>
                    <Link to='orders'> <img width={18} height={18} src="/img/user.svg" alt="user" /></Link>
                </li>
            </ul>
        </header>
    );
}

export default Header