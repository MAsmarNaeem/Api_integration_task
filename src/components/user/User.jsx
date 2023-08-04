import React, { useEffect, useState } from "react";
import NavbarCom from "../Layout/navbar";
//import Footer from "../Layout/Footer/footer";
import Table from "react-bootstrap/Table";
import axios from "axios";
import PaginationComponent from "../Pagination/pagination";
import Button from "react-bootstrap/Button";
import UserProfileModal from "../userProfileModal/userProfileModel";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

const User = () => {
  const [usersData, setUsersData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const rowsPerPage = 15;

  const get_users_list = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users?limit=${rowsPerPage}&skip=${skip}`)
      .then((response) => {
        console.log("response:", response.data.users);
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

    get_users_list();
    // eslint-disable-next-line
  }, [skip]);

  const deleteUser = (id) => {
    setUsersData((prevUsersData) =>
      prevUsersData.filter((user) => user.id !== id)
    );
  };

  return (
    <div>
      <NavbarCom />
      <div className=" mt-4 w-55 container-fluid">
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

                <td className="d-flex">
                
                 
                  <UserProfileModal id={user.id} name={<AiOutlineEdit />} className="ms-2" show={false}/>
                  <div variant="none" onClick={() => deleteUser(user.id)}>
                  
                    <AiFillDelete className="text-danger ms-3"  show="false"/>
                    
                  </div>
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
