// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/PropertyDetails.css";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("/properties.json")
//       .then((res) => {
//         const found = res.data.find((p) => p.id === parseInt(id, 10));
//         if (found) {
//           setProperty(found);
//           setError(null);
//         } else {
//           setError("Property not found.");
//         }
//       })
//       .catch(() => {
//         setError("Failed to load property data. Please try again later.");
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) {
//     return <p className="loading-message">Loading...</p>;
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <p>{error}</p>
//         <button className="back-button" onClick={() => navigate("/home")}>
//           Back to Listings
//         </button>
//       </div>
//     );
//   }

//   return (
//     <section className="property-details">
//       <h2>{property.title}</h2>
//       <img src={property.image} alt={property.title} />
//       <p><strong>Location:</strong> {property.location}</p>
//       <p><strong>Price:</strong> {property.price}</p>
//       <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
//       <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
//       <p><strong>Size:</strong> {property.size}</p>
//       <p><strong>Year Built:</strong> {property.yearBuilt}</p>
//       <p className="description"><strong>Description:</strong> {property.description}</p>

//       <p className="amenities-title"><strong>Amenities:</strong></p>
//       <ul className="amenities-list">
//         {property.amenities?.map((amenity, index) => (
//           <li key={index}>• {amenity}</li>
//         ))}
//       </ul>

//       <button className="back-button" onClick={() => navigate("/home")}>
//         Back to Listings
//       </button>
//     </section>
//   );
// };

// export default PropertyDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/PropertyDetails.css";
import { useAuth } from "../context/AuthContext"; // Make sure this is correctly imported

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Prevent property loading if not logged in
  useEffect(() => {
    if (!isLoggedIn) return;

    setLoading(true);
    axios
      .get("/properties.json")
      .then((res) => {
        const found = res.data.find((p) => p.id === parseInt(id, 10));
        if (found) {
          setProperty(found);
          setError(null);
        } else {
          setError("Property not found.");
        }
      })
      .catch(() => {
        setError("Failed to load property data. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [id, isLoggedIn]);

  // Optional: prevent rendering before login state is resolved
  if (!isLoggedIn) return null;

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button className="back-button" onClick={() => navigate("/home")}>
          Back to Listings
        </button>
      </div>
    );
  }

  return (
    <section className="property-details">
      <h2>{property.title}</h2>
      <img src={property.image} alt={property.title} />
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> {property.price}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
      <p><strong>Size:</strong> {property.size}</p>
      <p><strong>Year Built:</strong> {property.yearBuilt}</p>
      <p className="description"><strong>Description:</strong> {property.description}</p>

      <p className="amenities-title"><strong>Amenities:</strong></p>
      <ul className="amenities-list">
        {property.amenities?.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>

      <button className="back-button" onClick={() => navigate("/home")}>
        Back to Listings
      </button>
    </section>
  );
};

export default PropertyDetails;
