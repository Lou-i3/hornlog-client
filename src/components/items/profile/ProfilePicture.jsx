import { useEffect, useRef, useState } from "react";
import Icon from "../../global/Icon";

const ProfilePicture = (props) => {
    const { displayMode, profilePicture, setProfilePicture, person } = props;

    const initialPic = person && person.picture ? person.picture : "";
    const [pictureSrc, setPictureSrc] = useState(initialPic === "" ? "/Ellipse 4.png" : initialPic);
    const hiddenFileInput = useRef(null);

    useEffect(() => {
        console.log("ProfilePicture useState");
        if (pictureSrc !== "/Ellipse 4.png") {
            console.log("ProfilePicture useState: ", pictureSrc);
            setProfilePicture(pictureSrc);
        }
    }, [pictureSrc]);

    useEffect(() => {
        if (displayMode === "new") {
            setPictureSrc("/Ellipse 4.png");
        }
    }, [displayMode]);


    const handlePictureSelected = (event) => {
        console.log("handlePictureSelected");
        const file = event.target.files[0];
        // var src = URL.createObjectURL(file);
        // setPictureSrc(src);
        console.log("file", file);

        getBase64(file)
            .then(result => {
                // file["base64"] = result;
                // console.log("File Is", file);
                const base64URL = result;
                console.log("base64URL", base64URL);
                setPictureSrc(base64URL);

                // this.setState({
                //     base64URL: result,
                //     file
                // });
            })
            .catch(err => {
                console.log(err);
            });

        // this.setState({
        //     file: e.target.files[0]
        // });

    };

    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                // console.log("Called", reader);
                baseURL = reader.result;
                // console.log(baseURL);
                resolve(baseURL);
            };
            // console.log(fileInfo);
        });
    };

    const handleClickPictureEdit = (event) => {
        hiddenFileInput.current.click();
    };

    return (
        <div className="profilePicContainer">
            <img src={pictureSrc} alt="" className="profilePic" />
            {
                displayMode !== "view" &&
                <button className="profilePicEditButton" onClick={handleClickPictureEdit} type="button" >
                    <Icon icon="edit" />
                </button>
            }


            <input type="file" accept="image/*" ref={hiddenFileInput} onChange={(e) => handlePictureSelected(e)} />
        </div>
    );
}

export default ProfilePicture;