import React from 'react';
import ContactUsForm from '@/components/ContactUsForm';

const Contact = () => {
  return (
    <>
      <div className="contact">
        <hgroup>
          <h2>
            <span className="text-gradient">Связаться</span>
            <span> с нами</span>
          </h2>
          <a className="contact__email" href="mailto:info@imiko.su">
            info@imiko.su
          </a>
        </hgroup>
        <h3>
          Написать <span className="text-gradient">нам</span>
        </h3>
        <ContactUsForm />
        <p className="copyright">
          Copyright © 2024 <b>EasyMoney Agency.</b> All Right Reserved
        </p>
      </div>
      <p className="copyright-mobile">
        {/*Copyright © 2024 <b>EasyMoney Agency.</b> All Right Reserved*/}
      </p>
    </>
  );
};

export default Contact;
