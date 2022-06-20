import { useState } from "react";
import Icon from "../global/Icon";

const StarRating = (props) => {

    //const { rating, onClick } = props;

    const [grade, setGrade] = useState(0);
    
    const onClick = (grade) => {
        setGrade(grade);
    }

    return (
        <div className="starRating">
            {/* <Icon type="star" />  */}
            {
                [...Array(5)].map((_, i) => {
                    const index = i + 1;
                    return (
                        <Icon key={index} type={
                            index <= grade ? "starSelected" : "star"
                        } onClick={() => onClick(index)} />
                    )
                })
            }
        </div>

    );
}
export default StarRating;


