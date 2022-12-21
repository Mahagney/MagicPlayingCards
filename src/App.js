import { useEffect, useState } from "react";
import importDeck, { cardColors, cardValues } from "./deck/Deck";
import { IconButton, Tooltip } from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SortIcon from '@mui/icons-material/Sort';
import { ReactComponent as BackCard } from './assets/cards/2B.svg';

export default function App() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const cards = await importDeck();
      setCards(cards);
    }
  
    fetchData()
      .catch(console.error);
  }, [])

  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const shuffleCards = () => {
    const newCards = [...cards];
    newCards.sort( () => Math.random() - 0.5);
    setCards(newCards);
  }

  const compareCards = (a, b) => {
    if(a.color !== b.color) {
      return cardColors.indexOf(a.color) - cardColors.indexOf(b.color);
    } else {
      return cardValues.indexOf(b.value) - cardValues.indexOf(a.value);
    }
  }

  const sortCards = () => {
    const newCards = [...selectedCards];
    newCards.sort((a, b)=> compareCards(a,b));
    setSelectedCards(newCards);
  }

  const drawRandomCard = () => {
    if(cards.length > 0 ) {
      const index = getRandomArbitrary(0, cards.length - 1);
      const cards2 = [...cards];
      setSelectedCards([cards2[index], ...selectedCards]);
      cards2.splice(index, 1);
      setCards(cards2);
    }
  }

  return <>
    <Tooltip title="Click to draw card">
      <BackCard onClick={drawRandomCard}/>
    </Tooltip>
    <br/>
    <Tooltip title="Shuffle">
      <IconButton size="large" aria-label="delete" color="primary" onClick={shuffleCards}>
        <ShuffleIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Sort">
      <IconButton size="large" aria-label="delete" color="primary" onClick={sortCards}>
        <SortIcon />
      </IconButton>
    </Tooltip>
    <br/>
    { selectedCards.map(card => <img style={{marginRight: "10px", marginBottom: "10px"}} key={card.name} alt={card.name} src={card.img}/>) }
  </>
}
