import { off } from "process";

export const formatDateTime = (dateTimeIn, format) => {

    let dateTime = new Date(dateTimeIn);
    // console.log(dateTime);

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    dateOptions.timezone = 'Europe/France';
    timeOptions.timezone = 'Europe/France';

    let outDateTime;

    let offset = 120;

    switch (format) {
        case 'date':
            dateOptions.weekday = 'short';
            dateOptions.month = 'short';
            dateOptions.year = '2-digit';

            console.log("dateTime", dateTime);

            var now = new Date();
            dateTime = new Date(dateTime.getTime() + offset * 60000);

            console.log('bkejqskldjhlkqsjldkqj');
            console.log("now", now);
            console.log("dateTime.getTime()", dateTime.getTime());
            console.log("now.getTime()", now.getTime());

            // let diff = new Date();
            // diff.setDate(now - dateTime);
            const diffTime = Math.abs(now - dateTime);
            const diffDays = Math.abs(Math.round(diffTime / (1000 * 60 * 60 * 24)));
            const diffHours = Math.abs(Math.round(diffTime / (1000 * 60 * 60)));
            const diffMins = Math.abs(Math.round((diffTime / (1000 * 60))));

            console.log("diffTime", diffTime);
            console.log("diffDays", diffDays);
            console.log("diffHours", diffHours);
            console.log("diffMins", diffMins);

            if (diffMins <= 1) {
                outDateTime = 'less than a minute ago';
            } else if (diffHours < 1) {
                outDateTime = `${diffMins} minutes ago`;
            } else if (diffHours < 6) {
                outDateTime = `${diffHours} hours ago`;
            } else if (diffDays < 1) {
                outDateTime = 'today';
            } else if (diffDays === 1) {
                outDateTime = 'yesterday';
            } else if (diffDays < 4) {
                // console.log(".. ago ", dateTime, dateTime.day);

                outDateTime = `${diffDays} days ago`;
            } else {
                outDateTime = dateTime.toLocaleString('en-UK', dateOptions);
            }
            // var now = new Date();
            // d.setDate(d.getDate() - 2);
            // console.log('format')
            // console.log(d);
            // console.log(outDateTime);
            // if (dates.dateTime < d) {
            //     outDateTime = 'Yesterday';
            // }

            return outDateTime;


        case 'longdate':
            offset = dateTime.getTimezoneOffset();
            let newDate = (new Date(dateTime.getTime() + ((offset) * 60000)));

            console.log("longdate, newDate", newDate.toISOString());

            outDateTime = newDate.toLocaleString('en-UK', dateOptions);
            return outDateTime;

        case 'mediumdate':
            dateOptions.day = 'short';
            outDateTime = dateTime.toLocaleString('en-UK', dateOptions);
            return outDateTime;

        case 'shortdate':
            const dateOptionsShort = { dateStyle: 'short' };

            outDateTime = dateTime.toLocaleString('en-UK', dateOptionsShort);
            return outDateTime;

        case 'time':
            // outDateTime = dateTime.toLocaleString('en-UK', timeOptions);

            outDateTime = (new Date(dateTime.getTime() + ((offset) * 60000))).toISOString();

            outDateTime = outDateTime.split('T')[1].slice(0, -1);
            let outTime = outDateTime.split(':');
            outTime = outTime[0] + ':' + outTime[1];

            return outTime;

        case 'techdate': // Get the date in the format of: "YYYY-MM-DD" from Date in current timezone
            if (isValidDate(dateTime)) {
                const offset = dateTime.getTimezoneOffset()
                outDateTime = new Date(dateTime.getTime() - (offset * 60 * 1000))

                outDateTime = outDateTime.toISOString().split('T')[0];
                return outDateTime;
            } else {
                return dateTimeIn;
            }

        case 'techdatefromDtb': // Get the date in the format of: "YYYY-MM-DD" from Date in Database
            if (isValidDate(dateTime)) {
                // const offset = dateTime.getTimezoneOffset()
                outDateTime = new Date(dateTime.getTime() + (offset * 60 * 1000))

                outDateTime = outDateTime.toISOString().split('T')[0];
                return outDateTime;
            } else {
                return dateTimeIn;
            }

        case 'techtime': // Get the time in the format of: "HH:MM" from Date in current timezone
            if (isValidDate(dateTime)) {
                const offset = dateTime.getTimezoneOffset()
                outDateTime = new Date(dateTime.getTime() - (offset * 60 * 1000))

                outDateTime = outDateTime.toISOString().split('T')[1].slice(0, -1);
                let outTime = outDateTime.split(':');
                outTime = outTime[0] + ':' + outTime[1];
                return outTime;
            } else {
                return dateTimeIn;
            }

        case 'techtimefromDtb': // Get the time in the format of: "HH:MM" from Date in Database
            if (isValidDate(dateTime)) {
                // const offset = dateTime.getTimezoneOffset()
                outDateTime = new Date(dateTime.getTime() + (offset * 60 * 1000))

                outDateTime = outDateTime.toISOString().split('T')[1].slice(0, -1);
                let outTime = outDateTime.split(':');
                outTime = outTime[0] + ':' + outTime[1];
                return outTime;
            } else {
                return dateTimeIn;
            }

        default:
            outDateTime = dateTime.toLocaleString('en-UK', dateOptions);
            return outDateTime;

    }

};

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

export const enumLabel = (enumValue) => {

    if (enumValue) {

        const words = enumValue.split("_");

        const label = words.map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");

        // console.log("words", words);
        // console.log("label", label);

        return label
    }
}