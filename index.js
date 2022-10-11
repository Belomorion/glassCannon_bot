
const TelegramApi = require('node-telegram-bot-api')
const cheerio =  require('cheerio')
const axios = require('axios')

const token = '5320021828:AAEofWZgbNVZsOXD68BbUvtFKkFPAW3obiE'

const parse = async () => {
    const getHTML = async (url) => {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }

    const $ = await getHTML('https://glasscannon.ru/')
    console.log($.html())
}




const bot = new TelegramApi(token, {polling: true})

bot.on('message',  msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/last') {
    const parse = async () => {
        const getHTML = async (url) => {
            const {data} = await axios.get(url)
            return cheerio.load(data)
        }
        const $ = await getHTML('https://glasscannon.ru/')
        // console.log($.html())

        const check1Title = $('div.articleTitle').eq(0).text()
        const check1Content = $('div.contentExcerpt').eq(0).text()
        const ref = $('a', '.articleTitle').eq(0).attr('href')

        bot.sendMessage(chatId, check1Title + check1Content + ref)
    }
    return parse()
} if (text === '/check') {
        const parse = async () => {
            const getHTML = async (url) => {
                const {data} = await axios.get(url)
                return cheerio.load(data)
            }
            const $ = await getHTML('https://glasscannon.ru/')
            // console.log($.html())

            const check1Title = $('div.articleTitle').eq(0).text()
            const check1Content = $('div.contentExcerpt').eq(0).text()
            const ref1 = $('a', '.articleTitle').eq(0).attr('href')
            const check2Title = $('div.articleTitle').eq(1).text()
            const check2Content = $('div.contentExcerpt').eq(1).text()
            const ref2 = $('a', '.articleTitle').eq(1).attr('href')
            const check3Title = $('div.articleTitle').eq(2).text()
            const check3Content = $('div.contentExcerpt').eq(2).text()
            const ref3 = $('a', '.articleTitle').eq(2).attr('href')

            bot.sendMessage(chatId, check3Title + check3Content + ref3)
            bot.sendMessage(chatId, check2Title + check2Content + ref2)
            bot.sendMessage(chatId, check1Title + check1Content + ref1)
        }
        return parse()
    }

})

