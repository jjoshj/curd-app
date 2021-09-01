import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./styles.css";
const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

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

        props.updateUser(user.id, user);
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

      <Button variant="outlined" type="submit"
       onClick={() => props.updateUser(user.id,user)} 
      >
        Update user
      </Button>
      <Button
        variant="outlined"
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </Button>
    </form>
  );
};

export default EditUserForm;
