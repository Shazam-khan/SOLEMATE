import React from "react";

function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                            alt="image"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            Crafted by Enthusiasts, For Enthusiasts
                        </h2>
                        <p className="mt-6 text-gray-600">
                            At BlogBazar, we are driven by a passion for storytelling and a love for diverse voices. Our team is dedicated to providing a platform where anyone can create, share, and discover blogs that inspire and inform. We believe in the power of words and the connections they foster. With a focus on user experience and community, BlogBazar is designed to help you find and share content that resonates with you. Join us in celebrating creativity and exploring a vibrant world of ideas.
                        </p>
                        <p className="mt-4 text-gray-600">
                            At BlogBazar, we’re more than just a blogging platform—we’re a community of creators and readers, united by our love for compelling narratives and diverse perspectives.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;