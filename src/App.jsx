import React, { useState } from "react";
import "./App.css";
import ConferenceEvent from "./components/ConferenceEvent/ConferenceEvent";
import AboutUs from "./components/AboutUs/AboutUs";

function App() {
  const [showVenue, setShowVenue] = useState(false);

  const handleGetStarted = (e) => {
    e?.preventDefault?.();
    //setShowVenue(true);
    window.scrollTo({
      top: window.innerHeight, // Change this value for different positions
      behavior: "smooth"
    });
  };

  return (
    <>
      <header className="h-screen flex items-center bg-gradient-to-r from-blue-200 to-cyan-200 first_page">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 main_event">
          <div className="flex items-center justify-between space-x-20">
            <div className="w-5/12 text-center first_page_name_btn">
              <h1 class="text-6xl/18 font-semibold tracking-tight text-balance text-blue-900 mb-6 budget_heading">BudgetEase Solutions</h1>
              <p class="mb-6 text-2xl/8 text-pretty text-gray-600 budget_sentence">Plan your next major event with us using the Conference Expense Planner!</p>
              <div className="getstarted_btn">
                <button  type="button" onClick={handleGetStarted}  class="rounded-md bg-blue-900 px-8 py-4 text-lg font-semibold text-white inset-ring inset-ring-white/5 hover:bg-blue-600 cursor-pointer get-started-btn">
                  Get Started
                </button>
              </div>
            </div>
            <div className="w-7/12 aboutus_main">
              <AboutUs />
            </div>
          </div>
        </div>
      </header>

      <div className={`event-list-container ${showVenue ? 'visible' : ''}`}>
        <ConferenceEvent />
      </div>
    </>
  );
}

export default App;
