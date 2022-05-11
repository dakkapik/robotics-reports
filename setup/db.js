const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let url
switch(process.env.NODE_ENV){
    case "development" : url = 'mongodb://localhost:27017/MDC-robotics';
    case "production" : url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dab6a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}

mongoose.connect(url, {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('> MongoDB Connection Succeeded on ' + process.env.NODE_ENV + ' mode.')

    } else {
        console.log('Error in DB connection: ' + err)
    }
});
