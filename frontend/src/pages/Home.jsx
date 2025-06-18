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
  const [visibleCount, setVisibleCount] = useState(5);

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
    setVisibleCount(5); // reset visible count when filter changes
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
  <section className="filter-section">
    <h2>Filter Properties</h2>
    <form className="filter-form">
      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Enter location"
        />
      </div>
      <div>
        <label htmlFor="minPrice">Min Price ($)</label>
        <input
          type="number"
          id="minPrice"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
          placeholder="0"
          min="0"
        />
      </div>
      <div>
        <label htmlFor="maxPrice">Max Price ($)</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          placeholder="Any"
          min="0"
        />
      </div>
      <div>
        <label htmlFor="bedrooms">Bedrooms</label>
        <select
          id="bedrooms"
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleFilterChange}
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

  <section>
    <h2>Featured Properties</h2>
    {filteredProperties.length === 0 ? (
      <p>No properties found matching your filters.</p>
    ) : (
      <>
        <div className="property-grid">
          {filteredProperties.slice(0, visibleCount).map((property) => (
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
        {visibleCount < filteredProperties.length && (
          <div className="show-more-container">
            <button
              onClick={() => setVisibleCount(prev => prev + 5)}
              className="show-more-button"
            >
              Show More
            </button>
          </div>
        )}
      </>
    )}
  </section>
  <button
    onClick={scrollToTop}
    className="arrow-button"
  >
    ↑
  </button>
</div>

  );
};

export default Home;
