import React from 'react';
import { X, XCircle } from 'lucide-react';

const SkipContestModal = ({ contest, onClose, onMarkAsSkipped }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onMarkAsSkipped(contest._id);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content small">
        <div className="modal-header">
          <div className="modal-title-with-icon">
            <XCircle className="warning-icon" size={24} />
            <h2>Skip Contest</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="contest-info">
          <h3>{contest.name}</h3>
          <p className="contest-platform">{contest.platform}</p>
        </div>

        <form onSubmit={handleSubmit} className="mark-done-form">
          <div className="form-group">
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Are you sure you want to mark this contest as skipped? This will move it to your past contests.
            </p>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-warning">
              Skip Contest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkipContestModal;
