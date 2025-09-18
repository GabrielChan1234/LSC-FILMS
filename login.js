// login.js

// --- STYLES + HTML overlay ---
const loginStyles = `
  <style>
    .login-screen {
      position: fixed;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f5f5f5;
      z-index: 9999;
    }
    .login-box {
      background: white;
      padding: 20px 30px;
      border-radius: 12px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      text-align: center;
      width: 300px;
    }
    .login-box img {
      width: 60px;
      margin-bottom: 15px;
    }
    .login-box input {
      padding: 10px;
      font-size: 14px;
      width: 100%;
      margin: 12px 0;
      border: 1px solid #ccc;
      border-radius: 6px;
      box-sizing: border-box;
      text-align: center;
      text-transform: uppercase;
    }
    .login-box button {
      padding: 10px 16px;
      font-size: 14px;
      cursor: pointer;
      border: 0;
      border-radius: 6px;
      background: transparent;
    }
    .error {
      color: red;
      font-size: 12px;
      margin-top: 15px;
    }
    body.locked {
      overflow: hidden;
    }
  </style>
`;

const loginHTML = `
  <div class="login-screen" id="loginScreen">
    <div class="login-box">
      <img src="images/lscfilmslogo.png" alt="LSC Logo" />
      <input type="text" id="username" placeholder="USER ID" autocomplete="off" />
      <button id="loginBtn">+</button>
      <div class="error" id="errorMsg"></div>
    </div>
  </div>
`;

document.head.insertAdjacentHTML("beforeend", loginStyles);
document.body.insertAdjacentHTML("afterbegin", loginHTML);

// --- LOGIN LOGIC ---
const encodedNames = [
  "R2FicmllbCBDaGFu",
  "UmFmYWVsIENoYW4=", 
  "TGluZGEgU3Vt",
  "VmluY2VudCBDaGFu"
];
const allowedNames = encodedNames.map(n => atob(n).toUpperCase());

const input = document.getElementById("username");
const btn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");
const loginScreen = document.getElementById("loginScreen");

// Lock body until login
document.body.classList.add("locked");

// check login status
let loggedIn = sessionStorage.getItem("loggedIn") === "true";

// if page restored with Ctrl+Shift+T, force login again
if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
  loggedIn = false;
  sessionStorage.removeItem("loggedIn");
}

// if logged in already for this session, hide login
if (loggedIn) {
  loginScreen.style.display = "none";
  document.body.classList.remove("locked");
} else {
  // always clear field so autofill doesn't appear
  input.value = "";
  input.focus();
}

// login handler
btn.addEventListener("click", () => {
  const name = input.value.trim().toUpperCase();
  if (allowedNames.includes(name)) {
    sessionStorage.setItem("loggedIn", "true");
    loginScreen.style.display = "none";
    document.body.classList.remove("locked");
  } else {
    errorMsg.textContent = "INCORRECT USER ID";
    input.value = "";
    input.focus();
  }
});
