// services/parseM3U.js
export const parseM3U = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const lines = data.split('\n');
    const channels = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('#EXTINF')) {
        // Parse channel info
        const nameMatch = line.match(/,([^,]+)$/);
        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        const categoryMatch = line.match(/group-title="([^"]+)"/);
        
        const name = nameMatch ? nameMatch[1] : 'Unknown Channel';
        const logo = logoMatch ? logoMatch[1] : 'https://via.placeholder.com/200x200?text=TV';
        const category = categoryMatch ? categoryMatch[1] : 'General';
        
        // Get next line for URL
        const urlLine = lines[i + 1] ? lines[i + 1].trim() : '';
        
        if (urlLine && (urlLine.startsWith('http') || urlLine.startsWith('https'))) {
          channels.push({
            name,
            logo,
            category,
            url: urlLine,
            id: `channel_${Date.now()}_${i}`
          });
        }
      }
    }
    
    return channels;
  } catch (error) {
    console.error('Error parsing M3U:', error);
    throw new Error('Failed to load playlist');
  }
};