var user = 'iamarobot2';
var repo = 'CSE_Notes';
var yourToken = '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';

fetch('https://api.github.com/repos/iamarobot2/CSE_Notes/contents/notes')
    .then(response => response.json())
    .then(data => {
        var cards = document.getElementById('cards');
        data.forEach(item => {
            if (item.name.endsWith('.pdf')) {
                var card = document.createElement('div');
                card.className = 'card col-md-4 p-3';
                card.innerHTML = `
                    <img src="/resource/pdf_icon.png" alt="PDF Icon" style="width:30%">
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
    });

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value; // Get the description
    var file = document.getElementById('file').files[0];
    var reader = new FileReader();
    reader.onload = function() {
        var content = reader.result.split(',')[1];
        var data = {
            message: description, // Use the description as the commit message
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
        .then(response => response.json())
        .then(data => console.log(data));
    };
    reader.readAsDataURL(file);
});

/*var user = 'iamarobot2';
var repo = 'CSE_Notes';
var yourToken = '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';

fetch('https://api.github.com/repos/iamarobot2/CSE_Notes/contents/notes')
    .then(response => response.json())
    .then(data => {
        var cards = document.getElementById('cards');
        data.forEach(item => {
            if (item.name.endsWith('.pdf')) {
                var card = document.createElement('div');
                card.className = 'card col-md-4 p-3';
                card.innerHTML = `
                    <img src="/resource/pdf_icon.png" alt="PDF Icon" style="width:30%">
                    <div class="container mt-3">
                        <h4><b>${item.name}</b></h4> 
                        <p>Description of the document.</p> 
                        <a href="${item.download_url}" target="_blank" class="btn btn-primary">Open Document</a>
                    </div>`;
                cards.appendChild(card);
            }
        });
    });

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var title = document.getElementById('title').value;
    var file = document.getElementById('file').files[0];
    var reader = new FileReader();
    reader.onload = function() {
        var content = reader.result.split(',')[1];
        var data = {
            message: 'Upload from website',
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
        .then(response => response.json())
        .then(data => console.log(data));
    };
    reader.readAsDataURL(file);
});*/
