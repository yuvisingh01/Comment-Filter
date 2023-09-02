import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [comments, setComments] = useState([]);
  const [uniquePosts, setUniquePosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postIdFilter, setPostIdFilter] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
        const uniquePostsMap = new Map();
        data.forEach((comment) => {
          if (!uniquePostsMap.has(comment.postId)) {
            uniquePostsMap.set(comment.postId, comment);
          }
        });
        setUniquePosts(Array.from(uniquePostsMap.values()));
      });
  }, []);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setPostIdFilter(filterValue);
  };

  const handlePostClick = (postId) => {
    const postComments = comments.filter(
      (comment) => comment.postId === postId
    );
    setSelectedPost(postComments);
  };

  return (
    <div className="app">
      <div className="left-panel">
        <h2>Posts:</h2>
        <input
          type="text"
          placeholder="Filter by postId"
          value={postIdFilter}
          onChange={handleFilterChange}
        />
        <ul>
          {uniquePosts
            .filter((post) =>
              postIdFilter
                ? post.postId.toString() === postIdFilter
                : true
            )
            .map((post) => (
              <li
                key={post.id}
                onClick={() => handlePostClick(post.postId)} 
              >
                {`${post.body}`}
              </li>
            ))}
        </ul>
      </div>
      <div className="right-panel">
        <h2>Comments:</h2>
        <ul>
          {selectedPost &&
            selectedPost.map((comment) => (
              <li key={comment.id}>{comment.body}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
