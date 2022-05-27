import cardStyles from './Card.module.scss';
console.log(cardStyles)

function Card(props) {
    const onClickButton = () => alert(props.title)
    return (
        <div className={cardStyles.card}>
            <div className={cardStyles.favorite}>
                <img src="/img/heart-not_like.svg" alt="notLike" />
            </div>
            <img width={133} height={112} src={props.imageUrl} alt="sneakers photo" />
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Цена:</span>
                    <b>{props.price}</b>
                </div>
                <button className="btn" onClick={onClickButton}>
                    <img width={11} height={11} src="/img/plus.svg" alt="button add" />
                </button>
            </div>
        </div >
    );
}


export default Card;


