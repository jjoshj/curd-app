import React, { useState, Fragment, useEffect } from "react";
import AddUserForm from "./adduser";
import EditUserForm from "./edituser";
import UserTable from "./usertable";
import Button from "@material-ui/core/Button";
const App = () => {
  // Data
  // const usersData = [
  //   {
  //     id: 1,
  //     name: "Tania",
     
  //     avatar:
  //       "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  //   },
  //   {
  //     id: 2,
  //     name: "Craig",
      
  //     avatar:
  //       "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  //   },
  //   {
  //     id: 3,
  //     name: "Ben",
     
  //     avatar:
  //       "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  //   }
  // ];

  const initialFormState = {
    id: null,
    name: "",
   
    avatar: ""
  };

  // Setting state
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
function getUsers(){
  fetch("https://60f1b8b338ecdf0017b0fd9f.mockapi.io/users" ,{ 
    method:"GET",
  })
  .then((data)=> data.json())
  .then((users)=>setUsers(users));
}

useEffect(()=>{
  getUsers()
},[]);
  // CRUD operations
  const addUser = (user) =>{
    console.log("create user");
    fetch("https://60f1b8b338ecdf0017b0fd9f.mockapi.io/users" ,{ 
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({name: user.name,avatar:user.avatar})
    })
    .then((data)=> data.json())
    
    .then(()=>getUsers());
    setopen(false);
  }
  // const addUser = (user) => {
  //   user.id = users.length + 1;
  //   setUsers([...users, user]);
  //   setopen(false);
  // }
  const deleteUser = (id) =>{
    fetch(`https://60f1b8b338ecdf0017b0fd9f.mockapi.io/users/${id}` ,{ 
      method:"DELETE",
    })
    .then((data)=> data.json())
    .then(user=>console.log(user))
    .then(()=>getUsers());
  }
  // const deleteUser = (id) => {
  //   setEditing(false);

  //   setUsers(users.filter((user) => user.id !== id));
  // };
  const updateUser = (id, user) =>{
    console.log("create user");
    fetch(`https://60f1b8b338ecdf0017b0fd9f.mockapi.io/users/${id}` ,{ 
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({name: user.name,avatar:user.avatar})
    })
    .then((data)=> data.json())
    
    .then(()=>getUsers());
    setopen(false);
    setEditing(false);
  }
  // const updateUser = (id, updatedUser) => {
  //   setEditing(false);

  //   setUsers(users.map((user) => (user.id === id ? updatedUser : user)));

  //   setopen(false);
  // };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    });
  };
  const [open, setopen] = React.useState(false);
  const handleopen = () => {
    setopen(true);
  };
  return (
    <div className="container">
      <Button variant="outlined" onClick={handleopen}>
        add
      </Button>

      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              {open ? (
                <div>
                  <h2>Add user</h2>
                  <AddUserForm addUser={addUser} />
                </div>
              ) : (
                ""
              )}
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};




export default App;
