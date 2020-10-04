const getDateFromDateTime = date => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); 
    return newDate;
}

const getCurrentTime = () => {
    const today = getDateFromDateTime(new Date());
    return today.getTime();
};

const getCurrentDate = () => {
    return today = getDateFromDateTime(new Date());
};

const getTimeFromDateString = dateString => {
    const dateTime = new Date(dateString);
    const date = getDateFromDateTime(dateTime);
    return date.getTime();
};

const getCurrentWeekday = () => {
    return new Date().getDay();
};

const getDayOfWeek = date => {
    return (new Date(date).getDay() || 7) - 1; 
}

const getPrevDate = date => {
    let newDate = new Date(date); 
    newDate.setDate(newDate.getDate() - 1); 
    return newDate; 
};

const getAreDatesFromTimesOccurAfterEachOther = (first, second) => {
    const dateAfterSecond = new Date(second); 
    dateAfterSecond.setDate(dateAfterSecond.getDate() + 1);
    return dateAfterSecond.getTime() === first;    
}; 

const getPrevWeekday = (dateTime, weekdays) => {
    const date = getDateFromDateTime(dateTime); 
    let newDate = getPrevDate(date); 
    while(!weekdays.includes(getDayOfWeek(newDate))){
        newDate = getPrevDate(newDate); 
    }
    return newDate; 
}

module.exports = {
    getDateFromDateTime,
    getCurrentTime,
    getCurrentDate,
    getTimeFromDateString,
    getCurrentWeekday, 
    getCurrentWeekday,
    getDayOfWeek, 
    getPrevDate, 
    getAreDatesFromTimesOccurAfterEachOther,
    getPrevWeekday
}