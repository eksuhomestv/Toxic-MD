const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib051TERQdW5McUVndUhPWDBJYjNIRlptTVBJdE5YTjJSZ2lHMVFxNUFuWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOUJvYlhGeHJ2ZEJlUG5YUTdZNmlLUjhrRUhkeERMVjlyVHlnUzNaUHZnQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSjhRMG1oMm1NcFNUcUl4MldFaVBCUlBIenU0WTNCSTJvNHZJSmVOTWt3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOYnZrTnN3aWhmZWV0c25xQTh2MEVKTnVtNHFvSEVMRkRJVDhTYTBab1JrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVIODZqQXpkKzJyTFN4RC9OWk5KMHJtOU5qR3Z4L3hPTWxhYVAyT2tDM009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1lS3J1aXBleFBUWmlSU2ptb1pySXFWdlZqdldyRU9JUkJsbS9ZTVFlblU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVBmNnpaUHZpZHFYelIxUVVJdFd2UFhjSDlTa2hid0VkeWpNUWdmNVQwND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNXY3SE5MendCK1NtSFdtM0lENEQxdWxvNkRhN1dBbWpFNFdmOWpSbUtoND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InI5MnZHMHAveDAyRTdDMk0xM3QwRGtkUGVTaVZtRjhKS1pDN1BpdjlDZjlJajRLYThHQ0UrWm5vRTNKV0hBTGkrZ2JOQmsvQVNrWUVuWHhFMUNtYUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ3LCJhZHZTZWNyZXRLZXkiOiJxOGNySWM0ZERQM21FZGIzZmxzemJkem5UMFl5VExoUXRwL1lQZVNsdGM0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4ODUzMzE4MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzODk2ODc1MDQ4RjQwRTI5MTY3MzZCRUJBN0E5OTQ2RSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyMTA3NzMwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODg1MzMxODFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjhCRDBBNkE0MTY3QTdBQjFDRUE0QzY2RkFFMzcxNzcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjEwNzczNH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiR3E4bGxuSUlUSGU2QXlMbDVyOURZUSIsInBob25lSWQiOiI1NjM0N2NiYS1mOGYxLTQ0NDctOGI5ZC1jNzIyYjEyYTA1ZDYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidTlFclM0N0tpcndxVFI5NUJxZ0NrbGVkRm9nPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBMczNKZDIvZUgzelZjdS9YY3lLdkVLVnJTUT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJBQkNEMTIzNCIsIm1lIjp7ImlkIjoiMjYzNzg4NTMzMTgxOjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiVGNyb25lYiBIYWNreCIsImxpZCI6IjI2NjU3MTk5Mzg1ODA3OTozQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWVXNitRQ0VMV1Z2TU1HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZE01a0NUVFRKNm82QUgxZFBUcnIrUUF3SmR6dVg0Wlo1VTg4NmsrRFJDZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQTNIaHVYK2JqWG5qMWc1dXhHTWY3U1dDWUM2TUpnU1FaR0NVVkNBNHlJSmIxN1NITWwzdytncC9vNlMwbFF2WnhDTHduWmZBb0o4WEx0c3lvRWRDQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6ImpVbjlnamlyYXhaSVpMZ3VvRzU4ZlFESk4xaDZQY1VuempkUVN4aXo2WnlGRC93SVA3V0sxTDlYM3FXbkFjNGVUQjVYc2pPYkM0YTdsdVVqemVHYUFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg4NTMzMTgxOjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWFRPWkFrMDB5ZXFPZ0I5WFQwNjYva0FNQ1hjN2wrR1dlVlBQT3BQZzBRbyJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUyMTA3NzE0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUV1OSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Tcroneb Hackx",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263788533181",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
