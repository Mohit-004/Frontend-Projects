
const apiKey = "AIzaSyAx8dZC0X6lVLt77f3kOe732prli-WXvdU";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;


const loader = document.getElementById("loader");
const inputArea = document.getElementById("input-area");
const chatSection = document.getElementById("chat-section");
const sendBtn = document.getElementById("send-btn");

// On page load, hide the full-screen loader
window.addEventListener("load", () => {
    loader.style.opacity = "1";
    setTimeout(() => {
        loader.style.transition = "opacity 0.5s ease";
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }, 500);
});




// Send button click handler
sendBtn.addEventListener("click", handleSend);


const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});


async function handleSend() {
    const userInput = inputArea.value.trim();
    if (!userInput) return;

    // Remove welcome message after first input
    const welcomeMsg = document.getElementById("welcome-msg");
    if (welcomeMsg) welcomeMsg.remove();

    appendMessage("User", userInput, "user");
    inputArea.value = "";

    sendBtn.disabled = true;

    const typingIndicatorId = showTypingIndicator();

    try {
        const botResponse = await sendToGemini(userInput);
        removeTypingIndicator(typingIndicatorId);
        appendMessage("Chatbot", botResponse || "Sorry, I couldn't understand that.", "bot");
    } catch (error) {
        console.error("Fetch error:", error);
        removeTypingIndicator(typingIndicatorId);
        appendMessage("Chatbot", "Something went wrong. Please try again later.", "bot");
    } finally {
        sendBtn.disabled = false;
    }
}

function appendMessage(sender, message, cssClass) {
    const parsed = sender === "Chatbot" ? marked.parse(message) : escapeHTML(message);
    const messageHTML = `
            <div class="${cssClass}">
                <p><strong>${sender}</strong></p>
                <p>${parsed}</p>
            </div>`;
    chatSection.innerHTML += messageHTML;
}

async function sendToGemini(text) {
    const payload = {
        contents: [{
            parts: [{ text }]
        }]
    };

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text;
}

// Show "typing..." or spinner while waiting for response
function showTypingIndicator() {
    const typingId = `typing-${Date.now()}`;
    const typingHTML = `
            <div class="bot typing" id="${typingId}">
                <p><strong>Chatbot</strong></p>
                <p><i class="fa fa-spinner fa-spin"></i> Chatbot is typing...</p>
            </div>`;
    chatSection.innerHTML += typingHTML;
    chatSection.scrollTop = chatSection.scrollHeight;
    return typingId;
}

function removeTypingIndicator(id) {
    const typingElement = document.getElementById(id);
    if (typingElement) typingElement.remove();
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, match => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[match]));
}