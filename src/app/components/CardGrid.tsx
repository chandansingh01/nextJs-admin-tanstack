import React from 'react';
import Card from './Card';

const cards = [
  { title: 'General Fast', imgSrc: 'tiger.jpg' },
  { title: 'Anime', imgSrc: 'anime.jpg' },
  { title: '3D Animation', imgSrc: '3d.jpg' },
  { title: 'Toon', imgSrc: 'toon.jpg' },
  // Add more card data as needed
];

const CardGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} imgSrc={card.imgSrc} />
      ))}
    </div>
  );
};

export default CardGrid;