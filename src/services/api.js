const axios = require("axios")

const api = axios.create({
//    baseURL: "https://randomuser.me"
   
  baseURL: "https://ibm-members.herokuapp.com" 
   
})

module.exports = api