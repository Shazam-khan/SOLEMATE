import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to your backend
  };

  return (
    <div className='mt-24'>
      <div className="container1">
        <span className="big-circle"></span>
        <img src="img/shape.png" className="square" alt="" />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's get in touch</h3>
            <p className="text">
            We’d love to hear from you! Whether you have a question, feedback, or just want to chat, feel free to reach out. Contact us through the form below or via our social media channels.  
            </p>

            <div className="info">
              <div className="information">
                <FontAwesomeIcon icon={faLocationDot} className="icon" />
                <p>92 Cherry Drive Uniondale, NY 11553</p>
              </div>
              <div className="information">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <p>lorem@ipsum.com</p>
              </div>
              <div className="information">
                <FontAwesomeIcon icon={faPhoneVolume} className="icon" />
                <p>123-456-789</p>
              </div>
            </div>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <form className="sub-form" action="index.html" autoComplete="off" onSubmit={handleSubmit}>
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <input type="text" name="name" className="input" onChange={handleChange} />
                <label htmlFor="">Username</label>
              </div>
              <div className="input-container">
                <input type="email" name="email" className="input" onChange={handleChange} />
                <label htmlFor="">Email</label>
              </div>
              <div className="input-container">
                <input type="tel" name="phone" className="input" onChange={handleChange} />
                <label htmlFor="">Phone</label>
              </div>
              <div className="input-container textarea">
                <textarea name="message" className="input" onChange={handleChange}></textarea>
                <label htmlFor="">Message</label>
              </div>
              <input type="submit" value="Send" className="btn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
