/**
 * Get the login credetials from frontend. 
 */
function LoginCheck(){
    let name = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let key ="user";

    if(!name || !password){
        alert("Please fill all the details...");
    }


    /**
     * On succesfull login , Create JWT token and store in localStorage.
     * Call LoadUser
     */
    var http = new XMLHttpRequest();
	http.open("POST",`http://localhost:8080/api/v1/user/login`,true);
	http.setRequestHeader("Content-type","application/json");
	http.send(JSON.stringify({username:name,role:key,password:password}));
	http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 200){
                let userLoggedData =JSON.parse(this.responseText);
                localStorage.setItem("Token",userLoggedData);
                localStorage.setItem("Name",JSON.stringify(name));
                LoadUser();
		}
        else{
            alert("Invalid credentials...");
        }
	}
    }  
    event.preventDefault();  
}

/**
 * Set the token in a request header.
 * Call relocate 
 */

function LoadUser(){
    const http1 = new XMLHttpRequest();
    http1.open("GET",`http://localhost:8080/api/v1/user/auth-user`,true);
    http1.setRequestHeader("Content-type","application/json");
    http1.setRequestHeader("Auth",localStorage.getItem("Token"));
    http1.send()
    http1.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
            setTimeout(relocate,1000);
        }
    }
    }
    event.preventDefault();
}

/**
 * Navigate to user page
 */
function relocate(){
    location.replace("http://localhost:8080/User.html");
}