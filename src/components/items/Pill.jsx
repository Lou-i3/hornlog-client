import { useEffect, useState } from "react";
import Icon from "../global/Icon";
import Loader from "./Loader";

const Pill = (props) => {
    const { onClick,
        readOnly = false,
        type, // for icon pills
        icon = false, // icon : true, false, iconOnly, withNumber
        text, // for no icon
        values,
        setValues,
        selected,
        className = '',
        number = 0,
        loading = false
    } = props;

    useEffect(() => {
        console.log("pill, lodading", loading);

    }, [loading]);

    // console.log("Pill props", props);

    const states = {
        null: "noValue",
        true: "on",
        false: "off"
    }
    const [state, setState] = useState(values ? values[type] : null); // NoValue: null, true: on, false: off
    // console.log("Pill state", state);
    // console.log("Pill value type", values && values[type]);  
    

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

    // if (type === "sex") {
    //     console.log("COUCOUCOCUOCUCOUCOUCOCUOUC");
    //     console.log({ state });
    //     console.log("val: ", values)
    //     console.log("field (type): ", type)
    //     console.log("valfield: ", values[type])
    //     console.log(pillType);

    // }

    // clases
    const iconClass = icon ?
        (icon === "iconOnly" ?
            "iconOnly" :
            (icon === "withNumber" ?
                "withNumber" :
                "withIcon")
        )
        : "noIcon";
    const stateClass = selected !== undefined ?
        (selected ? "on" : "off") :
        states[state];
    const classes = `pill ${iconClass} ${stateClass} ${className}`;

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
            if (icon && icon !== "withNumber") {
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
                icon && icon !== "withNumber" &&
                <Icon type={displayIcon()} />
            }
            {
                icon && icon === "withNumber" &&
                <div className="number">
                    {
                        loading ?
                        <Loader 
                        size="mini"
                        />
                        :
                        number
                    }
                </div>
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