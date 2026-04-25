let lastGenerated = "";

/* CHECK PASSWORD */
function check() {
    const p = document.getElementById("pass").value;
    const fill = document.getElementById("fill");
    const status = document.getElementById("status");
    const details = document.getElementById("details");

    let score = 0;
    let issues = [];

    const lower = /[a-z]/.test(p);
    const upper = /[A-Z]/.test(p);
    const number = /[0-9]/.test(p);
    const symbol = /[^A-Za-z0-9]/.test(p);

    if (!p) {
        fill.style.width = "0%";
        status.innerText = "Start typing...";
        details.innerText = "";
        return;
    }

    if (p.length >= 8) score++; else issues.push("8+ chars");
    if (p.length >= 13) score++; else issues.push("13+ recommended");
    if (lower) score++; else issues.push("lowercase");
    if (upper) score++; else issues.push("uppercase");
    if (number) score++; else issues.push("number");
    if (symbol) score++; else issues.push("symbol");

    if (score <= 3) {
        fill.style.width = "30%";
        fill.style.background = "#ef4444";
        status.innerText = "Weak ❌";
    } 
    else if (score <= 5) {
        fill.style.width = "60%";
        fill.style.background = "#f59e0b";
        status.innerText = "Medium ⚠️";
    } 
    else {
        fill.style.width = "100%";
        fill.style.background = "#22c55e";
        status.innerText = "Strong 🔐";
    }

    details.innerText = issues.join(" • ");
}

/* TOGGLE PASSWORD */
function toggle() {
    const p = document.getElementById("pass");
    p.type = p.type === "password" ? "text" : "password";
}

/* GENERATE PASSWORD */
function generate() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let pass = "";

    for (let i = 0; i < 16; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    lastGenerated = pass;
    document.getElementById("gen").innerText = pass;

    makeSuggestions(pass);
}

/* SUGGESTIONS */
function makeSuggestions(base) {
    const box = document.getElementById("sugBox");
    box.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        let p = base.split('').sort(() => Math.random() - 0.5).join('');

        const div = document.createElement("div");
        div.className = "sug";
        div.innerText = p;

        div.onclick = function () {
            navigator.clipboard.writeText(p);
            div.innerText = "Copied ✔";

            setTimeout(() => {
                div.innerText = p;
            }, 800);
        };

        box.appendChild(div);
    }
}

/* COPY (FIXED 100%) */
function copy() {
    const typed = document.getElementById("pass").value;

    let textToCopy = "";

    if (typed.length > 0) {
        textToCopy = typed;
    } else if (lastGenerated.length > 0) {
        textToCopy = lastGenerated;
    } else {
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Copied successfully!");
        })
        .catch(() => {
            alert("Copy failed (browser issue)");
        });
}

/* CLEAR */
function clearAll() {
    document.getElementById("pass").value = "";
    document.getElementById("gen").innerText = "Generated password will appear here";
    document.getElementById("fill").style.width = "0%";
    document.getElementById("details").innerText = "";
    document.getElementById("sugBox").innerHTML = "";
}
