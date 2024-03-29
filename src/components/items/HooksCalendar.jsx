import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { enumLabel, formatDateTime } from '../../helpers/helpers';
import { MY_HOOKS_QUERY } from '../../helpers/queries';
import PictureAndName from './profile/PictureAndName';


const HooksCalendar = (props) => {
    const { data } = props;
    const [hooks, setHooks] = useState([]);

    useEffect(() => {
        // console.log('usefeect hooks calendar data: ', data);
        if (data) {
            setHooks(data);
        }
    }, [data]);

    const getHookInfo = (date) => {
        // console.log("date", date);
        let out = null;
        let tempDate = new Date(date);
        tempDate = new Date(tempDate.getTime() - (tempDate.getTimezoneOffset() * 60000));
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
                formatDay={() => <span></span>}
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
                                    // hookInfo && enumLabel(hookInfo.hookType)
                                }
                                {
                                    hookInfo && hookInfo.partners && hookInfo.partners !== [] &&
                                    <PictureAndName
                                        partners={hookInfo.partners}
                                        showName={false}
                                    />
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