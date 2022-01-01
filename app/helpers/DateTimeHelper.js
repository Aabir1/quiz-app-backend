const moment = require('moment');
var microtime = require('microtime')

let DateTimeHelper = {};

DateTimeHelper.DAY_SUNDAY = 7;

DateTimeHelper.DAYS = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday'
};


DateTimeHelper.getTimeDifference = (fromTime, toTime) => {
    // start time and end time
    var startTime = moment(fromTime, "HH:mm:ss a");
    var endTime = moment(toTime, "HH:mm:ss a");

    // calculate total duration
    var duration = moment.duration(endTime.diff(startTime));

    // duration in hours
    var hours = parseInt(duration.asHours());

    // duration in minutes
    var minutes = parseInt(duration.asMinutes()) % 60;

    return {
        hours: hours,
        minutes: minutes
    }
}

DateTimeHelper.addTime = (fromTime, time) => {

    let momentTime = moment(fromTime, "HH:mm:ss a");

    const newTime = momentTime.add(time.hours, 'hours').add(time.minutes, 'minutes');

    const hours = (newTime.hours().toString().length == 1) ? ('0' + newTime.hours().toString()) : newTime.hours();
    const minutes = (newTime.minutes().toString().length == 1) ? ('0' + newTime.minutes().toString()) : newTime.minutes();
    const seconds = (newTime.seconds().toString().length == 1) ? ('0' + newTime.seconds().toString()) : newTime.seconds();


    return [hours, minutes, seconds].join(':');
}

DateTimeHelper.getWeekday = (date) => {
    let momentDate = moment(date);
    return (momentDate.day() == 0) ? DateTimeHelper.DAY_SUNDAY : momentDate.day();
}

DateTimeHelper.getDisplayTime = (datetime, timeStamp = false) => {
    if (timeStamp) {
        datetime = new Date(datetime * 1000);
    }

    let momentDate = moment(datetime);

    return momentDate.fromNow();
}

DateTimeHelper.getDisplayDate = (datetime, timeStamp = false) => {
    if (timeStamp) {
        datetime = new Date(datetime * 1000);
    }

    let momentDate = moment(datetime);

    return momentDate.format('dddd, Do MMMM YYYY');
}


DateTimeHelper.setDisplayTime = (data, fieldName = 'created_at', isSquelize = false, timeStamp = false) => {

    let result = [];

    if (data.length) {
        data.map((single) => {
            let childData = { ...single };
            childData.displayTime = DateTimeHelper.getDisplayTime(childData[fieldName], timeStamp);
            result.push(childData);
        });
    }

    return result;
}

DateTimeHelper.formatTime = (time, currentFormat = 'hh:mm:ss') => {
    return moment(time, currentFormat).format('HH:mm A');
}

DateTimeHelper.dateOnly = (date) => {
    return moment(date).format('YYYY-MM');
}

DateTimeHelper.formatDate = (date) => {
    return moment(date).format('LL');
}

DateTimeHelper.getLocalDateTime = (format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(new Date()).utcOffset("+05:30").format(format)
}

DateTimeHelper.isToday = (date) => {
    return moment(date).isSame(new Date(), "day") ? true : false;
}

DateTimeHelper.isGreater = (date, fromDate = DateTimeHelper.getLocalDateTime(), onlyDate = false) => {
    fromDate = onlyDate ? DateTimeHelper.formatDate(fromDate) : fromDate;
    date = onlyDate ? DateTimeHelper.formatDate(date) : date;
    return (moment(date).diff(fromDate) > 0) ? true : false;
}

DateTimeHelper.getMonthYear = (date) => {
    return moment(date).format('YYYY-MM');
}

DateTimeHelper.getMicrotime = () => {

    var dateData = microtime.nowStruct(false);
    const first = dateData[0].toString();
    const second = dateData[1].toString();
    let result = first + second;

    if (result && result.length == 16) {
        result = result.replace(/\d{1}$/, '');
    }

    return result;
}

DateTimeHelper.getTimeWithCondition = (minutes = 0, optioration = '+') => {
    const currentDate = new Date();
    return new Date(currentDate.getTime() + minutes * 60000).getTime();
}

DateTimeHelper.getDateWithCondition = (date, days, format = 'YYYY-MM-DD', optioration = '+') => {
    return moment(date, format).add(days, 'days').format(format);
}

module.exports = DateTimeHelper;