// src/components/Auth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';
    const user = { username, email, password, ...(isLogin ? {} : { name }) };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        setIsAuthenticated(true); // Update authentication state
        navigate('/dashboard'); // Redirect on successful login/signup
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px', padding: '20px', borderRadius: '15px' }}>
        <Card.Body>
          <h3 className="text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h3>
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaUser className="me-2" />
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  placeholder="Enter your name"
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>
                <FaUser className="me-2" />
                Username
              </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaEnvelope className="me-2" />
                Email
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaLock className="me-2" />
                Password
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              {isLogin ? <FaSignInAlt className="me-2" /> : <FaUserPlus className="me-2" />}
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
            <div className="mt-3 text-center">
              {isLogin ? (
                <p>
                  Don't have an account?{' '}
                  <Button variant="link" className='text-success' onClick={() => setIsLogin(false)}>
                    Sign Up
                  </Button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <Button variant="link" className='text-success' onClick={() => setIsLogin(true)}>
                    Login
                  </Button>
                </p>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Auth;
