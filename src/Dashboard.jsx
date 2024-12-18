import React, { useState, useEffect } from 'react';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [tags, setTags] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false); // Track if there are unsaved changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await fetch('http://127.0.0.1:3010/tasks');
        if (!tasksResponse.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasks = await tasksResponse.json();

        const tagsResponse = await fetch('http://127.0.0.1:3010/tags');
        if (!tagsResponse.ok) {
          throw new Error('Failed to fetch tags');
        }
        const tagsData = await tagsResponse.json();

        const tagMap = tagsData.reduce((map, tag) => {
          map[tag.id] = tag.name;
          return map;
        }, {});

        setActivities(tasks);
        setTags(tagMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addActivity = async (activity) => {
    const newActivities = [...activities, activity];
    setActivities(newActivities);
    setUnsavedChanges(true);

    // Save the new activity to the backend
    await fetch('http://127.0.0.1:3010/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activity),
    });
  };

  const updateActivity = async (updatedActivity) => {
    const newActivities = activities.map((activity) =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    );
    setActivities(newActivities);
    setUnsavedChanges(true);

    // Update the activity in the backend
    await fetch(`http://127.0.0.1:3010/tasks/${updatedActivity.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedActivity),
    });
  };

  const removeActivity = async (id) => {
    const newActivities = activities.filter((activity) => activity.id !== id);
    setActivities(newActivities);
    setUnsavedChanges(true);

    // Remove the activity from the backend
    await fetch(`http://127.0.0.1:3010/tasks/${id}`, {
      method: 'DELETE',
    });
  };

  const createTag = async (tagName) => {
    if (tagName.trim()) {
      const newTagId = Date.now().toString();
      const newTags = { ...tags, [newTagId]: tagName };
      setTags(newTags);
      setUnsavedChanges(true);

      // Save the new tag to the backend
      await fetch('http://127.0.0.1:3010/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: newTagId, name: tagName }),
      });
    }
  };

  const saveAllChanges = async () => {
    // Save all activities and tags to the backend
    await Promise.all([
      fetch('http://127.0.0.1:3010/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activities),
      }),
      fetch('http://127.0.0.1:3010/tags', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.entries(tags).map(([id, name]) => ({ id, name }))),
      }),
    ]);

    setUnsavedChanges(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {unsavedChanges && <p>You have unsaved changes.</p>}
      <button onClick={saveAllChanges} disabled={!unsavedChanges}>
        Save All Changes
      </button>
      <ActivityForm addActivity={addActivity} />
      <ActivityList
        activities={activities}
        tags={tags}
        updateActivity={updateActivity}
        removeActivity={removeActivity}
        createTag={createTag}
      />
    </div>
  );
};

export default Dashboard;