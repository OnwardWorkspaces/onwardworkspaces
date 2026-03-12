let moment = require('moment');

// here what we select
// SUN = 0
// MON = 1
// TUE = 2
// WED = 3
// THU = 4
// FRI = 5
// SAT = 6
// * */5 * * *

// GENERAL FORMAT : YYYY-MM-DDTHH:MM:SS+X:Y
const getUTCDateformat = (inputDate) => {
    return moment.utc(inputDate).format();
}

const getCurrentUTCDateformat = () => {
    return moment.utc().format();
}

const getPresentDayIndex = () =>{
    let today = new Date();
    var currentDayInWeekNumber = today.getDay();
    return currentDayInWeekNumber ;
}

const getEvenDaysInWeekList = () => {
    return [0, 2, 4, 6]
}

const getOddDaysInWeekList = () => {
    return [1, 3, 5]
}

const isEvenDayOfWeek = () => {
    if(getEvenDaysInWeekList().indexOf(getPresentDayIndex()) > -1){
        return true;
    }
    else{
        return false;
    }
}

const getHumanReadableFormat = (date) => {
    return moment(date).format('DD MMMM YYYY');
}

const getLegacyHumanReadableFormat = (date) => {
    return moment(date).format('DD MMMM YYYY');
}

const getRankDateFormat = (date) => {
    return moment(date).format('YYYY-MM-DD');
}

// Function to get the tomorrow date
const getTomorrowDate = () => {
    const today = new Date()
    const tomorrow = new Date(today)

    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow;

}


exports.getUTCDateformat = getUTCDateformat;
exports.getCurrentUTCDateformat = getCurrentUTCDateformat;
exports.isEvenDayOfWeek = isEvenDayOfWeek;
exports.getOddDaysInWeekList = getOddDaysInWeekList;
exports.getEvenDaysInWeekList = getEvenDaysInWeekList;
exports.getPresentDayIndex = getPresentDayIndex;
exports.getHumanReadableFormat = getHumanReadableFormat;
exports.getLegacyHumanReadableFormat = getLegacyHumanReadableFormat;
exports.getRankDateFormat = getRankDateFormat;
exports.getTomorrowDate = getTomorrowDate;
