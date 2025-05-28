import React, { useEffect } from "react";
import './css/Home.css';
import Back from "./assets/image/background.png";
import phone from "./assets/image/hotel.png";
import lowla from "./assets/image/lowla.png";
import tania from "./assets/image/tania.png";
import thaltha from "./assets/image/thaltha.png";
import rab3a from "./assets/image/rab3a.png";
import vid from "./assets/back.webm";
import HotelCardRow from "./components/home_items/HotelCard";

function Firstpart() {
  return (
    <div className="first-container">
         <div className="contaa">

<div className="firir">
    
    <img src={Back} alt="photo" id="bibi" />
    <div className="paa">
            <h1>Explore TravelEase For Your Stay</h1>
            <h3>Discover a variety of services during your Journey!</h3>
            <p>Join us now to discover Algeria like you never did.</p>
    </div>
    <img src={phone} alt="" id="pho" />
</div>
<div className="seco">
        <p>Check our best selling</p>
       
    <div className="hoo">

    </div>
</div>
    </div>
    </div>
  );
}

export default Firstpart;