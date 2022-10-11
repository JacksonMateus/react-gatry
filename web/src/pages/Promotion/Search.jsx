import React from "react";
import PromotionCard from "../../components/Promotion/Card";
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";


const PagesPromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/promotions?_embed=comments')
    .then(response => {
      setPromotions(response.data)
    }) 

  }, []);

  return (
    <div
     style={{
      margin: '30px',
     }}
     >
  {/* Para cada promotion, retorne a sua representação */}
    {promotions.map((promotion) => (
      <PromotionCard promotion={promotion} />
    ))}
     </div>

  )
    

}

export default PagesPromotionSearch;
