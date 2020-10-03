const { getPrevWeekday, getDayOfWeek, getCurrentDate } = require('./timeService');

const getLastStreak = (sortedDates, weekdays, startDate = new Date()) => {
    console.log(sortedDates); 
    let streak = 0;
    let dateIndex = 0;
    let lastDate = sortedDates[dateIndex];
    let lastWeekday;

    if (weekdays.includes(getDayOfWeek(startDate))) {
        lastWeekday = startDate; 
    } else {
        lastWeekday = getPrevWeekday(new Date(startDate), weekdays);
    }

    console.log(lastDate, lastWeekday); 
    while (lastDate && lastDate.getTime() === lastWeekday.getTime()) {
        streak++;
        lastWeekday = getPrevWeekday(lastWeekday, weekdays);
        lastDate = sortedDates[++dateIndex];
    }

    return streak;
}


module.exports = {
    getLastStreak
}; 