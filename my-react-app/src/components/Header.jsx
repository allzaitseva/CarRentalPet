import React, { useRef } from 'react';

export default function Header() {
  const logoRef = useRef(null);

  const handleLogoMouseEnter = () => {
    if (logoRef.current) logoRef.current.style.transform = 'scale(1.08)';
  };
  const handleLogoMouseLeave = () => {
    if (logoRef.current) logoRef.current.style.transform = 'scale(1)';
  };
  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleNavMouseEnter = (e) => {
    e.target.style.fontWeight = 'bold';
  };
  const handleNavMouseLeave = (e) => {
    e.target.style.fontWeight = '500';
  };
  const handleNavClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="header-logo-text">
        <img
          src="/img/Logo.svg"
          alt="Logo"
          className="logo"
          ref={logoRef}
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer', transition: 'transform 0.18s cubic-bezier(.4,0,.2,1)' }}
        />
      </div>
      <nav className="tabcontent">
        <ul>
          {['Home','Vehicles','Details','About Us','Contact Us'].map((text) => (
            <li key={text}>
              <a
                href="#"
                id={text.toLowerCase().replace(/\s/g,'-')}
                onMouseEnter={handleNavMouseEnter}
                onMouseLeave={handleNavMouseLeave}
                onClick={handleNavClick}
                style={{ fontWeight: 500, cursor: 'pointer', transition: 'font-weight 0.18s cubic-bezier(.4,0,.2,1)' }}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="help">
        <img src="/img/phone.svg" alt="Phone" className="call" />
        <div className="help-info">
          <p className="help-text">Need help?</p>
          <p id="phone-number">+420 123 456 789</p>
        </div>
      </div>
    </header>
  );
}
