import React, { useState } from 'react';

function FAQ() {
  const [isDropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (menu) => {
    setDropdownOpen(isDropdownOpen === menu ? null : menu);
  };

  const frequentlyAskedQuestions = [
  {
    "question": "Is WhatsApp an indispensable part of your life? Is your current plan too rigid and inflexible?",
    "answer": "Then this prepaid card is exactly what you need! With a WhatsApp SIM, you can be reached via WhatsApp via text message at any time, even without credit or Wi-Fi – and with no contract term.\n\nWant more? With our flexible WhatsAll plans, you can easily set your own plan. For example, use the WhatsAll 12000 plan with 12,000 units for high-speed internet, minutes, and text messages. 1 unit = 1 MB/1 minute/1 text message. Without having to commit to anything beforehand, you can spontaneously decide how you want to use your units. And after you've used up your units, you can, of course, continue sending text messages via WhatsApp."
  },
  {
    "question": "How can I manage my WhatsApp SIM and plans easily?",
    "answer": "With our plans and additional options, you're always on the right track: surf, call, and text – just the way you want, without committing to anything. WhatsAll 12000 is pre-activated for you for the first four weeks, so you can get started right away. After that, you can continue using WhatsAll 12000, switch to a different plan, or book an additional option. You have the following three options:\n\n1. The WhatsApp SIM app for Android and iOS.\n2. The WhatsApp SIM customer portal.\n3. The free account hotline 1155.\n\nIn the app and customer portal, you can also see at any time how many units you have already used."
  },
  {
    "question": "What benefits do I get with the WhatsApp SIM, and how can I keep it active?",
    "answer": "The WhatsApp SIM allows you to stay connected with the people who matter most, anytime, anywhere, at no extra cost. With a minimum top-up of €5 every six months, you'll have access to an internet flat rate even without a WhatsAll plan. You can use the credit freely for other services, such as making phone calls or booking plans and additional options. WhatsAll plans also include high-speed internet with speeds of up to 50 Mbps including 5G. Of course, you can continue to WhatsApp around the clock after you've used up your units (MB/MIN/SMS) until the end of your plan term."
  }
];


  return (
  <div>
    <div className='text-white text-shadow-black text-4xl '>Do you have any questions?</div>
    <div className="max-w-md mx-auto p-4">
        <div className="max-w-md mx-auto p-4">
      {
        frequentlyAskedQuestions.map((qa_set)=>(
           <div className="border-b border-gray-300 py-2">
        <button
          onClick={() => toggleDropdown(qa_set.question)}
          className="flex justify-between w-full items-start text-left text-base font-semibold text-white hover:text-green-600"
        >
          <span className="flex-grow text-left">{qa_set.question}</span>
          <span>{isDropdownOpen === qa_set.question ? "-" : "+"}</span>
        </button>
        {isDropdownOpen === qa_set.question && (
          <div className="mt-2 p-2 bg-gray-700 text-white rounded border-0 border-amber-50">
            <p>{qa_set.answer}</p>
          </div>
        )}
      </div> 
        ))
      }
    </div>
    </div>
  </div>
    
  );
}

export default FAQ;
