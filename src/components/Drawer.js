function Drawer({ onClose, items = [] }) {
    return (
        <div className="overlay" >
            <div className="drawer d-flex">
                <div className="drawer__header d-flex justify-between mb-30 aling-center">
                    <h2 className="drawer__title ">Корзина</h2>
                    <img onClick={onClose} className="drawer__btn-remove cu-p" src="/img/remove-btn.svg" alt="remove" />
                </div>
                <div className="drawer__inner">
                    {items.map(obj => (
                        <div className="drawer__cart d-flex align center mb-20">
                            <img className="mr-20" width={70} height={70} src={obj.imageUrl} alt="Sneakers" />
                            <div className="drawer__cart-info mr-20">
                                <p className="drawer__cart-name mb-5">{obj.title}</p>
                                <span className="drawer__cart-price">{obj.price}</span>
                            </div>
                            <img className="drawer__btn-remove" src="/img/remove-btn.svg" alt="remove" />
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
                <button className="drawer-total__btn button">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
            </div>
        </div >
    );
}

export default Drawer