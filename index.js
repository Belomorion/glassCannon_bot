
const TelegramApi = require('node-telegram-bot-api')
const cheerio =  require('cheerio')
const axios = require('axios')

const token = '5320021828:AAEofWZgbNVZsOXD68BbUvtFKkFPAW3obiE'
const channelID = '-1001693424827'
const adminID = '386466433'
let arrOld = []
let arrNew = []
let arr = []

const formation = (text) => {
    return "<b>" + text + "</b>"
}

const bot = new TelegramApi(token, {polling: true})

bot.on('message',  msg => {
    const text1 = msg.text
    const chatID = msg.chat.id

    if (text1 === '/last' && chatID == adminID) {
    const parse = async () => {
        const getHTML = async (url) => {
            const {data} = await axios.get(url)
            return cheerio.load(data)
        }
        const $ = await getHTML('https://glasscannon.ru/')
        arr = [$('div.articleTitle').eq(0).text(), $('div.contentExcerpt').eq(0).text(), $('a', '.articleTitle').eq(0).attr('href')]

        const check1Title = $('div.articleTitle').eq(0).text()
        const check1Content = $('div.contentExcerpt').eq(0).text()
        const ref = $('a', '.articleTitle').eq(0).attr('href')
        console.log($('div.articleTitle').eq(0).text().replace(/[\n\t]+/g,"") + $('div.contentExcerpt').eq(0).text().replace(/[\n\t]+/g,"") + $('a', '.articleTitle').eq(0).attr('href'))
        bot.sendMessage(chatID, '<b>' + $('div.articleTitle').eq(0).text().replace(/[\t]+/g,"") + '</b>' + $('div.contentExcerpt').eq(0).text().replace(/[\t]+/g,"") + $('a', '.articleTitle').eq(0).attr('href').replace(/[\t]+/g,""), { parse_mode: "HTML" })
    }
    return parse()
}
})


bot.on('message',  msg => {
    const text = msg.text
    const chatID = msg.chat.id
    if (text === '/looking' && chatID == adminID) {
        const parse1 = async () => {
            const getHTML = async (url) => {
                const { data } = await axios.get(url)
                return cheerio.load(data)
            }
            const $ = await getHTML('https://glasscannon.ru/')
            console.log($.html())
            arrNew = [$('div.articleTitle').eq(0).text(), $('div.contentExcerpt').eq(0).text(), $('a', '.articleTitle').eq(0).attr('href')]
            setTimeout(checkAndSendNew, 10000)
        }
        const checkAndSendNew = () => {
            if (arrOld[0] !== arrNew[0] && arrOld[1] !== arrNew[1] && arrOld[2] !== arrNew[2] && arrOld !== []) {
                bot.sendMessage(channelID,  '<b>' + arrNew[0].replace(/[\t]+/g,"") + '</b>' + arrNew[1].replace(/[\t]+/g,"") + arrNew[2].replace(/[\t]+/g,""), { parse_mode: "HTML" })
                arrOld = []
                arrOld = [arrNew[0],arrNew[1],arrNew[2]]
             setTimeout(parse1, 10000)
            } else if (arrOld === []) {
                arrOld = []
                arrOld = [arrNew[0],arrNew[1],arrNew[2]]
            } else {
                setTimeout(parse1, 10000)
            }
        }
        return parse1()
    }
})
