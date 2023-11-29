window.onload = Users();

var tasks = [];
var userTask = [];

/**
 * To get the values from the api and store the values in a global variable.
 */

function Users() {
  const http = new XMLHttpRequest();
  http.open("GET", `http://localhost:8080/api/v1/admin/gettasks`, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        tasks = JSON.parse(this.responseText);
        var username = JSON.parse(localStorage.getItem("Name"));
        userTask = tasks.filter((tasks) => tasks.assigned_to != " ");

        document.getElementById(
          "username"
        ).innerHTML = `<h4>Welcome ${username} !</h4>`;

        var content = `<div class="row"><div class="col-lg-12 mx-auto"><div class="card-body p-5"><div class="table-responsive"><table border class="table"><thead>
        <tr>
        <th scope="col" >Id<span class="icon"><i class="fa-sharp fa-solid fa-angle-up" onclick="sortTableUp(0)"></i><i class="fa-sharp fa-solid fa-angle-down" onclick="sortTableDown(0)"></i></span></th>
            <th scope="col">Task<span class="icon"><i class="fa-sharp fa-solid fa-angle-up" onclick="sortTableUp(1)"></i><i class="fa-sharp fa-solid fa-angle-down" onclick="sortTableDown(1)"></i></span></th>
            <th scope="col">Description<span class="icon"><i class="fa-sharp fa-solid fa-angle-up" onclick="sortTableUp(2)"></i><i class="fa-sharp fa-solid fa-angle-down" onclick="sortTableDown(2)"></i></span></th>
            <th scope="col">Assigned<span class="icon"><i class="fa-sharp fa-solid fa-angle-up" onclick="sortTableUp(3)"></i><i class="fa-sharp fa-solid fa-angle-down" onclick="sortTableDown(3)"></i></span></th>
            <th scope="col">Assigned At<span class="icon"><i class="fa-sharp fa-solid fa-angle-up" onclick="sortTableUp(4)"></i><i class="fa-sharp fa-solid fa-angle-down" onclick="sortTableDown(4)"></i></span></th>
            <th scope="col">Duration<span class="icon"><i class="fa-sharp fa-solid fa-angle-up" onclick="sortTableUp(5)"></i><i class="fa-sharp fa-solid fa-angle-down" onclick="sortTableDown(5)"></i></span></th>
            <th scope="col">Comments<span class="icon"><i class="fa-sharp fa-solid fa-angle-up" onclick="sortTableUp(6)"></i><i class="fa-sharp fa-solid fa-angle-down" onclick="sortTableDown(6)"></i></span></th>
            <th scope="col">Status<span class="icon"><i class="fa-sharp fa-solid fa-angle-up" onclick="sortTableUp(7)"></i><i class="fa-sharp fa-solid fa-angle-down" onclick="sortTableDown(7)"></i></span></th>
        </tr>
        </thead><tbody>`;

        for (let key in userTask) {
          content += `<tr>
          <td>${userTask[key].uid}</td>
          <td>${userTask[key].title}</td>
          <td>${userTask[key].description}</td>
          <td>${userTask[key].assigned_to}</td>
          <td>${userTask[key].assignedDate}</td>
          <td>${userTask[key].duration}</td>
          <td>${userTask[key].comments}</td>
          <td>${userTask[key].status}</td>
          </tr>`;
        }
        document.getElementById("dynamic").innerHTML =
          content + `</tbody></table>`;
      }
    }
    Color();
  };
}

/**
 * On giving Input  , Search the content in the Table.
 * Display that specific content.
 * Hide the other contents.
 */

document
  .getElementById("searchInput")
  .addEventListener("input", function display() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    var rows = document.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
      var match = false;

      var cells = rows[i].getElementsByTagName("td");

      for (var j = 0; j < cells.length; j++) {
        if (cells[j].innerHTML.toLowerCase().indexOf(input) > -1) {
          match = true;
          break;
        }
      }

      if (match) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  });

/**
 * On display , this code differentiate the Completion status with 3 colors.
 */

function Color() {
  var rows = document.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    for (var j = 0; j < cells.length; j++) {
      if (cells[j].innerHTML.toLowerCase() == "pending") {
        cells[j].style.color = "orange";
        cells[j].style.fontSize = "20px";
        cells[j].style.fontWeight = "bold";
      } else if (cells[j].innerHTML.toLowerCase() == "in progress") {
        cells[j].style.color = "gold";
        cells[j].style.fontSize = "20px";
        cells[j].style.fontWeight = "bold";
      } else if (cells[j].innerHTML.toLowerCase() == "completed") {
        cells[j].style.color = "green";
        cells[j].style.fontSize = "20px";
        cells[j].style.fontWeight = "bold";
      }
    }
  }
}

/**
 * Sort the table in the ascending order
 * @param column column number
 */

function sortTableUp(column) {
  let i, x, y;
  let switching = true;

  while (switching) {
    switching = false;
    let rows = document.getElementsByTagName("tr");

    for (i = 1; i < rows.length - 1; i++) {
      var Switch = false;

      x = rows[i].getElementsByTagName("td")[column];

      for (j = 1; j < rows.length - 1; j++) {
        y = rows[j + i].getElementsByTagName("td")[column];

        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          Switch = true;
          break;
        }
      }
      if (Switch) {
        rows[i].parentNode.insertBefore(rows[i + j], rows[i]);
        switching = true;
      }
    }
  }
}

/**
 * Sort the table in the descending order
 * @param column column number
 */

function sortTableDown(column) {
  let i, x, y;
  let switching = true;

  while (switching) {
    switching = false;
    let rows = document.getElementsByTagName("tr");

    for (i = 1; i < rows.length - 1; i++) {
      var Switch = false;

      x = rows[i].getElementsByTagName("td")[column];

      for (j = 1; j < rows.length - 1; j++) {
        y = rows[j + i].getElementsByTagName("td")[column];

        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          Switch = true;
          break;
        }
      }
      if (Switch) {
        rows[i].parentNode.insertBefore(rows[i + j], rows[i]);
        switching = true;
      }
    }
  }
}
