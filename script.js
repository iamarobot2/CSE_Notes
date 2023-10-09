
var user = 'iamarobot2';
var repo = 'https://github.com/iamarobot2/CSE_Notes';

fetch('https://api.github.com/repos/' + user + '/' + repo + '/contents')
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
    // TODO: Upload file to GitHub
});
