import React, { useState } from 'react';
import ContestTable from '../components/ContestTable';
import AddContestModal from '../components/AddContestModal';
import { Plus } from 'lucide-react';

const UpcomingContests = ({ 
  contests, 
  searchTerm, 
  platformFilter, 
  onAddContest, 
  onUpdateContest, 
  onDeleteContest, 
  onMarkAsDone,
  onMarkAsSkipped 
}) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const upcomingContests = contests.filter(contest => !contest.done && !contest.skipped);

  const filteredContests = upcomingContests.filter(contest => {
    const matchesSearch = contest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contest.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'All' || contest.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Upcoming Contests</h1>
          <p className="page-subtitle">
            {filteredContests.length} contest{filteredContests.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>
        <button 
          className="add-contest-btn"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          Add Contest
        </button>
      </div>

      {/* Color Legend */}
      <div className="color-legend">
        <h3>Contest Status Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color urgent"></div>
            <span>Urgent (≤ 2 days)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color soon"></div>
            <span>Soon (3-7 days)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color later"></div>
            <span>Later (> 7 days)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color skipped"></div>
            <span>Skipped</span>
          </div>
        </div>
      </div>

      <ContestTable
        contests={filteredContests}
        onUpdate={onUpdateContest}
        onDelete={onDeleteContest}
        onMarkAsDone={onMarkAsDone}
        onMarkAsSkipped={onMarkAsSkipped}
        showActions={true}
      />

      {showAddModal && (
        <AddContestModal
          onClose={() => setShowAddModal(false)}
          onAdd={onAddContest}
        />
      )}
    </div>
  );
};

export default UpcomingContests;