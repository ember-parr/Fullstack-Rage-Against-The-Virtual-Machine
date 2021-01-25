import { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ListGroup, ListGroupItem } from "reactstrap";
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

    return (
        <div className="container my-5">
            <h1>User Profiles</h1>
            <div className="row justify-content-center">
                <div className="col col col col">
                    <ListGroup>
                        {userProfiles.map(profile => (
                            <ListGroupItem key={profile.id}>
                                <UserProfile profile={profile} />
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
            </div>
        </div>
    );
}