const { default: mongoose, connect } = require("mongoose")
const dns = require("node:dns")
require("dotenv").config()

dns.setServers([
    '1.1.1.1',
   '8.8.8.8'
])

dns.setDefaultResultOrder("ipv4first")

const connectDB = async()=>{
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB CONNECTION SUCCESS : ${conn.connection.name}`)
    } catch (error) {
        console.log(`DB CONNECTION FAILD`, error.message)
    }
}

module.exports = connectDB