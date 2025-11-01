import Contest from '../models/Contest.js';

export async function importLeetCodeContests() {
  // LeetCode GraphQL API
  const graphqlQuery = {
    query: `
      query {
        upcomingContests {
          title
          titleSlug
          startTime
          duration
        }
      }
    `
  };

  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphqlQuery)
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch LeetCode contests: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.data || !Array.isArray(result.data.upcomingContests)) {
    throw new Error('Invalid response from LeetCode API');
  }

  const upcoming = result.data.upcomingContests;

  let createdCount = 0;
  let skippedCount = 0;
  const createdIds = [];

  for (const c of upcoming) {
    // Convert Unix timestamp (seconds) to Date
    const start = new Date(c.startTime * 1000);
    const timeString = `${start.getUTCHours().toString().padStart(2, '0')}:${start.getUTCMinutes().toString().padStart(2, '0')}`;

    const startOfDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
    const endOfDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + 1));

    // Check if contest already exists
    const existing = await Contest.findOne({
      platform: 'LeetCode',
      name: c.title,
      date: { $gte: startOfDay, $lt: endOfDay }
    });

    if (existing) {
      skippedCount += 1;
      continue;
    }

    // Create contest link
    const contestLink = c.titleSlug 
      ? `https://leetcode.com/contest/${c.titleSlug}` 
      : 'https://leetcode.com/contest/';

    const contest = new Contest({
      name: c.title,
      platform: 'LeetCode',
      date: start,
      time: timeString,
      link: contestLink,
      done: false,
      skipped: false
    });

    const saved = await contest.save();
    createdCount += 1;
    createdIds.push(saved._id);
  }

  return {
    message: 'LeetCode contests import completed',
    created: createdCount,
    skippedExisting: skippedCount,
    createdIds
  };
}

