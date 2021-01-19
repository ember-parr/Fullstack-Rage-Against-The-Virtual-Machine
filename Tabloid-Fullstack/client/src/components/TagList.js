import React, { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider"

const TagList = () => {
    const [tags, setTags] = useState([]);

    const { getToken } = useContext(UserProfileContext);

    useEffect(() => {
         getToken().then((token) =>
            fetch("/api/tag", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}` // The token gets added to the Authorization header
                }
            })
            .then(resp => resp.json())
            .then(setTags));
    }, []);

  return (
    <div>
      {tags.map((tag) => (
        <div className="m-4" key={tag.id}>
          {tag.name}
        </div>
      ))}
    </div>
  );
};

export default TagList;