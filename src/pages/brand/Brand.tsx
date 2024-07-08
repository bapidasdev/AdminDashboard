import { useState } from "react"

import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'

import "./brand.scss"
import DataTable from "../../components/dataTable/DataTable"
import AddEditModal from "../../components/addEditModal/AddEditModal"

const Brand = () => {

  const [open, setOpen] = useState(false);
  const [iscategoryCreated, setIscategoryCreated] = useState(false)
  const [editData, setEditData] = useState<any>(null);

  return (
    <div className="brands">
      <div className="info">
        <h1>Brand</h1>
        <button className="addButton"
          onClick={() => setOpen(true)}>ADD Brand</button>
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

      <DataTable setEditData={setEditData}
        iscategoryCreated={iscategoryCreated} setOpen={setOpen}
        slug="brands" />

      {open && <AddEditModal setEditData={setEditData}
        editData={editData} setIscategoryCreated={setIscategoryCreated}
        setOpen={setOpen} slug="brands" title="Brand" />}
    </div>
  )
}

export default Brand

