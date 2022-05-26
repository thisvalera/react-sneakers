function Drawer() {
    return (
        <div className="drawer d-flex">
            <div className="drawer__header d-flex justify-between mb-30 aling-center">
                <h2 className="drawer__title ">Корзина</h2>
                <img className="drawer__btn-remove cu-p" src="/img/remove-btn.svg" alt="remove" />
            </div>
            <div className="drawer__inner">


                <div className="drawer__cart d-flex align center mb-20">
                    <img className="mr-20" width={70} height={70} src="/img/sneakers/1.png" alt="Sneakers" />
                    <div className="drawer__cart-info mr-20">
                        <p className="drawer__cart-name mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
                        <span className="drawer__cart-price">12 999 грн.</span>
                    </div>
                    <img className="drawer__btn-remove" src="/img/remove-btn.svg" alt="remove" />
                </div>

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
    );
}

export default Drawer