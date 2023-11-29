var users = [];

/**
 * Get the users and store in global variable.
 * Call UsersPage
 */
function display() {
  var http1 = new XMLHttpRequest();
  http1.open("GET", `http://localhost:8080/api/v1/user/getusers`, true);
  http1.setRequestHeader("Content-Type", "application/json");
  http1.send();
  http1.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        users = JSON.parse(this.responseText);
        UsersPage();
      }
    }
  };
}
/**
 * Display available registered users in the front end from the database
 */
function UsersPage() {
  var content = `<div class="row"><div class="col-lg-6 mx-auto"><div class="card-body p-5"><div class="table-responsive"><table border class="table m-0"><thead>
    <tr>
        <th scope="col">User</th>
        <th scope="col">Email</th>
        <th scope="col"></th>
    </tr>
    </thead><tbody>`;

  for (let key in users) {
    content += `<tr>
    <td>${users[key].username}</td>
    <td>${users[key].email}</td>
    <td><button class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" onClick="AddTask(${key})">Assign Task</button></a></td>
</tr>`;
  }

  document.getElementById("dynamic").innerHTML = content + `</tbody></table>`;
}

/**
 * Get username and store in localStorage
 * @param key Specific user Id
 */
function AddTask(key) {
  let name = users[key].username;
  localStorage.setItem("Name", JSON.stringify(name));
  window.location.href = "addTaskForm.html";
}

window.onload = display();
