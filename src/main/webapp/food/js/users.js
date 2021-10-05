var databaseRef = firebase.database().ref('anarausers/');

// CREATE NEW USER

function save_user() {
    var nama = document.getElementById('username').value;
    var email = document.getElementById('useremail').value;
    var message = document.getElementById('usermessage').value;

    var uid = firebase.database().ref().child('anarausers').push().key;

    var data = {
        nama: nama,
        email: email,
        message: message
    }

    var updates = {};
    updates['/anarausers/' + uid] = data;
    firebase.database().ref().update(updates);

    alert("Sukses");
    reload_page();
}

function reload_page() {
    window.location.reload();
}