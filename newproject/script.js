import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDN78-PykZCackeiJQAjyncWG-9lqbiNMs",
    authDomain: "mobile-programming-38e90.firebaseapp.com",
    databaseURL: "https://mobile-programming-38e90-default-rtdb.firebaseio.com",
    projectId: "mobile-programming-38e90",
    storageBucket: "mobile-programming-38e90.firebasestorage.app",
    messagingSenderId: "198875320843",
    appId: "1:198875320843:web:3d93db0818d8831777ed0e"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// WRITE USER FUNCTION
window.writeUser = function () {

  const first_name = document.getElementById("first_name").value.trim();
  const last_name = document.getElementById("last_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value.trim();
  const hobby = document.getElementById("hobby").value.trim();
  const major = document.getElementById("major").value.trim();
  const college = document.getElementById("college").value.trim();

  if (!first_name || !last_name || !email) {
    alert("Please fill First Name, Last Name and Email");
    return;
  }

  const userData = {
    first_name,
    last_name,
    email,
    phone,
    address,
    age,
    gender,
    hobby,
    major,
    college,
    created_at: new Date().toISOString()
  };

  const newUserRef = push(ref(db, "users"));

  set(newUserRef, userData)
    .then(() => {
      alert("User added successfully!");
      clearForm();
    })
    .catch(error => {
      alert("Error: " + error.message);
      console.error(error);
    });
};

// CLEAR FORM FUNCTION
function clearForm() {
  const fields = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "address",
    "age",
    "gender",
    "hobby",
    "major",
    "college"
  ];

  fields.forEach(id => {
    document.getElementById(id).value = "";
  });
}