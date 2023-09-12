let users = [];

function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";

    if (name === "") {
        document.getElementById("nameError").innerHTML = "O campo Nome é obrigatório";
    } else if (name.split(" ").length < 2) {
        document.getElementById("nameError").innerHTML = "Por favor, insira um nome completo.";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailRegex)) {
        document.getElementById("emailError").innerHTML = "Por favor, insira um e-mail válido";
    }

    if (password === "") {
        document.getElementById("passwordError").innerHTML = "O campo Senha é obrigatório";
    } else if (password.length < 8) {
        document.getElementById("passwordError").innerHTML = "A senha deve conter pelo menos 8 caracteres.";
    }

    if (name === "" || !email.match(emailRegex) || password === "" || password.length < 8) {
        return;
    }

    addUserToTable(name, email);
    document.getElementById("userTableWrapper").style.display = "block";
}

function addUserToTable(name, email) {
    const table = document.getElementById("userTable");
    const newRow = table.insertRow(-1);
    const idCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const emailCell = newRow.insertCell(2);
    const actionsCell = newRow.insertCell(3);

    idCell.textContent = table.rows.length - 1;
    nameCell.textContent = name;
    emailCell.textContent = email;

    const deleteLink = document.createElement("a");
    deleteLink.href = "javascript:void(0);";
    deleteLink.textContent = "Excluir";
    deleteLink.onclick = function () {
        deleteUser(newRow);
    };

    actionsCell.appendChild(deleteLink);
    document.getElementById("userForm").reset();
    users.push({ name, email });
    document.getElementById("userTableWrapper").style.display = "block";
}

function deleteUser(row) {
    const rowIndex = row.rowIndex;
    users.splice(rowIndex - 1, 1);
    row.parentNode.removeChild(row);
    if (users.length === 0) {
        document.getElementById("userTableWrapper").style.display = "none";
    }
}
