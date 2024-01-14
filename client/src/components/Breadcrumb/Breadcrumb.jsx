import React from "react";
import { Link } from "react-router-dom";
const Breadcrumb = ({ crumbs }) => {
  return (
    <div>
      {crumbs.map((crumb, index) => (
        <span key={index}>
          {index > 0 && " > "}
          {index < crumbs.length - 1 ? (
            <Link to={crumb.path} className="text-[#ff3e02] font-medium">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-[#035373] font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
