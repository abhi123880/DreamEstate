import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    else if (!/[A-Z]/.test(password)) newErrors.password = 'Must have uppercase letter.';
    else if (!/[a-z]/.test(password)) newErrors.password = 'Must have lowercase letter.';
    else if (!/\d/.test(password)) newErrors.password = 'Must have a number.';
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) newErrors.password = 'Must have a special character.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!phone) newErrors.phone = 'Phone number is required.';
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Must be exactly 10 digits.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors({}); // Clear previous errors

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registered successfully!');

        // Store email in localStorage if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        navigate('/login');
      } else {
        setErrors({ email: data.message || 'Registration failed' });
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ email: 'Server error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  // Clear errors on input change for better UX
  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleInputChange(setUsername, 'username')}
            className={errors.username && submitted ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.username && submitted && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleInputChange(setEmail, 'email')}
            className={errors.email && submitted ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.email && submitted && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handleInputChange(setPassword, 'password')}
            className={errors.password && submitted ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.password && submitted && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleInputChange(setConfirmPassword, 'confirmPassword')}
            className={errors.confirmPassword && submitted ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.confirmPassword && submitted && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={handleInputChange(setPhone, 'phone')}
            className={errors.phone && submitted ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.phone && submitted && <span className="error">{errors.phone}</span>}
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe((prev) => !prev)}
            disabled={loading}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
