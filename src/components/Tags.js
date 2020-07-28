import React from "react";
import uuid from "react-uuid";

function Tags(props) {
  return (
    <div className="tags">
      <div className="sidebar">
        <h3>Popular Tags</h3>
        <ul className="taglist">
          {props.tags
            ? props.tags.map((tag) => {
                return (
                  <a
                    key={uuid()}
                    className="tag"
                    onClick={() => props.tagChange(tag)}
                  >
                    {tag}
                  </a>
                );
              })
            : ""}
        </ul>
      </div>
    </div>
  );
}

export default Tags;
