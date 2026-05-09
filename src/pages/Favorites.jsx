// pages/Favorites.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChannelCard from '../components/ChannelCard';
import { useApp } from '../context/AppContext';
import { FaHeart } from 'react-icons/fa';

const Favorites = () => {
  const { favorites, setCurrentChannel } = useApp();
  
  return (
    <Container fluid>
      <h2 className="section-title">My Favorites</h2>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <FaHeart className="empty-icon" />
          <h3>No favorites yet</h3>
          <p>Click the heart icon on any channel to add it to favorites</p>
        </div>
      ) : (
        <Row>
          {favorites.map((channel, idx) => (
            <Col key={idx} xs={6} sm={4} md={3} lg={2} className="mb-4">
              <ChannelCard
                channel={channel}
                onClick={() => setCurrentChannel(channel)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favorites;