import { useState } from "react";
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";

export const UserProfile = ({ profile, deactivateUser, activateUser, updateUserType }) => {
    const [pending, setPending] = useState(false);
    const [selected, setSelected] = useState(profile.userTypeId === 1 ? 1 : 2);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeactivation = () => {
        deactivateUser(profile.id);
        setPending(false);
    };

    const handleActivation = () => {
        activateUser(profile.id);
        setPending(false);
    };

    const handleChange = (e) => {
        setIsLoading(true);
        console.log(e);
        setSelected(e.target.value);
        console.log(selected)

        // updateUserType(profile)
        //     .then(() => setIsLoading(false));
    };

    return (
        <>
            <ListGroupItem className="col">
                <div className="justify-content-between align-items-center row">
                    <img className="pl-2 sm"
                        src={profile.imageLocation}
                        style={{ width: '5em' }}
                        alt={`${profile.displayName} profile picture`}
                    />
                    <div>{`${profile.firstName} ${profile.lastName}`}</div>
                    <div>{profile.displayName}</div>
                    <div className="pr-2" >
                        <Input type="select" onChange={handleChange} value={selected} disabled={isLoading}>
                            <option value={1}>Admin</option>
                            <option value={2}>Author</option>
                        </Input>
                    </div>
                </div>
            </ListGroupItem>
            <Button
                color={profile.isActive ? "danger" : "info"}
                className="align-self-center ml-3"
                onClick={(e) => setPending(true)}
            >
                {profile.isActive ? "Deactivate" : "Activate"}
            </Button>
            <Modal isOpen={pending}>
                <ModalHeader>{profile.isActive ? "Deactivate" : "Activate"} {profile.displayName}?</ModalHeader>
                <ModalBody>
                    Are you sure you want to {profile.isActive ? "deactivate" : "activate"} this user?
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => setPending(false)}>No, Cancel</Button>
                    <Button
                        className={profile.isActive ? "btn btn-outline-danger" : "btn btn-outline-info"}
                        onClick={profile.isActive ? handleDeactivation : handleActivation}>
                        {profile.isActive ? "Yes, Deactivate" : "Yes, Activate"}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}