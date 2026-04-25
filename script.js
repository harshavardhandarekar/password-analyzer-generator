let last = "";

/* CHECK */
function check() {
  let p = document.getElementById("pass").value;
  let fill = document.getElementById("fill");
  let status = document.getElementById("status");
  let details = document.getElementById("details");
  let sugBox = document.getElementById("sugBox");

  let score = 0;
  let issues = [];

  let lower = /[a-z]/.test(p);
  let upper = /[A-Z]/.test(p);
  let number = /[0-9]/.test(p);
  let symbol = /[^A-Za-z0-9]/.test(p);

  if (p.length >= 8) score++; else issues.push("8+ chars");
  if (p.length >= 13) score++; else issues.push("13+ recommended");
  if (lower) score++; else issues.push("lowercase");
  if (upper) score++; else issues.push("uppercase");
  if (number) score++; else issues.push("number");
  if (symbol) score++; else issues.push("special char");

  if (p.length === 0) {
    fill.style.width = "0%";
    status.innerText = "Start typing...";
    details.innerText = "";
    sugBox.innerHTML = "";
    return;
  }

  let isStrong = (p.length >= 13 && lower && upper && number && symbol);

  if (isStrong) {
    fill.style.width = "100%";
    fill.style.background = "#22c55e";
    status.innerText = "Strong 🔐 (Secure)";
    details.innerText = "No changes needed ✔";
    sugBox.innerHTML = "<div style='color:#22c55e;font-size:12px;'>Already strong password 👍</div>";
    return;
  }

  if (score <= 3) {
    fill.style.width = "30%";
    fill.style.background = "#ef4444";
    status.innerText = "Weak ❌";
  } else {
    fill.style.width = "60%";
    fill.style.background = "#f59e0b";
    status.innerText = "Medium ⚠️";
  }

  details.innerText = issues.join(" • ");
  makeSuggestions(p);
}

/* TOGGLE */
function toggle() {
  let p = document.getElementById("pass");
  p.type = (p.type === "password") ? "text" : "password";
}

/* GENERATE */
function generate() {
  let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lower = "abcdefghijklmnopqrstuvwxyz";
  let number = "0123456789";
  let symbol = "!@#$%^&*()_+[]{}|;:,.<>?/~`-=";

  let all = upper + lower + number + symbol;
  let length = 16;

  let pass = "";
  pass += pick(upper);
  pass += pick(lower);
  pass += pick(number);
  pass += pick(symbol);

  for (let i = 4; i < length; i++) {
    pass += all[Math.floor(Math.random() * all.length)];
  }

  pass = pass.split('').sort(() => Math.random() - 0.5).join('');

  last = pass;
  document.getElementById("gen").innerText = pass;

  makeSuggestions(pass);
}

/* helper */
function pick(set) {
  return set[Math.floor(Math.random() * set.length)];
}

/* suggestions */
function makeSuggestions(base) {
  let box = document.getElementById("sugBox");
  box.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    let p = base.split('').sort(() => Math.random() - 0.5).join('');
    let div = document.createElement("div");
    div.className = "sug";
    div.innerText = p;

    div.onclick = () => {
      navigator.clipboard.writeText(p);
      alert("Copied!");
    };

    box.appendChild(div);
  }
}

/* COPY */
function copy() {
  if (!last) return alert("Generate first!");
  navigator.clipboard.writeText(last);
  alert("Copied!");
}

/* CLEAR */
function clearAll() {
  document.getElementById("pass").value = "";
  document.getElementById("gen").innerText = "Generated password will appear here";
  document.getElementById("fill").style.width = "0%";
  document.getElementById("details").innerText = "";
  document.getElementById("sugBox").innerHTML = "";
}