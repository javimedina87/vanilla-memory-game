document.addEventListener('DOMContentLoaded', function(event) {
	const flippedCards = [];
	const GAME_IMAGES = [
		'green-cow',
		'purple-cow',
		'red-cow',
		'yellow-cow'
	]

	const generateMemoryBoard = () => {
		const memoryContainer = document.getElementById('memory-container');
		const mixedImagesArray = resizeAndGenerateMixedImages(GAME_IMAGES);
		let row = generateRow();

		for (let i = 0; i < mixedImagesArray.length; i++) {
			if (i % 4 === 0) {
				row = generateRow();
			}
			const card = generateCard(mixedImagesArray[i]);

			// insert one card into the row
			row.appendChild(card);

			// insert one row into the main container
			memoryContainer.appendChild(row);
		}
	};


	// Resize array (two cards of each picture and shuffle it)
	const resizeAndGenerateMixedImages = () => {
		return [...GAME_IMAGES, ...GAME_IMAGES].sort(() => Math.random() - 0.5);
	};

	const generateRow = () => {
		const row = document.createElement('div');
		row.id = 'card-row';

		// single row (should contains 4 cards)
		return row;
	};

	const generateCard = (name) => {
		const card = document.createElement('div');
		card.className = 'card';

		// on click event
		card.onclick = () => flipCard(card);

		const cardImage = generateCardImage(name);

		card.appendChild(cardImage);

		// single card
		return card;
	};

	const generateCardImage = (name) => {
		const cardImage = document.createElement('img');
		cardImage.className = 'card-image';
		cardImage.src = 'images/question-mark.png';
		cardImage.setAttribute('name', name);

		// image for card
		return cardImage;
	};

	const flipCard = (card) => {
		console.log('click flipcard');

		const cardImage = card.getElementsByClassName('card-image')[0];

		cardImage.setAttribute('src', `images/game-images/${cardImage.getAttribute('name')}.png`);

		flippedCards.push(card);

		checkFlippedCards();
	};

	const checkFlippedCards = () => {
		if (flippedCards.length > 1) {
			validateCardPair();
		}
	};

	const validateCardPair = () => {
		const firstFlippedCard = flippedCards[0].getElementsByClassName('card-image')[0];
		const secondFlippedCard = flippedCards[1].getElementsByClassName('card-image')[0];

		if (firstFlippedCard.getAttribute('name') === secondFlippedCard.getAttribute('name')) {
			flippedCards[0].onclick = () => false;
			flippedCards[1].onclick = () => false;
			flippedCards.length = 0;
		} else {
			setTimeout(() => resetCardsToInitialStatus(), 700);
		}
	};

	const resetCardsToInitialStatus = () => {
		flippedCards.forEach((flippedCard) => {
			const flippedCardImage = flippedCard.getElementsByClassName('card-image')[0];

			flippedCardImage.setAttribute('src', 'images/question-mark.png');
		});

		flippedCards.length = 0;
	};

	generateMemoryBoard();
});
