// pages/Home.jsx (Updated with ChannelRow)
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import PlaylistInput from '../components/PlaylistInput';
import HeroPlayer from '../components/HeroPlayer';
import ChannelRow from '../components/ChannelRow';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { channels, currentChannel, loading, continueWatching, searchTerm } = useApp();
  const [groupedChannels, setGroupedChannels] = useState({});
  
  useEffect(() => {
    // Group channels by category
    const grouped = channels.reduce((acc, channel) => {
      const category = channel.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(channel);
      return acc;
    }, {});
    
    setGroupedChannels(grouped);
  }, [channels]);
  
  // Filter channels based on search
  const filterChannelsBySearch = (channelList) => {
    if (!searchTerm) return channelList;
    return channelList.filter(channel =>
      channel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const displayChannel = currentChannel || continueWatching;
  
  // Get top categories for display
  const topCategories = ['Sports', 'News', 'Entertainment', 'Music', 'General'];
  
  return (
    <Container fluid>
      <PlaylistInput />
      
      {loading && <LoadingSpinner />}
      
      {displayChannel && (
        <HeroPlayer channel={displayChannel} />
      )}
      
      {channels.length > 0 && !searchTerm && (
        <>
          {/* Featured/Hero section already shown above */}
          
          {/* Dynamic category rows */}
          {Object.entries(groupedChannels).map(([category, categoryChannels]) => (
            <ChannelRow 
              key={category}
              title={category}
              channels={categoryChannels.slice(0, 20)} // Limit to 20 per row
              showCategory={false}
            />
          ))}
        </>
      )}
      
      {channels.length > 0 && searchTerm && (
        <>
          <h2 className="section-title mb-4">Search Results for "{searchTerm}"</h2>
          <ChannelRow 
            title="Matching Channels"
            channels={filterChannelsBySearch(channels)}
            showCategory={true}
          />
        </>
      )}
      
      {channels.length === 0 && !loading && (
        <div className="text-center py-5">
          <h3 className="text-secondary">Welcome to StreamFlix!</h3>
          <p className="text-secondary">Enter an M3U playlist URL above to start watching.</p>
        </div>
      )}
    </Container>
  );
};

export default Home;