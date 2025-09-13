import express from 'express';
import Contest from '../models/Contest.js';

const router = express.Router();

// GET /api/contests - Get all contests
router.get('/', async (req, res) => {
  try {
    const contests = await Contest.find().sort({ date: 1, time: 1 });
    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contests', error: error.message });
  }
});

// GET /api/contests/upcoming - Get upcoming contests
router.get('/upcoming', async (req, res) => {
  try {
    const contests = await Contest.find({ done: false, skipped: false }).sort({ date: 1, time: 1 });
    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming contests', error: error.message });
  }
});

// GET /api/contests/past - Get completed contests
router.get('/past', async (req, res) => {
  try {
    const contests = await Contest.find({ $or: [{ done: true }, { skipped: true }] }).sort({ 
      completedDate: -1, 
      skippedDate: -1 
    });
    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching past contests', error: error.message });
  }
});

// GET /api/contests/:id - Get single contest
router.get('/:id', async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    res.json(contest);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contest', error: error.message });
  }
});

// POST /api/contests - Create new contest
router.post('/', async (req, res) => {
  try {
    const contest = new Contest(req.body);
    const savedContest = await contest.save();
    res.status(201).json(savedContest);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(500).json({ message: 'Error creating contest', error: error.message });
  }
});

// PUT /api/contests/:id - Update contest
router.put('/:id', async (req, res) => {
  try {
    const contest = await Contest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    res.json(contest);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(500).json({ message: 'Error updating contest', error: error.message });
  }
});

// PUT /api/contests/:id/mark-done - Mark contest as done
router.put('/:id/mark-done', async (req, res) => {
  try {
    const { questionsSolved } = req.body;
    const contest = await Contest.findByIdAndUpdate(
      req.params.id,
      { 
        done: true, 
        skipped: false, // Reset skipped status
        questionsSolved: questionsSolved || 0,
        completedDate: new Date(),
        skippedDate: null // Clear skipped date
      },
      { new: true, runValidators: true }
    );
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    res.json(contest);
  } catch (error) {
    res.status(500).json({ message: 'Error marking contest as done', error: error.message });
  }
});

// PUT /api/contests/:id/mark-skipped - Mark contest as skipped
router.put('/:id/mark-skipped', async (req, res) => {
  try {
    const contest = await Contest.findByIdAndUpdate(
      req.params.id,
      { 
        skipped: true,
        done: false, // Reset done status
        questionsSolved: null, // Clear questions solved
        skippedDate: new Date(),
        completedDate: null // Clear completed date
      },
      { new: true, runValidators: true }
    );
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    res.json(contest);
  } catch (error) {
    res.status(500).json({ message: 'Error marking contest as skipped', error: error.message });
  }
});

// DELETE /api/contests/:id - Delete contest
router.delete('/:id', async (req, res) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    res.json({ message: 'Contest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contest', error: error.message });
  }
});

// GET /api/contests/stats/summary - Get contest statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalContests = await Contest.countDocuments();
    const completedContests = await Contest.countDocuments({ done: true });
    const skippedContests = await Contest.countDocuments({ skipped: true });
    const upcomingContests = await Contest.countDocuments({ done: false, skipped: false });
    
    const totalQuestions = await Contest.aggregate([
      { $match: { done: true } },
      { $group: { _id: null, total: { $sum: '$questionsSolved' } } }
    ]);
    
    const averageQuestions = completedContests > 0 
      ? (totalQuestions[0]?.total || 0) / completedContests 
      : 0;

    const participationRate = totalContests > 0 
      ? Math.round((completedContests / (completedContests + skippedContests)) * 100) 
      : 0;

    res.json({
      totalContests,
      completedContests,
      skippedContests,
      upcomingContests,
      totalQuestionsSolved: totalQuestions[0]?.total || 0,
      averageQuestionsSolved: Math.round(averageQuestions * 10) / 10,
      participationRate
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

export default router;
