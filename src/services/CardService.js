import axios from "axios";
import error from "eslint-plugin-react/lib/util/error.js";

const REST_API_BASE_URL = 'http://localhost:8080/api/decks';


export const getDeck = ({title}) => axios.get(`${REST_API_BASE_URL}?title=${title}`);
export const createDeck = (deck) => axios.post(REST_API_BASE_URL, deck)
    .catch(error => {
        console.error(error)
    });

export const updateCard = (deckId, idInDeck, qualityData) => axios.patch(`${REST_API_BASE_URL}/${deckId}/cards/${idInDeck}`, qualityData)
    .catch(error => {
        console.error(error);
    })