function composeical(data) {
  var timezone = 'Asia/Hong_Kong';
  console.debug('Composing iCalContent');
  // For the difficulty of determining the real start date of each day, we use a unified start
  // date, yet set Monday into the exceptions of the classes that take in other days to cover most cases
  if (data['daysOfWeek'] != 'MO') {
    var exdate = 'EXDATE;TZID=' + timezone + ':' + data['startDateString'] + 'T' + getTimeString(data['startTime']) + '\r\n'
  } else {
    var exdate = ''
  }
  var iCalContent =
    'BEGIN:VEVENT\r\n' +
    'DTSTAMP:' + data['timeStamp'] + '\r\n' +
    //'DTSTART;TZID=' + timezone + ':' + getDateTimeString(startDate, startTime) + '\r\n' +
    'DTSTART;TZID=' + timezone + ':' + data['startDateString'] + 'T' + getTimeString(data['startTime']) + '\r\n' +
    //'DTEND;TZID=' + timezone + ':' + getDateTimeString(startDate, endTime) + '\r\n' +
    'DTEND;TZID=' + timezone + ':' + data['startDateString'] + 'T' + getTimeString(data['endTime']) + '\r\n' +
    'LOCATION:' + data['room'] + '\r\n' +
    //'RRULE:FREQ=WEEKLY;UNTIL=' + getDateTimeString(endDate, endTime) + 'Z;BYDAY=' + daysOfWeek + '\r\n' +
    'RRULE:FREQ=WEEKLY;UNTIL=' + data['endDateString'] + 'T' + getTimeString(data['endTime']) + 'Z;BYDAY=' + data['daysOfWeek'] + '\r\n' +
    //'EXDATE;TZID=' + timezone + ':' + getDateTimeString(startDate, startTime) + '\r\n' +
    exdate +
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
    'Note: ' + 'Proudly brought to you by Alan(CUHKSZ) and Max Sum(CUHK). If you find any mistake, please report it immediately to admin@zenan.ch or on Github.' + '\r\n' +
    'END:VEVENT\r\n';
  //console.debug(iCalContent);
  // Remove double spaces from content.
  iCalContent = iCalContent.replace(/ {2,}/g, ' ');
  iCalContent = iCalContent.replace(/(\r\n){2,}/g, '\r\n');
  return iCalContent;
}

function datebuilder(dateString) {
  return new Date(dateString);
}

var selectors = {
  "componentRows": '.PSLEVEL3GRIDNBO',
  "classNumber": 'span[id*="DERIVED_CLS_DTL_CLASS_NBR"]',
  "daysTimes": 'span[id*="MTG_SCHED"]',
  "section": 'a[id*="MTG_SECTION"]',
  "component": 'span[id*="MTG_COMP"]',
  "room": 'span[id*="MTG_LOC"]',
  "instructor": 'span[id*="DERIVED_CLS_DTL_SSR_INSTR_LONG"]',
  "startEndDate": 'span[id*="MTG_DATES"]'
}
