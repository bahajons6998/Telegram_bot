require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const OpenAI = require("openai");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Привет ${msg.from.first_name}! Добро пожаловать в Startup House! 🚀`
  );

});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  
  bot.sendChatAction(chatId, "typing");

  if (text === "/start") return;

  if (text?.toLowerCase()=="ии") {
    bot.sendMessage(
      chatId,
      "Интересная тема! Расскажи, как ты используешь ИИ в бизнесе? 💡"
    );
  } else if (text?.toLowerCase()=="бизнес") {
    bot.sendMessage(
      chatId,
      "Интересная тема! Расскажи, как ты используешь ИИ в бизнесе? 💡"
    );
  } else {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: text }],
      });

      const gptReply = completion.choices[0].message.content;
      bot.sendMessage(chatId, gptReply);
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, "Произошла ошибка. Попробуйте позже.");
    }
  }
});
