// pages/Movies.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChannelCard from '../components/ChannelCard';
import { useApp } from '../context/AppContext';
import { FaFilm } from 'react-icons/fa';

const Movies = () => {
  const { channels, setCurrentChannel } = useApp();
  
  const movieChannels = channels.filter(channel =>
    channel.category.toLowerCase().includes('movie') ||
    channel.category.toLowerCase().includes('film') ||
    channel.name.toLowerCase().includes('movie') ||
    channel.name.toLowerCase().includes('film')
  );
  
  return (
    <Container fluid>
      <h2 className="section-title">Movies & Films</h2>
      {movieChannels.length === 0 ? (
        <div className="empty-state">
          <FaFilm className="empty-icon" />
          <h3>No movie channels found</h3>
          <p>Load a playlist with movie channels to see them here</p>
        </div>
      ) : (
        <Row>
          {movieChannels.map((channel, idx) => (
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

export default Movies;