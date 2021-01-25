export const UserProfile = ({ profile }) => {
    return (
        <div className="justify-content-between align-items-center row">
            <img className="pl-2 sm"
                src={profile.imageLocation}
                style={{ width: '5em' }}
                alt={`${profile.displayName} profile picture`}
            />
            <div>{`${profile.firstName} ${profile.lastName}`}</div>
            <div>{profile.displayName}</div>
            <div className="pr-2">{profile.userTypeId === 1 ? "Admin" : "Author"}</div>
        </div>
    );
}