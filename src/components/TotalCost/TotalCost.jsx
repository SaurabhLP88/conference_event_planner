import React, { useState, useEffect } from 'react';
import "./TotalCost.css";
const TotalCost = ({ totalCosts, ItemsDisplay }) => {
    const total_amount = totalCosts.venue + totalCosts.av + totalCosts.meals;
    return (

        <div className="pricing-app bg-blue-900 text-white">

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                <div className="flex items-end justify-between mb-10">
                    <h2 className="text-5xl font-semibold text-center">Total cost for the event</h2>
                    <div id="pre_fee_cost_display" className="price total_cost text-3xl font-bold text-center">₹ {total_amount}</div>
                </div>

                <ItemsDisplay />

            </div>
        </div>

    );
};
export default TotalCost;