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

const getDateFromDateString = dateString => {
    const date = new Date(dateString);
    const zeroDate = getDateFromDateTime(date);
    return zeroDate.getTime();
};

const getCurrentWeekday = () => {
    return new Date().getDay();
};

const getDayOfWeek = date => {
    return (new Date(date).getDay() || 7) - 1; 
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
    console.log('co jest'); 
    let newDate = getPrevDate(getDateFromDateTime(date)); 
    console.log('new date: ', newDate); 
    while(!weekdays.includes(getDayOfWeek(newDate))){
        newDate = getPrevDate(newDate); 
    }
    return newDate; 
}

module.exports = {
    getDateFromDateTime,
    getCurrentTime,
    getCurrentDate,
    getDateFromDateString,
    getCurrentWeekday, 
    getCurrentWeekday,
    getDayOfWeek, 
    getPrevDate, 
    getAreDatesFromTimesOccurAfterEachOther,
    getPrevWeekday
}