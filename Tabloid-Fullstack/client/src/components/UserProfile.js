import { useState } from "react";
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";

export const UserProfile = ({ profile, deactivateUser, updateUserType }) => {
    const [pendingDelete, setPendingDelete] = useState(false);
    const [selected, setSelected] = useState(profile.userTypeId === 1 ? 1 : 2);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeactivation = () => {
        deactivateUser(profile.id);
        setPendingDelete(false);
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
                color="danger"
                className="align-self-center ml-3"
                onClick={(e) => setPendingDelete(true)}
            >
                Deactivate
            </Button>
            <Modal isOpen={pendingDelete}>
                <ModalHeader>Deactivate {profile.displayName}?</ModalHeader>
                <ModalBody>
                    Are you sure you want to deactivate this user?
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                    <Button className="btn btn-outline-danger" onClick={handleDeactivation}>
                        Yes, Deactivate
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}