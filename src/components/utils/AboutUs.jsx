import React from 'react';

export const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 font-sans text-gray-700">
      
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="text-gray-800">About PG Finder</span> <span className="text-blue-600">System</span>
        </h1>
        <p className="text-xl text-gray-500">Simplifying your search for the perfect stay.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Mission Section */}
        <section className="space-y-4">
          <div className="inline-block border-b-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-800 pb-1">Our Mission</h2>
          </div>
          <p className="leading-relaxed text-lg">
            The <strong className="text-blue-600">PG Finder System</strong> is a unified web-based platform designed to bridge the gap between property seekers, owners, and administrators. Our goal is to digitize traditional methods, replacing unreliable word-of-mouth with a <span className="font-semibold italic">transparent, efficient, and centralized digital experience.</span>
          </p>
        </section>

        {/* What We Solve Section */}
        <section className="space-y-4">
          <div className="inline-block border-b-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-800 pb-1">What We Solve</h2>
          </div>
          <p className="leading-relaxed text-lg text-gray-600">
            Traditional rental searches often lack transparency and consume significant time. We provide a solution that 
            offers <span className="text-blue-600 font-medium">verified listings</span>, automated amenity detection, and structured booking management to ensure reliability for every user.
          </p>
        </section>
      </div>

      {/* Features & Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Key Features */}
        <div className="bg-gray-50 p-8 rounded-md shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            Key <span className="text-blue-600 ml-2">Features</span>
          </h2>
          <ul className="space-y-4">
            {[
              { title: "Smart Search", desc: "Filter properties based on your needs." },
              { title: "GPS Integration", desc: "View exact locations and nearby amenities." },
              { title: "Verified Listings", desc: "Vetted by admins for authenticity." },
              { title: "Secure Bookings", desc: "Integrated document upload system." }
            ].map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1 font-bold">✓</span>
                <div>
                  <strong className="block text-gray-800">{feature.title}</strong>
                  <span className="text-sm text-gray-500">{feature.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Users */}
        <div className="bg-gray-50 p-8 rounded-md shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            Our <span className="text-blue-600 ml-2">Users</span>
          </h2>
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">S</div>
              <p><strong className="text-blue-600">Seekers:</strong> Effortlessly find and book your next home.</p>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center font-bold mr-4">O</div>
              <p><strong className="text-gray-800">Owners:</strong> List and manage properties professionally.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <footer className="mt-20 text-center py-10 bg-gray-900 rounded-md text-white px-6 shadow-2xl">
        <p className="text-xl md:text-2xl font-light italic opacity-90 max-w-3xl mx-auto">
          "Improving accessibility, reducing manual searching, and enhancing transparency in rental accommodation management."
        </p>
      </footer>
    </div>
  );
};
