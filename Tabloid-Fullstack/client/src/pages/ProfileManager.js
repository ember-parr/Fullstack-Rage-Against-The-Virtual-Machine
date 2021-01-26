import { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ButtonGroup, ListGroup } from "reactstrap";
import { UserProfile } from "../components/UserProfile";

export const ProfileManager = () => {
    const { getToken } = useContext(UserProfileContext);
    const [userProfiles, setUserProfiles] = useState([]);
    const [activePage, setActivePage] = useState(true);

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

    return (
        <div className="container my-5">
            <h1>User Profiles</h1>
            <ButtonGroup vertical>
                <Button active={activePage}>Active</Button>
                <Button active={!activePage}>Deactivated</Button>
            </ButtonGroup>
            <ListGroup>
                {userProfiles.map(profile => (
                    <div className="row" key={profile.id}>
                        <UserProfile profile={profile}
                            deactivateUser={deactivateUser}
                            activateUser={activateUser}
                        />
                    </div>
                ))}
            </ListGroup>
        </div>
    );
}