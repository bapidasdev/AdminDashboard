import React, { useState } from 'react'
import "./uom.scss"

import SimpleDataTable from '../../components/simpleDataTable/SimpleDataTable';
import SimpleAddEditModal from '../../components/simpleAddEditModal/SimpleAddEditModal';

const Uom = () => {
    const [open, setOpen] = useState(false);
    const [isproductCreated, setIsproductCreated] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    return (
        <div className='uom'>
            <div className="info">
                <h1>Unit of Measure</h1>
                <button className="addButton"  onClick={() => setOpen(true)}>ADD Unit of Measure</button>
            </div>
            <SimpleDataTable setEditData={setEditData} setOpen={setOpen}isproductCreated={isproductCreated} slug="uoms"   />

            {open && <SimpleAddEditModal setEditData={setEditData} editData={editData} setIsproductCreated={setIsproductCreated}
             setOpen={setOpen} slug="uoms" title='Unit Of Measure'/>}
        </div>
    )
}

export default Uom
