import React from 'react';
import BookingForm from './BookingForm';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Experience the road like never before</h1>
        <p id="hero-description">Choose from our extensive selection of vehicles designed to fit every occasion. From fuel-efficient cars for city driving to powerful SUVs for long journeys, we ensure safety, comfort, and convenience at every step of your rental experience.</p>
        <button className="view-cars-button">View all cars</button>
      </div>
      <BookingForm />
      <div className="background" aria-hidden="true">
        <img src="/img/Group.png" alt="" className="group-image" />
        <img src="/img/car.png" alt="" className="car-image" />
      </div>
    </section>
  );
}
