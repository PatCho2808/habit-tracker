process.env.NODE_ENV = 'TEST';

const chai = require('chai');
const should = chai.should();
const timeService = require('../../services/timeService');

describe('Time service', function () {
    describe('get date from dateTime', function () {

        const tests = [
            {
                date: new Date(), expected: {
                    day: new Date().getDate(),
                    month: new Date().getMonth(),
                    year: new Date().getFullYear()
                }
            },
            {
                date: new Date(2020, 1, 14, 15, 15, 30, 23), expected: {
                    day: 14,
                    month: 1,
                    year: 2020
                }
            },
            {
                date: new Date("Sat Apr 04 2020 12:30:15"), expected: {
                    day: 4,
                    month: 3,
                    year: 2020
                }
            },
        ]

        tests.forEach(function (test) {
            it('should set time to zero', function () {
                let res = timeService.getDateFromDateTime(test.date);
                res.getDate().should.be.equal(test.expected.day);
                res.getMonth().should.be.equal(test.expected.month);
                res.getFullYear().should.be.equal(test.expected.year);
                res.getHours().should.be.equal(0);
                res.getMinutes().should.be.equal(0);
                res.getSeconds().should.be.equal(0);
            });
        })
    });

    describe('get date from dateString', function () {

        tests = [
            {
                date: 'Sat Oct 03 2020', expected: {
                    day: 3,
                    month: 9,
                    year: 2020
                }
            },
            {
                date: 'Mon Dec 14 2020', expected: {
                    day: 14,
                    month: 11,
                    year: 2020
                }
            }, {
                date: 'Wed Mar 13 2019', expected: {
                    day: 13,
                    month: 2,
                    year: 2019
                }
            }, {
                date: 'Sun May 30 2021', expected: {
                    day: 30,
                    month: 4,
                    year: 2021
                }
            },
        ]

        tests.forEach(function (test) {
            it('should return date', function () {
                let res = new Date(timeService.getTimeFromDateString(test.date));
                res.getDate().should.be.equal(test.expected.day);
                res.getMonth().should.be.equal(test.expected.month);
                res.getFullYear().should.be.equal(test.expected.year);
                res.getHours().should.be.equal(0);
                res.getMinutes().should.be.equal(0);
                res.getSeconds().should.be.equal(0);
            })});

})
}); 