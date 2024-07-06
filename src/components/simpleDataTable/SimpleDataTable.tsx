import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import"./simpleDataTable.scss"
import { useEffect, useState } from "react";


type Props = {
  slug: string;
  iscategoryCreated: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<any>;
  
}

const SimpleDataTable = (props: Props) => {

    const [categoryyy, setCategoryyy] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:8000/api/v1/${props.slug}/`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setCategoryyy(data);
        })
        .catch((err) => {
          console.log(err)
        })
        ;
    }, [props.iscategoryCreated]);
  
      const handleDelete =(id:number)=>{
        console.log(id + "has been delete")
      }

    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: ' Name', width: 250 },
    
       
        {
          field: 'subCategories',
          headerName: 'SubCategories',
          width: 200,
        },
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
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={categoryyy}
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

      />
    </div>
  )
}

export default SimpleDataTable
