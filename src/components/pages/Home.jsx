import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ME_QUERY } from "../../helpers/queries";
import Illustration from "../global/Illustration";
import HooksCalendar from "../items/HooksCalendar";

const Home = () => {
    const { loading, error, data } = useQuery(ME_QUERY);

    return (
        <div className="content-inner home">


            <h1>Home</h1>
            {
                data && data.me && <h1>Welcome { data.me.displayName }</h1>}

            {/* <div className="emptyDashboardContainer"> */}
                {/* <div className="imgContainer">
                <Illustration type="EmptyDashboard" style="width=100%" />

                </div>
                <h3>Under Construction...</h3> */}
            {/* </div> */}
            <HooksCalendar />

        </div>
    );
}

    export default Home;