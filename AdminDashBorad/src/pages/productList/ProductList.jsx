import React, { useEffect, useState } from "react";
import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
// import { productRows } from "../../dummyData";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Topbar } from "../../Componets/Topbar/Topbar";
import { Sidebar } from "../../Componets/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../../redux/apiCall";
import { truncate } from "../../util";
const ProductList = () => {
  // const [data, setData] = useState(productRows);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const deleteSpecifiedProduct = (id) => {
    // setData(data.filter((item) => item.id !== id));

    deleteProducts(id, dispatch);
    console.log("deleted id=>" + id);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 240,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img src={params.row.img} alt="" className="productListImage" />
            {truncate(params.row.title, 25)}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 150 },
    {
      /*{
      we do not have any status field in DB
      field: "status",
      headerName: "status",
      // type: "number",
      width: 120,}*/
    },
    {
      field: "price",
      headerName: "Price",
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
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => deleteSpecifiedProduct(params.row._id)}
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
        <div className="productList">
          <DataGrid
            rows={products}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
