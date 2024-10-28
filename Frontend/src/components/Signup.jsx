import React, { useState } from "react";
import "./Signup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);  // Modal visibility state
    const [isSignUpActive, setIsSignUpActive] = useState(true);  // Toggle between Sign-Up and Sign-In

    const handleRegisterClick = () => {
        setIsSignUpActive(true);
        console.log("Register clicked, isSignUpActive set to:", true);
    };

    const handleLoginClick = () => {
        setIsSignUpActive(false);
        console.log("Login clicked, isSignUpActive set to:", false); 
    };

    const closeModal = () => {
        setIsModalOpen(false);  // Close the modal
    };

    return (
        <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`}>
            <div className="modal-content">
                {/* Close button inside the modal (positioned at top-right corner) */}
                <button className="close-btn" onClick={closeModal}>&times;</button>

                <div className={`container ${isSignUpActive ? 'active' : ''}`} id="container">
                    {/* Sign Up Form */}
                    <div className="form-container sign-up">
                        <form>
                            <div className="form-header">
                                <h1>Create Account</h1>
                            </div>
                            <div className="social-icons">
                              <a href="#" className="icon">
                                  <FontAwesomeIcon icon={faGooglePlusG} />
                              </a>
                              <a href="#" className="icon">
                                  <FontAwesomeIcon icon={faFacebookF} />
                              </a>
                              <a href="#" className="icon">
                                  <FontAwesomeIcon icon={faGithub} />
                              </a>
                              <a href="#" className="icon">
                                  <FontAwesomeIcon icon={faLinkedinIn} />
                              </a>
                            </div>
                            <span>or use your email for registration</span>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <button type="button">Sign Up</button>
                        </form>
                    </div>

                    {/* Sign In Form */}
                    <div className="form-container sign-in">
                        <form>
                            <div className="form-header">
                                <h1>Sign In</h1>
                            </div>
                            <div className="social-icons">
                              <a href="#" className="icon">
                                  <FontAwesomeIcon icon={faGooglePlusG} />
                              </a>
                              <a href="#" className="icon">
                                  <FontAwesomeIcon icon={faFacebookF} />
                              </a>
                              <a href="#" className="icon">
                                  <FontAwesomeIcon icon={faGithub} />
                              </a>
                              <a href="#" className="icon">
                                  <FontAwesomeIcon icon={faLinkedinIn} />
                              </a>
                            </div>
                            <span>or use your email password</span>
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <a href="#">Forget Your Password?</a>
                            <button type="button">Sign In</button>
                        </form>
                    </div>

                    {/* Toggle Buttons */}
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button className="toggle-button" id="login" onClick={handleLoginClick}>Sign In</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <button className="toggle-button" id="register" onClick={handleRegisterClick}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
