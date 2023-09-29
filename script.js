document.addEventListener("DOMContentLoaded", function () {
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const deleteButton = document.getElementById('delete-button');

    // تحميل الرسائل وردود البوت من localStorage
    const storedData = localStorage.getItem('chatData');
    const chatData = storedData ? JSON.parse(storedData) : { messages: [], botResponses: [] };

    // عرض الرسائل وردود البوت المحملة
    chatData.messages.forEach(message => appendMessage(message.message, message.sender));
    chatData.botResponses.forEach(response => appendMessage(response, 'bot'));

    sendButton.addEventListener("click", function () {
        const userMessage = userInput.value;
        if (userMessage) {
            appendMessage(userMessage, "user");
            userInput.disabled = true;

            // إضافة الرسالة إلى localStorage
            chatData.messages.push({ message: userMessage, sender: "user" });
            localStorage.setItem('chatData', JSON.stringify(chatData));

            setTimeout(function () {
                const botResponse = getBotResponse(userMessage);
                appendMessage(botResponse, 'bot');
                userInput.disabled = false;

                // إضافة رد البوت إلى localStorage
                chatData.botResponses.push(botResponse);
                localStorage.setItem('chatData', JSON.stringify(chatData));
            }, 3000);
        }

        userInput.value = "";
    });

    deleteButton.addEventListener("click", function () {
        const confirmDelete = confirm("هل أنت متأكد أنك تريد حذف جميع الرسائل وردود البوت؟");
        if (confirmDelete) {
            localStorage.removeItem('chatData');
            chatLog.innerHTML = "";
        }
    });

    function appendMessage(message, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);

        const messageContent = document.createElement("span");
        messageContent.classList.add("message-content");
        messageContent.textContent = message;
        messageDiv.appendChild(messageContent);

        if (sender === "user") {
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "حذف";
            deleteButton.addEventListener("click", function () {
                deleteUserMessage(messageDiv);
            });
            messageDiv.appendChild(deleteButton);
        }

        chatLog.appendChild(messageDiv);
    }

    function deleteUserMessage(messageDiv) {
        chatLog.removeChild(messageDiv);
        const messageText = messageDiv.querySelector('.message-content').textContent;

        // حذف الرسالة من localStorage
        const userMessages = chatData.messages.filter(msg => msg.message !== messageText);
        chatData.messages = userMessages;

        // حذف رد البوت المتعلق بالرسالة من localStorage
        const botResponses = chatData.botResponses.filter(response => response !== messageText);
        chatData.botResponses = botResponses;

        localStorage.setItem('chatData', JSON.stringify(chatData));
    }

    function getBotResponse(userMessage) {
        try {
            if (userMessage.includes('السلام ')) {
                return ('وعليكم السلام . كيف يمكنني مساعدتك اليوم؟');
            }
            if (userMessage.includes('قصة')) {
                const fullStory = stories.join('<br>');
                chatData.botResponses.push(fullStory);
                localStorage.setItem('chatData', JSON.stringify(chatData));
                return fullStory;
            }

            if (userMessage.includes('hello')) {
                return ('hi! my friend');
            }
        } catch (error) {
            console.error("Error saving bot response:", error);
        }
    }
});
