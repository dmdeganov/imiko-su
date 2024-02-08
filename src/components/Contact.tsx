import React from 'react';
import ContactUsForm from '@/components/ContactUsForm';
import {Poppins} from 'next/font/google';

const poppins = Poppins({
  weight: '400',
  display: 'swap',
  subsets: ['latin'],
});

const Contact = () => {
  return (
    <>
      <div className="contact">
        <hgroup>
          <h2>
            <span className="text-gradient">Связаться</span>
            <span> с нами</span>
          </h2>
        </hgroup>
        <h3>
          Написать <span className="text-gradient">нам</span>
        </h3>
        <div className="contact__contacts">
          <a href="mailto:info@imiko.su">info@imiko.su</a>
          <a href="tel:+79602477050">+7 960 247 70 50</a>
        </div>
        <ContactUsForm />
        <div className={`${poppins.className} contact__footer`}>
          <p>
            ООО <b>ИМИКО</b> ИНН <b>7813670710</b>
          </p>
          <p>197110, город Санкт-Петербург, ул Большая Зеленина, д. 24 стр. 1, помещ. 193-н</p>
        </div>
      </div>
      {/*<p className="copyright-mobile">/!*Copyright © 2024 <b>EasyMoney Agency.</b> All Right Reserved*!/</p>*/}
    </>
  );
};

export default Contact;
