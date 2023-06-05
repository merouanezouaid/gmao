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

function UserForm({formData, setFormData}) {
  // credit

  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
            <TextField label="ID"
            type="number"
            value={formData.id || "" }
            onChange={(e) => setFormData({ ...formData, id: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={12} sm={6}/>
          <Grid item xs={12} sm={6}>
            <TextField label="Nom Complet"
            value={formData.NomComplet || "" }
            onChange={(e) => setFormData({ ...formData, NomComplet: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={0.5}>
                <TextField label="Entreprise"
                value={formData.Entreprise || "" }
                onChange={(e) => setFormData({ ...formData, Entreprise: e.target.value })}
                />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" 
            value={formData.Email || "" }
            onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Mot de passe" type="password" id="pwd"
            value={formData.MotDePasse || "" }
            onChange={(e) => setFormData({ ...formData, MotDePasse: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Role"
              id="role"
              type="text"
              value={formData.Role || "" }
              onChange={(e) => setFormData({ ...formData, Role: e.target.value })}
              
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
export default UserForm;

// number of months
// type de sport

// montant //credit switch button

UserForm.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};