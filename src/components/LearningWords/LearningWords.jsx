import React, {useEffect, useState} from "react";
import Card from './Card.jsx';
import {getDeck, updateCard} from "../../services/CardService.js";
import "./ViewCards.css"
import PropTypes from "prop-types";

const LearningWords = ({title}) => {
    const [cards, setCards] = useState([])
    const [deckTitle, setDeckTitle] = useState([])
    const [deckId, setDeckId] = useState([]);

    useEffect(() => {
        getDeck({title}).then((response) => {
            console.log(response);
            console.log("DECKID", response.data.deckId);
            setCards(response.data.cardList);
            setDeckTitle(response.data.title);
            setDeckId(response.data.deckId);
        }).catch(error => {
            console.error(error);
        })
    }, []);

    const handlePostCard = (deckId, idInDeck, quality) => {
        //string format: "yyyy-mm-dd hh:mm"
        const dateStr = new Date().toISOString()
            .replace(/T/, ' ')
            .replace(/:\d{2}\..*Z$/, '');
        console.log(dateStr);
        const qualityData = {
            quality: quality, time: dateStr
        };
        updateCard(deckId, idInDeck, qualityData).then((response) => {
            console.log(response);
        })
    }


    const [iterator, setIterator] = useState(0);
    const lengthDeck = cards.length;

    if (lengthDeck === 0) {
        return <div>Loading...</div>;
    }
    const handleIncreaseIteratorOnClick = () => {
        if (iterator + 1 < lengthDeck) {
            setIterator(prev => (prev + 1));
        }
    };
    return (<div className="container d-flex flex-column justify-content-center ">
        <div className="row justify-content-center">
            <div className="card  col-12 col-md-8 col-lg-6 mt-5 mb-5 p-2 pb-3">
                <h4>Название колоды: {deckTitle}</h4>
            </div>
        </div>

        <div className="row justify-content-center ">
            <div className="col-12 col-md-8 col-lg-6">
                <Card
                    frontContent={<h4
                        key={cards[iterator].idInDeck}
                    >
                        {cards[iterator].term}
                    </h4>}
                    backContent={<h4 key={cards[iterator].idInDeck}
                    >
                        {cards[iterator].definition}
                    </h4>}

                />

                <div className="container mt-2">
                    <div className="row justify-content-md-center">
                        <div className="btn-group mt-2 d-flex justify-content-center" role="group">
                            <button
                                className="btn again btn-sm  small-margin-btn"
                                onClick={() => {
                                    handlePostCard(deckId, cards[iterator].idInDeck, 0);
                                    handleIncreaseIteratorOnClick()
                                }}
                            >Снова

                            </button>
                            <button
                                className="btn btn-sm hard small-margin-btn"
                                onClick={() => {
                                    handlePostCard(deckId, cards[iterator].idInDeck, 1);
                                    handleIncreaseIteratorOnClick()
                                }}
                            >Трудно
                            </button>
                            <button
                                className="btn btn-sm good small-margin-btn"
                                onClick={() => {
                                    handlePostCard(deckId, cards[iterator].idInDeck, 2);
                                    handleIncreaseIteratorOnClick()
                                }}
                            >Хорошо
                            </button>
                            <button
                                className="btn btn-sm easy small-margin-btn"
                                onClick={() => {
                                    handlePostCard(deckId, cards[iterator].idInDeck, 3);
                                    handleIncreaseIteratorOnClick()
                                }}
                            >Легко
                            </button>
                        </div>

                        <div className="col d-flex justify-content-center align-items-center">
                            <h3>{iterator + 1}/{lengthDeck}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

LearningWords.propTypes = {
    title: PropTypes.func.isRequired,
};
export default LearningWords;
