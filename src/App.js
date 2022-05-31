import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Drawer from './components/Drawer';

function App() {
  const [sneakers, setSneakers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios.get('https://629202f8cd0c91932b6bddda.mockapi.io/items').then(response => setSneakers(response.data));
    axios.get('https://629202f8cd0c91932b6bddda.mockapi.io/cart').then(response => setCartItems(response.data));
    axios.get('https://629202f8cd0c91932b6bddda.mockapi.io/favorites').then(response => setFavorites(response.data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://629202f8cd0c91932b6bddda.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://629202f8cd0c91932b6bddda.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(FavoritesObj => FavoritesObj.id == obj.id)) {
        axios.delete(`https://629202f8cd0c91932b6bddda.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => item.id !== obj.id))
      }
      else {
        const { data } = await axios.post('https://629202f8cd0c91932b6bddda.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data])
      }
    }
    catch (error) {
      alert('Не удалось добавить товар в желаемое');
    }

  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  };

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route path="/" element={
          <Home
            sneakers={sneakers}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
          />} />

        <Route path="/favorites" element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />} />
      </Routes>
    </div >
  );
}

export default App;
