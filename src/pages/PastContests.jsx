import React from 'react';
import ContestTable from '../components/ContestTable';
import PerformanceGraphs from '../components/PerformanceGraphs';

const PastContests = ({ contests, searchTerm, platformFilter }) => {
  const pastContests = contests.filter(contest => contest.done);

  const filteredContests = pastContests.filter(contest => {
    const matchesSearch = contest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contest.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'All' || contest.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const sortedContests = filteredContests.sort((a, b) => 
    new Date(b.completedDate || b.date) - new Date(a.completedDate || a.date)
  );

  const totalQuestions = pastContests.reduce((sum, contest) => 
    sum + (contest.questionsSolved || 0), 0
  );

  const averageQuestions = pastContests.length > 0 
    ? (totalQuestions / pastContests.length).toFixed(1) 
    : 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Past Contests</h1>
          <p className="page-subtitle">
            {filteredContests.length} completed contest{filteredContests.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-value">{totalQuestions}</span>
            <span className="stat-label">Total Questions</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{averageQuestions}</span>
            <span className="stat-label">Avg per Contest</span>
          </div>
        </div>
      </div>

      {pastContests.length > 0 && (
        <div className="performance-section">
          <PerformanceGraphs contests={pastContests} />
        </div>
      )}

      <ContestTable
        contests={sortedContests}
        showActions={false}
        showPerformance={true}
      />

      {pastContests.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-content">
            <h3>No completed contests yet</h3>
            <p>Start participating in contests and mark them as done to see your performance!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastContests;