import { useRef, useState } from "react";
import { Sidebar } from "../../Componets/Sidebar/Sidebar";
import { Topbar } from "../../Componets/Topbar/Topbar";
import { NO_IMAGE } from "../../util";
import "./newProduct.css";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import ProgressBar from "../../Componets/progress/ProgressBar";
import { useDispatch } from "react-redux";
import { addProducts } from "../../redux/apiCall";
import { useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewProduct = () => {
  const [input, setInput] = useState({});
  const price = useRef();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const CAT = useMemo(
    (c) => [
      "men",
      "women",
      "Summer Collection",
      "Men's cloths",
      "Women's cloths",
      "Summer",
    ],
    []
  );

  const SIZES = useMemo((s) => ["XS", "S", "M", "L", "XL", "XXL"], []);

  const COLORS = useMemo(
    (c) => [
      "Black",
      "White",
      "purple-Grey",
      "Yellow",
      "Orange-Black",
      "Red",
      "Pink",
    ],
    []
  );
  // progress
  const [percent, setPercent] = useState(0);
  const handleInputs = (e, inputName = null) => {
    if (inputName != null && inputName === "price") {
      setInput((prev) => {
        return { ...prev, [e.target.name]: parseInt(e.target.value) };
      });
    } else {
      setInput((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const handleCategory = (type, e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: [type[type.indexOf(e.target.value)]] };
    });
  };
  const uploadData = (e) => {
    e.preventDefault();
    //TODO
    const fileName = new Date().getTime() + "-" + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => {
        console.log(err);
        alert(err);
      },
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          // alert("image upload success");
          const product = { ...input, img: url };
          console.log("product=>", product);
          addProducts(product, dispatch);
          toast("🦄 image upload success!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      }
    );
  };

  console.log("input=>", input);
  console.log("file=>", file);
  console.log("progress=>", percent);
  const getFileURL = () => {
    try {
      if (file !== null && file.legnth !== 0) {
        return URL.createObjectURL(file);
      } else {
        return NO_IMAGE;
      }
    } catch (err) {
      console.error(err);
    }
  };

  console.log("price=>", price);
  return (
    <>
      <Topbar />
      <div className="Container">
        <Sidebar />
        <div className="newProduct">
          <h1 className="addProductTitle">New Product</h1>
          <div className="imagePreviewContainer">
            <form className="addProductForm">
              <div className="addProductItem">
                <label>Image</label>
                <input
                  name="img"
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="addProductItem">
                <label>Title</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Product Name"
                  onChange={(e) => handleInputs(e)}
                />
              </div>
              <div className="addProductItem">
                <label>Price</label>
                <input
                  name="price"
                  type="number"
                  placeholder="10"
                  onChange={(e) => handleInputs(e, "price")}
                />
              </div>
              <div className="addProductItem">
                <label>Description</label>
                <input
                  name="desc"
                  type="text"
                  placeholder="Product Description"
                  onChange={(e) => handleInputs(e)}
                />
              </div>
              <div className="addProductItem">
                <label>Stock</label>
                <select name="inStock" onChange={(e) => handleInputs(e)}>
                  <option value="true">Yes</option>
                  <option value="false">NO</option>
                </select>
              </div>

              <div className="addProductItem">
                <label>Catgories</label>
                <select
                  name="categories"
                  defaultValue={CAT[1]}
                  onChange={(e) => handleCategory(CAT, e)}
                >
                  {CAT.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="addProductItem">
                <label>Color</label>
                <select
                  name="color"
                  defaultValue={COLORS[1]}
                  onChange={(e) => handleCategory(COLORS, e)}
                >
                  {COLORS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="addProductItem">
                <label>Size</label>
                <select
                  name="size"
                  defaultValue={SIZES[1]}
                  onChange={(e) => handleCategory(SIZES, e)}
                >
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <button className="addProductButton" onClick={uploadData}>
                Create
              </button>
            </form>
            <div className="PB">
              {percent > 0 && (
                <ProgressBar bgcolor="#6a1b9a" completed={percent} />
              )}

              <img src={getFileURL()} alt="preview" className="imagePreview" />
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* Same as */}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default NewProduct;
