import { useEffect, useState } from "react";
import Icon from "../../global/Icon";

const DurationField = (props) => {
    const { values, setValues, readOnly } = props;
    const [duration, setDuration] = useState(values.duration);
    const [durationDetail, setDurationDetail] = useState({
        hours: 0,
        minutes: 0,
    });

    useEffect(() => {
        let hours = (duration / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        // return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
        setDurationDetail({
            hours: rhours,
            minutes: rminutes,
        });
        let newValues = {
            ...values
        };
        newValues.duration = duration;
        setValues(newValues);
    }, [duration]);

    const handleSet = (laps) => {
        let time = laps.length === 2 ? 60 : 15;
        let change = laps.includes("-") ? -1 : 1;
        let newDuration = duration + change * time;
        if (newDuration < 0) {
            newDuration = 0;
        }
        console.log("newDuration: ", newDuration);
        setDuration(newDuration);
    }

    return (
        <div className="durationField">
            {
                !readOnly &&
                <>
                    <Icon type="top" onClick={() => handleSet("--")} />
                    <Icon type="vers-top" onClick={() => handleSet("-")} />
                </>
            }

            <span className="durationValue">
                <Icon type="duration" />
                <h3>{durationDetail.hours > 0 && durationDetail.hours + " h"}</h3>
                <h3>{( durationDetail.minutes > 0 || durationDetail.hours === 0 ) && durationDetail.minutes + " mins"}</h3>
            </span>
            {
                !readOnly &&
                <>
                    <Icon type="vers-bottom" onClick={() => handleSet("+")} />
                    <Icon type="bottom" onClick={() => handleSet("++")} />
                </>
            }
        </div>
    );
}

export default DurationField;