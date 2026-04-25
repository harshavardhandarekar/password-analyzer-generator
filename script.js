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
    if (symbol) score++; else issues.push("symbol");

    if (!p) {
        fill.style.width = "0%";
        status.innerText = "Start typing...";
        details.innerText = "";
        sugBox.innerHTML = "";
        return;
    }

    if (score <= 3) {
        fill.style.width = "30%";
        fill.style.background = "#ef4444";
        status.innerText = "Weak ❌";
    } else if (score <= 5) {
        fill.style.width = "60%";
        fill.style.background = "#f59e0b";
        status.innerText = "Medium ⚠️";
    } else {
        fill.style.width = "100%";
        fill.style.background = "#22c55e";
        status.innerText = "Strong 🔐";
    }

    details.innerText = issues.join(" • ");
}

/* TOGGLE */
function toggle() {
    let p = document.getElementById("pass");
    p.type = (p.type === "password") ? "text" : "password";
}

/* GENERATE */
function generate() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let pass = "";

    for (let i = 0; i < 16; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    last = pass;
    document.getElementById("gen").innerText = pass;

    makeSuggestions(pass);
}

/* PICK */
function pick(set) {
    return set[Math.floor(Math.random() * set.length)];
}

/* SUGGESTIONS */
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
            div.innerText = "Copied ✔";

            setTimeout(() => {
                div.innerText = p;
            }, 800);
        };

        box.appendChild(div);
    }
}

/* COPY (FIXED) */
function copy() {
    let typed = document.getElementById("pass").value;

    if (typed) {
        navigator.clipboard.writeText(typed);
        alert("Typed password copied!");
    } else if (last) {
        navigator.clipboard.writeText(last);
        alert("Generated password copied!");
    } else {
        alert("Nothing to copy!");
    }
}

/* CLEAR */
function clearAll() {
    document.getElementById("pass").value = "";
    document.getElementById("gen").innerText = "Generated password will appear here";
    document.getElementById("fill").style.width = "0%";
    document.getElementById("details").innerText = "";
    document.getElementById("sugBox").innerHTML = "";
}
