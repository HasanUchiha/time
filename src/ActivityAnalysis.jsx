import React from 'react';

const ActivityAnalysis = ({ activities }) => {
  const totalTime = activities.reduce(
    (sum, activity) => (activity.duration ? sum + activity.duration : sum),
    0
  );

  return (
    <div>
      <h2>Analysis</h2>
      <p>Total Time Spent: {totalTime.toFixed(2)} minutes</p>
    </div>
  );
};

export default ActivityAnalysis;
