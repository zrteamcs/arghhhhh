let fs = require('fs') 
let chalk = require('chalk')
let moment = require('moment-timezone')

// Waktu
let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wktuwib = `${wibh}:${wibm}:${wibs}`

// Hari Tanggal
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

// Owner
global.owner = [
  ['6283137550315'],
  ['6283137550315'],
  ['6283137550315', 'DannLonely', 'danigtps@gmail.com', true]
] // Put your number here
global.mods = ['6283137550315'] // Moderator
global.prems = ['6283137550315'] // Premium
global.APIs = { // API Prefix
  // name: 'https://website'
  dannteam: 'https://api.dannteam.com'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.dannteam.com': 'DannTeam'
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const spack = fs.readFileSync("lib/exif.json")
const stickerpack = JSON.parse(spack)
if (stickerpack.spackname == '') {
  var sticker_name = 'Dann-MD\n\nOwner: +62 831-3755-0315'
  var sticker_author = 'DannTeam'
} else {
  var sticker_name = stickerpack.spackname
  var sticker_author = stickerpack.sauthor
}

const file_exif = "lib/exif.json"
fs.watchFile(file_exif, () => {
  fs.unwatchFile(file_exif)
  console.log(chalk.redBright("Update 'exif.json'"))
  delete require.cache[file_exif]
  require('./lib/exif.json')
})

// Database
global.version = 'BETA'
global.sessionName = 'Dann'
global.gcbot = 'https://chat.whatsapp.com/KsflYNKrlNP1BnLMKHyulz'
global.instagram = 'https://instagram.com/dannalwaysalone'
global.namebot = 'Dann-MD Rpg PlayGround\'s'
global.thumb = 'https://telegra.ph/file/96d00335b194ad6bf97c2.jpg'
global.thumbnail = 'https://telegra.ph/file/96d00335b194ad6bf97c2.jpg'
global.qris = 'https://telegra.ph/file/ce0037b2c2bb2ded15e40.jpg'
global.nomorown = '6283137550315'

// Sosial Media
global.sig = 'https://instagram.com/dannalwaysalone'
global.syt = 'https://youtube.com/@dannofficials'
global.sgh = 'https://github.com/DannOfficial'
global.sgc = 'https://chat.whatsapp.com/KsflYNKrlNP1BnLMKHyulz'
global.swa = 'https://wa.me/+6283137550315'
global.swb = 'https://discord.gg/dannrpg' // Link Discord
global.snh = 'https://nhentai.net/g/365296/' // Link nhentai

// Pembayaran
global.pdana = '6283137550315'
global.povo = '6283137550315'
global.pgopay = '6283137550315'
global.pulsa = '6283137550315'
global.pulsa2 = '62895342959060'
global.psaweria = 'https://saweria.co/DannXD'
global.ptrakteer = 'https://trakteer.id/DannXD'
global.psbuzz = 'https://socialbuzz.com/DannXD'

// Fake Size
global.fsizedoc = '99999999999999' // default 10TB
global.fpagedoc = '999'

global.useMulti = false

// Watermark
global.packname = sticker_name
global.author = sticker_author
global.wm = '2023 © Dann-MD'
global.wm2 = 'Dann\'s'
global.bottime = `Time: ${wktuwib}`
global.botdate = `Date: ${week} ${date}\nTime: ${wktuwib}`
global.titlebot = `${global.wm}`
global.danied = '✘ 𝗘𝗥𝗥𝗢𝗥 𝟰𝟬𝟰'
global.packname = sticker_name
global.author = sticker_author
global.nameown = 'DannTeam'
global.wait = 'Tunggu Sebentar...'

// Tampilan
global.htki =  '⬣───「' // Hiasan kiri
global.htka = '」───⬣' // Hiasan kanan
global.htjava = '•' // Hiasan
global.sa = '╭─'
global.gx = '│✇'
global.gy = '│•'
global.gz = '│'
global.sb = '╰────࿐'
global.kki = '「'
global.kka = '」'
global.zt = '*'
global.zc = ''

global.multiplier = 1000 // The higher, The harder levelup

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      trash: '🗑',
      armor: '🥼',
      sword: '⚔️',
      wood: '🪵',
      rock: '🪨',
      string: '🕸️',
      horse: '🐎',
      cat: '🐈' ,
      dog: '🐕',
      fox: '🦊',
      petFood: '🍖',
      iron: '⛓️',
      gold: '👑',
      emerald: '💚'
    }
    let results = Object.keys(emot).map(v =>vv [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})