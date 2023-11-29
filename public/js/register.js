/**
 * To get credetails for the new user
 */
function register() {
  let name = document.getElementById("username").value;
  let email = document.getElementById("useremail").value;
  let password = document.getElementById("password").value;
  let key = "user";

  if (!name || !password || !email) {
    alert("Please fill all the details...");
  }

 /**
  * To store the login credentials of the new user in Database
  */
  var http = new XMLHttpRequest();
  http.open("POST", "http://localhost:8080/api/v1/user/register", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(
    JSON.stringify({
      username: name,
      email: email,
      role: key,
      password: password,
    })
  );
  http.onreadystatechange = function () {
    if (http.readyState == 4) {
      if (http.status == 201) {
        alert("User registered successfully...");
        location.replace("http://localhost:8080/index.html");
      }
    }
  };

  event.preventDefault();
}
