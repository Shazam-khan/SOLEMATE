import React from "react";
import bbImage from "../assets/About/bb.jpg";

function About() {
    const reasons = [
        {
          title: "Vast Collection",
          description: "SoleMate offers a wide variety of footwear for every occasion, from casual sneakers to formal shoes, ensuring that you always find the perfect pair to match your style and needs."
        },
        {
          title: "Quality & Comfort",
          description: "At SoleMate, we prioritize both comfort and quality. Each pair of shoes is carefully selected to offer the best materials and design, ensuring that you can walk comfortably all day long."
        },
        {
          title: "Dedicated Customer Service",
          description: "We're committed to providing exceptional customer service. From helping you choose the perfect pair to assisting with returns and exchanges, our team ensures a smooth and satisfying shopping experience."
        },
        {
          title: "Expert Recommendations",
          description: "Our team of footwear experts is always available to help you find the perfect fit, providing personalized recommendations based on your style preferences and comfort needs."
        },
        {
          title: "Convenient Online Shopping",
          description: "Shopping for shoes at SoleMate is easy and convenient. Browse our user-friendly website, order your favorite pairs with secure payment options, and have them delivered directly to your doorstep."
        },
        {
          title: "Affordable Prices",
          description: "SoleMate provides high-quality footwear at competitive prices, making sure that you don't have to compromise on style or comfort without breaking the bank."
        }
      ];

    return (
        <section className="py-12 px-4 bg-white sm:py-16 lg:py-20">    
            <div className="m-auto p-12  text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img src={bbImage} alt="image" />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            Crafted by Enthusiasts, <br></br> For Enthusiasts
                        </h2>
                        <p className="mt-6 text-gray-600">
                            At SoleMate, we're passionate about providing the perfect footwear for every step of your journey. Our team is dedicated to offering a wide range of stylish, comfortable, and high-quality shoes for all occasions. Whether you're looking for the latest trends or classic styles, SoleMate ensures you find the perfect pair that fits your needs. We believe in the power of well-crafted footwear to enhance your lifestyle and boost your confidence. With a focus on comfort, quality, and style, SoleMate is your go-to destination for all things shoes.
                        </p>
                        <p className="mt-4 text-gray-600">
                            At SoleMate, we’re not just a footwear store—we’re a community of shoe lovers, committed to helping you walk with confidence and style, one step at a time.
                        </p>
                    </div>
                </div>
            </div>

            <div className="py-8 px-4 md:px-20">
                <div className="mx-auto text-center mb-12">
                    <h2 className="text-3xl font-semibold">Why Choose SOLE MATE?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                    <div 
                        key={index}
                        className="bg-custom-brown text-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-custom-brown-light"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        <div className="flex items-center mb-4">
                        <span className="text-2xl bg-white text-black w-10 h-10 flex justify-center items-center rounded-full mr-4">
                            {index + 1}
                        </span>
                        <h3 className="text-xl font-semibold">{reason.title}</h3>
                        </div>
                        <p className="text-gray-300">
                        {reason.description}
                        </p>
                    </div>
                    ))}
                </div>
            </div>
        </section>    
    )
}

export default About;