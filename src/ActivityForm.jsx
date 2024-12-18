import React, { useState } from 'react';

const ActivityForm = ({ addActivity }) => {
  const [activityName, setActivityName] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activityName) return;

    const newActivity = {
      id: Date.now(),
      name: activityName,
      tags: tags || '',
      startTime: null,
      endTime: null,
      duration: null,
    };

    addActivity(newActivity);
    setActivityName('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Activity Name"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Add Activity</button>
    </form>
  );
};

export default ActivityForm;
