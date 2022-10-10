import React, { useMemo } from "react";
import Chart from "../../Componets/charts/Chart";
import "./product.css";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "../../Componets/Sidebar/Sidebar";
import { Topbar } from "../../Componets/Topbar/Topbar";
import { useSelector } from "react-redux";
import { NO_IMAGE, truncate } from "../../util";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";
const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [productStats, setProductStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  // console.log("pId=>", productId);
  console.log("p=>", product);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };

    getStats();
  }, [productId, MONTHS]);
  console.log("prodStats=>", productStats);
  return (
    <>
      <Topbar />
      <div className="Container">
        <Sidebar />
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product Name</h1>
            <Link to="/newProduct">
              <button className="productAddButton">Create</button>
            </Link>
          </div>

          <div className="productTop">
            <div className="productTopLeft">
              <Chart
                data={productStats}
                dataKey="Sales"
                title="Sales Performance"
              />
            </div>
            <div className="productTopRight">
              <div className="productInfoTop">
                <img
                  src={product?.img || NO_IMAGE}
                  alt=""
                  className="productInfoImg"
                />
                <span className="productName">{truncate(product.title)}</span>
              </div>

              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">id:</span>
                  <span className="productInfoValue">{product._id}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">sales:</span>
                  <span className="productInfoValue">5123</span>
                </div>
                {
                  /* <div className="productInfoItem">
                  <span className="productInfoKey">active:</span>
                  <span className="productInfoValue">yes</span>
                </div> */

                  console.log("inStock=>", product.inStock)
                }
                <div className="productInfoItem">
                  <span className="productInfoKey">in stock:</span>
                  <span className="productInfoValue">
                    {product.inStock ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>Product Name</label>
                <input type="text" placeholder={product.title} />
                <label>Product Description</label>
                <input type="text" placeholder={truncate(product.desc)} />
                <label>Product Price</label>
                <input type="text" placeholder={product.price} />

                <label>Category</label>
                <select name="category" id="idCategory">
                  {product.categories.map((cat) => (
                    <option value={cat} key={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <label>Sizes</label>
                <select name="size" id="idSize">
                  {product.size.map((s) => (
                    <option value={s} key={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <label>Color</label>
                <select name="color" id="idColor">
                  {product.color.map((c) => (
                    <option value={c} key={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <label>In Stock</label>
                <select name="inStock" id="idStock">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {/* <label>Active</label>
                <select name="active" id="active">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select> */}
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img
                    src={product.img || NO_IMAGE}
                    alt=""
                    className="productUploadImg"
                  />
                  <label htmlFor="file">
                    <Publish />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="productButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
