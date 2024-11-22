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
            <h3 className="text-xl font-semibold mt-4">Vast Collection</h3>
            <p className="text-gray-500">
              SoleMate offers a wide variety of footwear for every occasion, from casual sneakers to formal shoes, ensuring that you always find the perfect pair to match your style and needs.
            </p>
          </div>

          <div className="flex flex-col items-end" data-aos="zoom-in-up" data-aos-delay="300">
            <p className="text-2xl text-custom-brown bg-[#EBF3FE] w-14 h-14 flex justify-center items-center rounded-full">2</p>
            <h3 className="text-xl font-semibold mt-4">Quality & Comfort</h3>
            <p className="text-gray-500">
              At SoleMate, we prioritize both comfort and quality. Each pair of shoes is carefully selected to offer the best materials and design, ensuring that you can walk comfortably all day long.
            </p>
          </div>

          <div className="flex flex-col items-end" data-aos="zoom-in-up" data-aos-delay="600">
            <p className="text-2xl text-custom-brown bg-[#EBF3FE] w-14 h-14 flex justify-center items-center rounded-full">3</p>
            <h3 className="text-xl font-semibold mt-4">Dedicated Customer Service</h3>
            <p className="text-gray-500">
              We’re committed to providing exceptional customer service. From helping you choose the perfect pair to assisting with returns and exchanges, our team ensures a smooth and satisfying shopping experience.
            </p>
          </div>
        </div>

        {/* Center Column */}
        <div className="relative flex justify-center items-center" data-aos="zoom-in" data-aos-delay="300">
            <img src={ecompost} alt="SoleMate footwear" className="z-10 relative" />
            <div className="absolute w-[25rem] h-[25rem] bg-custom-brown rounded-full z-0 animate-spin-slow"></div>
            <div className="absolute w-[28rem] h-[28rem] border-2 shadow rounded-full z-0"></div>
        </div>

        {/* Right Column */}
        <div className="space-y-12 pt-12">
          <div className="flex flex-col items-start" data-aos="zoom-in-up" data-aos-delay="0">
            <p className="text-2xl text-custom-brown bg-[#EBF3FE] w-14 h-14 flex justify-center items-center rounded-full">4</p>
            <h3 className="text-xl font-semibold mt-4">Expert Recommendations</h3>
            <p className="text-gray-500">
              Our team of footwear experts is always available to help you find the perfect fit, providing personalized recommendations based on your style preferences and comfort needs.
            </p>
          </div>

          <div className="flex flex-col items-start" data-aos="zoom-in-up" data-aos-delay="300">
            <p className="text-2xl text-custom-brown bg-[#EBF3FE] w-14 h-14 flex justify-center items-center rounded-full">5</p>
            <h3 className="text-xl font-semibold mt-4">Convenient Online Shopping</h3>
            <p className="text-gray-500">
              Shopping for shoes at SoleMate is easy and convenient. Browse our user-friendly website, order your favorite pairs with secure payment options, and have them delivered directly to your doorstep.
            </p>
          </div>

          <div className="flex flex-col items-start" data-aos="zoom-in-up" data-aos-delay="600">
            <p className="text-2xl text-custom-brown bg-[#EBF3FE] w-14 h-14 flex justify-center items-center rounded-full">6</p>
            <h3 className="text-xl font-semibold mt-4">Affordable Prices</h3>
            <p className="text-gray-500">
              SoleMate provides high-quality footwear at competitive prices, making sure that you don't have to compromise on style or comfort without breaking the bank.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChose;
