import React from 'react';

const MobileFooter = () => {
  return (
    <footer className="main-slider__footer mobile-contact-footer">
      ООО <b>ИМИКО</b><br />
      ИНН <b>7813670710</b>
      <p>
        197110, город Санкт-Петербург,
        <br /> ул Большая Зеленина,
        <br />
        д. 24 стр. 1, помещ. 193-н <br />
      </p>
      <div className="mobile-contact-footer__phones">
        <a href="tel:+79602477050">+7 960 247 70 50</a>
        <a href="tel:+79268978415">+7 926 897 84 15</a>
      </div>
    </footer>
  );
};

export default MobileFooter;
