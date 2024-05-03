import "./products.scss"
import { useState } from "react"
import DataTable from "../../components/dataTable/DataTable"
import AddEditModal from "../../components/addEditModal/AddEditModal"
import ProductAddEditModal from "../../components/productAddEditModal/ProductAddEditModal"

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
       <DataTable  setEditData={setEditData}  iscategoryCreated={iscategoryCreated} setOpen={setOpen}  slug="product"/>
      
      {open && <ProductAddEditModal setEditData={setEditData} editData={editData}  setIscategoryCreated={setIscategoryCreated} setOpen={setOpen} slug="product" title="product" />}
    </div>
  )
}

export default Products
