import React, { useState } from 'react';
import { Edit2, Trash2, CheckCircle, ExternalLink, Calendar, Clock } from 'lucide-react';
import EditContestModal from './EditContestModal';
import MarkDoneModal from './MarkDoneModal';

const ContestTable = ({ 
  contests, 
  onUpdate, 
  onDelete, 
  onMarkAsDone, 
  showActions = true,
  showPerformance = false 
}) => {
  const [editingContest, setEditingContest] = useState(null);
  const [markingDone, setMarkingDone] = useState(null);

  const getContestStatus = (contest) => {
    if (contest.done) return 'completed';
    
    // Handle different date formats
    let contestDateTime;
    
    if (contest.date instanceof Date) {
      // MongoDB Date object
      const dateStr = contest.date.toISOString().split('T')[0]; // Get YYYY-MM-DD
      contestDateTime = new Date(dateStr + ' ' + contest.time);
    } else if (typeof contest.date === 'string') {
      // String date - could be ISO string or YYYY-MM-DD format
      if (contest.date.includes('T')) {
        // ISO string format
        const dateStr = contest.date.split('T')[0];
        contestDateTime = new Date(dateStr + ' ' + contest.time);
      } else {
        // YYYY-MM-DD format
        contestDateTime = new Date(contest.date + ' ' + contest.time);
      }
    } else {
      // Fallback - try to create date anyway
      contestDateTime = new Date(contest.date + ' ' + contest.time);
    }
    
    const now = new Date();
    const diffDays = (contestDateTime - now) / (1000 * 60 * 60 * 24);
    
    // Return status based on days until contest
    if (diffDays <= 2) return 'urgent';
    if (diffDays <= 7) return 'soon';
    return 'later';
  };

  const formatDate = (date) => {
    // Handle both MongoDB Date objects and string dates
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date('2000-01-01 ' + timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getPlatformBadgeColor = (platform) => {
    const colors = {
      'LeetCode': '#FFA500',
      'Codeforces': '#1E90FF',
      'AtCoder': '#FF6B6B',
      'HackerRank': '#00B74A',
      'CodeChef': '#5B4638'
    };
    return colors[platform] || '#6B7280';
  };

  if (contests.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <h3>No contests found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="table-container">
        <div className="contest-grid">
          {contests.map(contest => (
            <div 
              key={contest.id} 
              className={`contest-card ${getContestStatus(contest)}`}
            >
              <div className="contest-header">
                <div className="contest-title">
                  <h3>{contest.name}</h3>
                  <span 
                    className="platform-badge"
                    style={{ backgroundColor: getPlatformBadgeColor(contest.platform) }}
                  >
                    {contest.platform}
                  </span>
                </div>
                {showActions && (
                  <div className="contest-actions">
                    <button
                      className="action-btn small"
                      onClick={() => setEditingContest(contest)}
                      title="Edit Contest"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="action-btn small danger"
                      onClick={() => onDelete(contest._id)}
                      title="Delete Contest"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      className="action-btn small success"
                      onClick={() => setMarkingDone(contest)}
                      title="Mark as Done"
                    >
                      <CheckCircle size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="contest-details">
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>{formatDate(contest.date)}</span>
                </div>
                <div className="detail-item">
                  <Clock size={16} />
                  <span>{formatTime(contest.time)}</span>
                </div>
                <div className="detail-item">
                  <ExternalLink size={16} />
                  <a 
                    href={contest.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contest-link"
                  >
                    View Contest
                  </a>
                </div>
              </div>

              {showPerformance && contest.questionsSolved !== null && (
                <div className="performance-badge">
                  <span className="questions-solved">
                    {contest.questionsSolved} questions solved
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {editingContest && (
        <EditContestModal
          contest={editingContest}
          onClose={() => setEditingContest(null)}
          onUpdate={onUpdate}
        />
      )}

      {markingDone && (
        <MarkDoneModal
          contest={markingDone}
          onClose={() => setMarkingDone(null)}
          onMarkAsDone={onMarkAsDone}
        />
      )}
    </>
  );
};

export default ContestTable;