const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

process.env.NODE_ENV = 'TEST'; 

const app = require('../app');

describe('Habits', function () {
    describe('Get all', function () {
        describe('without authorization', function () {
            chai.request(app).get('/api/habits').end(function (err, res) {
                res.should.have.status(401);
            });
        });
        describe('with authorization', function () {
            chai.request(app)
            .get('/api/habits')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNThjNTNhNjhjMGIwMGU3YmRhMDIzZCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1OTk3MzE3MTR9.87l_mHRy-qyhXPTN4fDLbvRfdb8TW0MJq1qSdUGR5fI')
            .end(function (err, res) {
                //console.log(res); 
                res.should.have.status(200);
                const habits = res.body; 
                habits.should.be.lengthOf(1); 
            });
        });
    });
});

