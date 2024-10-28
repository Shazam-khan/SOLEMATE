import React from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import WhyChose from "./whyChose";
import Policy from "./policy";

function Home() {
    return (
        <div className="relative w-full bg-white space-y-16">
            <div className="block">
                <Hero />
            </div>
            <div className="block">
                <WhyChose />
            </div>
            <div className="block">
                <Policy />
            </div>

        </div>
    );
}

export default Home;