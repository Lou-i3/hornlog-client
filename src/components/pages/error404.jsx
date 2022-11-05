import Illustration from "../global/Illustration";
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { useEffect } from 'react';


const Error404 = () => {
    const { trackPageView } = useMatomo();

    useEffect(() => {
        trackPageView({
            documentTitle: 'Error404',
        });
    }, []);
    return (
        < div className="content-inner error404" >
            <Illustration type="error404" />

            <h3> These are uncharted waters.</h3>

        </div>
    );
}

export default Error404;