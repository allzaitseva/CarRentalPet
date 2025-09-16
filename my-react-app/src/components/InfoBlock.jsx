import React from 'react';

const FEATURES = [
  { icon: '/img/location-icon.svg', title: 'Availability', text: 'A wide range of cars ready for you anytime, ensuring flexibility and convenience.' },
  { icon: '/img/car-icon.svg', title: 'Comfort', text: 'Our vehicles are equipped with the latest technology and comfort features to enhance your driving experience.' },
  { icon: '/img/wallet-icon.svg', title: 'Savings', text: 'We offer competitive pricing and special deals to help you save on your rental.' }
];

export default function InfoBlock() {
  return (
    <div className="info-block">
      {FEATURES.map(f => (
        <div className="feature" key={f.title}>
          <img src={f.icon} alt={f.title + ' Icon'} />
          <p className="name-desc">{f.title}</p>
          <p className="n-description">{f.text}</p>
        </div>
      ))}
    </div>
  );
}
