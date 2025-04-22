// const OpenAI= require('openai');

// const TelegramBot = require('node-telegram-bot-api');

// // O'zingizning tokeningizni shu yerga qo'ying
// const token = '7724915235:AAEgzWy5JLbEX78sifpG5kNg1KuVOYPkyAQ';
// const OPEN_AI_KEY='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';
// const client = new OpenAI();

// async function chatgpt_response(input1) {
//     return await client.responses.create({
//         model: "gpt-4.1",
//         input: input1
//     });

// }

// // Bot polling rejimida ishlaydi (doimiy tinglash)
// const bot = new TelegramBot(token, { polling: true });

// // Boshlang'ich salomlashuv
// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, `Assalomu alaykum, ${msg.from.first_name}! Orzu botga xush kelibsiz. Sizga qanday yordam bera olaman`);
// });

// // Matnli javoblar
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text.toLowerCase();

//   if (text.includes('salom')) {
//     bot.sendMessage(chatId, 'Salom! Yordam bera olishim mumkinmi?');
//   } else if (text.includes('xona')) {
//     bot.sendMessage(chatId, 'Bizda 3 xil xona mavjud: Standart, Deluxe, va Suite.');
//   } else if (!text.startsWith('/start')) {
//     bot.sendMessage(chatId, 'Siz yozgan so‘zni tushunmadim. Iltimos, savolingizni aniqlashtiring.');
//   }
// });

// console.log('ishladi')
// console.log( chatgpt_response('salom'))

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

  // Typing holatini ko‘rsatish
  bot.sendChatAction(chatId, "typing");

  if (text === "/start") return;

  if (text.toLowerCase()=="ии") {
    bot.sendMessage(
      chatId,
      "Интересная тема! Расскажи, как ты используешь ИИ в бизнесе? 💡"
    );
  } else if (text.toLowerCase()=="бизнес") {
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
