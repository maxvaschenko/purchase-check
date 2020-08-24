const puppeteer = require('puppeteer');
const TelegramBot = require('node-telegram-bot-api');
const token = '896518402:AAGCWG1DXShb9mte7f-qW4wqWFCYWtPuMmU';
const bot = new TelegramBot(token, {polling: true});

const checkTable = async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    const buttonSelector = '[data-product-id=S59324818] > .range-revamp-product__buy-module-container > .range-revamp-product__buy-module-content > .range-revamp-buy-module > .range-revamp-buy-module__buttons > .range-revamp-btn'
    const linkSelector = '.rec-added-to-cart__hero-link'

    await page.goto('https://www.ikea.com/ua/uk/p/skarsta-skarsta-stil-regulovaniy-biliy-s59324818/');
    await page.waitForSelector(buttonSelector, {visible: true, timeout: 30000})
    await page.waitFor(1000)
    await page.click(buttonSelector)
    await page.waitFor(1000)
    await page.click(linkSelector)
    await page.waitFor(1000)
    await page.click('#checkoutButtonTop')
    await page.waitFor(5000)
    if (await page.$('.message-error') === null) {
        bot.sendMessage('371859298',"exist");
    } else {
        bot.sendMessage('371859298',"nothing");
    }
    await browser.close();
};

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Checking availability...');
    checkTable()
});