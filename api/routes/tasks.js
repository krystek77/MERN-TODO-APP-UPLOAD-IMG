const express = require("express");
const router = express.Router();
// const multer = require("multer");
require("dotenv").config();
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "doydwvtkw",
  api_key: "534261967619197",
  api_secret: "9hYGUFEFVLwchVSnPKkC2wWBsFA",
});
const upload = require("../../helpers/multer");
const Task = require("../models/task");
const auth = require("../middleware/auth");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
// });
//................................................................

//@route	GET tasks/
//@desc		Get all tasks
//@access	Private
router.get("/", auth, (req, res, next) => {
  const userId = req.user.id;
  // console.log(userId);
  Task.find({ userId: userId })
    .select("-__v")
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => {
      res.status(400).json({ message: "Download tasks failed" });
    });
});
//@route	GET tasks/:idTask
//@desc		Get task by id
//@access	Private
router.get("/:idTask", (req, res, next) => {
  const id = req.params.idTask;
  Task.findById(id)
    .select("-__v")
    .then((task) => {
      if (!task)
        return res
          .status(400)
          .json({ message: `Task with id ${id} does not exist` });
      res.status(200).json(task);
    })
    .catch((error) =>
      res.status(400).json({ message: `Searching task with id ${id} failed` })
    );
});
// @route 	POST tasks/
// @desc 	Add new task
// @access 	Private
router.post("/", auth, upload.single("image"), async (req, res, next) => {
  const { title, priority, description, deadline } = req.body;
  const userId = req.user.id;
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log("RESULT", result);
    const task = new Task({
      title: title,
      priority: priority,
      description: description,
      deadline: deadline,
      userId: userId,
      createdAt: new Date().toISOString().slice(0, 10),
      image: result.secure_url,
    });
    await task.save();
    console.log("SAVE");
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
  }
});
//@route DELETE tasks/:idTask
//@desc Delete one task
//@access Private
router.delete("/:idTask", (req, res, next) => {
  const id = req.params.idTask;
  Task.findById(id)
    .then((task) => {
      if (!task)
        return res
          .status(400)
          .json({ message: `Task width id ${id} does not exist` });
      Task.deleteOne({ _id: id })
        .then((result) => {
          console.log("Deleted task succesffuly");
          res
            .status(200)
            .json({ message: "Deleting task successfully", result });
        })
        .catch((error) => {
          console.log("Deleting task failed");
          res.status(400).json({ message: "Deleting task failed" });
        });
    })
    .catch((error) => {
      console.log("Something went wrong...");
      res
        .status(400)
        .json({ message: "Something went wrong..., maybe wrong length of id" });
    });
});
//@route PUT tasks/:idTask
//desc Update task
//access Private
router.put("/:idTask", upload.single("image"), (req, res, next) => {
  const id = req.params.idTask;
  Task.findById(id)
    .then((task) => {
      if (!task)
        return res.status(404).json({ message: "Task does not exist" });

      task.title = req.body.title;
      task.priority = req.body.priority;
      task.deadline = req.body.deadline;
      task.description = req.body.description;
      task.image = req.file ? req.file.path : task.image;
      task.createdAt = req.body.createdAt;
      task.finished = req.body.finished;
      task.updatedAt = req.body.updatedAt;

      task
        .save()
        .then((result) => {
          res.status(200).json({
            task: task,
            message: `Task with id ${id} was updated successfully`,
          });
        })
        .catch((error) =>
          res
            .status(400)
            .json({ message: `Task with id ${id} was not updated` })
        );
    })
    .catch((error) =>
      res.status(404).json({ message: "Something went wrong..." })
    );
});
//@route PUT tasks/finish/:idTask
//@desc Finish task
//@access Private
router.put("/finish/:idTask", (req, res, next) => {
  const id = req.params.idTask;
  Task.findById(id)
    .then((task) => {
      if (!task)
        return res.status(404).json({ message: "Task does not exist" });

      task.title = req.body.title;
      task.priority = req.body.priority;
      task.deadline = req.body.deadline;
      task.description = req.body.description;
      task.createdAt = req.body.createdAt;
      task.finished = req.body.finished;
      task.updatedAt = req.body.updatedAt;

      task
        .save()
        .then((result) => {
          res.status(200).json({
            message: `Task with id ${id} ${
              task.finished ? "was finished" : "was not finished"
            }`,
          });
        })
        .catch((error) =>
          res
            .status(400)
            .json({ message: `Task with id ${id} was not finished` })
        );
    })
    .catch((error) =>
      res.status(404).json({ message: "Something went wrong..." })
    );
});
module.exports = router;
