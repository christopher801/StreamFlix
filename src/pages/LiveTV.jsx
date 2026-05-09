// pages/LiveTV.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChannelCard from '../components/ChannelCard';
import HeroPlayer from '../components/HeroPlayer';
import { useApp } from '../context/AppContext';

const LiveTV = () => {
  const { channels, currentChannel, setCurrentChannel, searchTerm } = useApp();
  
  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Container fluid>
      {currentChannel && <HeroPlayer channel={currentChannel} />}
      
      <h2 className="section-title mt-4">Live TV Channels</h2>
      <Row>
        {filteredChannels.map((channel, idx) => (
          <Col key={idx} xs={6} sm={4} md={3} lg={2} className="mb-4">
            <ChannelCard
              channel={channel}
              onClick={() => setCurrentChannel(channel)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LiveTV;