import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const sneakersStock = [
  { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12_999, imageUrl: '/img/sneakers/1.png' },
  { title: 'Мужские Кроссовки Nike Air Max 270', price: 8_999, imageUrl: '/img/sneakers/2.png' },
  { title: 'Кроссовки Puma X Aka Boku Future Rider', price: 6_999, imageUrl: '/img/sneakers/3.png' },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-box">
            <img src="/img/search.svg" alt="search" />
            <input className="search-box__input" type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex">
          {sneakersStock.map(obj =>
            <Card title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl} />
          )}
        </div>
      </div>
    </div >
  );
}

export default App;
