import React, {useState} from 'react';
import "./AddDeck.css";
import {createDeck} from "../../services/CardService.js";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

const isListHaveOneElement = (card) => card.length == 1;

const AddDeck = ({setDeckTitle}) => {
    const [cards, setCards] = useState([{idInDeck: 1, term: "", definition: ""}]);
    const [title, setTitle] = useState("");

    const navigator = useNavigate();
    const saveCards = (e) => {
        e.preventDefault();
        setDeckTitle(title);
        //string format: "yyyy-mm-dd hh:mm"
        const dateStr = new Date().toISOString()
            .replace(/T/, ' ')
            .replace(/:\d{2}\..*Z$/, '');
        console.log(dateStr);

        const deck = {
            title: title, cardList: cards, time: dateStr
        };

        console.log(JSON.stringify(deck));

        createDeck(deck).then((response) => {
            console.log(response.data);
            navigator('/cards');
        });
    }
    const handleAddCard = () => {
        const newCard = {idInDeck: cards.length + 1, term: "", definition: ""};
        setCards([...cards, newCard]);
    };
    const handleUpdateCard = (id, field, value) => {
        const updatedCard = cards.map((card) => card.idInDeck === id ? {...card, [field]: value} : card);
        setCards(updatedCard);
    };

    const handleRemoveCard = (id) => {
        if (!isListHaveOneElement(cards)) {
            const newCards = cards.filter((card) => id !== card.idInDeck);
            const cardsWithNewNumbers = newCards.map((card) => card.idInDeck >= id ? {
                ...card, idInDeck: card.idInDeck - 1
            } : card);
            setCards(cardsWithNewNumbers);
        }
    };

    return (<div className="container">
        <div className="card mt-5 mb-5 p-2 pb-3">
            <h3>Название</h3>
            <input className="form-control w-100"
                   name="title"
                   placeholder="Введите название"
                   value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}
            />
        </div>
        <form onSubmit={saveCards}>{cards.map((card) => <div className="card mt-3" key={card.idInDeck}>

            <div className="header d-flex justify-content-between p-3">
                <h4>{card.idInDeck}</h4>
                <a
                    className="button-bin btn"
                    onClick={() => handleRemoveCard(card.idInDeck)}
                ></a>
            </div>

            <div className="card-body row">
                <div className="col">
                    <h3>Термин</h3>
                    <input
                        className="form-control w-100"
                        placeholder="Введите термин"
                        value={card.term}
                        onChange={(e) => handleUpdateCard(card.idInDeck, 'term', e.currentTarget.value)}
                    />
                </div>
                <div className="col">
                    <h3>Определение</h3>
                    <input
                        className="form-control w-100"
                        placeholder="Введите определение"
                        value={card.definition}
                        onChange={(e) => handleUpdateCard(card.idInDeck, 'definition', e.currentTarget.value)}
                    />
                </div>
            </div>
        </div>)}

            <button type="submit"
                    className="btn btn-primary mt-2"
            >Создать
            </button>
        </form>
        <button
            id="new-card"
            className=" w-100 d-flex justify-content-center align-items-center mt-4 mt-s rounded-2"
            style={{height: '5rem'}}
            type="button"
            onClick={handleAddCard}
        >
            <h3>+ Добавить карточку</h3>
        </button>
    </div>);
};
AddDeck.propTypes = {
    setDeckTitle: PropTypes.func.isRequired,
};
export default AddDeck;