/**
 * Collect username , password from front end and check Admin login Credentials.
 */
function AdminCheck() {
  let name = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (!name || !password) {
    alert("Please fill all the details...");
  }
  else if ( name != "Admin" || password != "Admin@123") {
    alert("Invalid Credentials...");
  }
  else{
    alert("Welcome Admin.");
    location.replace("http://localhost:8080/admindashboard.html");
    event.preventDefault();
  }
}
