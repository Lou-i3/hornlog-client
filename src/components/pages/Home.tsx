import React, { useEffect } from "react";
import Illustration from "../global/Illustration";


// import { getPublicContent } from "../../services/user.service";

const Home: React.FC = () => {
  // const [content, setContent] = useState<string>("");

  useEffect(() => {
    // getPublicContent().then(
    //   (response) => {
    //     setContent(response.data);
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response && error.response.data) ||
    //       error.message ||
    //       error.toString();

    //     setContent(_content);
    //   }
    // );
  }, []);

  return (
    <div className="content-inner home">


        <h1>Home</h1>
        <div className="emptyDashboardContainer">
        <Illustration type = "EmptyDashboard" style="width=100%"/>
        <h3>Under Construction...</h3>
        </div>

    </div>
  );
};

export default Home;