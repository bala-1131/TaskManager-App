var data = [];
var users = [];

/**
 * Get all the users and store the details in local variable.
 */
function display() {
  const http = new XMLHttpRequest();
  http.open("GET", `http://localhost:8080/api/v1/user/getusers`, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        users = JSON.parse(this.responseText);

        var content = `<label for="title">Assign To</label>
        <select id="assigned_to" name="user_job">`;

        for (let key in users) {
          content += `<option value="${users[key].username}">${users[key].username}</option>`;
        }

        document.getElementById("dosa").innerHTML = content + `</select>`;
      }
    }
  };

  data = JSON.parse(localStorage.getItem("updateTask"));

  document.getElementById("title").value = data.title;
  document.getElementById("description").value = data.description;
  document.getElementById("duration").value = data.duration;
  document.getElementById("comments").value = data.comments;
  document.getElementById("assigned_to").value = data.assigned_to;
  document.getElementById("status").value = data.status;
}

/**
 * Collect all the Updated form values.
 * Update the values in the database using Ajax.
 */

function editTask() {
  let newId = data._id;
  let newTask = document.getElementById("title").value;
  let newDesc = document.getElementById("description").value;
  let newAssign = document.getElementById("assigned_to").value;
  let newStatus = document.getElementById("status").value;
  let newComment = document.getElementById("comments").value;
  let newDuration = document.getElementById("duration").value;
  let num = 1;
  let date = new Date().toLocaleDateString();

  const http = new XMLHttpRequest();
  http.open(
    "PUT",
    `http://localhost:8080/api/v1/admin/updatetask/${newId}`,
    true
  );
  http.setRequestHeader("Content-Type", "application/json");
  http.send(
    JSON.stringify({
      title: newTask,
      description: newDesc,
      assigned_to: newAssign,
      assignedDate: date,
      status: newStatus,
      comments: newComment,
      duration: newDuration,
      notifications: num,
    })
  );
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        alert("Update successfull");
      }
    }
  };
  location.replace("http://localhost:8080/admindashboard.html");
  event.preventDefault();
}

window.onload = display();
