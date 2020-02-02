const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');

const Application = require("../../models/Application");
const User = require('../../models/User');
const Certificate = require('../../models/Certificate');

const validateApplicatioinInput = require("../../validation/application");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './client/src/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post("/halalapplication", 
passport.authenticate('user', { session: false }),
upload.any(),
(req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateApplicatioinInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }else{
  let ingriName, ingriCompany, ingriCompanyAdd;
  if(req.body.ingredients){
    req.body.ingredients.map(ingredient => {
      console.log(ingredient);
      if(ingredient.ingreCert){
        Certificate.findById(ingredient.ingreCert)
        .then(cert => {
          console.log(cert);
        if(cert){
        ingriName = cert.productName;
        ingriCompany = cert.companyName;
        ingriCompanyAdd = cert.companyAdd;
        }else{
          return res.json({exits: "The Ingridient ID is not Correct"});
        }
        });
      }else{
        if(ingredient.nameOfIngre) ingriName = ingredient.nameOfIngre;
        if(ingredient.ingreCompany) ingriCompany = ingredient.ingreCompany;
        if(ingredient.ingreCompanyAdd) ingriCompanyAdd = ingredient.ingreCompanyAdd;
      }
    })
  }

  User.findById(req.user.id)
  .then(user =>{
    Application.findOne({ name: req.body.name }).then(application => {
      if (application) {
        errors.name = "Product already exists";
        return res.status(400).json(errors);
      } else {
        const newApplication = {};
        console.log(req.body);
          newApplication.user = req.user.id;
          newApplication.companyName = user.name;
          newApplication.companyAdd = user.address;
          if(req.body.authority) newApplication.atUser =req.body.authority;
          if(req.body.name) newApplication.name =req.body.name;
          if(req.body.description) newApplication.description =req.body.description;
          if(req.body.typeOfPacket) newApplication.typeOfPacket =req.body.typeOfPacket;

          if(req.body.ingreCert){
            if(ingriName){
              newApplication.nameOfIngre = ingriName;
            }
            if(ingriCompany){
              newApplication.ingreCompany = ingriCompany;
            }
            if(ingriCompanyAdd){
              newApplication.ingreCompanyAdd = ingriCompanyAdd;
            }
          }
         
          if(req.body.nameOfIngre) newApplication.nameOfIngre = req.body.nameOfIngre;
          if(req.body.ingreCompany) newApplication.ingreCompany = req.body.ingreCompany;
          if(req.body.ingreCompanyAdd)newApplication.ingreCompanyAdd = req.body.ingreCompanyAdd;
    
          if(req.files){
            req.files.forEach(file => {
              if(file.fieldname === 'veteCertificate'){
                newApplication.veteCertificate = file.filename;
              }
              if(file.fieldname === 'finanStatement'){
                newApplication.finanStatement = file.filename;
              }
              if(file.fieldname === 'citizenId'){
                newApplication.citizenId = file.filename
              }
              if(file.fieldname === 'citizenLetter'){
                newApplication.citizenLetter = file.filename
              }
            });
        };
        new Application(newApplication)
          .save()
          .then(application => res.json(application))
          .catch(err => console.log(err));
      }
    });
  })
  .catch(err => console.log(err));
}}
);


router.get(
  '/:id', 
  (req, res) => {
      Application.findById(req.params.id).then(application => res.json(application))
      .catch(err => 
        res.status(404).json({noappfound: "There is no application with this id"})
      );
  }
);
router.get(
  '/', 
  passport.authenticate('user', { session: false }),
  (req, res) => {
      Application.find({user: req.user.id})
      .sort({appliedDate: -1})
      .then(applications => res.json(applications))
      .catch(err =>
      res.status(404).json({noappfound: "There is no Application"})
      );
  }
);

module.exports = router;
