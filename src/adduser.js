import React, { useState } from "react";
import "./styles.css";
// import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

const AddUserForm = (props) => {
  const initialFormState = {
    id: null,
    name: "",
   
    avatar: ""
  };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Set values
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.name || !user.avatar) return;

        props.addUser(user);
        setUser(initialFormState);
      }}
      className="inputArea"
    >
      <TextField
        fullWidth
        label="Name"
        placeholder="Your first name"
        margin="dense"
        variant="outlined"
        name="name"
        value={user.name}
        onChange={handleInputChange}
        required
      />
     
      
      <TextField
        fullWidth
        label="Image"
        placeholder="Your first name"
        margin="dense"
        variant="outlined"
        name="avatar"
        value={user.avatar}
        onChange={handleInputChange}
        required
      />

      <Button className="addnewuser" variant="outlined" type="submit"
      onClick={() => props.addUser(user)}
      >
        Add new user
      </Button>
      
    </form>
  );
};

export default AddUserForm;