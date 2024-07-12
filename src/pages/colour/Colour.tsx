import { useState } from 'react'
import DataTable from '../../components/dataTable/DataTable'
import "./colour.scss"
import AddEditModal from '../../components/addEditModal/AddEditModal';

const Colour = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [isproductCreated, setIsproductCreated] = useState<boolean>(false);
    const [editData, setEditData] = useState<any>(null);
  return (
    <div className='colours'>
      <div className="info">
        <h1>Colour</h1>
        <button className="addButton"  onClick={() => setOpen(true)}>ADD New Colour</button>
      </div>
       <DataTable setEditData={setEditData} isproductCreated={isproductCreated} setOpen={setOpen} slug="colours" />
      
      {open && <AddEditModal setEditData={setEditData} editData={editData} setIsproductCreated={setIsproductCreated} setOpen={setOpen} slug="colours" title="Colour" />}
    </div>
  )
}

export default Colour
