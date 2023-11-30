var taskTitle = [];

/*
 * Get the values from the api and store it in global variable
 */

function title() {
  const http = new XMLHttpRequest();
  http.open("GET", `http://localhost:8080/api/v1/admin/gettasks`, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        taskTitle = JSON.parse(this.responseText);

        var content = `<label for="title">Title</label>
			<select id="title" name="user_job">`;

        for (let key in taskTitle) {
          content += `<option value=${taskTitle[key].title}>${taskTitle[key].title}</option>`;
        }

        document.getElementById("idly").innerHTML = content + `</select>`;
      }
    }
  };
  event.preventDefault();
}

/*
 * Collect the form values from the frontend
 */

function display() {
  let newTask = document.getElementById("title").value;
  let task = [];
  task = taskTitle.filter((taskTitle) => taskTitle.title == newTask);
  let newAssign = JSON.parse(localStorage.getItem("Name"));
  let newStatus = document.getElementById("status").value;
  let num = 1;
  let date = new Date().toLocaleDateString();

  const http = new XMLHttpRequest();
  http.open(
    "PUT",
    `http://localhost:8080/api/v1/admin/updatetask/${task[0]._id}`,
    true
  );
  http.setRequestHeader("Content-Type", "application/json");

  http.send(
    JSON.stringify({
      assigned_to: newAssign,
      status: newStatus,
      assignedDate: date,
      notifications: num,
    })
  );
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        event.preventDefault();
      }
    }
  };
  alert("Task added successfully.");
}

window.onload = title();
