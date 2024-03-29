import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ME_QUERY, MY_HOOKS_QUERY } from "../../helpers/queries";
import Illustration from "../global/Illustration";
import HooksBoolsTotals from "../items/HooksBoolsTotals";
import HooksCalendar from "../items/HooksCalendar";
import HooksTypesTotals from "../items/HooksTypesTotals";
import { useMatomo } from '@datapunt/matomo-tracker-react'


const Home = () => {
    const { loading: loadingMe, errorMe, dataMe } = useQuery(ME_QUERY);
    const { loading: loadingMyHooks, errorMyHooks, data:dataMyHooks } = useQuery(MY_HOOKS_QUERY);
    const [hooks, setHooks] = useState([]);
    const { trackPageView } = useMatomo();

    useEffect(() => {
        trackPageView({
            documentTitle: 'Home',
        });
    }, []);

    useEffect(() => {
        console.log('home useEffect dataMyHooks: ', dataMyHooks);
        if (dataMyHooks) {
            setHooks(dataMyHooks.myHooks);
        }
    }, [dataMyHooks]);

    useEffect(() => {
        console.log('home useEffect loadingMyHooks: ', loadingMyHooks);
    }, [loadingMyHooks]);

    return (
        <div className="content-inner home">


            <h1>Home</h1>
            {
                dataMe && dataMe.me && <h1>Welcome { dataMe.me.displayName }</h1>}

            {/* <div className="emptyDashboardContainer"> */}
                {/* <div className="imgContainer">
                <Illustration type="EmptyDashboard" style="width=100%" />

                </div>
                <h3>Under Construction...</h3> */}
            {/* </div> */}
            <HooksCalendar 
                data={hooks}
            />
            <HooksTypesTotals 
                data={hooks}
                loadingMyHooks={loadingMyHooks}
            />
            <HooksBoolsTotals
                data={hooks}
                loading={loadingMyHooks}
            />

        </div>
    );
}

    export default Home;