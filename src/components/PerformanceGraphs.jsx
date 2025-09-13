import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const PerformanceGraphs = ({ contests }) => {
  const processData = () => {
    const sortedContests = contests
      .filter(contest => (contest.done && contest.completedDate) || (contest.skipped && contest.skippedDate))
      .sort((a, b) => {
        const dateA = new Date(a.completedDate || a.skippedDate);
        const dateB = new Date(b.completedDate || b.skippedDate);
        return dateA - dateB;
      });

    const performanceData = sortedContests.map((contest, index) => ({
      contest: `Contest ${index + 1}`,
      questions: contest.skipped ? 0 : (contest.questionsSolved || 0), // Skipped contests show 0 (dip)
      date: new Date(contest.completedDate || contest.skippedDate).toLocaleDateString(),
      name: contest.name,
      platform: contest.platform,
      status: contest.skipped ? 'skipped' : 'completed',
      cumulative: sortedContests.slice(0, index + 1).length
    }));

    return performanceData;
  };

  const data = processData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-title">{data.name}</p>
          <p className="tooltip-platform">{data.platform}</p>
          <p className="tooltip-date">{data.date}</p>
          {data.status === 'skipped' ? (
            <p className="tooltip-questions">
              Status: <span style={{ color: '#f59e0b' }}>Skipped</span>
            </p>
          ) : (
            <p className="tooltip-questions">
              Questions Solved: <span className="highlight">{data.questions}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const CumulativeTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-questions">
            Total Contests: <span className="highlight">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="performance-graphs">
        <div className="graph-placeholder">
          <p>Complete more contests to see performance graphs!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="performance-graphs">
      <div className="graph-container">
        <h3 className="graph-title">Questions Solved Over Time</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="contest" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="questions" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="graph-container">
        <h3 className="graph-title">Contest Completion Progress</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="contest" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip content={<CumulativeTooltip />} />
              <Bar 
                dataKey="cumulative" 
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraphs;