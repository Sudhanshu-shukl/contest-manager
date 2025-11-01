import Contest from '../models/Contest.js';
import { fetchUpcomingContests } from '@qatadaazzeh/atcoder-api';

export async function importAtCoderContests() {
  // Fetch upcoming AtCoder contests using the unofficial API package
  const upcoming = await fetchUpcomingContests();

  if (!Array.isArray(upcoming)) {
    throw new Error('Invalid response from AtCoder API');
  }

  let createdCount = 0;
  let skippedCount = 0;
  const createdIds = [];

  for (const c of upcoming) {
    // Parse the contest time (format: "2025-11-01 21:00:00+0900")
    // Convert to ISO 8601 format for easier parsing: "2025-11-01T21:00:00+09:00"
    const isoTime = c.contestTime.replace(' ', 'T').replace(/([+-])(\d{2})(\d{2})/, '$1$2:$3');
    const start = new Date(isoTime);

    if (isNaN(start.getTime())) {
      console.warn(`Could not parse time for contest: ${c.contestName}, time: ${c.contestTime}`);
      continue;
    }

    const timeString = `${start.getUTCHours().toString().padStart(2, '0')}:${start.getUTCMinutes().toString().padStart(2, '0')}`;

    const startOfDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
    const endOfDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + 1));

    // Check if contest already exists
    const existing = await Contest.findOne({
      platform: 'AtCoder',
      name: c.contestName,
      date: { $gte: startOfDay, $lt: endOfDay }
    });

    if (existing) {
      skippedCount += 1;
      continue;
    }

    const contest = new Contest({
      name: c.contestName,
      platform: 'AtCoder',
      date: start,
      time: timeString,
      link: c.contestUrl || `https://atcoder.jp/contests/${c.contestId}`,
      done: false,
      skipped: false
    });

    const saved = await contest.save();
    createdCount += 1;
    createdIds.push(saved._id);
  }

  return {
    message: 'AtCoder contests import completed',
    created: createdCount,
    skippedExisting: skippedCount,
    createdIds
  };
}

