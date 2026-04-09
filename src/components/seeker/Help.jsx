import React from 'react';

export const Help = () => {
  const myEmail = "dhananjayrathod006@gmail.com";

  const faqs = [
    { question: "How do I book a PG?", answer: "Once you find a property you like, click the 'Book Now' button and follow the document upload instructions." },
    { question: "Are the listings verified?", answer: "Yes, our admin team verifies every property and owner before they are listed on the platform." },
    { question: "How can I list my property?", answer: "If you are an owner, navigate to the 'Owner Dashboard' and click 'Add Property' to start the process." },
    { question: "Can I cancel a booking?", answer: "Yes, you can manage and cancel your requests through your personal seeker dashboard." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-5 py-16 font-sans text-gray-700">
      
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          How can we <span className="text-blue-600">help you?</span>
        </h1>
        <p className="text-lg text-gray-500">get in touch with our team.</p>
      </header>

      {/* FAQ Section */}
      <section className="mb-16">
        <div className="inline-block border-b-4 border-blue-600 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 pb-2">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-md border-l-8 border-blue-600 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{faq.question}</h3>
              <p className="leading-relaxed text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support Card */}
      <footer className="bg-blue-600 rounded-2xl p-12 text-center text-white shadow-2xl">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">Still have questions?</h3>
        <p className="text-blue-100 mb-10 max-w-lg mx-auto text-lg">
          Can't find what you're looking for? Our support team is just an email away. We usually respond within 24 hours.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <a 
            href={`mailto:${myEmail}?subject=Support Request - PG Finder System&body=Hello Team,%0D%0A%0D%0AI need help with...`}
            className="group flex items-center gap-3 bg-white text-blue-600 px-10 py-4 rounded-full font-extrabold text-xl hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            <span>Contact Support</span>
            <svg xmlns="http://w3.org" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <p className="text-blue-200 text-sm font-medium">Direct Email: {myEmail}</p>
        </div>
      </footer>
    </div>
  );
};
