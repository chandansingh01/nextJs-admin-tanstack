import React from 'react';

const Card = ({ title, imgSrc }:{title:string,imgSrc:string}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <img src={imgSrc} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default Card;
