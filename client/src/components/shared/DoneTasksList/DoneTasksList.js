import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import DoneTask from "./DoneTask/DoneTask";
import Task from "../Task/Task";

const styles = (theme) => ({
  doneTaskWrapper: {
    padding: theme.spacing.unit * 2,
    backgroundColor: "rgba(255,255,255,0.8)",
    overflowX: "scroll",
    width: "100%",
  },
  table: {
    padding: "0px",
  },
  tableHead: {
    fontSize: "1rem",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
});

function DoneTasksList(props) {
  const { classes, tasks } = props;

  //

  return (
    <Paper classes={{ root: classes.doneTaskWrapper }}>
      <Table classes={{ root: classes.table }}>
        <TableHead>
          <TableRow>
            <TableCell classes={{ head: classes.tableHead }}>Lp.</TableCell>
            <TableCell classes={{ head: classes.tableHead }}>Title</TableCell>
            <TableCell classes={{ head: classes.tableHead }}>
              Priority
            </TableCell>
            <TableCell classes={{ head: classes.tableHead }}>
              Created At
            </TableCell>
            <TableCell classes={{ head: classes.tableHead }}>
              Updated At
            </TableCell>
            <TableCell classes={{ head: classes.tableHead }}>
              Deadline
            </TableCell>
            <TableCell classes={{ head: classes.tableHead }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length > 0
            ? tasks.map((task, index) => {
                return (
                  <DoneTask key={task._id}>
                    <Task task={task} index={index} />
                  </DoneTask>
                );
              })
            : null}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(DoneTasksList);
