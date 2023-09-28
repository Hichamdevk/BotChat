document.addEventListener("DOMContentLoaded", function () {
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener("click", function () {
        const userMessage = userInput.value;
        if (userMessage) {
            appendMessage(userMessage, "user");
            userInput.disabled = true; // تعطيل حقل إدخال المستخدم

            setTimeout(function () {
                const botResponse = getBotResponse(userMessage);
                appendMessage(botResponse, 'bot');
                userInput.disabled = false; // إعادة تمكين حقل إدخال المستخدم بعد مرور 2 ثانية
            }, 3000);
        }

        userInput.value = "";
    });

    function appendMessage(message, sender) {
        const messageDiv = document.createElement("div");

        // تحديد الفئة بناءً على المرسل (user أو bot)
        if (sender === "user") {
            messageDiv.classList.add("message", "user");
            messageDiv.textContent = message;
        } else if (sender === "bot") {
            // إضافة النقاط الثلاث قبل رسالة الشات بوت
            messageDiv.classList.add("message", "bot");
            messageDiv.style.opacity = "0"; // تخفيض الشفافية للرسالة
            messageDiv.innerHTML = "...";

            // إضافة الرسالة بعد تأخير 0.5 ثانية
            setTimeout(function () {
                messageDiv.style.opacity = "1"; // زيادة الشفافية لعرض الرسالة
                messageDiv.textContent = message;
            }, 100);
        }

        chatLog.appendChild(messageDiv);
    }

    const stories = [
        // القصة بدون <br> تقسيم الأسطر
        "كان هناك ساحر قوي يعيش في غابة سحرية. كان لديه قطة سوداء ساحرة تُدعى مياو. في يوم من الأيام، طلب الساحر من مياو أن تساعده في إيقاف عصاه السحرية التي أصبحت تفعل أشياء غريبة. بدأت مياو بمغامرتها لإيقاف العصا واكتشفت أنها تحتاج إلى السفر عبر الأرض السحرية ومواجهة تحديات كبيرة. هل ستنجح مياو في مساعدة الساحر؟"
        // يمكنك إضافة المزيد من القصص هنا...
    ];

    function getBotResponse(userMessage) {
        if (userMessage.includes('السلام ')){
            return('وعليكم السلام . كيف يمكنني مساعدتك اليوم ؟')
        }
        if (userMessage.includes('قصة')) {
            // اختيار قصة عشوائية من المصفوفة
            const randomIndex = Math.floor(Math.random() * stories.length);
            const randomStory = stories[randomIndex];

            return randomStory;
        }

        // ... (الشيفرة الأخرى هنا)
    }

    // عند عرض رسالة البوت بعد تأخير
    const botMessage = document.querySelector('.message.bot');
    botMessage.classList.add('show-text');
});
