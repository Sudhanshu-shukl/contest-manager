import Contest from '../models/Contest.js';

export async function importCodeforcesContests() {
  const response = await fetch('https://codeforces.com/api/contest.list');
  const data = await response.json();

  if (data.status !== 'OK' || !Array.isArray(data.result)) {
    throw new Error('Invalid response from Codeforces API');
  }

  const upcoming = data.result.filter(c => c.phase === 'BEFORE');

  let createdCount = 0;
  let skippedCount = 0;
  const createdIds = [];

  for (const c of upcoming) {
    const start = new Date(c.startTimeSeconds * 1000);
    const timeString = `${start.getUTCHours().toString().padStart(2, '0')}:${start.getUTCMinutes().toString().padStart(2, '0')}`;

    const startOfDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
    const endOfDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + 1));

    const existing = await Contest.findOne({
      platform: 'Codeforces',
      name: c.name,
      date: { $gte: startOfDay, $lt: endOfDay }
    });

    if (existing) {
      skippedCount += 1;
      continue;
    }

    const contest = new Contest({
      name: c.name,
      platform: 'Codeforces',
      date: start,
      time: timeString,
      link: 'https://codeforces.com/contests',
      done: false,
      skipped: false
    });

    const saved = await contest.save();
    createdCount += 1;
    createdIds.push(saved._id);
  }

  return {
    message: 'Codeforces contests import completed',
    created: createdCount,
    skippedExisting: skippedCount,
    createdIds
  };
}


