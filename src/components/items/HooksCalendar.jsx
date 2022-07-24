import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { enumLabel, formatDateTime } from '../../helpers/helpers';
import { MY_HOOKS_QUERY } from '../../helpers/queries';


const HooksCalendar = (props) => {
    const { loading: loadingQuery, error, data } = useQuery(MY_HOOKS_QUERY);
    const [hooks, setHooks] = useState([]);

    useEffect(() => {
        if (data) {
            setHooks(data.myHooks);
        }
    }, [data]);

    const getHookInfo = (date) => {
        console.log("date", date);
        let out = null;
        let tempDate = new Date(date);
        tempDate = new Date( tempDate.getTime() - (tempDate.getTimezoneOffset() * 60000) );
        // console.log("tempDate", tempDate.getTimezoneOffset());
        const currentDate = tempDate.toISOString().split('T')[0];
        // console.log("newdate", currentDate);
        // console.log("hooks", hooks);

        const hook = hooks.filter((hook) => formatDateTime(hook.dateTime, 'techdatefromDtb').split('T')[0] === currentDate);
        if (hook && hook[0]) {
            out = hook[0];
        }
        return out;
    }

    return (
        <div className="hooksCalendar">
            <Calendar
                value={new Date()}
                formatDay={() => null}
                tileContent={({ activeStartDate, date, view }) => {
                    let hookInfo = getHookInfo(date);
                    let hookType = hookInfo ? hookInfo.hookType : 'noHook';
                    let today = new Date();
                    let todayClass = (date.getDate() == today.getDate() &&
                        date.getMonth() == today.getMonth() &&
                        date.getFullYear() == today.getFullYear()) ?
                        ' today' : '';
                    return (
                        <div className={`calendarTile ${hookType}${todayClass}`}>
                            <div className="top">
                                <div className="date">{date.getDate()}</div>
                            </div>
                            <div className="bottom">
                                {
                                    hookInfo && enumLabel(hookInfo.hookType)
                                }
                            </div>
                            {

                                // view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null
                            }
                        </div>
                    )
                }
                }
            />
        </div>
    );
}

export default HooksCalendar;