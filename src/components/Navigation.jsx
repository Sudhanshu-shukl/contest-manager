import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Download, Upload, Trophy, Clock } from 'lucide-react';

const Navigation = ({ 
  searchTerm, 
  setSearchTerm, 
  platformFilter, 
  setPlatformFilter, 
  onExport, 
  onImport 
}) => {
  const location = useLocation();
  const [importFile, setImportFile] = useState(null);

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          onImport(importedData);
          event.target.value = '';
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const platforms = ['All', 'LeetCode', 'Codeforces', 'AtCoder', 'HackerRank', 'CodeChef'];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Trophy className="brand-icon" />
          <span>Contest Tracker</span>
        </div>

        <div className="nav-tabs">
          <Link 
            to="/" 
            className={`nav-tab ${location.pathname === '/' ? 'active' : ''}`}
          >
            <Clock size={18} />
            Upcoming
          </Link>
          <Link 
            to="/past" 
            className={`nav-tab ${location.pathname === '/past' ? 'active' : ''}`}
          >
            <Trophy size={18} />
            Past Contests
          </Link>
        </div>

        <div className="nav-controls">
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search contests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="platform-filter"
          >
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>

          <div className="action-buttons">
            <button onClick={onExport} className="action-btn" title="Export Data">
              <Download size={18} />
            </button>
            <label className="action-btn" title="Import Data">
              <Upload size={18} />
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;