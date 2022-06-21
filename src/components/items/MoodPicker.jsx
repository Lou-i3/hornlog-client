import { useState } from "react";
import Icon from "../global/Icon";

const MoodPicker = (props) => {

    const [mood, setMood] = useState(1);

    const onClick = (index, mood) => {
        setMood(index);
        // props.onChange(mood);
    }

    return (
        <div className="moodPicker">
            {
                ["😭", "😟", "🙄", "🙂", "😆"].map((moodLabel, index) => {
                    return (
                        <div className={"moodContainer" + (mood === index ? ' selected' : '')}  onClick={() => onClick(index, moodLabel)} >
                            {
                                moodLabel
                            }
                            {/* <Icon key={index} type={moodLabel} onClick={() => onClick(index, moodLabel)} /> */}
                        </div>

                    )
                })
            }
        </div>
    );
}

export default MoodPicker;