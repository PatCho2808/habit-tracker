const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const Habit = require('../models/habit');
const ObjectId = require('mongoose').Types.ObjectId;
const db = require('mongoose');
const { db_url } = require('../config');

chai.use(chaiHttp);

process.env.NODE_ENV = 'TEST';

const app = require('../app');

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjVlYzFlMzY0ZmYxNDMxZmRkNmE2MiIsInVzZXJuYW1lIjoidGVzdF92YWxpZCJ9.BiSwP6NA2qTNwnjFR43MhciGSqHArwMiMUBnUrSi2SM';
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjVlYzQxMzY0ZmYxNDMxZmRkNmE2MyIsInVzZXJuYW1lIjoidGVzdF9pbnZhbGlkIn0.8kIG_Bmxh9riLpeuJXZmmJQ45LPN5Jabdgw_XYHBzP0';

const validId = '5f65ec1e364ff1431fdd6a62';
const invalidId = '5f65ec41364ff1431fdd6a63';

describe('Habit', function(){
    describe('Get all', function () {

        before(async function () {
            try {
                await db.connect(db_url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                const habit1 = new Habit({
                    "name": "test1",
                    "weekdays": [0],
                    "userId": new ObjectId(validId)
                });
                await habit1.save();
                const habit2 = new Habit({
                    "name": "test2",
                    "weekdays": [0],
                    "userId": new ObjectId(validId)
                });
                await habit2.save();
                const habit3 = new Habit({
                    "name": "test3",
                    "weekdays": [0],
                    "userId": new ObjectId(invalidId)
                });
                await habit3.save();
            } catch (error) {
                console.error(error);
            }
        });

        after(async function () {
            await Habit.deleteMany({});
        });

        describe('without authorization', function () {
            it('should get an authorization error', function (done) {
                chai.request(app).get('/api/habits').end(function (err, res) {
                    res.should.have.status(401);
                    done(); 
                });
            });
        });

        describe('with authorization', function () {
            it('should get two habits', function (done) {
                chai.request(app)
                    .get('/api/habits')
                    .set('Authorization', `Bearer ${validToken}`)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        const habits = res.body;
                        habits.should.be.lengthOf(2);
                        done(); 
                    });
            });
        });
    });
    
    
    describe('Create new', function () {

        after(async function () {
            await Habit.deleteMany({});
        })

        describe('without authorization', function () {
            it('should get an authorization error', function (done) {
                chai.request(app).post('/api/habits').end(function (err, res) {
                    res.should.have.status(401);
                    done(); 
                });
            });
        });

        describe('without name', function () {
            it('should get an internal error', function (done) {
                chai.request(app)
                    .post('/api/habits')
                    .set('Authorization', `Bearer ${invalidToken}`)
                    .send({
                        "weekdays": ["Tuesday"]
                    })
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done(); 
                    });
            });
        });

        describe('without weekdays', function () {
            it('should get an internal error', function (done) {
                chai.request(app)
                    .post('/api/habits')
                    .set('Authorization', `Bearer ${invalidToken}`)
                    .send({
                        "name": "test_insert"
                    })
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done(); 
                    });
            });
        });

        describe('with authorization', function () {
            it('should insert one habit wihout any errors', function (done) {
                chai.request(app)
                    .post('/api/habits')
                    .set('Authorization', `Bearer ${validToken}`)
                    .send({
                        "name": "test_insert",
                        "weekdays": ["Tuesday"]
                    })
                    .end(function (err, res) {
                        res.should.have.status(200);
                        const body = res.body;
                        body.should.have.property('_id');
                        done(); 
                    });
            });
        });
    });
    
    
    describe('Get one by id', function () {

        beforeEach(async function () {
            try {
                await db.connect(db_url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                const habit = new Habit({
                    "name": "test",
                    "weekdays": [0],
                    "userId": new ObjectId(validId)
                });
                const savedHabit = await habit.save();
                this.currentTest.habitId = savedHabit.id;
            } catch (error) {
                console.error(error);
            }
        });

        afterEach(async function () {
            await Habit.findByIdAndDelete(this.currentTest.habitId);
        });
        
        describe('without authorization', function () {
            it('should get an authorization error', function (done) {
                chai.request(app)
                    .get(`/api/habits/${this.test.habitId}`)
                    .end(function (err, res) {
                        res.should.have.status(401);
                        done(); 
                    });
            });
        });

        describe('with wrong authorization', function () {
            it('should get an authorization error', function (done) {
                chai.request(app)
                    .get(`/api/habits/${this.test.habitId}`)
                    .set('Authorization', `Bearer ${invalidToken}`)
                    .end(function (err, res) {
                        res.should.have.status(401);
                        done(); 
                    });
            });
        });

        describe('with authorization', function () {
            it('should get one habit', function (done) {
                chai.request(app)
                    .get(`/api/habits/${this.test.habitId}`)
                    .set('Authorization', `Bearer ${validToken}`)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        const name = res.body.name;
                        name.should.be.equal('test');
                        done(); 
                    });
            });
        });
    });
    
    
    describe('Update', function () {

        beforeEach(async function () {
            try {
                await db.connect(db_url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                const habit = new Habit({
                    "name": "test",
                    "weekdays": [0],
                    "userId": new ObjectId(validId)
                });
                const savedHabit = await habit.save();
                this.currentTest.habitId = savedHabit.id;
            } catch (error) {
                console.error(error);
            }
        });

        afterEach(async function () {
            await Habit.findByIdAndDelete(this.currentTest.habitId);
        });

        describe('without authorization', function () {
            it('should get an authorization error', function (done) {
                chai.request(app).patch(`/api/habits/${this.test.habitId}`).end(function (err, res) {
                    res.should.have.status(401);
                    done(); 
                });
            });
        });

        describe('with wrong authorization', function () {
            it('should get an authorization error', function (done) {
                chai.request(app)
                    .patch(`/api/habits/${this.test.habitId}`)
                    .set('Authorization', `Bearer ${invalidToken}`)
                    .end(function (err, res) {
                        res.should.have.status(401);
                        done(); 
                    });
            });
        });

        describe('with authorization', function () {
            it('should update one habit', function (done) {
                chai.request(app)
                    .patch(`/api/habits/${this.test.habitId}`)
                    .set('Authorization', `Bearer ${validToken}`)
                    .send({
                        "dates": [new Date()]
                    })
                    .end(function (err, res) {
                        res.should.have.status(200);
                        const updatedHabit = res.body;
                        updatedHabit.dates.should.be.lengthOf(1);
                        updatedHabit.currentStreak.should.be.equal(1);
                        updatedHabit.longestStreak.should.be.equal(1);
                        done(); 
                    });
            });
        });
    });

    describe('Delete', function () {

        beforeEach(async function () {
            try {
                await db.connect(db_url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                const habit = new Habit({
                    "name": "test",
                    "weekdays": [0],
                    "userId": new ObjectId(validId)
                });
                const savedHabit = await habit.save();
                this.currentTest.habitId = savedHabit.id;
            } catch (error) {
                console.error(error);
            }
        });

        afterEach(async function () {
            await Habit.findByIdAndDelete(this.currentTest.habitId);
        });

        describe('without authorization', function () {
            it('should get an authorization error', function (done) {
                chai.request(app).delete(`/api/habits/${this.test.habitId}`).end(function (err, res) {
                    res.should.have.status(401);
                    done(); 
                });
            });
        });

        // describe('with wrong authorization', function () {
        //     it('should get an authorization error', function (done) {
        //         chai.request(app)
        //             .delete(`/api/habits/${this.test.habitId}`)
        //             .set('Authorization', `Bearer ${test_token}`)
        //             .end(function (err, res) {
        //                 res.should.have.status(401);
        //                 done(); 
        //             });
        //     });
        // });
        
        describe('with authorization', function () {
            it('should delete one habit', function (done) {
                chai.request(app)
                    .delete(`/api/habits/${this.test.habitId}`)
                    .set('Authorization', `Bearer ${validToken}`)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.lengthOf(0); 
                        done(); 
                    });
            });
        });
    });
}); 




