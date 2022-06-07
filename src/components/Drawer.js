import React, { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from '../context';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
    const { cartItems, setCartItems } = useContext(AppContext);
    const [OrderId, setOrderId] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://629202f8cd0c91932b6bddda.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://629202f8cd0c91932b6bddda.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        }
        catch (error) {
            alert('Ошибка при создании заказа');
        }
        setIsLoading(false);
    }
    return (
        <div className="overlay" >
            <div className="drawer d-flex">
                <div className="drawer__header d-flex justify-between mb-30 aling-center">
                    <h2 className="drawer__title ">Корзина</h2>
                    <img onClick={onClose} className="drawer__btn-remove cu-p" src="/img/remove-btn.svg" alt="remove" />
                </div>
                <div className="drawer__inner">
                    {items.map(obj => (
                        <div key={obj.id} className="drawer__cart d-flex align center mb-20">
                            <img className="mr-20" width={70} height={70} src={obj.imageUrl} alt="Sneakers" />
                            <div className="drawer__cart-info mr-20">
                                <p className="drawer__cart-name mb-5">{obj.title}</p>
                                <span className="drawer__cart-price">{obj.price}</span>
                            </div>
                            <img onClick={() => onRemove(obj.id)} className="drawer__btn-remove" src="/img/remove-btn.svg" alt="remove" />
                        </div>
                    ))
                    }
                </div>
                <ul className="drawer-total">
                    <li className="d-flex">
                        <span>Итого:</span>
                        <div></div>
                        <span>24 498 грн.</span>
                    </li>
                    <li className="d-flex">
                        <span>Налог 5%:</span>
                        <div></div>
                        <span>1074 грн</span>
                    </li>
                </ul>
                <button onClick={onClickOrder} className="drawer-total__btn button">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
            </div>
        </div >
    );
}

export default Drawer