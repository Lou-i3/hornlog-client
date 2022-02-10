import PartnerProfile from "./PartnerProfile";

const Partners = () => {
    return (
        <div className="partners-page">
            <div className="partners-page-inner">
                <div className="left-side side">
                    <div className="recents">
                    <h1>Recents</h1>

                    </div>
                    <div className="partners">
                        <h1>Partners</h1>
                        <input type="text" placeholder="Search" />
                    </div>

                </div>
                <div className="right-side side">
                    <PartnerProfile />
                </div>
            </div>

        </div>
    );
}

export default Partners;