import React, { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        alert(data.message);
        setFormData({ name: '', email: '', location: '' });
      }
    } catch (error) {
      setError('Network error. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="contact-section p-8 bg-gray-100">
        <div className="contact-form-container max-w-2xl mx-auto">
          <h1 className="Contact-title">Contact</h1>

          <div className="contact-layout flex space-x-8">
            <div className="map-section flex-1">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.54586583016!2d72.73989514617271!3d21.159180203817595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1710759712109!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>

            <div className="form-section flex-1">
              <form onSubmit={handleSubmit} className="contact-form space-y-4 bg-white p-6 rounded shadow" noValidate>
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full border px-3 py-2 rounded"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border px-3 py-2 rounded"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block mb-1 font-medium">Location</label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Your City or Country"
                    className="w-full border px-3 py-2 rounded"
                    disabled={loading}
                  />
                </div>

                {error && <p className="text-red-600 font-semibold">{error}</p>}

                <button
                  type="submit"
                  className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50`}
                  disabled={loading}
                  aria-label="Submit contact form"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
