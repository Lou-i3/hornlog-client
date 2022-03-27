import Icon from "../global/Icon";

const Search = (props) => {

    const handleSearch = (e) => {
        // console.log("handleSearch");
        // console.log("e.target.value: ", e.target.value);
        props.setSearchTerms && props.setSearchTerms(e.target.value);
    }

    return (
        <div className="search">
            <Icon type="search" />
            <input
                type="search"
                placeholder="Search"
                onChange={handleSearch}
            ></input>
        </div>
    );
}

export default Search;