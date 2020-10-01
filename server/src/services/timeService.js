const setTimeToZero = date => {
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date;
}

const getCurrentTime = () => {
    const today = setTimeToZero(new Date());
    return today.getTime();
};

const getCurrentDate = () => {
    return today = setTimeToZero(new Date());
};

const getZeroTimeFromDateString = dateString => {
    const date = new Date(dateString);
    const zeroDate = setTimeToZero(date);
    return zeroDate.getTime();
};

const getCurrentWeekday = () => {
    return new Date().getDay();
};

const getDayOfWeek = date => {
    return (date.getDay() || 7) - 1; 
}

const getPrevDate = date => {
    let newDate = date; 
    date.setDate(newDate.getDate() - 1); 
    return date; 
};

const getAreDatesFromTimesOccurAfterEachOther = (first, second) => {
    const dateAfterSecond = new Date(second); 
    dateAfterSecond.setDate(dateAfterSecond.getDate() + 1);
    return dateAfterSecond.getTime() === first;    
}; 

const getPrevWeekday = (date, weekdays) => {
    let newDate = getPrevDate(date); 
    while(!weekdays.includes(getDayOfWeek(newDate))){
        newDate = getPrevDate(newDate); 
    }
    return newDate; 
}

module.exports = {
    getCurrentTime,
    getCurrentDate,
    getZeroTimeFromDateString,
    getCurrentWeekday, 
    getCurrentWeekday,
    getDayOfWeek, 
    getPrevDate, 
    getAreDatesFromTimesOccurAfterEachOther,
    getPrevWeekday
}