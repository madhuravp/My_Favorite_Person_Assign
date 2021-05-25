const { Router } = require("express");
const { FavPerson, validateFavPerson } = require("../models/FavPerson");
const router = Router();

/*
Returns all the people saved in the database
*/
router.get("/", async (req, res, next) => {
  try {
    FavPerson.find({}, (err, foundEntry) => {
      res.json(foundEntry);
    });
  } catch (error) {
    next(error);
  }
});

/* 
Posts data from the front end to save a new person entry 
*/
router.post("/", async (req, res, next) => {
  try {
    log(req.body);
    const { error } = validateFavPerson(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let favPerson = new FavPerson(req.body);
    const createdFavPerson = await favPerson.save();
    res.send(createdFavPerson);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

/* 
Puts data from the front end to edit an existing person entry
*/

router.put("/:id", async (req, res, next) => {
  try {
    log(req.body);
    const { error } = validateFavPerson(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let id = req.params.id;
    console.log(id);
    let favPersonUpdated = await FavPerson.findByIdAndUpdate(
      id,
      req.body,
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

/* 
Delete request functionality
*/
router.delete("/:id", async (req, res, next) => {
  try {
    //log(req.body);
    let id = req.params.id;
    console.log(id);
    FavPerson.findByIdAndDelete(id, req.body, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log("Deleted : ");
        res.send(result);
      }
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

function log(message) {
  // TODO console log will be replaced/supplemented by true application logging mechanism
  console.log(message);
}

module.exports = router;
