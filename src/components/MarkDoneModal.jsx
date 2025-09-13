import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

const MarkDoneModal = ({ contest, onClose, onMarkAsDone }) => {
  const [questionsSolved, setQuestionsSolved] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const numQuestions = parseInt(questionsSolved, 10);
    
    if (isNaN(numQuestions) || numQuestions < 0) {
      setError('Please enter a valid number of questions (0 or more)');
      return;
    }

    onMarkAsDone(contest._id, numQuestions);
    onClose();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuestionsSolved(value);
    if (error) setError('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content small">
        <div className="modal-header">
          <div className="modal-title-with-icon">
            <CheckCircle className="success-icon" size={24} />
            <h2>Mark Contest as Done</h2>
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
            <label htmlFor="questions">How many questions did you solve?</label>
            <input
              type="number"
              id="questions"
              value={questionsSolved}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={error ? 'error' : ''}
              autoFocus
            />
            {error && <span className="error-text">{error}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-success">
              Mark as Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkDoneModal;