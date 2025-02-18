import React, { useState } from "react";
import { Search, LayoutGrid, Layout } from "lucide-react";
import CampCard from "../Shared/CampCard";
import useCamps from "../../hooks/useCamps";
import { Helmet } from "react-helmet-async";

const AvailableCamps = () => {
  const [camps] = useCamps();
  const [layout, setLayout] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const filteredCamps = camps.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.healthcareProfessional
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      camp.date.includes(searchTerm)
  );

  const sortedCamps = [...filteredCamps].sort((a, b) => {
    if (sortBy === "popular") return b.participantCount - a.participantCount;
    if (sortBy === "price-low") return a.fees - b.fees;
    if (sortBy === "price-high") return b.fees - a.fees;
    if (sortBy === "nameA") return a.campName.localeCompare(b.campName);
    if (sortBy === "nameZ") return b.campName.localeCompare(a.campName);
    return 0;
  });

  return (
    <>
      <Helmet>
        <title>MediCamp | Available Camp</title>
      </Helmet>
      <div className="w-full md:w-11/12 mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search camps..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="nameA">Name: A to Z</option>
              <option value="nameZ">Name: Z to A</option>
            </select>

            {/* Layout Toggle */}
            <div className="flex gap-2 border rounded-lg p-1">
              <button
                onClick={() => setLayout("grid")}
                className={`p-2 rounded ${
                  layout === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-2 rounded ${
                  layout === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <Layout className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Camps Grid/List */}
        <div
          className={`grid gap-6 ${
            layout === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "
          }`}
        >
          {sortedCamps.map((camp) => (
            <CampCard key={camp._id} camp={camp}></CampCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default AvailableCamps;
