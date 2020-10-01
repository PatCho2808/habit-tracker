process.env.NODE_ENV = 'TEST';

const chai = require('chai');
const should = chai.should();
const { getLastStreak } = require('../../services/streakService');

describe('streak service - getLastStreak', function () {

    describe('everyday', function () {

        it('should get 0 streak', function () {
            const dates = [
                new Date(2020, 0, 30),
                new Date(2020, 0, 20),
                new Date(2020, 0, 15)
            ];
            const weekdays = [0, 1, 2, 3, 4, 5, 6];
            const streak = getLastStreak(dates, weekdays);
            streak.should.be.equal(0);
        });

        it('should get 2 days streak', function () {
            const dates = [
                new Date('2020-01-30'),
                new Date('2020-01-29'),
                new Date('2020-01-15')
            ];
            const weekdays = [0, 1, 2, 3, 4, 5, 6];
            const streak = getLastStreak(dates, weekdays, new Date(dates[0]));
            streak.should.be.equal(2);
        });

        it('should get 10 days streak', function () {
            const dates = [
                new Date(2020, 0, 8),
                new Date(2020, 0, 7),
                new Date(2020, 0, 6),
                new Date(2020, 0, 5),
                new Date(2020, 0, 4),
                new Date(2020, 0, 3),
                new Date(2020, 0, 2),
                new Date(2020, 0, 1),
                new Date(2019, 11, 31),
                new Date(2019, 11, 30),
                new Date(2019, 11, 20),
                new Date(2019, 10, 1),
            ];
            const weekdays = [0, 1, 2, 3, 4, 5, 6];
            const streak = getLastStreak(dates, weekdays, dates[0]);
            streak.should.be.equal(10);
        });
    });

    describe('every monday and thursday', function () {

        it('should get 0 streak', function () {
            const dates = [
                new Date(2020, 8, 24),  
                new Date(2020, 8, 21), 
                new Date(2020, 8, 14)  
            ];
            const weekdays = [0, 3];
            const streak = getLastStreak(dates, weekdays, dates[0]);
            streak.should.be.equal(2);
        });

        it('should get 2 days streak', function () {
            const dates = [
                new Date(2020, 8, 24), //thursday
                new Date(2020, 8, 21), //monday 
                new Date(2020, 8, 14) //monday 
            ];
            const weekdays = [0, 3];
            const streak = getLastStreak(dates, weekdays, dates[0]);
            streak.should.be.equal(2);
        });

        it('should get 10 days streak', function () {
            const dates = [
                new Date(2020, 8, 24),
                new Date(2020, 8, 21),
                new Date(2020, 8, 17),
                new Date(2020, 8, 14),
                new Date(2020, 8, 10),
                new Date(2020, 8, 7),
                new Date(2020, 8, 3),
                new Date(2020, 7, 31),
                new Date(2020, 7, 27),
                new Date(2020, 7, 24),
                new Date(2020, 7, 17),
                new Date(2020, 7, 13),
            ];
            const weekdays = [0, 3];
            const streak = getLastStreak(dates, weekdays, dates[0]);
            streak.should.be.equal(10);
        });

    });

    describe('every wednesday', function () {

        it('should get 0 streak', function () {
            const dates = [
                new Date(2020, 8, 23),
                new Date(2020, 8, 9),
                new Date(2020, 7, 12)
            ];
            const weekdays = [2];
            const streak = getLastStreak(dates, weekdays);
            streak.should.be.equal(0);
        });

        it('should get 2 days streak', function () {
            const dates = [
                new Date(2020, 8, 23),
                new Date(2020, 8, 16),
                new Date(2020, 8, 2)
            ];
            const weekdays = [2];
            const streak = getLastStreak(dates, weekdays, dates[0]);
            streak.should.be.equal(2);
        });

        it('should get 10 days streak', function () {
            const dates = [
                new Date(2020, 8, 30),
                new Date(2020, 8, 23),
                new Date(2020, 8, 16),
                new Date(2020, 8, 9),
                new Date(2020, 8, 2),
                new Date(2020, 7, 26),
                new Date(2020, 7, 19),
                new Date(2020, 7, 12),
                new Date(2020, 7, 5),
                new Date(2020, 6, 29),
                new Date(2020, 6, 8),
                new Date(2020, 5, 17),
            ];
            const weekdays = [2];
            const streak = getLastStreak(dates, weekdays, dates[0]);
            streak.should.be.equal(10);
        });

    });
}); 