import react from 'react';
import styled from 'styled-components';


const CAR = ({title, img, place}) =>{
    
    return (
        <StyleCar>
        <div class="card">
        <img src={img} alt="Park Mall" />
        <div class="card-content">
          <div class="title">{title}</div>
          <div class="location">{place}</div>
          <div class="price">From...dzd/night <span class="arrow">➤</span></div>
        </div>
      </div>
      </StyleCar>
    );
}
      const StyleCar= styled.div`
         body {
      font-family: Arial, sans-serif;
      background: #f5f0f0;
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .card {
      width: 300px;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .card:hover {
      transform: scale(1.03);
    }

    .card img {
      width: 100%;
      height: 240px; /* Increased height */
      object-fit: cover;
    }

    .card-content {
      padding: 16px 20px;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 6px;
    }

    .location {
      font-size: 16px;
      color: #777;
      margin-bottom: 16px;
    }

    .price {
      font-size: 16px;
      font-weight: bold;
      color: #444;
    }

    .arrow {
      float: right;
      font-size: 20px;
      color: #555;
    }
    `;
    

export default CAR;