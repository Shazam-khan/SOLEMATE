import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

// FAQ data
const faqData = [
  {
    question: "What sizes do your shoes come in?",
    answer: "Our shoes are available in US sizes 5-13 for men and 5-11 for women. We also offer half sizes for a perfect fit.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days. We also offer express shipping which takes 1-2 business days for an additional fee.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unworn shoes in their original packaging. Returns are free, and we'll provide a full refund once we receive the item.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. International shipping times and fees vary depending on the destination.",
  },
  {
    question: "How do I care for my shoes?",
    answer: "Care instructions vary depending on the material of the shoe. Generally, we recommend cleaning with a soft brush or cloth and avoiding machine washing. Specific care instructions are included with each pair.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 pb-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg hover:bg-custom-gold shadow-md transition-colors duration-500 ${
                openIndex === index ? "bg-custom-gold" : "bg-white"
              }`}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="flex justify-between items-center w-full text-left font-semibold text-lg focus:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <FontAwesomeIcon
                  icon={openIndex === index ? faAngleUp : faAngleDown}
                  className="w-6 h-6 text-custom-brown-light"
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`mt-2 overflow-hidden transition-max-height duration-1000 ease-in-out ${
                  openIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <p className="text-black text-base leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
