// Fetch comments from GitHub Issues API
fetch('https://api.github.com/repos/yourusername/yourrepository/issues/1/comments')
  .then(response => response.json())
  .then(comments => {
    // Render comments on your webpage
    const commentsList = document.getElementById('comments-list');

    comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.textContent = comment.body;
      commentsList.appendChild(commentDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching comments:', error);
  });
