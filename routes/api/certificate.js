const express = require('express');
const router = express.Router();
const passportAt = require('passport');

const Certificate = require('../../models/Certificate');
const Application = require('../../models/Application');
const AtUser = require('../../models/AtUser');

  router.post(
      '/:id',
      passportAt.authenticate('atUser', { session: false }),
      (req, res) => {
        Application.findById(req.params.id)
        .then(application =>{
          AtUser.findById(req.user.id)
            .then(atUser => {
            Certificate.findOne({applicationId: req.params.id})
            .then(cert =>{
              if(cert){
                return res.json({exits: "This Applicatiion has Certified Already"});
              }else{
                const newCert = {};
                
                newCert.applicationId = req.params.id;
                newCert.authorityName = atUser.name;
                newCert.companyName = application.companyName;
                newCert.productName = application.name;
                newCert.description = application.description;
                newCert.companyAdd = application.companyAdd;
                new Certificate(newCert)
                .save()
                .then(cert => res.json(cert)
                )
                .catch(err => console.log(err));
              }
            });
          });
          }).catch(err => console.log(err));
        }
  );

  router.get(
    '/:id',
    (req, res) => {
      Certificate.findById(req.params.id)
      .then(certificate=>{
        if(certificate){
          return res.json(certificate);
        }else{
          return res.status(404).json({notFound: "The Product does not have any Certificate"});
        }
      })
      .catch(err=>{
        res.json(err);
      }
      );
    }
  );

  router.get(
    '/userCertificate/:id',
    (req, res) => {
      Certificate.findOne({applicationId: req.params.id})
      .then(cert => {
        if(cert){
          if(cert.rejection){
            return res.status(404).json({notFound: "The Product does not have any Certificat"});
          }else{
          return res.json(cert);
          }
        }else{
          return res.status(404).json({notFound: "The Product does not have any Certificate"});
        }
      })
      .catch(err=>{
        res.json(err);
      }
      );
    }
  );

  router.get(
    '/oneCertificate/:id',
    (req, res) => {
      Certificate.findOne({applicationId: req.params.id})
      .then(cert => {
        if(cert){
          return res.json(cert);
        }else{
          return res.status(404).json({notFound: "The Product does not have any Certificate"});
        }
      })
      .catch(err=>{
        res.json(err);
      }
      );
    }
  );

  router.post(
    '/rejectionReason/:id',
    passportAt.authenticate('atUser', { session: false }),
    (req, res) => {
      console.log(res.body.reason);
          Certificate.findOne({applicationId:req.params.id})
          .then(cert => {
            const newCert = {};
              newCert.applicationId = cert.applicationId;
              newCert.authorityName = cert.authorityName;
              newCert.companyName = cert.companyName;
              newCert.productName = cert.productName;
              newCert.rejectionReason = req.body.reason;

              if(cert) {
                Certificate.findOneAndUpdate(
                  {applicationId: req.params.id},
                  {$set: newCert},
                  {new: true}
                ).then(cert => res.json(cert));
              }
          })
        });

  router.post(
    '/rejection/:id',
    passportAt.authenticate('atUser', { session: false }),
    (req, res) => {
          Certificate.findOne({applicationId:req.params.id})
          .then(cert => {
            const newCert = {};
              newCert.applicationId = cert.applicationId;
              newCert.authorityName = cert.authorityName;
              newCert.companyName = cert.companyName;
              newCert.productName = cert.productName;
              newCert.rejectionReason = cert.rejectionReason;
              newCert.rejection = "Rejected";

              if(cert) {
                Certificate.findOneAndUpdate(
                  {applicationId: req.params.id},
                  {$set: newCert},
                  {new: true}
                ).then(cert => res.json(cert));
              }else{
                Certificate.findOne({rejection: "Rejected"})
                .then(cert =>{
                  if(cert){
                    return res.json({exits: "This Applicatiion has Rejected Already"});
                  }
                  //new Certificate(newCert).save().then(cert => res.json(cert));
                });
              }
          })
        });

  
  module.exports = router;