import { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ButtonGroup, ListGroup, Button } from "reactstrap";
import { UserProfile } from "../components/UserProfile";

export const ProfileManager = () => {
    const { getToken } = useContext(UserProfileContext);
    const [userProfiles, setUserProfiles] = useState([]);
    const [activePage, setActivePage] = useState(true);
    const [btn1Color, setBtn1Color] = useState("primary");
    const [btn2Color, setBtn2Color] = useState("secondary");

    useEffect(() => {
        activePage ? getActiveProfiles() : getInactiveProfiles();
    }, [activePage]);

    const getActiveProfiles = () => {
        getToken().then((token) =>
            fetch("/api/userprofile", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((profiles) => {
                    setUserProfiles(profiles);
                })
        );
    };

    const getInactiveProfiles = () => {
        getToken().then((token) =>
            fetch("/api/userprofile/inactive", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((profiles) => {
                    setUserProfiles(profiles);
                })
        );
    };

    const deactivateUser = (id) => {
        getToken().then((token) =>
            fetch(`/api/userprofile/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(getActiveProfiles)
        );
    }

    const activateUser = (id) => {
        getToken().then((token) =>
            fetch(`/api/userprofile/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(getInactiveProfiles)
        );
    }

    const updateUserType = (userProfile) => {
        getToken().then((token) =>
            fetch(`/api/userprofile/type/${userProfile.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userProfile)
            })
                .then(getUserProfiles)
        );
    }

    const handleClick = (e) => {
        if (e.target.textContent === "Active") {
            setActivePage(true);
            setBtn1Color("primary");
            setBtn2Color("secondary");
        } else if (e.target.textContent === "Deactivated") {
            setActivePage(false);
            setBtn1Color("secondary");
            setBtn2Color("primary");
        }
    }

    return (
        <div className="container my-5">
            <h1>User Profiles</h1>
            <ButtonGroup vertical className="border mb-3">
                <Button color={btn1Color} onClick={handleClick}>Active</Button>
                <Button color={btn2Color} onClick={handleClick}>Deactivated</Button>
            </ButtonGroup>
            <ListGroup>
                {userProfiles.map(profile => (
                    <div className="row" key={profile.id}>
                        <UserProfile profile={profile}
                            deactivateUser={deactivateUser}
                            activateUser={activateUser}
                            updateUserType={updateUserType}
                        />
                    </div>
                ))
                }
            </ListGroup >
        </div >
    );
}