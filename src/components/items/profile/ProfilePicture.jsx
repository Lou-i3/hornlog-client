import { useEffect, useRef, useState } from "react";
import Icon from "../../global/Icon";

const ProfilePicture = (props) => {
    const { displayMode, profilePicture, setProfilePicture, person } = props;

    let initialPic = person && person.picture ? person.picture : "";
    const [pictureSrc, setPictureSrc] = useState(initialPic === "" ? "/Ellipse 4.png" : initialPic);
    const hiddenFileInput = useRef(null);
    const [showBigPicture, setShowBigPicture] = useState(false);

    useEffect(() => {
        // console.log("ProfilePicture useState");
        if (pictureSrc !== "/Ellipse 4.png") {
            // console.log("ProfilePicture useState: ", pictureSrc);
            setProfilePicture(pictureSrc);
        }
        
        
    }, [pictureSrc]);

    useEffect(() => {
        if (displayMode === "new") {
            setPictureSrc("/Ellipse 4.png");
        }
        initialPic = person && person.picture ? person.picture : "";
        setPictureSrc(initialPic === "" ? "/Ellipse 4.png" : initialPic);

    }, [displayMode, person]);


    const handlePictureSelected = (event) => {
        // console.log("handlePictureSelected");
        let oneMB = 1048576;
        if(event.target.files[0].size > 2*oneMB) {
            alert("File is too big! \nShould be less than 2MB \nYour file is: " + event.target.files[0].size / oneMB + " MB");

            event.target.value = "";
            return
         };

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
            })
            .catch(err => {
                console.log(err);
            });

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
        console.log("handleClickPictureEdit");
        hiddenFileInput.current.click();
    };


    return (
        <div className="profilePicContainer">
            <img src={pictureSrc} alt="" className="profilePic" />
            {
                displayMode !== "view" ?
                <button className="profilePicEditButton" onClick={handleClickPictureEdit} type="button" >
                    <Icon icon="edit" />
                </button>
                :
                <button className="profilePicViewButton" onClick={() => setShowBigPicture(true)} type="button" >
                    <Icon icon="view" />
                </button>
            }

            {
                showBigPicture &&
                <img src={pictureSrc} alt="" className="profilePicBig" onClick={() => setShowBigPicture(false)} />
            }


            <input type="file" accept="image/*" ref={hiddenFileInput} onChange={(e) => handlePictureSelected(e)} />
        </div>
    );
}

export default ProfilePicture;