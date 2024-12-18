import React, { useState } from 'react';

const ActivityItem = ({ activity, updateActivity, removeActivity, tags, createTag }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(activity.name);
  const [newTag, setNewTag] = useState('');

  const handleStop = () => {
    const endTime = new Date();
    const duration = activity.startTime
      ? (endTime - new Date(activity.startTime)) / (1000 * 60)
      : 0;

    updateActivity({ ...activity, endTime, duration });
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    updateActivity({ ...activity, name: editedName });
    setIsEditingName(false);
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = activity.tags
      .split(',')
      .filter((t) => t !== tag)
      .join(',');
    updateActivity({ ...activity, tags: updatedTags });
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      const updatedTags = activity.tags
        ? `${activity.tags},${newTag}`
        : newTag;
      updateActivity({ ...activity, tags: updatedTags });
      setNewTag('');
    }
  };

  const readableTags = activity.tags
    ? activity.tags
        .split(',')
        .map((id) => tags[id] || id)
    : [];

  return (
    <div className="task-element">
      {isEditingName ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <button onClick={handleNameSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3 className="task-name">{activity.name}</h3>
          <button onClick={handleNameEdit}>Edit Name</button>
        </div>
      )}

      <div className="task-tags">
        {readableTags.map((tag, idx) => (
          <span key={idx} className="tag-badge">
            {tag}{' '}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="remove-tag-button"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <div>
        <input
          type="text"
          placeholder="Add Tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button onClick={handleAddTag}>Add Tag</button>
        <button onClick={() => createTag(newTag)}>Create Tag</button>
      </div>

      {activity.startTime ? (
        <p>Start Time: {new Date(activity.startTime).toLocaleString()}</p>
      ) : (
        <p>Start Time: Not Started</p>
      )}
      {activity.endTime ? (
        <p>
          End Time: {new Date(activity.endTime).toLocaleString()} <br />
          Duration: {activity.duration?.toFixed(2)} minutes
        </p>
      ) : (
        activity.startTime && <button onClick={handleStop}>Stop</button>
      )}
      <button onClick={() => removeActivity(activity.id)} className="remove-button">
        Remove
      </button>
    </div>
  );
};

export default ActivityItem;
