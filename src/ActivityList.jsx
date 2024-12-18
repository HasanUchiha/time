import React from 'react';
import ActivityItem from './ActivityItem';

const ActivityList = ({ activities, tags, updateActivity, removeActivity, createTag }) => {
  if (!activities || activities.length === 0) {
    return <p>No activities to display</p>;
  }

  return (
    <div className="task-list">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          tags={tags}
          updateActivity={updateActivity}
          removeActivity={removeActivity}
          createTag={createTag} 
        />
      ))}
    </div>
  );
};

export default ActivityList;
