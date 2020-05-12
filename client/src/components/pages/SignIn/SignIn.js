import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Divider from "@material-ui/core/Divider";
import PageTitle from "../../shared/PageTitle/PageTitle";
import red from "@material-ui/core/colors/red";
import { connect } from "react-redux";
import { signin } from "../../../store/actions/userActions";
import { clearErrors } from "../../../store/actions/errorActions";

const styles = (theme) => ({
  signIn: {
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  signInFooter: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
  signInFooterContent: {
    fontSize: "1rem",
  },
  divider: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
  },
  innerWrapper: {
    padding: theme.spacing.unit * 4,
  },
  formTitle: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  formSignIn: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
  },
  formSignInArea: {
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  registerLink: {
    paddingLeft: theme.spacing.unit,
  },
  avatarLock: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing.unit,
  },
  icon: {
    color: theme.palette.secondary.contrastText,
  },
  description: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    marginLeft: "auto",
  },
  msg: {
    backgroundColor: red[500],
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center",
    padding: theme.spacing.unit * 1,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
});

function SignIn({ classes, signin, isAuthenticated, error }) {
  const [state, setState] = useState({ showPassword: false });
  const [login, setLogin] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [msg, setMsg] = useState(null);

  const handleShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  const { showPassword } = state;
  const { email, password, remember } = login;

  const handleInput = (event) => {
    setLogin({
      ...login,
      [event.target.name]:
        event.target.type === "checkbox" ? !remember : event.target.value,
    });
  };

  const handleSignInUser = (event) => {
    event.preventDefault();
    const user = {
      email: login.email,
      password: login.password,
    };
    signin(user);
    //
    clearErrors();
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      //Because I do not want handle every errors
      if (error.id === "USER_DOES_NOT_EXIST") {
        setMsg(error.message);
      } else if (error.id === "INVALID_CREDENTIALS") {
        setMsg(error.message);
      } else if (error.id === "EMPTY_FIELD") {
        setMsg(error.message);
      } else {
        setMsg(null);
      }
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error.id]);
  return (
    <div className={classes.signIn}>
      {isAuthenticated && <Redirect to="/dashboard" />}
      <PageTitle>sign in</PageTitle>
      <Paper elevation={1} className={classes.formSignInArea}>
        {msg ? (
          <Typography component="span" variant="body2" className={classes.msg}>
            {msg}
          </Typography>
        ) : null}
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <div className={classes.innerWrapper}>
              <div className={classes.formTitle}>
                <Avatar className={classes.avatarLock}>
                  <Icon className={classes.icon}>lock</Icon>
                </Avatar>
                <Typography component="span" variant="h5">
                  sign in
                </Typography>
              </div>
              <form className={classes.formSignIn} onSubmit={handleSignInUser}>
                <FormControl fullWidth margin="dense">
                  <InputLabel htmlFor="email">email adress</InputLabel>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleInput}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password">password</InputLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="pasword"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleInput}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle visibility password"
                          onClick={handleShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      name="remember"
                      checked={remember}
                      onChange={handleInput}
                    />
                  }
                  label="Remember me"
                />
                <FormControl fullWidth>
                  <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    size="medium"
                    color="secondary"
                  >
                    SIGN IN
                  </Button>
                </FormControl>
              </form>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.innerWrapper}>
              <Typography component="h2" variant="h6">
                Plan your development and organize your time better.
              </Typography>
              <Typography variant="body2" className={classes.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
                omnis, asperiores numquam ipsa labore rerum saepe necessitatibus
                molestias expedita cupiditate officiis minima veniam ullam
                pariatur ea, vitae inventore dignissimos perspiciatis?
              </Typography>
              <Link component={RouterLink} to="/" color="secondary">
                How it works...
              </Link>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.signInFooter}>
              <Typography
                component="p"
                variant="body2"
                className={classes.signInFooterContent}
              >
                Have not an account yet.
                <Link
                  component={RouterLink}
                  to="/users/signup"
                  color="secondary"
                  className={classes.registerLink}
                >
                  Register for a new account
                </Link>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    isAuthenticated: state.user.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signin: (user) => dispatch(signin(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignIn));
