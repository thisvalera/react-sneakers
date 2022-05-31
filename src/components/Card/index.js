import React from 'react';
import cardStyles from './Card.module.scss';

function Card({ id, imageUrl, title, price, onFavorite, onPlus, favorited = false }) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({ imageUrl, title, price });
        setIsAdded(!isAdded)
    };

    const onClickFavorite = () => {
        onFavorite({ id, imageUrl, title, price })
        setIsFavorite(!isFavorite);
    }
    return (
        <div className={cardStyles.card} >
            <div className={cardStyles.favorite}>
                <img onClick={onClickFavorite} src={isFavorite ? '/img/heart-like.svg' : '/img/heart-not_like.svg'} alt="notLike" />
            </div>
            <img width={133} height={112} src={imageUrl} alt="sneakers photo" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                <img className={cardStyles.plus} onClick={onClickPlus} src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt="button add" />
            </div>
        </div >
    );
}


export default Card;


