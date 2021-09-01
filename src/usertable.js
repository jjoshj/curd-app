import React from "react";
import "./styles.css";
import { Button, Card, TablePagination } from "@material-ui/core";
const UserTable = (props) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };
  // function deleteUser (){
  //   fetch(`https://60f1b8b338ecdf0017b0fd9f.mockapi.io/users/${user.id}` ,{ 
  //     method:"DELETE",
  //   })
  //   .then((data)=> data.json())
  //   .then(user=>console.log(user))
  // }
  return (
    <div>
      <div className="users">
        {props.users.length > 0 ? (
          props.users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, index) => (
              <Card className="card">
                <img className="userImage"  src={user.avatar} alt="Remy Sharp" />

                <div>
                  <div className="username">{user.name}</div>
                  
                 
                </div>
                <div className="usersButton">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      props.editRow(user);
                    }}
                    className="button muted-button"
                  >
                    Edit
                  </Button>
                  &nbsp;
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (
                        window.confirm(`do you want delete user ? ${user.name}`)
                      ) {
                        props.deleteUser(user.id);
                      }
                    }}
                    //onClick={() => props.deleteUser(user.id)}
                    className="button muted-button"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))
        ) : (
          <tr>
            <td colSpan={3}>No users</td>
          </tr>
        )}
      </div>

      <TablePagination
        className="px-4"
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={props.users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default UserTable;
