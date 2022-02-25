// import Icon from "../global/Icon";
import PartnerProfile from "../itemGroups/PartnerProfile";
import Search from "../items/Search";

const Partners = () => {
    return (
        <div className="content-inner">
            <div className="partners-page-inner">
                <div className="left-side side">
                    <div className="recents">
                    <h1>Recents</h1>

                    </div>
                    <div className="partners">
                        <h1>Partners</h1>
                        {/* <div className="search"></div> */}
                        {/* <input type="search" /> */}
                        <Search />
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