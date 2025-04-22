"use client";

import { useState } from "react";
import { pricingData } from "@/lib/pricing";

export default function PricingPage() {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("Logo Design");

  // Find the selected category's data
  const selectedCategoryData = pricingData.find(
    (category) => category.category === selectedCategory
  );

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pricing Plans</h1>
      <p className="text-center text-gray-600 mb-8">
        Choose the perfect plan for your design contest.
      </p>

      {/* Dropdown to select category */}
      <div className="flex justify-center mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-4 py-2 text-lg"
        >
          {pricingData.map((category) => (
            <option key={category.category} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      {/* Display pricing tiers for the selected category */}
      {selectedCategoryData && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {selectedCategoryData.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectedCategoryData.tiers.map((tier) => (
              <div
                key={tier.name}
                className="border rounded-lg p-6 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-3xl font-bold text-primary mb-4">
                  ${tier.price}
                </p>
                <ul className="text-gray-600 mb-4 space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✔</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}