import Card from '../components/Card';
function Home({ sneakers, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart }) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-box">
                    <img src="/img/search.svg" alt="search" />
                    {searchValue && <img onClick={() => setSearchValue('')} className="clear drawer__btn-remove" src="/img/remove-btn.svg" alt="cleare" />}
                    <input onChange={onChangeSearchInput} value={searchValue} className="search-box__input" type="text" placeholder="Поиск..." />
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {sneakers.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) =>
                    <Card
                        key={index}
                        onFavorite={(obj) => onAddToFavorite(obj)}
                        onPlus={(obj) => onAddToCart(obj)}
                        {...item}
                    />

                )}
            </div>
        </div>
    );
};


export default Home;