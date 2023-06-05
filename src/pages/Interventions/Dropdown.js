import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown({ data, setData, names, inter }) {
  const [user, setUser] = React.useState();

  const handleChange = (event) => {
    setData({ ...inter, assignee: event.target.value });
    setUser(names.user);
  };

  React.useEffect(() => {
    setUser(names);
  }, []);

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="select-basic" size="small">
        {"Assigner à"}
      </InputLabel>
      <Select
        labelId="select-basic"
        id="demo-simple-select"
        value={user}
        label={"Utilisateur"}
        onChange={handleChange}
        size="small"
      >
        {names.map((name) => (
          <MenuItem
            key={name._id}
            value={name.NomComplet}
          >
            {name.NomComplet}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}