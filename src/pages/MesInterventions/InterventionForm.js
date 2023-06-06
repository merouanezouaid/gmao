import React, {useEffect} from "react";
import Axios from "axios"
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";

function InterventionForm({formData, setFormData}) {
  // credit

  return (
    <div>
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Lieu"
            value={formData.Lieu || ""}
            onChange={(e) => setFormData({ ...formData, Lieu: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Materiel"
            value={formData.Materiel || ""}
            onChange={(e) => setFormData({ ...formData, Materiel: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={0.5}>
            <TextField
              label="Station"
              value={formData.Station || ""}
              onChange={(e) => setFormData({ ...formData, Station: e.target.value })}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Priorite"
            value={formData.Priorite || ""}
            onChange={(e) => setFormData({ ...formData, Priorite: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Issue"
            value={formData.Issue || ""}
            onChange={(e) => setFormData({ ...formData, Issue: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            value={formData.Description || ""}
            onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nom de Demandeur"
            value={formData.NomDemandeur || ""}
            onChange={(e) => setFormData({ ...formData, NomDemandeur: e.target.value })}
          />
        </Grid>
      </Grid>
    </Box>
  </div>
  
  );
}
export default InterventionForm;

// number of months
// type de sport

// montant //credit switch button

InterventionForm.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};