function composeical(data) {
    var timezone = 'Asia/Hong_Kong';
    console.debug('Composing iCalContent');
    // For the difficulty of determining the real start date of each day, we use a unified start
    // date, yet set Monday into the exceptions of the classes that take in other days to cover most cases
    if (data['daysOfWeek'] != "MO") {
        var exdate = 'EXDATE;TZID=' + timezone + ':' + getDateTimeString(data['startDate'], data['startTime']) + '\r\n'
    } else {
        var exdate = ''
    }
    var iCalContent =
        'BEGIN:VEVENT\r\n' +
        'DTSTART;TZID=' + timezone + ':' + getDateTimeString(data['startDate'], data['startTime']) + '\r\n' +
        //'DTSTART;TZID=' + timezone + ':' + startDateString + 'T' + getTimeString(startTime) + '\r\n' +
        'DTEND;TZID=' + timezone + ':' + getDateTimeString(data['startDate'], data['endTime']) + '\r\n' +
        //'DTEND;TZID=' + timezone + ':' + startDateString + 'T' + getTimeString(endTime) + '\r\n' +
        'LOCATION:' + data['room'] + '\r\n' +
        'RRULE:FREQ=WEEKLY;UNTIL=' + getDateTimeString(data['endDate'], data['endTime']) + 'Z;BYDAY=' + data['daysOfWeek'] + '\r\n' +
        //'RRULE:FREQ=WEEKLY;UNTIL=' + endDateString + 'T' + getTimeString(endTime) + 'Z;BYDAY=' + daysOfWeek + '\r\n' +
        exdate +
        //'EXDATE;TZID=' + timezone + ':' + startDateString + 'T' + getTimeString(startTime) + '\r\n' +
        'SUMMARY:' + data['courseCode'] + '(' + data['component'] + ')\r\n' +
        'DESCRIPTION:' +
        'Course Name: ' + data['courseName'] + '\r\n' +
        'Section: ' + data['section'] + '\r\n' +
        'Instructor: ' + data['instructor'] + '\r\n' +
        'Component: ' + data['component'] + '\r\n' +
        'Class Number: ' + data['classNumber'] + '\r\n' +
        'Days/Times: ' + data['daysTimes'] + '\r\n' +
        'Start/End Date: ' + data['startEndDate'] + '\r\n' +
        'Location: ' + data['room'] + '\r\n---\r\n' +
        'Note: ' + 'Proudly brought to you by Alan Chen. If you find any mistake, please report it immediately to admin@zenan.ch or on Github as such mistake will annoy other students.' + '\r\n' +
        'END:VEVENT\r\n';
    //console.debug(iCalContent);
    // Remove double spaces from content.
    iCalContent = iCalContent.replace(/ {2,}/g, ' ');
    iCalContent = iCalContent.replace(/(\r\n){2,}/g, '\r\n');
    return iCalContent;
}

function datebuilder(dateString) {
    var dateArray = dateString.split('/');
    return new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
}

var selectors = {
    "componentRows": 'table[id^="CLASS_MTG_VW"]',
    "classNumber": 'td:nth-child(1)>span',
    "daysTimes": 'td:nth-child(4)>span',
    "section": 'a[id*="MTG_SECTION"]',
    "component": 'td:nth-child(3)>span',
    "room": 'td:nth-child(5)>span',
    "instructor": 'td:nth-child(6)>span',
    "startEndDate": 'td:nth-child(7)>span'
}
