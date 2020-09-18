const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const Habit = require('../models/habit');

chai.use(chaiHttp);

process.env.NODE_ENV = 'TEST';

const app = require('../app');
const { deleteOne } = require('../models/habit');

describe('Habits', function () {
    describe('Get all', function () {
        describe('without authorization', function () {
            it('should get an authorization error', function () {
                chai.request(app).get('/api/habits').end(function (err, res) {
                    res.should.have.status(401);
                });
            });
        });
        describe('with authorization', function () {
            it('should get one habit', function () {
                chai.request(app)
                    .get('/api/habits')
                    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNThjNTNhNjhjMGIwMGU3YmRhMDIzZCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1OTk3MzE3MTR9.87l_mHRy-qyhXPTN4fDLbvRfdb8TW0MJq1qSdUGR5fI')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        const habits = res.body;
                        habits.should.be.lengthOf(1);
                    });
            });
        });
    });
    describe('Create new', function () {
        describe('without authorization', function () {
            it('should get an authorization error', function () {
                chai.request(app).post('/api/habits').end(function (err, res) {
                    res.should.have.status(401);
                });
            });
        });
        describe('without name', function () {
            it('should get an internal error', function () {
                chai.request(app)
                    .post('/api/habits')
                    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjQ2NDU4ZWJlNmUxMmZlYTYyMzAxMSIsInVzZXJuYW1lIjoidGVzdF9pbnNlcnQiLCJpYXQiOjE2MDA0MTQ4MDh9.hrnlpfklD4sLMZL8CPw6Fg414a8AzxHL9py4_NwfRYE')
                    .send({
                        "weekdays": ["Tuesday"]
                    })
                    .end(function (err, res) {
                        res.should.have.status(500);
                    });
            });
        });
        describe('without weekdays', function () {
            it('should get an internal error', function () {
                chai.request(app)
                    .post('/api/habits')
                    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjQ2NDU4ZWJlNmUxMmZlYTYyMzAxMSIsInVzZXJuYW1lIjoidGVzdF9pbnNlcnQiLCJpYXQiOjE2MDA0MTQ4MDh9.hrnlpfklD4sLMZL8CPw6Fg414a8AzxHL9py4_NwfRYE')
                    .send({
                        "name": "test_insert"
                    })
                    .end(function (err, res) {
                        res.should.have.status(500);
                    });
            });
        });
        describe('with authorization', function () {
            it('should insert one habit wihout any errors', function () {
                chai.request(app)
                    .post('/api/habits')
                    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjQ2NDU4ZWJlNmUxMmZlYTYyMzAxMSIsInVzZXJuYW1lIjoidGVzdF9pbnNlcnQiLCJpYXQiOjE2MDA0MTQ4MDh9.hrnlpfklD4sLMZL8CPw6Fg414a8AzxHL9py4_NwfRYE')
                    .send({
                        "name": "test_insert",
                        "weekdays": ["Tuesday"]
                    })
                    .end(function (err, res) {
                        res.should.have.status(200);
                        const body = res.body;
                        body.should.have.property('_id');
                    });
            });
        });
    });
    // describe('Get by id', function () {
    //     describe('without authorization', function () {
    //         chai.request(app).post('/api/habits').end(function (err, res) {
    //             res.should.have.status(401);
    //         });
    //     });
    //     describe('with authorization', function () {
    //         chai.request(app)
    //             .post('/api/habits')
    //             .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjQ2NDU4ZWJlNmUxMmZlYTYyMzAxMSIsInVzZXJuYW1lIjoidGVzdF9pbnNlcnQiLCJpYXQiOjE2MDA0MTQ4MDh9.hrnlpfklD4sLMZL8CPw6Fg414a8AzxHL9py4_NwfRYE')
    //             .send({
    //                 "name": "test_insert",
    //                 "weekdays": ["Tuesday"]
    //             })
    //             .end(function (err, res) {
    //                 res.should.have.status(200);
    //                 const body = res.body;
    //                 body.should.have.property('_id');
    //             });
    //     });
    // });
});

