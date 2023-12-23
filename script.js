const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

commentForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const commentInput = document.getElementById('comment-input');
  const commentText = commentInput.value.trim();

  if (commentText !== '') {
    postComment(commentText);
    commentInput.value = '';
  }
});

function postComment(comment) {
  const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace with your GitHub access token
  const issueNumber = 1; // Replace with the issue number where comments are stored

  fetch(`https://api.github.com/repos/yourusername/yourrepository/issues/${issueNumber}/comments`, {
    method: 'POST',
    headers: {
      Authorization: `token ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ body: comment }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      // Optional: You can display the newly added comment instantly
      const commentDiv = document.createElement('div');
      commentDiv.textContent = data.body;
      commentsList.appendChild(commentDiv);
    })
    .catch(error => {
      console.error('Error adding comment:', error);
    });
}
