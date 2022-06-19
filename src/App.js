import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import AppContext from './context';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import Drawer from './components/Drawer';



function App() {
  const [sneakers, setSneakers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://629202f8cd0c91932b6bddda.mockapi.io/cart'),
          axios.get('https://629202f8cd0c91932b6bddda.mockapi.io/favorites'),
          axios.get('https://629202f8cd0c91932b6bddda.mockapi.io/items')
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setSneakers(itemsResponse.data);
      }
      catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error);
      }
    }
    fetchData();

  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://629202f8cd0c91932b6bddda.mockapi.io/cart/${findItem.id}`);
      }
      else {
        setCartItems(prev => [...prev, obj]);
        const { data } = await axios.post('https://629202f8cd0c91932b6bddda.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }));
      }
    }
    catch (error) {
      alert('Ошибка при добавлении товара в корзину');
      console.error(error)
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://629202f8cd0c91932b6bddda.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    }
    catch (error) {
      alert('Ошибка при удалении товара из корзины');
      console.error(error)
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favoritesObj => Number(favoritesObj.id) === Number(obj.id))) {
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

  const isItemAdded = (id) => cartItems.some(obj => Number(obj.parentId) === Number(id));


  return (
    <AppContext.Provider value={{ sneakers, favorites, cartItems, isItemAdded, setCartOpened, setCartItems, onAddToFavorite, onAddToCart }}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route path="/" element={
            <Home
              sneakers={sneakers}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />} />

          <Route path="/favorites" element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />} />
          <Route path="/orders" element={<Orders items={favorites} onAddToFavorite={onAddToFavorite} />} />
        </Routes>
      </div >
    </AppContext.Provider>
  );
}

export default App;
