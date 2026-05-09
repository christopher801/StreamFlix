// pages/WatchHistory.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { firebaseService } from '../config/firebase';
import ChannelCard from '../components/ChannelCard';
import { FaHistory, FaTrash } from 'react-icons/fa';

const WatchHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);
  
  const loadHistory = async () => {
    const result = await firebaseService.getWatchHistory(user.uid);
    if (result.success) {
      setHistory(result.history);
    }
  };
  
  const clearHistory = async () => {
    await firebaseService.clearWatchHistory(user.uid);
    setHistory([]);
  };
  
  if (!user) {
    return (
      <Container className="text-center py-5">
        <h3>Please sign in to view your watch history</h3>
      </Container>
    );
  }
  
  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title mb-0">Watch History</h2>
        {history.length > 0 && (
          <button className="btn btn-outline-danger" onClick={clearHistory}>
            <FaTrash className="me-2" />
            Clear All
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="empty-state">
          <FaHistory className="empty-icon" />
          <h3>No watch history</h3>
          <p>Start watching channels to see them here</p>
        </div>
      ) : (
        <Row>
          {history.map((channel, idx) => (
            <Col key={idx} xs={6} sm={4} md={3} lg={2} className="mb-4">
              <ChannelCard channel={channel} onClick={() => {}} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default WatchHistory;