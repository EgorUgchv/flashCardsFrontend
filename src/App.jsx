import './App.css'
import AddDeck from "./components/AddDeck/AddDeck.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LearningWords from "./components/LearningWords/LearningWords.jsx";
import {useState} from "react";

function App() {
    const [deckTitle, setDeckTitle] = useState('');
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/add-cards' element={<AddDeck setDeckTitle={setDeckTitle}/>}></Route>
                    <Route path={'/cards'} element={<LearningWords title={deckTitle}/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App
