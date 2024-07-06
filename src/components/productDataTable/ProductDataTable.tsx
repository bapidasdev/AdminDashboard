import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./productDataTable.scss"
import { useEffect, useState } from "react";


type Props = {
  slug: string;
  iscategoryCreated: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<any>;
}


const ProductDataTable = (props: Props) => {
  const [categoryyy, setCategoryyy] = useState([]);

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState('');

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
      field: 'image',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => {
        return <img src={params.row.image} alt='img' />
      },
      sortable: false,
      filterable: false
    },
    // {
    //   field: 'subCategories',
    //   headerName: 'SubCategories',
    //   width: 200,
    // },
   ];

   const getProductsData = async () => {
    try {
        const res = await Promise.all([
            fetch(`http://localhost:8000/api/v1/${props.slug}/`),
        ]);
        const data = await Promise.all(res.map(res => res.json()))

        const tempProduct = data[0]?.map((product: any) => {
            return {
                id: product._id,
                name: product.name,
                image: product.image
            }
        })
        console.log(tempProduct);
        setProducts(tempProduct);
    } catch {
        console.log('coming inside catch block')
        //throw Error("Promise failed");
    }
}

console.log("bapi",products);


useEffect(() => {
    getProductsData();
}, [])

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
    <div className="productDataTable">
      <DataGrid
        className="dataGrid"
        rows={products}
        columns={[...columns,actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
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

export default ProductDataTable
