import React from "react";
import LogoWithText from "../../shared/Logo/LogoWithText";
import SignOutLinks from "../SignOutLinks/SignOutLinks";
import SignInLinks from "../SignInLinks/SignInLinks";

import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
// import IconButton from '@material-ui/core/IconButton';
// import Icon from '@material-ui/core/Icon';
import { connect } from "react-redux";

// import Icon from '@material-ui/core/Icon'; <Icon>star</Icon>

const styles = (theme) => ({
  appBarWrapper: {
    width: "100%",
  },
  appBar: {
    position: "fixed",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  toolBar: {
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  hamburger: {
    color: theme.palette.primary.contrastText,
  },
  hamburgerWrapper: {
    display: "flex",
  },
});

function Navigation({ classes, isAuthenticated, user }) {
  //
  return (
    <div className={classes.appBarWrapper}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.hamburgerWrapper}>
            {/*{isAuthenticated && (
							<IconButton>
								<Icon className={classes.hamburger}>menu</Icon>
							</IconButton>
						)}*/}
            <LogoWithText />
          </div>
          {isAuthenticated ? (
            <SignInLinks user={user} isAuthenticated={isAuthenticated} />
          ) : (
            <SignOutLinks />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, null)(withStyles(styles)(Navigation));
