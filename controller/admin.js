const { Router } = require("express");

const adminServices = require("../services/admin");

const router = Router({ strict: true });

router.post("/addtask",adminServices.addTask)
router.get("/gettasks",adminServices.getAllTasks);
router.get("/gettask/:id",adminServices.getAllTaskById)
router.put("/updatetask/:id",adminServices.updateTask);
router.delete("/deletetask/:id",adminServices.deleteTask);

module.exports = router;
