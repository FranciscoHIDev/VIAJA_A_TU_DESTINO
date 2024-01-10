import React from 'react';
import { Link } from 'react-router-dom';
const Breadcrumb = ({ crumbs }) => {
  return (
    <div className="breadcrumb">
      {crumbs.map((crumb, index) => (
        <span key={index}>
          {index > 0 && ' > '}
          {index < crumbs.length - 1 ? (
            <Link to={crumb.path}>{crumb.label}</Link>
          ) : (
            crumb.label
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;