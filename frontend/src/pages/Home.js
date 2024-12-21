import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-yellow-100 text-gray-800">
      {/* Header Section */}
      <header className="h-screen flex flex-col justify-center items-center text-center bg-yellow-300 relative overflow-hidden">
        <h1 className="text-6xl md:text-8xl font-extrabold text-pink-600 animate-bounce">
          "POP, CRUNCH, WOW!"
        </h1>
        <p className="text-xl md:text-3xl mt-4 font-bold text-gray-700">
          Healthy Makhana Snacks for Every Mood
        </p>
        <Link to="/shop">
        <button className="mt-6 px-8 py-3 bg-pink-600 text-white font-bold rounded-full shadow-lg hover:bg-pink-700 transform hover:scale-110 transition-all duration-300">
          Snack Now!
        </button>
        </Link>
        {/* Floating Makhana Animation */}
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-10 h-10 bg-white rounded-full shadow-lg"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 5}s infinite`,
              }}
            ></div>
          ))}
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-pink-600">
          Why Makhana?
        </h2>
        <p className="text-lg md:text-2xl mt-4 text-gray-600">
          Light, crunchy, and guilt-free. Meet your new favorite snack!
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="w-64 h-64 bg-yellow-200 rounded-lg p-4 shadow-md transform hover:rotate-12 hover:scale-110 transition duration-300">
            <h3 className="text-2xl font-bold text-pink-600">Low Calorie</h3>
            <p className="mt-2 text-gray-700">Healthy and light snack for your diet.</p>
          </div>
          <div className="w-64 h-64 bg-green-200 rounded-lg p-4 shadow-md transform hover:-rotate-12 hover:scale-110 transition duration-300">
            <h3 className="text-2xl font-bold text-pink-600">High Protein</h3>
            <p className="mt-2 text-gray-700">Perfect for fitness lovers.</p>
          </div>
          <div className="w-64 h-64 bg-blue-200 rounded-lg p-4 shadow-md transform hover:rotate-12 hover:scale-110 transition duration-300">
            <h3 className="text-2xl font-bold text-pink-600">Tasty Flavors</h3>
            <p className="mt-2 text-gray-700">From spicy to sweet, we have it all!</p>
          </div>
        </div>
      </section>

      {/* Crazy Scrolling Section */}
      <section className="h-screen flex justify-center items-center bg-gradient-to-r from-yellow-200 to-pink-200 relative overflow-hidden">
        <h2 className="text-5xl md:text-7xl font-extrabold text-white">
          "CRAZY SNACKS, CRAZY LIFE!"
        </h2>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <span
              key={i}
              className="absolute w-4 h-4 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${2 + Math.random() * 5}s infinite`,
              }}
            ></span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p className="text-lg font-semibold">
          Ready to POP into the world of Makhana? <br />
          Order Now and Enjoy the Crunch!
        </p>
        <Link to="/shop">
        <button className="mt-4 px-6 py-2 bg-pink-600 text-white font-bold rounded-full hover:bg-pink-700 transition-transform transform hover:scale-110">
          Shop Makhana
        </button>
        </Link>
      </footer>

      {/* Custom Floating Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
