const setTimeToZero = date => {
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date; 
}

const getCurrentTime = () => {
    const today = new Date();
    today.setMilliseconds(0);
    today.setSeconds(0);
    today.setMinutes(0);
    today.setHours(0);
    return today.getTime();
};

module.exports = {
    setTimeToZero, 
    getCurrentTime
}