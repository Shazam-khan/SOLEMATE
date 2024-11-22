import React, { useState, useEffect } from 'react';
import { data } from '../data/data.js';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('fade-out'); 

      // Delay changing the index until fade out animation is complete
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        setFadeClass('fade-in'); // Start fade in
      }, 500); // Match this delay with your CSS transition duration

    }, 10000); // Interval for changing slides

    return () => clearInterval(interval); 
  }, []);

  const prevSlide = () => {
    setFadeClass('fade-out');

    // Delay changing the index until fade out animation is complete
    setTimeout(() => {
      setCurrentIndex((currentIndex === 0) ? data.length - 1 : currentIndex - 1);
      setFadeClass('fade-in'); // Start fade in
    }, 500); // Match this delay with your CSS transition duration
  };

  const nextSlide = () => {
    setFadeClass('fade-out'); // Start fade out

    // Delay changing the index until fade out animation is complete
    setTimeout(() => {
      setCurrentIndex((currentIndex === data.length - 1) ? 0 : currentIndex + 1);
      setFadeClass('fade-in'); // Start fade in
    }, 500); // Match this delay with your CSS transition duration
  };

  return (
    <div className="h-screen relative bg-brown-gradient overflow-hidden">
      <div>
        {data.map((item, index) => (
          <main
            key={item.id}
            className={`transition-opacity duration-1000 ease-in-out ${index === currentIndex ? fadeClass : 'hidden'} flex lg:flex-row lg:items-center flex-col items-start px-4 z-10 relative overflow-hidden md:px-16`}
          >
            <div className="relative flex flex-col w-screen h-screen gap-4 justify-center lg:items-center lg:text-center items-center text-center mb-5 md:mb-0">
              <div className="relative z-10 justify-center items-center">
                <h1
                  className="md:text-7xl text-7xl mx-auto lg:mx-0 font-bold leading-tight"
                  style={{
                    minHeight: '40px',  
                  }}
                >
                  <span
                    className="text-transparent font-bold"
                    style={{
                      WebkitTextStroke: `3px ${item.colorDeep}`,
                    }}
                  >
                    {item.mainText}!
                  </span>
                </h1>
                <p
                  className="mt-4 leading-normal md:text-3xl text-lg text-black typewriter-text"
                  style={{ minHeight: '40px' }}  // Set a fixed or minimum height for the paragraph
                >
                  {item.subText}
                </p>
                <Link to="/products">
                <button
                  type="button" 
                  className="mt-8 text-2xl text-white bg-custom-brown border-2 border-custom-brown font-bold py-2 px-24 relative group overflow-hidden"
                >
                  Shop Now
                  <span
                    className="absolute transition-all duration-300 transform group-hover:translate-x-16 group-hover:opacity-0"
                    style={{ right: '50px' }}  // Adjust the right position if needed
                  >
                    <FontAwesomeIcon icon={faArrowRightLong} className="ml-2" />
                  </span>
                </button>
                </Link>
              </div>

              {/* Image as background */}
              <div className="absolute inset-0 w-full h-full z-0 flex justify-center items-top overflow-hidden">
                <img
                  src={item.img}
                  loading="eager"
                  alt={item.mainText}
                  className="object-cover object-top opacity-40"
                />
              </div>
            </div>
            <div class="custom-shape-divider-bottom-1696038172">
                    <svg
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1200 120"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25"
                        class="shape-fill"
                      ></path>
                      <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5"
                        class="shape-fill"
                      ></path>
                      <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        class="shape-fill"
                      ></path>
                    </svg>
            </div>
          </main>
        ))}
      </div>
    </div>

  );
};

export default Hero;
