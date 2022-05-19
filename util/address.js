const { networkInterfaces } = require('os')

const nets = networkInterfaces()
const results = {}

for(const name of Object.keys(nets)){
    for(const net of nets[name]){
        if(net.family === 'IPv4' && !net.internal){
            if(!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address)
        }
    }
}

// if(process.env.NODE_ENV === "production") module.exports = "https://mdc-robotics.herokuapp.com"
if(process.env.NODE_ENV === "production") module.exports = "http://" + Object.values(results)[0] + ":" + process.env.PORT
if(process.env.NODE_ENV === "development") module.exports = "http://" + Object.values(results)[0] + ":" + process.env.PORT