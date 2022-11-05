import { useMatomo } from '@datapunt/matomo-tracker-react'
import { useEffect } from 'react';


const Loading = () => {
    const { trackPageView } = useMatomo();

    useEffect(() => {
        trackPageView({
            documentTitle: 'Loading',
        });
    }, []);
    return ( 
    <div className="content-inner">
        <p>Loading... </p>
    </div> 
    );
}
 
export default Loading;