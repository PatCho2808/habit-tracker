process.env.NODE_ENV = 'TEST';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const db = require('mongoose');
const User = require('../../models/user');
const { db_url } = require('../../config');
const app = require('../../app');

chai.use(chaiHttp);

describe('Auth', function () {

    describe('signup', function () {

        after(async function () {
            await User.deleteOne({ "username": "test" });
        });

        it('should create a new user', function (done) {
            chai.request(app)
                .post('/api/auth/signup')
                .send({
                    "username": "test",
                    "password": "testtest"
                })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.token.should.not.be.undefined;
                    done();
                });
        });
    });

    describe('login', function () {

        before(async function () {
            await db.connect(db_url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            const user = new User({
                "username": "test",
                "password": "testtest"
            });
            await user.save();
        });

        after(async function () {
            await User.deleteOne({ "username": "test" });
        });


        it('should succesfully log in', function (done) {
            chai.request(app)
                .post('/api/auth/login')
                .send({
                    "username": "test",
                    "password": "testtest"
                })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.token.should.not.be.undefined;
                    done();
                });
        });
    });
});


