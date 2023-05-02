const router = require("express").Router();
const md = require("../auth/authMiddleware");
const clientModels = require("./clientModel");

router.get("/", (req, res, next) => {
  const { workStartYear, graduate } = req.query;
  console.log(workStartYear);
  console.log(graduate);
  console.log(typeof workStartYear);
  workStartYear &&
    !graduate &&
    clientModels
      .getByYear(Number(workStartYear))
      .then((response) => res.status(200).json(response))
      .catch((err) => next({ status: 500, message: "database error" }));

  !workStartYear &&
    graduate &&
    clientModels
      .getByGraduate(graduate)
      .then((response) => res.status(200).json(response))
      .catch((err) => next({ status: 500, message: "database error" }));

  workStartYear &&
    graduate &&
    clientModels
      .getTwoCheck(Number(workStartYear), graduate)
      .then((response) => res.status(200).json(response))
      .catch((err) => next({ status: 500, message: "database error" }));

  !workStartYear &&
    !graduate &&
    clientModels
      .getAll()
      .then((response) => res.status(200).json(response))
      .catch((err) => next({ status: 500, message: "database error" }));
});

router.get("/points", (req, res, next) => {
  clientModels
    .getPoints()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database error" }));
});

router.get("/allsuitable", (req, res, next) => {
  clientModels
    .getSuitable()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database error" }));
});

router.post("/", (req, res, next) => {
  clientModels
    .insertClient(req.body)
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database error" }));
});

router.delete("/:id", (req, res, next) => {
  clientModels
    .removeClient(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database error" }));
});

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = router;
