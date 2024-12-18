import React from 'react';

const Info = () => {
  return (
    <div className="info">
      <h1>Information that you need to know</h1>
      <p>
        The author is Hasan Mahmud
      </p>
      <ul>
        <li>Almost all of the functionality of the application is in the Dashboard section.
          Using the application should be intuitive and straightforward as the UI guides the
           user quite well but after making any change Do not forget to click the 'Save all changes' 
           button If you want to make permanent change and push it to the backend also. In this way the 
           saved tasks and tags will be there when you refresh the application otherwise it will not be saved.
            There is also a red 'Remove button' If you want to remove task one by one. It is on the right 
            corner in the upper side. You can edit the task name from each task and also add tags and remove 
            them from each task. </li>
          
        <li>No pictures have been used in this application</li>
        <li>Ai tools have been used for dealing with the errors. As it was consuming very much time initially
          I decieded to use ai to point out the exact problem of the error and it saved a lot of my time. It was also easy
          because the error message was the only thing that i needed to submit and it suggested all the possible problems 
          that can result in the error. 
        </li>
        <li>For me my working hour for this project is 6 days non stop. In hours it is 45 hours</li>
        <li>Firstly connecting the frontend with the backend using the API that was given was challenging as I was 
          encountering errors frequently. Then adding or removing tags and managing them was difficult. Specially I struggled
          a lot for the feature of editing the tasks and creating functional option for making new tags for individual tasks. Though I 
          did not implement the feature of filtering the tags, I struggled there very much. 
        </li>
        
      </ul>
      
    </div>
  );
};

export default Info;
