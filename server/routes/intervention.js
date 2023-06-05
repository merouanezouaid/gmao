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



export { router as interventionRouter };