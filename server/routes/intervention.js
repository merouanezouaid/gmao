import express from "express";
import { ObjectId } from 'mongodb';
import { Interventions } from "../models/Interventions.js";

const router = express.Router();
router.post('/creer', async (req, res) => {
    try {
      // Extract the intervention data from the request body
      const { Lieu, Materiel, Station, Priorite, Issue, Description, NomDemandeur } = req.body;
  
      // Create a new instance of InterventionModel with the extracted data
      const newIntervention = new Interventions({
        Lieu,
        Materiel,
        Station,
        Priorite,
        Issue,
        Description,
        NomDemandeur
      });
  
      // Save the new intervention to the database
      const createdIntervention = await newIntervention.save();
  
      res.status(201).json(createdIntervention);
    } catch (error) {
      console.error('Error creating intervention:', error);
      res.status(500).json({ error: 'An error occurred while creating the intervention' });
    }
  });


router.post('/assigner', async (req, res) => { 

  const id = req.body._id;
  
  try{
    await Interventions.findByIdAndUpdate(id, req.body, {
        new: true, 
    });
    console.log(req.body)
    res.send("updated");
  }
  catch(err) {
    res.send({error: err})
  }
}
);

router.get("/get", async (req, res) => {
    const inters = await Interventions.find();
    res.send(inters);
});


router.post('/delete', async (req, res) => {
  const id = req.body._id;
  try{
    await Interventions.findByIdAndDelete(id).exec();
    res.send("deleted");
  }
  catch(err) {
    res.send({error: err})
  }
})

router.post('/getAssigned', async (req, res) => {
    const user = req.body.user;
    const inters = await Interventions.find({ assignee: user});
    res.send(inters);
})


router.post('/complete', async (req, res) => {
  const id = req.body.selectedRow._id;
  const respo = {
    _id: req.body.selectedRow._id,
    Lieu: req.body.selectedRow.Lieu,
    Materiel: req.body.selectedRow.Materiel,
    Station: req.body.selectedRow.Station,
    Priorite: req.body.selectedRow.Priorite,
    Issue: req.body.selectedRow.Issue,
    Description: req.body.selectedRow.Description,
    NomDemandeur: req.body.selectedRow.NomDemandeur,
    assignee: req.body.selectedRow.assignee,
    status: req.body.status,
    commentaire: req.body.commentaire
  }
  
  try{
    await Interventions.findByIdAndUpdate(id, respo, {
        new: true, 
    });
    console.log(req.body)
    res.send("updated");
  }
  catch(err) {
    res.send({error: err})
  }
})


export { router as interventionRouter };