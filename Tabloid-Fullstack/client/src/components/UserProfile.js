export const UserProfile = ({ profile }) => {
    return (
        <table className="table">
            {/* <thead>
                <tr>
                    <th>
                        {profile.imageLocation}
                    </th>
                    <th>
                        {`${profile.firstName} ${profile.lastName}`}
                    </th>
                    <th>
                        {profile.displayName}
                    </th>
                    <th>
                        {profile.userType}
                    </th>
                </tr>
            </thead> */}
            <tbody>
                <tr>
                    <td>
                        {profile.imageLocation}
                    </td>
                    <td>
                        {`${profile.firstName} ${profile.lastName}`}
                    </td>
                    <td>
                        {profile.displayName}
                    </td>
                    <td>
                        {profile.userTypeId === 1 ? "Admin" : "Author"}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}