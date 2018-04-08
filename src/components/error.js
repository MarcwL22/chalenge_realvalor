import React from 'react';

const Error = ({ error, noData }) => {
  const message = () => {
    if (error) {
      return '404 Not Found';
    }
    if (noData) {
      return 'No data has found :(';
    }
    return ':(';
  };
  return (
    <div className="error">
      <h2 className="error__heading">Ops!</h2>
      <h1 className="error_msg">{message()}</h1>
    </div>
  );
};

export default Error;
