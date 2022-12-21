export const cardValues = [
    '2','3','4','5','6','7','8','9','T','J','Q','K','A'
];

export const cardColors = ['C','S','H','D'];

const importCard = async (name) => await import(`../assets/cards/${name}.svg`);

const importDeck = async () => {
    const cards = [];

    for (const value of cardValues) {
        for (const color of cardColors) {
            const name =`${value}${color}`;
            const img = await importCard(name);
            cards.push({name: name, img: img.default, value, color});
        }
    }
    return cards;
}

export default importDeck;