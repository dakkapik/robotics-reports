const express = require("express")
module.exports = function (app) {
    const users = require("../routes/users")
    const reports = require("../routes/reports")
    const views = require("../routes/views")

    app.set('view engine', 'ejs')
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(express.static('public'))

    app.use("/users", users)
    app.use("/reports", reports)
    app.use("/", views)
}