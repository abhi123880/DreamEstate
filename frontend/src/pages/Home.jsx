import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    axios
      .get("/properties.json")
      .then((response) => {
        setProperties(response.data);
        setFilteredProperties(response.data);
      })
      .catch((error) => console.error("Error fetching property data:", error));
  }, []);

  useEffect(() => {
    let filtered = [...properties];

    if (filters.location.trim() !== '') {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice !== '') {
      filtered = filtered.filter(p => {
        const priceNum = Number(p.price.replace(/[^0-9]/g, ''));
        return priceNum >= Number(filters.minPrice);
      });
    }

    if (filters.maxPrice !== '') {
      filtered = filtered.filter(p => {
        const priceNum = Number(p.price.replace(/[^0-9]/g, ''));
        return priceNum <= Number(filters.maxPrice);
      });
    }

    if (filters.bedrooms !== '') {
      filtered = filtered.filter(p => Number(p.bedrooms) === Number(filters.bedrooms));
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: ''
    });
  };

  const handleViewDetails = (id) => {
    if (isLoggedIn) {
      navigate(`/property/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="font-sans text-gray-800">
      <section className="filter-section py-8 px-6 bg-white shadow-md rounded-md max-w-5xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-6">Filter Properties</h2>
        <form className="filter-form grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label htmlFor="location" className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="minPrice" className="block mb-1 font-medium">Min Price ($)</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="0"
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className="block mb-1 font-medium">Max Price ($)</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Any"
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="bedrooms" className="block mb-1 font-medium">Bedrooms</label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="filter-actions">
            <button
              type="button"
              onClick={handleClearFilters}
              className="clear-filters-button"
            >
              Clear Filters
            </button>
          </div>
        </form>
      </section>
      <section className="property-listings py-16 px-6 bg-gray-100 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Properties</h2>
        {filteredProperties.length === 0 ? (
          <p className="text-center text-gray-600">No properties found matching your filters.</p>
        ) : (
          <div className="property-grid">
            {filteredProperties.map((property) => (
              <div key={property.id} className="property-card">
                <img src={property.image} alt={property.title} className="property-image" />
                <div className="property-content">
                  <h3>{property.title}</h3>
                  <p>{property.location}</p>
                  <p className="price">{property.price}</p>
                  <button
                    onClick={() => handleViewDetails(property.id)}
                    className="view-details-button"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
