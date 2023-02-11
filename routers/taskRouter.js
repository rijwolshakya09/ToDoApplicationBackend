const express = require("express");
const router = express.Router();

//Model Imports
const auth = require("../middleware/auth");
const uploadFile = require("../file/uploadFile");
const Task = require("../models/taskModel");

// route to add task by user
router.post("/task/add", auth.userGuard, (req, res) => {
  const task_name = req.body.task_name;
  const task_description = req.body.task_description;
  const task_status = req.body.task_status;
  const assigned_to = req.body.assigned_to;
  const userId = req.userInfo._id;

  const data = new Task({
    task_name: task_name,
    task_description: task_description,
    task_status: task_status,
    assigned_to: assigned_to,
    userId: userId,
  });
  data
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        msg: "Task Added Successfully",
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

// route to get task by user that added the task
router.get("/task/getbyUser", auth.userGuard, (req, res) => {
  Task.find({ userId: req.userInfo._id })
    .populate("assigned_to")
    .populate("userId")
    .sort({
      createdAt: "desc",
    })
    .then((task) => {
      res.status(201).json({
        success: true,
        data: task,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// route to get task by all user
router.get("/task/getall", auth.userGuard, (req, res) => {
  Task.find({ userId: req.userInfo._id })
    .populate("userId")
    .then((task) => {
      if (task != null) {
        res.status(200).json({
          success: true,
          data: task,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

router.get("/task/filter/:assigned_to", auth.userGuard, (req, res) => {
  const assigned_to = req.params.assigned_to;
  Task.find({ assigned_to })
  .populate("userId")
    .then((task) => {
      if (task != null) {
        console.log(task);
        res.status(200).json({
          success: true,
          data: task,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

router.get("/task/filter", auth.userGuard, (req, res) => {
  // const assigned_to = req.params.assigned_to;
  Task.find({ assigned_to: req.userInfo._id })
  .populate("userId")
    .then((task) => {
      if (task != null) {
        console.log(task);
        res.status(200).json({
          success: true,
          data: task,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

//Router To Update Task
router.put("/task/update", auth.userGuard, (req, res) => {
  const task_name = req.body.task_name;
  const task_description = req.body.task_description;
  const task_status = req.body.task_status;
  const assigned_to = req.body.assigned_to;
  const id = req.body._id;
  Task.updateOne(
    { _id: id },
    {
      task_name: task_name,
      task_description: task_description,
      task_status: task_status,
      assigned_to: assigned_to,
    }
  )
    .then(() => {
      res.status(201).json({ msg: "Task Updated Successfully", success: true });
    })
    .catch((e) => {
      res.status(400).json({ msg: e });
    });
});

//Router To Delete Task
router.delete("/task/delete/:taskId", auth.userGuard, (req, res) => {
  console.log(req.params.taskId);
  Task.deleteOne({ _id: req.params.taskId })
    .then(() => {
      res.status(201).json({ msg: "Task Deleted Successfully", success: true });
    })
    .catch((e) => {
      res
        .status(400)
        .json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

// router to change status of task
router.put("/task/start", auth.userGuard, (req, res) => {
  Task.updateOne(
    {
      _id: req.body._id,
    },
    {
      task_status: "Started",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Task Started Successfully",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

router.put("/task/complete", auth.userGuard, (req, res) => {
  Task.updateOne(
    {
      _id: req.body._id,
    },
    {
      task_status: "Completed",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Task Completed Successfully",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

module.exports = router;
