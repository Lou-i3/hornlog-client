import { Field } from "formik";
import { useState } from "react";
import Icon from "../global/Icon";

const StarRating = (props) => {
    const { values, displayMode, readOnly, setValues, name } = props;

    const [grade, setGrade] = useState(values.grade);

    const onClick = (grade) => {
        if (displayMode !== "view") {
            setGrade(grade);

            let newValues = {
                ...values
            };
            newValues.grade = grade;
            setValues(newValues);
        }
    }

    return (
        <Field name={name} >
            {arrayHelper => (
                < div className="starRating">
                    {
                        [...Array(5)].map((_, i) => {
                            const index = i + 1;
                            return (
                                <Icon
                                    key={index}
                                    type={
                                        index <= grade ? "starSelected" : "star"
                                    }
                                    onClick={() => onClick(index, arrayHelper)}
                                />
                            )
                        })
                    }
                </div>
            )}
        </Field>
    );
}
export default StarRating;


