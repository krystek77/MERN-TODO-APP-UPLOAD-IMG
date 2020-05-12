import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PageTitle from "../../shared/PageTitle/PageTitle";
import DoneTasksList from "../../shared/DoneTasksList/DoneTasksList";
import { connect } from "react-redux";

const styles = (theme) => ({
  todoTasks: {
    maxWidth: "1280px",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

function DoneTasks(props) {
  const { classes, tasks, isAuthenticated } = props;
  const finished = tasks.filter((task) => task.finished === true);
  //
  useEffect(() => {
    if (!isAuthenticated) props.history.push("/users/signin");
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  //
  return (
    <div className={classes.todoTasks}>
      <PageTitle>done tasks list</PageTitle>
      <DoneTasksList tasks={finished} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
});

export default connect(mapStateToProps)(withStyles(styles)(DoneTasks));
