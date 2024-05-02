import React, { useState } from 'react'
import "./size.scss"
import SimpleDataTable from '../../components/simpleDataTable/SimpleDataTable';
import SimpleAddEditModal from '../../components/simpleAddEditModal/SimpleAddEditModal';

const Size = () => {
  const [open, setOpen] = useState(false);
  const [iscategoryCreated, setIscategoryCreated] = useState(false)
  const [editData, setEditData] = useState<any>(null);
  return (
    <div className='sizes'>
      <div className="info">
        <h1>Size</h1>
        <button className="addButton"  onClick={() => setOpen(true)}>ADD Size</button>
      </div>
      <SimpleDataTable setEditData={setEditData} setOpen={setOpen} iscategoryCreated={iscategoryCreated} slug="sizes"  />

      {open && <SimpleAddEditModal setEditData={setEditData} editData={editData} setIscategoryCreated={setIscategoryCreated} setOpen={setOpen} slug="sizes" title='Size' />}
    </div>
  )
}

export default Size
