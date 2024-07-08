import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductAddEditModal from "../../components/productAddEditModal/ProductAddEditModal"
import ProductDataTable from "../../components/productDataTable/ProductDataTable"
import "./products.scss";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  return (
    <div className='products'>
      <div className="info">
        <h1>Product</h1>
        <button className="addButton"
          onClick={() => setOpen(true)}>ADD Product</button>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ProductDataTable setOpen={setOpen}
        slug="products" setEditData={setEditData}
        isProductCreated={isProductCreated} />
      {open &&
        <ProductAddEditModal
          setEditData={setEditData}
          editData={editData}
          setIsProductCreated={setIsProductCreated}
          setOpen={setOpen}
          slug="products"
          title="product"
        />}
    </div>
  )
}

export default Products
