import { enumLabel } from "../../../helpers/helpers";

const HookTypePill = (props) => {
    const { hookType } = props;

    const text = hookType ? enumLabel(hookType) : "";

    return ( 
        <div className="choicePill">
            <p>{text}</p>
        </div>
     );
}
 
export default HookTypePill;