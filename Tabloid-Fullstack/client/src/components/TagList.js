import React from "react";

const TagList = ({ tags }) => {
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