process.env.NODE_ENV = 'TEST';

const chai = require('chai');
const should = chai.should();
const dateTime = require('chai-datetime'); 
const Habit = require('../../models/habit');
const ObjectId = require('mongoose').Types.ObjectId;
const db = require('mongoose');
const { db_url } = require('../../config');
const habitService = require('../../services/habitService');

chai.use(dateTime); 

const userId = '5f65ec1e364ff1431fdd6a62';

describe('habitService', function () {

    beforeEach(async function () {
        try {
            await db.connect(db_url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            const habit = new Habit({
                "name": "test",
                "weekdays": [0, 1, 2, 3, 4, 5, 6],
                "userId": new ObjectId(userId), 
                "startDate": new Date('Mon Sep 21 2020 13:31:16')
            });
            this.currentTest.habit = await habit.save();
        } catch (error) {
            console.error(error);
        }
    });

    afterEach(async function () {
        await Habit.deleteMany({});
    });

    describe('updateHabit', function () {

        describe('invalid', function () {

        });

        describe('valid', function () {

            it('should update name', async function () {
                const updatedHabit = await habitService.updateHabit(this.test.habit, { "name": "updated name" });
                updatedHabit.name.should.be.equal('updated name');

            });

            it('should update start date ', async function () {
                const date = new Date('Thu Sep 24 2020 13:24:14 GMT+0200'); 
                const updatedHabit = await habitService.updateHabit(this.test.habit, { "startDate": date });
                updatedHabit.startDate.should.be.equalTime(date);

            });

            it('should update weekdays ', async function () {
                const updatedHabit = await habitService.updateHabit(this.test.habit, { "weekdays": ["Tuesday"] });
                updatedHabit.weekdays.should.be.deep.equal([1]);

            });

            it('should add reward ', async function () {
                const updatedHabit = await habitService.updateHabit(this.test.habit, { "rewards": [{ "name": "reward", "requiredStreak": 2 }] });
                updatedHabit.rewards.should.be.lengthOf(1); 
                updatedHabit.rewards[0].name.should.be.equal('reward'); 
                updatedHabit.rewards[0].requiredStreak.should.be.equal(2); 
            });

            it('should add date', async function () {
                const dates = [new Date('Mon Sep 21 2020 13:31:16'), new Date('Wed Sep 23 2020 13:31:16 GMT+0200')]; 
                const updatedHabit = await habitService.updateHabit(this.test.habit, { "dates": dates });
                updatedHabit.doneAtDates.should.be.lengthOf(2); 
                updatedHabit.doneAtDates[1].should.be.equalTime(new Date('Mon Sep 21 2020 00:00:00'));
                updatedHabit.doneAtDates[0].should.be.equalTime(new Date('Wed Sep 23 2020 00:00:00'));
            });
        });
    });
});

