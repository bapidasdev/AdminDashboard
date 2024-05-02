import { useState } from "react"
import DataTable from "../../components/dataTable/DataTable"
import "./categories.scss"
import AddEditModal from "../../components/addEditModal/AddEditModal"


const Categories = () => {
  const [open, setOpen] = useState(false);
 const [iscategoryCreated, setIscategoryCreated] = useState(false);
 const [editData, setEditData] = useState<any>(null);

  return (
    <div className="categories">
      <div className="info">
        <h1>Categories</h1>
        <button className="addButton" onClick={() => setOpen(true)}>ADD Category</button>
      </div>
       <DataTable setEditData={setEditData}  iscategoryCreated={iscategoryCreated} setOpen={setOpen}  slug="categories"/>
      
      {open && <AddEditModal setEditData={setEditData} editData={editData}  setIscategoryCreated={setIscategoryCreated} setOpen={setOpen} slug="categories" title="Category" />}
    </div>
  )
}

export default Categories
