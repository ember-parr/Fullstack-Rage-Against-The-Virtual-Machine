import { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ListGroup } from "reactstrap";
import { UserProfile } from "../components/UserProfile";

export const ProfileManager = () => {
    const { getToken } = useContext(UserProfileContext);
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        getUserProfiles();
    }, []);

    const getUserProfiles = () => {
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

    const deactivateUser = (id) => {
        getToken().then((token) =>
            fetch(`/api/userprofile/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(getUserProfiles)
        );
    }

    return (
        <div className="container my-5">
            <h1>User Profiles</h1>
            <ListGroup>
                {userProfiles.map(profile => (
                    <div className="row" key={profile.id}>
                        <UserProfile profile={profile} deactivateUser={deactivateUser} />
                    </div>
                ))}
            </ListGroup>
        </div>
    );
}