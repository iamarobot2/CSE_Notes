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
                    <img src="pdf_icon.png" alt="PDF Icon" style="width:100%">
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
});

/*var user = 'iamarobot2';
var repo = 'CSE_Notes';

fetch('https://api.github.com/repos/iamarobot2/CSE_Notes/contents/notes')
    .then(response => response.json())
    .then(data => {
        var cards = document.getElementById('cards');
        data.forEach(item => {
            if (item.name.endsWith('.pdf')) {
                var card = document.createElement('div');
                card.className = 'card col-md-4 p-3';
                card.innerHTML = `
                    <img src="pdf_icon.png" alt="PDF Icon" style="width:100%">
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
    fetch('https://api.github.com/repos/' + user + '/' + repo + '/contents/' + file.name, {
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
