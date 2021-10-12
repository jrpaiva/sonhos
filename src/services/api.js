const axios = require("axios")

const api = axios.create({
   baseURL: "https://randomuser.me" 
})

module.exports = api