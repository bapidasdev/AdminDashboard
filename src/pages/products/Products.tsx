import "./products.scss"
import { useState } from "react"
// import DataTable from "../../components/dataTable/DataTable"
import ProductAddEditModal from "../../components/productAddEditModal/ProductAddEditModal"
import ProductDataTable from "../../components/productDataTable/ProductDataTable"

const Products = () => {
    const [open, setOpen] = useState(false);
    const [iscategoryCreated, setIscategoryCreated] = useState(false);
    const [editData, setEditData] = useState<any>(null);
  return (
    <div className='products'>
      <div className="info">
        <h1>Product</h1>
        <button className="addButton" onClick={() => setOpen(true)}>ADD Product</button>
      </div>
       {/* <DataTable  setEditData={setEditData}  iscategoryCreated={iscategoryCreated} setOpen={setOpen}  slug="products"/> */}
       <ProductDataTable setOpen={setOpen}  slug="products" setEditData={setEditData}  iscategoryCreated={iscategoryCreated}/>
      
      {open && <ProductAddEditModal setEditData={setEditData} editData={editData}  setIscategoryCreated={setIscategoryCreated} setOpen={setOpen} slug="products" title="product" />}
    </div>
  )
}

export default Products
