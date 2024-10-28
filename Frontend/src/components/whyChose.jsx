import React from 'react';
import ecompost from '../assets/Hero/ecompost.png';

const WhyChose = () => {
  return (
    <div className="py-8 mx-20">
      <div className="mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Why Choose SOLE MATE?</h2>
      </div>

      <div className="mx-auto mt-12 px-8 grid grid-cols-1 md:grid-cols-3 gap-10 space-x-16 items-center bg-gray-50">
        {/* Left Column */}
        <div className="space-y-12 text-right">
          <div className="flex flex-col items-end" data-aos="zoom-in-up" data-aos-delay="0">
            <p className="text-2xl text-custom-brown bg-[#EBF3FE] w-14 h-14 flex justify-center items-center rounded-full">1</p>
            <h3 className="text-xl font-semibold mt-4">Wide Selection</h3>
            <p className="text-gray-500">
              Mega Store offers a diverse range of gadgets, from smartphones to smart home devices, ensuring you find what you need to elevate your lifestyle and meet your tech requirements.
            </p>
          </div>

          <div className="flex flex-col items-end" data-aos="zoom-in-up" data-aos-delay="300">
            <p className="text-2xl text-custom-brown bg-[#EBF3FE] w-14 h-14 flex justify-center items-center rounded-full">2</p>
            <h3 className="text-xl font-semibold mt-4">Quality Assurance</h3>
            <p className="text-gray-500">
              Every gadget at Mega Store undergoes rigorous quality checks, guaranteeing reliability and performance, so you can shop with confidence knowing you're getting the best.
            </p>
          </div>

          <div className="flex flex-col items-end" data-aos="zoom-in-up" data-aos-delay="600">
            <p className="text-2xl text-custom-brown bg-[#EBF3FE] w-14 h-14 flex justify-center items-center rounded-full">3</p>
            <h3 className="text-xl font-semibold mt-4">Competitive Prices</h3>
            <p className="text-gray-500">
              Enjoy great value with Mega Store's competitive prices on high-quality gadgets, making top-of-the-line technology accessible to all without compromising on quality or performance.
            </p>
          </div>
        </div>

        {/* Center Column */}
        <div className="relative flex justify-center items-center" data-aos="zoom-in" data-aos-delay="300">
            <img src={ecompost} alt="Mega Store home page" className="z-10 relative" />
            <div className="absolute w-[25rem] h-[25rem] bg-custom-brown rounded-full z-0 animate-spin-slow"></div>
            <div className="absolute w-[28rem] h-[28rem] border-2 shadow rounded-full z-0"></div>
        </div>


        {/* Right Column */}
        <div className="space-y-12 pt-12">
          <div className="flex flex-col items-start" data-aos="zoom-in-up" data-aos-delay="0">
            <p className="text-2xl text-custom-brown bg-[#EBF3FE] w-14 h-14 flex justify-center items-center rounded-full">4</p>
            <h3 className="text-xl font-semibold mt-4">Expert Guidance</h3>
            <p className="text-gray-500">
              Our knowledgeable staff provides expert guidance, helping you choose the right gadget to meet your needs and preferences, ensuring you make informed decisions every step of the way.
            </p>
          </div>

          <div className="flex flex-col items-start" data-aos="zoom-in-up" data-aos-delay="300">
            <p className="text-2xl text-custom-brown bg-[#EBF3FE] w-14 h-14 flex justify-center items-center rounded-full">5</p>
            <h3 className="text-xl font-semibold mt-4">Convenient Shopping</h3>
            <p className="text-gray-500">
              With Mega Store, shopping for gadgets is easy and convenient. Our user-friendly website and secure payment options ensure a seamless experience from browsing to checkout, all from the comfort of your home.
            </p>
          </div>

          <div className="flex flex-col items-start" data-aos="zoom-in-up" data-aos-delay="600">
            <p className="text-2xl text-custom-brown bg-[#EBF3FE] w-14 h-14 flex justify-center items-center rounded-full">6</p>
            <h3 className="text-xl font-semibold mt-4">Excellent Service</h3>
            <p className="text-gray-500">
              Mega Store is committed to providing excellent service to our customers. From prompt assistance with inquiries to efficient handling of orders and deliveries, we prioritize your satisfaction every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChose;
