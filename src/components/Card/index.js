import React from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';
import cardStyles from './Card.module.scss';

function Card({ id, imageUrl, title, price, onFavorite, onPlus, favorited = false, added = false, loading = false }) {
    const { isItemAdded } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    console.log(title,);

    const onClickPlus = () => {
        onPlus({ id, imageUrl, title, price });
    };

    const onClickFavorite = () => {
        onFavorite({ id, imageUrl, title, price })
        setIsFavorite(!isFavorite);
    }
    return (
        <div className={cardStyles.card} >
            {
                loading ? <ContentLoader
                    speed={2}
                    width={165}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="140" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="10" rx="10" ry="10" width="150" height="88" />
                    <rect x="0" y="150" rx="0" ry="0" width="0" height="2" />
                    <rect x="0" y="160" rx="5" ry="5" width="100" height="15" />
                    <rect x="0" y="210" rx="5" ry="5" width="80" height="25" />
                    <rect x="119" y="206" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
                    :
                    <>
                        <div className={cardStyles.favorite}>
                            <img onClick={onClickFavorite} src={isFavorite ? '/img/heart-like.svg' : '/img/heart-not_like.svg'} alt="notLike" />
                        </div>
                        <img width="100%" height={135} src={imageUrl} alt="sneakers photo" />
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column ">
                                <span>Цена:</span>
                                <b>{price}</b>
                            </div>
                            <img className={cardStyles.plus} onClick={onClickPlus} src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt="button add" />
                        </div>
                    </>
            }
        </div >
    )
}


export default Card;


