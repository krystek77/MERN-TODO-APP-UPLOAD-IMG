import React from "react";
import PropTypes from "prop-types";
import Spinner from "react-spinkit";
import teal from "@material-ui/core/colors/teal";
import { Typography } from "@material-ui/core";

function LoadingSpinner({ description }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        component="h1"
        variant="h3"
      >{`${description} ...`}</Typography>
      <Spinner name="pacman" color={teal[100]} />
    </div>
  );
}
LoadingSpinner.defaultProps = {
  description: "Loading",
};
LoadingSpinner.propTypes = {
  description: PropTypes.string,
};
export default LoadingSpinner;
