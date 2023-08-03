import React, { useEffect, useState } from "react";
import NavbarCom from "../Layout/navbar";
//import Footer from "../Layout/Footer/footer";
import Table from "react-bootstrap/Table";
import axios from "axios";
import PaginationComponent from "../Pagination/pagination";
import Button from "react-bootstrap/Button";
import UserProfileModal from "../userProfileModal/userProfileModel";

const User = () => {
  const [usersData, setUsersData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const rowsPerPage = 15;


  const getapi = () => {
    axios
      .get(`https://dummyjson.com/users?limit=${rowsPerPage}&skip=${skip}`)
      .then((response) => {
        setPageCount(Math.ceil(response.data.total / rowsPerPage));
        setUsersData(response.data.users);
      });
  };
  const handlePageChange = (selectedPage) => {
    setSkip((selectedPage - 1) * rowsPerPage);
  };

  useEffect(() => {
    // eslint-disable-next-line
    //  GetProducts(currentPage);
    // eslint-disable-next-line

    getapi();
    // eslint-disable-next-line
  }, [skip]);
  const editUser = (id) => {
    {console.log("myid:",id)}
    return <UserProfileModal idd={id} name="edit" />;
  };
  const deleteUser = (id) => {
   
    setUsersData((prevUsersData) => prevUsersData.filter((user) => user.id !== id));
  };

  return (
    <div>
      <NavbarCom />
      <div className="text-center mt-4 w-55 container-fluid">
        <h1>Users</h1>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>

                <td>
                  {" "}
                 
                  <Button
                    variant="info"
                   
                  >
                    {editUser(user.id)}
                  </Button>{" "}
                  <Button variant="info" 
                  onClick={()=>deleteUser(user.id)}>delete</Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <PaginationComponent
        onPageChange={handlePageChange}
        pageCount={pageCount}
        itemsPerPage={rowsPerPage}
      />
      {/* <div className="position-relative">
        <Footer />
      </div> */}
    </div>
  );
};

export default User;
