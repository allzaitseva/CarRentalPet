import React, { useState } from 'react';
import DatePicker from './DatePicker';

export default function BookingForm() {
  const [rentalDate, setRentalDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  return (
    <div className="form">
      <h2>Book your car</h2>
      <div className="select-container">
        <select className="select" defaultValue="">
          <option value="" disabled>Car type</option>
          <option value="small">Small car</option>
          <option value="large">Large car</option>
          <option value="premium">Premium car</option>
        </select>
        <select className="select" defaultValue="">
          <option value="" disabled>Pickup location</option>
          <option value="airport">Airport</option>
          <option value="train">Train Station</option>
          <option value="center">City Center</option>
        </select>
        <select className="select" defaultValue="">
          <option value="" disabled>Drop-off location</option>
          <option value="airport">Airport</option>
          <option value="train">Train Station</option>
          <option value="center">City Center</option>
        </select>
      </div>
      <DatePicker label="Rental date" value={rentalDate} onChange={setRentalDate} />
      <DatePicker label="Return date" value={returnDate} onChange={setReturnDate} minDate={rentalDate} />
      <button className="book-button">Book now</button>
    </div>
  );
}
