var databaseRef = firebase.database().ref('recipes/');

// CREATE NEW USER

function save_user() {
    var username = document.getElementById('inputName').value;
    var description = document.getElementById('inputDescription').value;
    var image = document.getElementById('inputImage').value;
    var ingredients = document.getElementById('inputIngredients').value;

    var uid = firebase.database().ref().child('recipes').push().key;

    var data = {
        username: username,
        description: description,
        image: image,
        ingredients: ingredients,
       
    }

    var updates = {};
    updates['/recipes/' + uid] = data;
    firebase.database().ref().update(updates);

    alert("Sukses");
    reload_page();
}

var tbRecipes = document.getElementById('tb_recipe');
var rowIndex = 1;

databaseRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = tbRecipes.insertRow(rowIndex);

        var cellId = row.insertCell(0);
        var cellName = row.insertCell(1);
        var cellDesc = row.insertCell(2);
        var cellImg = row.insertCell(3);
        var cellIngredients = row.insertCell(4);

        cellId.appendChild(document.createTextNode(childKey));
        cellName.appendChild(document.createTextNode(childData.username));
        cellDesc.appendChild(document.createTextNode(childData.description));
        cellImg.appendChild(document.createTextNode(childData.image));
        cellIngredients.appendChild(document.createTextNode(childData.ingredients));

        rowIndex = rowIndex + 1;
    });

    var table = document.getElementById("tb_recipe");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = function (row) {
            return function () {
                var cell1 = row.getElementsByTagName("td")[0];
                var cell2 = row.getElementsByTagName("td")[1];
                var cell3 = row.getElementsByTagName("td")[2];
                var cell4 = row.getElementsByTagName("td")[3];
                var cell5 = row.getElementsByTagName("td")[4];
                
                var id = cell1.innerHTML;
                var name = cell2.innerHTML;
                var desc = cell3.innerHTML;
                var img = cell4.innerHTML;
                var ingredients = cell5.innerHTML;
                
                document.getElementById('id').value = id;
                document.getElementById('username').value = name;
                document.getElementById('desc').value = desc;
                document.getElementById('img').value = img;
                document.getElementById('ingredients').value = ingredients;


            };
        };
        currentRow.onclick = createClickHandler(currentRow);
    }
});

function update_user() {
    var uid = document.getElementById('id').value;
    var username = document.getElementById('username').value;
    var description = document.getElementById('desc').value;
    var image = document.getElementById('img').value;
    var ingredients = document.getElementById('ingredients').value;

    var data = {
        username: username,
        description: description,
        image: image,
        ingredients: ingredients
    }

    var updates = {};
    updates['/recipes/' + uid] = data;
    firebase.database().ref().update(updates);
    alert('Users updated successfully!');
    reload_page();
}

function delete_user() {
    var uid = document.getElementById('id').value;
    firebase.database().ref().child('/recipes/' + uid).remove();
    alert('Recipes deleted successfully!');
    reload_page();
}
function reload_page() {
    window.location.reload();
}