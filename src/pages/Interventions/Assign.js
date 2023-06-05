import React, {useState, useEffect} from "react";
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

import Dropdown from "./Dropdown";

function Assign({formData, setFormData, data}) {
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/auth/users').then((response) => {
      setUsers(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={5}>
            <Dropdown data={formData} setData={setFormData} names={users} inter={data}/>
        </Grid>
      </Box>
    </div>
  );
}
export default Assign;

// number of months
// type de sport

// montant //credit switch button

Assign.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};