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





function Secondpart() {



    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });

        const elements = document.querySelectorAll('.wide_selection, .secure_payements, .easy_booking, .best_prices, .raa');
        elements.forEach(element => observer.observe(element));

        return () => {
            elements.forEach(element => observer.unobserve(element));
        };
    }, []);
    return (


<div className="abouu">
                    <h3 id="hh" >Why should you choose us?</h3>
                    <div className="wide_selection">
                        <div className="lee" style={{ textAlign: "center" }}>
                        <h1>Wide Selection</h1>
                            <p>Explore a vast range of hotels, apartments, and cars across Algeria.</p>
                    </div>
                    <div className="rii">
                       <img src={lowla} alt="" /> 
                    </div>
                </div>
                    <div className="secure_payements">
                    <div className="rii" style={{ display: "flex", flexDirection: "column" }}>
                        <h1>Secure Payments</h1>
                            <p>Your transactions are safe and secure with our trusted payment system.</p>
                    </div>
                        <div className="lee">
                        <img src={tania} alt="" />
                    </div>
                </div>
                    <div className="easy_booking">
                    <div className="lee">
                        <h1>Easy Booking</h1>
                            <p>Book in just a few clicks with our user-friendly platform.</p>
                    </div>
                    <div className="rii">
                        <img src={thaltha} alt="" />
                    </div>
                </div>
                    <div className="best_prices">
                    <div className="lee">
                            <h1>Best Price</h1>
                            <p>Enjoy the best deals and discounts on every booking.</p>
                    </div>
                    <div className="lee">
                        <img src={rab3a} alt="" />
                    </div>
                </div>
            </div>
    )
}

export default Secondpart;