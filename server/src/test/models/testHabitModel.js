process.env.NODE_ENV = 'TEST';

const chai = require('chai');
const should = chai.should();
const dateTime = require('chai-datetime');
const Habit = require('../../models/habit');
const ObjectId = require('mongoose').Types.ObjectId;
const db = require('mongoose');
const { db_url } = require('../../config');
const { update } = require('../../models/habit');

chai.use(dateTime);

const userId = '5f65ec1e364ff1431fdd6a62';

describe('habit model', function () {

    describe('habit with every day in weekday', function () {

        beforeEach(function () {
            let startDate = new Date();
            startDate.setDate(startDate.getDate() - 5);
            const habit = new Habit({
                "name": "test",
                "weekdays": [0, 1, 2, 3, 4, 5, 6],
                "userId": new ObjectId(userId),
                "startDate": startDate
            });
            this.currentTest.habit = habit;
        });

        describe('add done at', function () {
            it('should add date with zero time after midnight', function () {
                const date = new Date('Thu Sep 24 2020 14:45:35 GMT+0200');
                const zeroDate = new Date('Thu Sep 24 2020 00:00:00');
                this.test.habit.addDoneAt(date);
                this.test.habit.doneAtDates[0].should.be.equalTime(zeroDate);
            });
        });

        describe('update streaks', function () {

            it('should update current and longest streak to 4', function () {
                const dates = [];
                for (let i = 0; i < 4; i++) {
                    let newDate = new Date();
                    newDate.setDate(newDate.getDate() - i);
                    dates.push(newDate);
                }
                dates.forEach(date => this.test.habit.addDoneAt(date));
                this.test.habit.updateStreaks();
                this.test.habit.currentStreak.should.be.equal(4);
                this.test.habit.longestStreak.should.be.equal(4);
            });

        });
    });

    describe('habit with only monday and wednesday', function () {

        beforeEach(function () {
            let startDate = new Date();
            startDate.setDate(startDate.getDate() - 14);
            const habit = new Habit({
                "name": "test",
                "weekdays": [0, 3],
                "userId": new ObjectId(userId),
                "startDate": startDate
            });
            this.currentTest.habit = habit;
        });

        describe('update streaks to 2', function () {

            it('should update streak to 2', function () {
                const dates = [];
                let wednesdayDate = new Date();
                while (wednesdayDate.getDay() !== 4) {
                    wednesdayDate.setDate(wednesdayDate.getDate() - 1);
                }
                dates.push(wednesdayDate);
                let mondayDate = new Date(); 
                while (mondayDate.getDay() !== 1) {
                    mondayDate.setDate(mondayDate.getDate() - 1);
                }
                dates.push(mondayDate);
                dates.forEach(date => this.test.habit.addDoneAt(date));
                this.test.habit.updateStreaks();
                this.test.habit.currentStreak.should.be.equal(2);
                this.test.habit.longestStreak.should.be.equal(2);
            });
        })
    });
}); 