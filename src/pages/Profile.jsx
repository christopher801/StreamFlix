// pages/Profile.jsx
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaCalendar, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <Container className="text-center py-5">
        <h3>Please sign in to view your profile</h3>
      </Container>
    );
  }
  
  return (
    <Container>
      <h2 className="section-title mb-4">My Profile</h2>
      
      <Card style={{ background: '#1a1a1a', border: 'none', borderRadius: '12px' }}>
        <Card.Body className="text-center p-5">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px' }}
            />
          ) : (
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #e50914, #ff0a1a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '3rem',
              fontWeight: 'bold'
            }}>
              {user.displayName?.charAt(0) || user.email?.charAt(0)}
            </div>
          )}
          
          <h3>{user.displayName || 'User'}</h3>
          <p className="text-secondary">{user.email}</p>
          
          <div className="text-start mt-4">
            <div className="mb-3">
              <FaUser className="me-2 text-danger" />
              <strong>User ID:</strong> <span className="text-secondary">{user.uid}</span>
            </div>
            <div className="mb-3">
              <FaEnvelope className="me-2 text-danger" />
              <strong>Email:</strong> <span className="text-secondary">{user.email}</span>
            </div>
            <div className="mb-3">
              <FaCalendar className="me-2 text-danger" />
              <strong>Member since:</strong> <span className="text-secondary">{new Date(user.metadata?.creationTime).toLocaleDateString()}</span>
            </div>
          </div>
          
          <Button variant="outline-danger" className="mt-3">
            <FaEdit className="me-2" />
            Edit Profile
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;