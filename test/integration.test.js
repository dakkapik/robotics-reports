const express = require("express");
const app = express();
const users = require("../routes/users");
const reports = require("../routes/reports");

require("./db")

app.use(users);
app.use(reports);

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();

chai.use(chaiHttp);

describe('USER API', () => {
    
    beforeEach((done)=>{
        User.deleteMany({}, (err)=>{done();})
    });

    after((done)=>{
        User.deleteMany({}, (err)=>{done();})
    });

    describe("/GET ", ()=>{

        it("should GET empty array", (done)=>{
            chai.request(app)
                .get("/users")
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                })
                done();
        });
    });

})