import { DataGrid, GridColDef } from "@mui/x-data-grid";
import"./simpleDataTable.scss"
import { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from '@mui/material/CircularProgress';


type Props = {
  slug: string;
  isproductCreated: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<any>;
  
}

const SimpleDataTable = (props: Props) => {

    const [tableData, setTableData] = useState(null);
    useEffect(() => {
      fetch(`http://localhost:8000/api/v1/${props.slug}/`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setTableData(data);
        })
        .catch((err) => {
          console.log(err)
        })
        ;
    }, [props.isproductCreated]);
  
      const handleDelete =(id:number)=>{
        console.log(id + "has been delete")
      }

    const columns = [
        { field: 'name', headerName: ' Name', width: 250 },
      ];
    
      const handleEdit = (params: any) => {
        props.setOpen(true);
        console.log("params",params.row);
        props.setEditData(params.row);
      }
    
    const actionColumn:GridColDef = {
        field:"action",
        headerName:"Action",
        width: 200,
        renderCell:(params)=>{
          return(
            <div className="action">
              <img  src="/view.svg" alt="" onClick={() => {handleEdit(params)}} />
              <div className="delete" onClick={()=>handleDelete(params.row.id)}>
                <img src="/delete.svg" alt="" />
              </div>
            </div>
          )
        }
      }



      if (!tableData) {
        return (
          <>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={!tableData}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </>
        )
      }
    
      if(tableData?.length === 0) {
        return (
          <>
            <div className="noProductText">No Product...</div>
          </>
        )
      }




  return (
    <div className="dataTable">
    {tableData?.length > 0 && <DataGrid
        className="dataGrid"
        rows={tableData}
        columns={[...columns,actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector

      />}
    </div>
  )
}

export default SimpleDataTable
