export const formatDateTime = (dateTimeIn, format) => {

    const dateTime = new Date(dateTimeIn);

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };

    let outDateTime;

    switch (format) {
        case 'date':
            delete dateOptions.weekday;

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
            console.log('format')
                // console.log(d);
                // console.log(outDateTime);
                // if (dates.dateTime < d) {
                //     outDateTime = 'Yesterday';
                // }

            return outDateTime;


        case 'longdate':
            outDateTime = dateTime.toLocaleString('en-UK', dateOptions);
            return outDateTime;

        case 'shortdate':
            const dateOptionsShort = { dateStyle: 'short' };

            outDateTime = dateTime.toLocaleString('en-UK', dateOptionsShort);
            return outDateTime;

        case 'time':
            outDateTime = dateTime.toLocaleString('en-UK', timeOptions);
            return outDateTime;


        default:
            outDateTime = dateTime.toLocaleString('en-UK', dateOptions);
            return outDateTime;

    }

};