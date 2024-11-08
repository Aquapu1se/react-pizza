import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string, 
    price: number
  }>();

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const res = await axios.get(
          'https://664226513d66a67b34366b37.mockapi.io/items/' + params.id,
        );

        setPizza(res.data);
      } catch (error) {
        console.log(error);
        alert('There is no such pizza');
        navigate('/');
      }
    }

    fetchPizza();
  }, [params.id, navigate]);

  if (!pizza) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="fullpizza">
      <div className="container">
        <img className="fullpizza__img" src={pizza.imageUrl} alt={pizza.title} />
        <div className="fullpizza__info">
          <h2 className="fullpizza__header">{pizza.title}</h2>
          <h4>{pizza.price ? `${pizza.price} $` : ""}</h4>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
