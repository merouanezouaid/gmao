import * as React from "react";
import Axios from "axios"
import Dialog from "@mui/material/Dialog";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import PropTypes from "prop-types";

import Assign from "./Assign";




export default function NewAssign(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  
  const steps = [`Choisissez un utilisateur pour l'intervention: ${props.data.Lieu}, ${props.data.Materiel} `];
  // Memeber state as an object
  const [assign, setAssign] = React.useState();
  
  
  // clear state after closing button and quitting the form
  const clearState = () => {
    setAssign({...props.data,
      assignee: ''
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/intervention/assigner", assign).then(
      (response) => {}
    );
    console.log(assign)

    handleNext();
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
            <Assign formData={assign} setFormData={setAssign} data={props.data} />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    // console.log(userData);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = () => {
    props.toggle();
    clearState();
    setTimeout(() => setActiveStep(0), 500);
  };

  return (
    <div>
      <Dialog open={props.isOpen} onKeyDown={(e)=>{if(e.key === 'Escape'){
        props.toggle();
        setTimeout(() => setActiveStep(0), 500);
      }}}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              marginBottom: 2,
              marginLeft: 4,
              marginRight: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Assigner une intervention
            </Typography>

            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                    L'intervention a été assignée avec succès
                </Typography>
                {/* <Typography variant="subtitle1">
                </Typography> */}

                <Button onClick={handleClose} sx={{ mt: 3, ml: 1 }}>
                  Ok
                </Button>
              </>
            ) : (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Retour
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? "Ajouter" : "Suivant"}
                    </Button>
                  </Box>
                </form>
            )}
          </Box>
        </Container>
      </Dialog>
    </div>
  );
}

NewAssign.propTypes = {
  isOpen: PropTypes.string,
  toggle: PropTypes.string,
};