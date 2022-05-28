import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [sneakers, setSneakers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch('https://629202f8cd0c91932b6bddda.mockapi.io/items').then(response => {
      return response.json();
    }).then(json => {
      setSneakers(json);
    });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj]);

  }

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-box">
            <img src="/img/search.svg" alt="search" />
            <input className="search-box__input" type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {sneakers.map(item =>
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Added in favorite')}
              onPlus={(obj) => onAddToCart(obj)} />
          )}
        </div>
      </div>
    </div >
  );
}

export default App;
