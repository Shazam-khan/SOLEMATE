import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast, faRotate, faHandHoldingDollar, faHeadset } from '@fortawesome/free-solid-svg-icons';

const Policy = () => {
  return (
    <section className="bg-gray-50 px-8 py-16 rounded-lg mx-20">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Worldwide Shipping */}
        <div className="flex items-center gap-6 px-4 border-r last:border-none border-gray-200">
          <div className="text-4xl text-custom-brown">
            <FontAwesomeIcon icon={faTruckFast} />
          </div>
          <div>
            <p className="font-semibold">Worldwide Shipping</p>
            <p className="text-sm">Order Above $100</p>
          </div>
        </div>

        {/* Easy 30 Day Returns */}
        <div className="flex items-center gap-6 px-4 border-r last:border-none border-gray-200">
          <div className="text-4xl text-custom-brown">
            <FontAwesomeIcon icon={faRotate} />
          </div>
          <div>
            <p className="font-semibold">Easy 30 Day Returns</p>
            <p className="text-sm">Back Returns In 7 Days</p>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="flex items-center gap-6 px-4 border-r last:border-none border-gray-200">
          <div className="text-4xl text-custom-brown">
            <FontAwesomeIcon icon={faHandHoldingDollar} />
          </div>
          <div>
            <p className="font-semibold">Money Back Guarantee</p>
            <p className="text-sm">Guarantee Within 30-Days</p>
          </div>
        </div>

        {/* Easy Online Support */}
        <div className="flex items-center gap-6 px-4">
          <div className="text-4xl text-custom-brown">
            <FontAwesomeIcon icon={faHeadset} />
          </div>
          <div>
            <p className="font-semibold">Easy Online Support</p>
            <p className="text-sm">24/7 Any Time Support</p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Policy;
