import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const cardImages = [
	{
		src: "https://github.com/Hero1230/React-Memory-Game/blob/master/public/img/helmet-1.png?raw=true",
		matched: false,
	},
	{
		src: "https://github.com/Hero1230/React-Memory-Game/blob/master/public/img/potion-1.png?raw=true",
		matched: false,
	},
	{
		src: "https://github.com/Hero1230/React-Memory-Game/blob/master/public/img/ring-1.png?raw=true",
		matched: false,
	},
	{
		src: "https://github.com/Hero1230/React-Memory-Game/blob/master/public/img/scroll-1.png?raw=true",
		matched: false,
	},
	{
		src: "https://github.com/Hero1230/React-Memory-Game/blob/master/public/img/shield-1.png?raw=true",
		matched: false,
	},
	{
		src: "https://github.com/Hero1230/React-Memory-Game/blob/master/public/img/sword-1.png?raw=true",
		matched: false,
	},
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({
				...card,
				id: Math.random(),
			}));

		setChoiceOne(null);
		setChoiceTwo(null);

		setCards(shuffledCards);
		setTurns(0);
	};

	const pickedCardsReset = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTruns) => prevTruns + 1);
		setDisabled(false);
	};

	const compareCards = useCallback(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);

			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
			} else {
			}
			setTimeout(pickedCardsReset, 1000);
		}
	}, [choiceOne, choiceTwo]);

	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	useEffect(() => {
		compareCards();
	}, [compareCards]);

	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<div className="App">
			<h1>React Memory Game</h1>
			<button onClick={shuffleCards}>New Game</button>
			<div className="card-grid">
				{cards.map((card) => (
					<Card
						card={card}
						key={card.id}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
}

export default App;
