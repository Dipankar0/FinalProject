const express = require('express');
const router = express.Router();
const passportAt = require('passport');

const Application = require("../../models/Application");

router.get(
  '/:id', 
  passportAt.authenticate('atUser', { session: false }),
  (req, res) => {
      Application.findById(req.params.id).then(application => res.json(application))
      .catch(err => 
        res.status(404).json({noappfound: "There is no application with this id"})
      );
  }
);
router.get(
  '/',
  passportAt.authenticate('atUser', { session: false }), 
  (req, res) => {
      Application.find({atUser: req.user.name})
      .sort({appliedDate: -1})
      .then(applications => res.json(applications))
      .catch(err =>
      res.status(404).json({noappfound: "There is no Application"})
      );
  }
);


module.exports = router;
