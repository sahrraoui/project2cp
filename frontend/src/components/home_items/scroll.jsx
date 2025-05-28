import React from "react";
import CAR from "./cc";
import lowla from "../assets/image/lowla.png";
function Scroll() {
    return (
    <div className="slider">
        <div className="list">
        <CAR title ="france" place="loblob" img={lowla}/>
       
            
        </div>
    </div>
    );
}
export default Scroll;