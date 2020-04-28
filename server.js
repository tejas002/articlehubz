const express = require('express')


const app = express()


// define port
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('The application is up and running on port ', port)
})


