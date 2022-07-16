import { useState } from "react";
import Icon from "../global/Icon";

const Pill = (props) => {
    const { onClick,
        readOnly = false,
        type, // for icon pills
        icon = false, // icon : true, false, iconOnly
        text, // for no icon
        values,
        setValues,
        selected
    } = props;

    console.log("Pill props", props);

    const states = {
        null: "noValue",
        true: "on",
        false: "off"
    }
    const [state, setState] = useState(values ? values[type] : null); // NoValue: null, true: on, false: off

    const pillTypes = [
        {
            type: "sex",
            textOn: "Sex",
            textOff: "No Sex",
            Icon: "sex"
        },
        {
            type: "penetration",
            textOn: "Penetration",
            textOff: "No Penetration",
            Icon: "penetration"
        },
        {
            type: "orgasm",
            textOn: "Orgasm",
            textOff: "No Orgasm",
            Icon: "orgasm"
        },
        {
            type: "protection",
            textOn: "Protected",
            textOff: "Unprotected",
            Icon: "protection"
        },
        {
            type: "pill",
            textOn: "Pill",
            textOff: "No Pill",
            Icon: "pillIcon"
        },
        {
            type: "porn",
            textOn: "Porn",
            textOff: "No Porn",
            Icon: "porn"
        }
    ]


    const pillType = pillTypes.filter((typef) => typef.type === type)[0] || { type: "" };

    if (type === "sex") {
        console.log("COUCOUCOCUOCUCOUCOUCOCUOUC");
        console.log({ state });
        console.log("val: ", values)
        console.log("field (type): ", type)
        console.log("valfield: ", values[type])
        console.log(pillType);

    }

    // clases
    const iconClass = icon ? (icon === "iconOnly" ? "iconOnly" : "withIcon") : "noIcon";
    const stateClass = selected !== undefined ?
        (selected ? "on" : "off") :
        states[state];
    const classes = `pill ${iconClass} ${stateClass}`;

    const handleClick = () => {
        if (!readOnly) {
            let newState;
            switch (state) {
                case null:
                    newState = true;
                    break;
                case true:
                    newState = false;
                    break;
                case false:
                    newState = null;
                    break;
            }
            setState(newState);
            if (onClick) onClick();
            if (values && setValues) {
                let newValues = {
                    ...values
                };
                newValues[type] = newState;
                setValues(newValues);
            }
        }
    }
    const displayText = () => {
        let outText = "";

        if (icon !== "iconOnly") {
            if (icon) {
                switch (state) {
                    case null:
                        outText = pillType.type;
                        break;
                    case true:
                        outText = pillType.textOn;
                        break;
                    case false:
                        outText = pillType.textOff;
                        break;
                }
            } else {
                outText = text
            }
        }
        outText = (outText && outText !== "") ?
            (outText.charAt(0).toUpperCase() + outText.slice(1))
            : "";

        return outText;
    }
    const displayIcon = () => {
        let outIcon;
        switch (state) {
            case true:
                outIcon = pillType.Icon;
                break;
            case false:
                outIcon = pillType.Icon + "Off";
                break;
            default:
                outIcon = "?";
                break;
        }
        return outIcon;
    }

    // console.log("pill type: ", pillType);
    // console.log({ text });
    return (
        <div className={classes} onClick={handleClick} >
            {
                icon && <Icon type={displayIcon()} />
            }
            <p>
                {
                    displayText()

                }
            </p>

        </div>
    );
}

export default Pill;