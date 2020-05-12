/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Avatar,
  Icon,
  Typography,
  Input,
  InputAdornment,
  InputLabel,
  FormControl,
  Button,
  Link,
  Divider,
  TextField,
  MenuItem,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { connect } from "react-redux";
import { signUp } from "../../../store/actions/userActions";
import { clearErrors } from "../../../store/actions/errorActions";
import red from "@material-ui/core/colors/red";

const styles = (theme) => ({
  signUp: {
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
    minWidth: "320px",
  },
  signUpArea: {
    padding: theme.spacing.unit,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  innerWrapper: {
    padding: theme.spacing.unit * 3,
  },
  formTitle: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  avatarLockOpen: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing.unit,
  },
  icon: {
    color: theme.palette.secondary.contrastText,
  },
  button: {
    marginLeft: "auto",
    marginRight: theme.spacing.unit * 2,
  },
  divider: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  signOutFooter: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 4,
  },
  signOutFooterContent: {
    fontSize: "1rem",
  },
  loginLink: {
    paddingLeft: theme.spacing.unit,
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

function SignUp({ classes, error, signUp, clearErrors, isAuthenticated }) {
  const [msg, setMsg] = useState(null);
  const [state, setState] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    job: "",
    country: "",
    agreement: false,
  });

  const handleShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };
  const handleShowConfirmPassword = () => {
    setState({
      ...state,
      showConfirmPassword: !state.showConfirmPassword,
    });
  };

  const handleInput = (event) => {
    //
    //
    setRegister({
      ...register,
      [event.target.name]:
        event.target.type === "checkbox" ? !agreement : event.target.value,
    });
  };

  const jobs = [
    { value: "Engineer", label: "engineer" },
    { value: "teacher", label: "teacher" },
    { value: "footballer", label: "footballer" },
  ];
  const countries = [
    { value: "Poland", label: "Poland" },
    { value: "England", label: "England" },
    { value: "Germany", label: "Germany" },
  ];

  const { showPassword, showConfirmPassword } = state;

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    job,
    country,
    agreement,
  } = register;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      //
      if (error.id === "USER_EXISTS") {
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

  const handleRegister = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMsg("Please provide all required fields");
      return;
    }
    if (password !== confirmPassword) {
      setMsg("Passwords have to be the same");
      return;
    }
    if (agreement !== true) {
      setMsg("Check I agree to the terms of service");
      return;
    }

    const newUser = {
      firstName: register.firstName,
      lastName: register.lastName,
      email: register.email,
      password: register.password,
      confirmPassword: register.confirmPassword,
      phone: register.phone,
      job: register.job,
      country: register.country,
    };

    signUp(newUser);
    clearErrors();
  };

  return (
    <div className={classes.signUp}>
      {isAuthenticated && <Redirect to="/dashboard" />}
      <PageTitle>sign up</PageTitle>
      <Paper elevation={1} className={classes.signUpArea}>
        {msg ? (
          <Typography component="span" variant="body2" className={classes.msg}>
            {msg}
          </Typography>
        ) : null}
        <form onSubmit={handleRegister}>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>
              <div className={classes.innerWrapper}>
                <div className={classes.formTitle}>
                  <Avatar className={classes.avatarLockOpen}>
                    <Icon className={classes.icon}>lock_open</Icon>
                  </Avatar>
                  <Typography component="span" variant="h5">
                    sign up
                  </Typography>
                </div>
                <FormControl fullWidth margin="dense">
                  <InputLabel htmlFor="email">email adress</InputLabel>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    autoFocus
                    autoComplete="email"
                    placeholder="enter email"
                    onChange={handleInput}
                    value={email}
                  />
                </FormControl>
                <FormControl fullWidth margin="dense">
                  <InputLabel htmlFor="password">password</InputLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder="enter password"
                    onChange={handleInput}
                    value={password}
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
                <FormControl fullWidth margin="dense">
                  <InputLabel htmlFor="confirmPassword">
                    confirm password
                  </InputLabel>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="confirm entered password"
                    autoComplete="current-password"
                    onChange={handleInput}
                    value={confirmPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle visibility confirm password"
                          onClick={handleShowConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreement"
                      value="agreement"
                      checked={agreement}
                      onChange={handleInput}
                    />
                  }
                  label="I agree to the terms of service"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.innerWrapper}>
                <Grid container spacing={8}>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      label="first name"
                      placeholder="enter first name"
                      name="firstName"
                      id="firstName"
                      onChange={handleInput}
                      value={firstName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      label="last name"
                      placeholder="enter last name"
                      name="lastName"
                      id="lastName"
                      onChange={handleInput}
                      value={lastName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      label="phone"
                      placeholder="enter phone number"
                      name="phone"
                      id="phone"
                      onChange={handleInput}
                      value={phone}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      label="job"
                      fullWidth
                      value={job}
                      onChange={handleInput}
                      name="job"
                    >
                      {jobs.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      label="country"
                      fullWidth
                      value={country}
                      name="country"
                      onChange={handleInput}
                    >
                      {countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  size="medium"
                  color="secondary"
                >
                  SIGN UP
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
        <Divider className={classes.divider} />
        <div className={classes.signOutFooter}>
          <Typography
            component="p"
            variant="body2"
            className={classes.signOutFooterContent}
          >
            Already have an account.
            <Link
              component={RouterLink}
              to="/users/signin"
              color="secondary"
              className={classes.loginLink}
            >
              Login
            </Link>
          </Typography>
        </div>
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
    signUp: (user) => dispatch(signUp(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUp));
