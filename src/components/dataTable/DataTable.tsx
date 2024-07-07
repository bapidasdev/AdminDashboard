import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss"
import { useEffect, useState } from "react";


type Props = {
  slug: string;
  iscategoryCreated: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<any>;
}

const DataTable = (props: Props) => {
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/${props.slug}/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("avinash",data)
        setTableData(data);
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
    { field: 'name', headerName: ' Name', width: 250 },

    {
      field: 'image',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => {
        return <img src={params.row.image} alt='img' />
      },
      sortable: false,
      filterable: false
    }
  ];

  const categoriesColumns = [
    { field: 'name', headerName: ' Name', width: 250 },

    {
      field: 'image',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => {
        return <img src={params.row.image} alt='img' />
      },
      sortable: false,
      filterable: false
    },
    {
      field: 'subCategories',
      headerName: 'SubCategories',
      width: 200,
      renderCell: (params) => {
        let subCategories = params.row.subCategories.map(subCategory => subCategory.name);
        return <span>{subCategories.join(", ")}</span>
      },
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
        rows={tableData}
        columns={props.slug === 'categories' ? [...categoriesColumns,actionColumn] : [...columns,actionColumn]}
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

export default DataTable
