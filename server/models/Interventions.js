    import mongoose from 'mongoose';

    const interventionSchema = new mongoose.Schema({
    Lieu: { type: String, required: true },
    Materiel: { type: String, required: true },
    Station: { type: String, required: true },
    Priorite: { type: String, required: true },
    Issue: { type: String, required: true },
    Description: { type: String, required: true },
    NomDemandeur: { type: String, required: true },
    assignee: { type: String, required: false },
    status: { type: String, required: false },
    commentaire: { type: String, required: false },
    });

    export const Interventions = mongoose.model('Interventions', interventionSchema);


