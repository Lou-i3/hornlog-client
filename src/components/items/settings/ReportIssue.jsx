import { useState } from "react";
import Icon from "../../global/Icon";

const ReportIssue = (props) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    }

    return (
        <div className="reportIssue" onClick={() => handleClick()}>
            <Icon type="report" />
            Report an issue

            {
                active &&
                <div className={`reportIssuePopIn ${active ? "active" : ""}`}>
                    <div className="close" onClick={() => handleClick()}>Cancel</div>
                    <iframe src="https://forms.microsoft.com/Pages/ResponsePage.aspx?id=tpHd7w5cmkiL-2u1VuRi5hnrq3I0i9VDsGinHgveTPdURTRETkZUWjhWM1dJMzRITjJITlJJU1BFMS4u"></iframe>
                </div>
            }

        </div>
    );
}

export default ReportIssue;