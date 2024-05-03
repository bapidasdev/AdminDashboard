import { useState } from "react";

import DataTable from "../../components/dataTable/DataTable";
import "./subCategory.scss"
import SubCategoryAddEditModal from "../../components/subCategoryAddEditModal/SubCategoryAddEditModal";

const SubCategory = () => {
    const [open, setOpen] = useState(false);
    const [iscategoryCreated, setIscategoryCreated] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    
  return (
    <>
   
    <div className="subCategory">
      <div className="info">
        <h1>SubCategories</h1>
        <button className="addButton" onClick={() => setOpen(true)}>ADD SubCategory</button>
      </div>
       <DataTable setEditData={setEditData}  iscategoryCreated={iscategoryCreated} setOpen={setOpen}  slug="categories"/>
      
      {open && <SubCategoryAddEditModal setEditData={setEditData} editData={editData}  setIscategoryCreated={setIscategoryCreated} setOpen={setOpen} slug="categories" title="SubCategory" />}
    </div>
    </>
  )
}

export default SubCategory
