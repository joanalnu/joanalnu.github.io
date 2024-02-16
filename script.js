document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('comments-list');

    // Function to load comments from Local Storage
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        commentsList.innerHTML = ''; // Clear existing comments
        comments.forEach(function(comment) {
            addCommentToDOM(comment);
        });
    }

    // Function to save comments to Local Storage
    function saveComment(text) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(text);
        localStorage.setItem('comments', JSON.stringify(comments));
        addCommentToDOM(text);
    }

    // Function to add comments to the DOM, including delete button
    function addCommentToDOM(text) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');

        const commentParagraph = document.createElement('p');
        commentParagraph.textContent = text;
        commentDiv.appendChild(commentParagraph);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        
        // Handle the delete functionality
        deleteButton.onclick = function() {
            // Find index of the comment text in the array
            const comments = JSON.parse(localStorage.getItem('comments')) || [];
            const commentIndex = comments.indexOf(text);
            if (commentIndex > -1) {
                comments.splice(commentIndex, 1); // Remove the comment from the array
                localStorage.setItem('comments', JSON.stringify(comments)); // Update Local Storage
                commentDiv.remove(); // Remove the comment from the DOM
            }
        };

        commentDiv.appendChild(deleteButton);
        commentsList.appendChild(commentDiv);
    }

    // Handle the form submission
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const commentText = commentInput.value.trim();
        if(commentText) {
            saveComment(commentText);
            commentInput.value = ''; // Clear input after submission
        }
    });

    // Load any saved comments from Local Storage
    loadComments();
});
