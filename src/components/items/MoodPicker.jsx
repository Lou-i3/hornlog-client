import { Field } from "formik";
import { useState } from "react";
// import Icon from "../global/Icon";

const MoodPicker = (props) => {
    const { displayMode, setValues, values, readOnly } = props;

    const moods = [{
        id: 1,
        name: "puke",
        icon: "🤮",
    }, {
        id: 2,
        name: "scared",
        icon: "😨",
    }, {
        id: 3,
        name: "dunno",
        icon: "🤷🏻",
    }, {
        id: 4,
        name: "lurking",
        icon: "🤤",
    }, {
        id: 5,
        name: "inLove",
        icon: "🥰",
    }
    ];

    const [mood, setMood] = useState(moods.filter(mood => mood.id === values.mood)[0]);


    // const moods = ["🤮", "😨", "🤷🏻", "🤤", "🥰"];

    const onClick = (clickedMood, arrayHelper) => {
        setMood(clickedMood);

        let newValues = {
            ...values
        };
        newValues.mood = clickedMood.id;
        setValues(newValues);

    }

    return (
        <Field name="mood">
            {arrayHelper => (
                <div className="moodPicker">
                    {
                        displayMode !== "view" ?
                            moods.map((mapMood) => {
                                return (
                                    <div className={"moodContainer" + ( (mood && mood.id === mapMood.id) ? ' selected' : '')} onClick={() => onClick(mapMood, arrayHelper)} >
                                        {
                                            mapMood.icon
                                        }
                                        {/* <Icon key={index} type={moodLabel} onClick={() => onClick(index, moodLabel)} /> */}
                                    </div>

                                )
                            })
                            :
                            <div className="moodContainer" >
                                {
                                    mood.icon
                                }
                            </div>
                    }
                </div>
            )}
        </Field>
    );
}

export default MoodPicker;