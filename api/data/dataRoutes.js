const router = require("express").Router();
const dataModel = require("./dataModel");
const mw = require("./dataMiddleware");

router.get("/jobs", (req, res, next) => {
  dataModel
    .getAllJob()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database error" }));
});

router.post("/jobs", mw.jobCheckPayload, (req, res, next) => {
  dataModel
    .insertJob(req.body)
    .then((response) => res.status(201).json(response))
    .catch((err) => next({ status: 500, message: "database error" }));
});

router.put("/jobs/:id", mw.jobIdCheck, mw.jobCheckPayload, (req, res, next) => {
  dataModel
    .updateJob(req.params.id, req.body)
    .then((response) => res.status(201).json(response))
    .catch((err) => next({ status: 500, message: "database error" }));
});

router.get("/sectors", (req, res, next) => {
  dataModel
    .getAllSector()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database error" }));
});

router.post("/sectors", mw.sectorCheckPayload, (req, res, next) => {
  dataModel
    .insertSector(req.body)
    .then((response) => res.status(201).json(response))
    .catch((err) => next({ status: 500, message: "database error" }));
});

router.put(
  "/sectors/:id",
  mw.sectorIdCheck,
  mw.sectorCheckPayload,
  (req, res, next) => {
    dataModel
      .updateSector(req.params.id, req.body)
      .then((response) => res.status(201).json(response))
      .catch((err) => next({ status: 500, message: "database error" }));
  }
);

router.get("/priorities", (req, res, next) => {
  dataModel
    .getAllPriorities()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database error" }));
});

router.post(
  "/priorities",
  mw.priorityCheckPayload,
  mw.priorityCheck,
  (req, res, next) => {
    dataModel
      .insertPriorities(req.body)
      .then((response) => res.status(201).json(response))
      .catch((err) => next({ status: 500, message: "database error" }));
  }
);

router.put(
  "/priorities/:id",
  mw.priorityIdCheck,
  mw.priorityCheckPayload,
  mw.priorityCheck,
  (req, res, next) => {
    dataModel
      .updatePriorities(req.params.id, req.body)
      .then((response) => res.status(201).json(response))
      .catch((err) => next({ status: 500, message: "database error" }));
  }
);

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = router;
