export const UserProfile = ({ profile }) => {
    return (
        <div className="justify-content-between align-items-center row">
            <img className="pl-2" src={profile.imageLocation} />
            <div>{`${profile.firstName} ${profile.lastName}`}</div>
            <div>{profile.displayName}</div>
            <div className="pr-2">{profile.userTypeId === 1 ? "Admin" : "Author"}</div>
        </div>
    );
}