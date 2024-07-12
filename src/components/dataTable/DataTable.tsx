import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./dataTable.scss"
import { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  slug: string;
  isproductCreated: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<any>;
}

const DataTable = (props: Props) => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/${props.slug}/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("avinash", data)
        setTableData(data);
      })
      .catch((err) => {
        console.log(err)
      })
      ;
    // getProductsData();
  }, [props.isproductCreated]);

  const handleDelete = (id: number) => {
    console.log(id + "has been delete")
  }

  const columns = [
    { field: 'name', headerName: ' Name', width: 250 },

    {
      field: 'image',
      headerName: 'Image',
      width: 200,
      renderCell: (params:any) => {
        return <img src={params.row.image} alt='img' />
      },
      sortable: false,
      filterable: false
    }
  ];

  const columnsHeading = [
    { field: 'name', headerName: ' Name', width: 250 },

    {
      field: 'image',
      headerName: 'Image',
      width: 200,
      renderCell: (params:any) => {
        return <img src={params.row.image} alt='img' />
      },
      sortable: false,
      filterable: false
    },
    {
      field: 'subCategories',
      headerName: 'SubCategories',
      width: 200,
      renderCell: (params:any) => {
        let subCategories = params.row.subCategories.map(subCategory => subCategory.name);
        return <span>{subCategories.join(", ")}</span>
      },
    },
  ];

//   const getProductsData = async () => {
//     try {
//         const res = await Promise.all([
//             fetch(`http://localhost:8000/api/v1/${props.slug}/`),
//         ]);
//         const data = await Promise.all(res.map(res => res.json()))

//         const tempProduct = data[0]?.map((product: any) => {
//             return {
//                 id: product._id,
//                 name: product.name,
//                 image: product.image,
//                 images: product.images,
//                 category: product.category,
//                 brand: product.brand,
//                 colour: product.colour,
//                 size: product.size,
//                 uom: product.uom,
//                 price: product.price,
//                 rewardPoint: product.rewardPoint,
//                 productVariants: product.productVariants
//             }
//         })
//         setTableData(tempProduct);
//     } catch {
//         console.log('coming inside catch block')
//     }
// }

// useEffect(() => {
//     getProductsData();
// }, [])


  const handleEdit = (params: any) => {
    props.setOpen(true);
    console.log("params", params.row);
    props.setEditData(params.row);
  }

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <img src="/view.svg" alt="" onClick={() => { handleEdit(params) }} />
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
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
        columns={props.slug === 'categories' ? [...columnsHeading, actionColumn] : [...columns, actionColumn]}
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

export default DataTable
