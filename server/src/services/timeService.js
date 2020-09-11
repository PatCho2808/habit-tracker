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

const getZeroTimeFromDateString = dateString => {
    const date = new Date(dateString); 
    const zeroDate = setTimeToZero(date); 
    return zeroDate.getTime(); 
}

module.exports = {
    getCurrentTime,
    getZeroTimeFromDateString
}