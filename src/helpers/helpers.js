export const formatDateTime = (dateTimeIn, format) => {

    const dateTime = new Date(dateTimeIn);
    // console.log(dateTime);

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };

    let outDateTime;

    switch (format) {
        case 'date':
            dateOptions.weekday = 'short';
            dateOptions.month = 'short';
            dateOptions.year = '2-digit';


            var now = new Date();

            // let diff = new Date();
            // diff.setDate(now - dateTime);
            const diffTime = Math.abs(now - dateTime);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const diffMins = Math.ceil(diffTime / (1000 * 60));
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

            if (diffMins <= 1) {
                outDateTime = 'less than a minute ago';
            } else if (diffHours < 1) {
                outDateTime = `${diffMins} minutes ago`;
            } else if (diffDays < 1) {
                outDateTime = `${diffHours} hours ago`;
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
            outDateTime = dateTime.toLocaleString('en-UK', dateOptions);
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
            outDateTime = dateTime.toLocaleString('en-UK', timeOptions);
            return outDateTime;

        case 'techdate':
            if (isValidDate(dateTime)) {
                const offset = dateTime.getTimezoneOffset()
                outDateTime = new Date(dateTime.getTime() - (offset * 60 * 1000))

                outDateTime = outDateTime.toISOString().split('T')[0];
                return outDateTime;
            } else {
                return dateTimeIn;
            }

        case 'techtime':
            if (isValidDate(dateTime)) {
                const offset = dateTime.getTimezoneOffset()
                outDateTime = new Date(dateTime.getTime() - (offset * 60 * 1000))

                outDateTime = outDateTime.toISOString().split('T')[1].slice(0, -1);
                return outDateTime;
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