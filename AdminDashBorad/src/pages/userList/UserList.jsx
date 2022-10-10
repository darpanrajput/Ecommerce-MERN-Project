import { DataGrid } from "@material-ui/data-grid";
import React, { useState } from "react";
import "./userList.css";
import { userRows } from "../../dummyData";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Sidebar } from "../../Componets/Sidebar/Sidebar";
import { Topbar } from "../../Componets/Topbar/Topbar";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

const UserList = () => {
  const [data, setData] = useState(userRows);
  const deleteSpecifiedUser = (id) => {
    setData(data.filter((item) => item.id !== id));
    console.log("deleted id=" + id);
  };
  /*
  useEffect(() => {
    const getUsers = async () => {
      try {
        console.log("colleed");
        const res = await userRequest.get("user");
        const result = res.data.map(
          ({ _id, email, username, status }, idx) => ({
            id: idx,
            _id: _id,
            username: username,
            avatar: "images/avatar.png",
            email,
            status,
            transaction: `₹${120 * idx}.00`,
          })
        );
        setData(result);
      } catch (err) {
        console.log(err);
      }
      console.log("called");
    };

    getUsers();
  }, []);*/
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "username",

      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img src={params.row.avatar} alt="" className="userImage" />
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "status",
      // type: "number",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction",
      // description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => deleteSpecifiedUser(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Topbar />
      <div className="Container">
        <Sidebar />
        <div className="userList">
          <DataGrid
            sx={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              color: "#EEF1F6",
            }}
            className="datagrid"
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
            // sx={{ color: 'success.dark' }}
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
