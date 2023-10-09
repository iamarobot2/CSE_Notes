document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if (username === 'Avin Joshy' && password === 'Iamgroot@4129') {
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password');
    }
});
