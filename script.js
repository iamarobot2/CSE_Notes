const user = 'iamarobot2';
const repo = 'CSE_Notes';
const uploadFunctionUrl = 'https://<your-project-name>.vercel.app/api/upload';
const deleteFunctionUrl = 'https://<your-project-name>.vercel.app/api/delete';
function validateFile(file) {
  if (!file.type.startsWith('application/pdf')) {
    alert('Please upload a PDF file.');
    return false;
  }

  return true;
}
function showLoadingIndicator() {
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerHTML = 'Loading...';

  document.body.appendChild(loadingIndicator);
}
function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading-indicator');
  if (loadingIndicator) {
    document.body.removeChild(loadingIndicator);
  }
}
function handleError(error) {
  console.error(error);

  if (error instanceof TypeError) {
    alert('An error occurred while uploading or deleting the file.');
  } else if (error instanceof NetworkError) {
    alert('A network error occurred while uploading or deleting the file.');
  } else {
    alert('An unknown error occurred while uploading or deleting the file.');
  }
}
async function deleteFile(path, sha) {
  try {
    showLoadingIndicator();

    const response = await fetch(deleteFunctionUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + process.env.VERCEL_GITHUB_TOKEN
      },
      body: JSON.stringify({
        path: path,
        sha: sha
      })
    });

    if (!response.ok) {
      throw new Error('Failed to delete file: ' + response.status);
    }

    hideLoadingIndicator();
  } catch (error) {
    hideLoadingIndicator();
    handleError(error);
  }
}
async function uploadFile(file) {
  try {
    if (!validateFile(file)) {
      return;
    }

    showLoadingIndicator();

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(uploadFunctionUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.VERCEL_GITHUB_TOKEN
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload file: ' + response.status);
    }

    hideLoadingIndicator();
  } catch (error) {
    hideLoadingIndicator();
    handleError(error);
  }
}
fetch('https://api.github.com/repos/iamarobot2/CSE_Notes/contents/notes')
    .then(response => response.json())
    .then(data => {
        var cards = document.getElementById('cards');
        data.forEach(item => {
            if (item.name.endsWith('.pdf')) {
                var card = document.createElement('div');
                card.className = 'card col-md-4 p-3';
                card.innerHTML = `
                    <img src="resource/pdf_icon.png" alt="PDF Icon" style="width:30%">
                    <div class="container mt-3">
                        <h4><b>${item.name}</b></h4> 
                        <p>Description of the document.</p> 
                        <a href="${item.download_url}" target="_blank" class="btn btn-primary">Download Note</a>`;
                if (localStorage.getItem('isLoggedIn') === 'true') {
                    card.innerHTML += `<button onclick="deleteFile('${item.path}', '${item.sha}')" class="btn btn-danger">Delete</button>`;
                }
                card.innerHTML += `</div>`;
                cards.appendChild(card);
            }
        });
    })
    .then(() => {
        document.getElementById('searchButton').addEventListener('click', searchNotes);
    });

    /*function deleteFile(path, sha) {
        var confirmDelete = confirm('Are you sure you want to delete this file?');
        if (confirmDelete) {
            var data = {
                message: 'Delete ' + path,
                sha: sha
            };
            fetch('https://api.github.com/repos/' + user + '/' + repo + '/contents/' + path, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'token ' + yourToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('File was successfully deleted');
                location.reload(); // Refresh the page
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                alert('Error: File was not deleted');
            });
        }
    }
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var file = document.getElementById('file').files[0];
    var reader = new FileReader();
    reader.onload = function() {
        var content = reader.result.split(',')[1];
        var data = {
            message: description,
            content: content
        };
        fetch('https://api.github.com/repos/' + user + '/' + repo + '/contents/notes/' + file.name, {
            method: 'PUT',
            headers: {
                'Authorization': 'token ' + yourToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert('Document was successfully uploaded');
            location.reload();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('Error: Document was not uploaded');
        });
    };
    reader.readAsDataURL(file);
});*/
function searchNotes() {
    var searchQuery = document.getElementById('search').value.toLowerCase();
    var cards = document.getElementsByClassName('card');
    var firstMatch = null;
    for (var i = 0; i < cards.length; i++) {
        var title = cards[i].getElementsByTagName('b')[0].innerText.toLowerCase();
        var pdfName = cards[i].getElementsByTagName('a')[0].href.split('/').pop().toLowerCase();
        if (title.includes(searchQuery) || pdfName.includes(searchQuery)) {
            cards[i].style.display = '';
            if (!firstMatch) {
                firstMatch = cards[i];
            }
        } else {
            cards[i].style.display = 'none';
        }
    }
    if (firstMatch) {
        firstMatch.scrollIntoView({behavior: "smooth"});
    }
}
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('logoutButton').style.display = 'block';
    }
};
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.setItem('isLoggedIn', 'false');
    location.reload();
    this.style.display = 'none';
});
