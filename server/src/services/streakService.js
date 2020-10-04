const { getPrevWeekday, getDayOfWeek, getDateFromDateTime } = require('./timeService');

const getLastStreak = (sortedDates, weekdays, startDate = new Date()) => {
    let streak = 0;
    let dateIndex = 0;
    let lastDate = sortedDates[dateIndex];
    let lastWeekday;

    if (weekdays.includes(getDayOfWeek(startDate))) {
        lastWeekday = getDateFromDateTime(startDate); 
    } else {
        lastWeekday = getPrevWeekday(new Date(startDate), weekdays);
    }

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