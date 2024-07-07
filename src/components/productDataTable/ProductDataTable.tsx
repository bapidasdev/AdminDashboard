import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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
    {
      field: 'gallery',
      headerName: 'Gallery',
      width: 400,
      renderCell: (params) => {
        const images = params.row.images;
        if(images?.length > 0) {
          return (<>
            {images?.map((image) => (<img src={image} alt='gallery-image' />))}
          </>)
        }
        else {
          return null;
        }
      }
    }
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
                image: product.image,
                images: product.images,
                category: product.category,
                brand: product.brand,
                colour: product.colour,
                size: product.size,
                uom: product.uom,
                price: product.price,
                rewardPoint: product.rewardPoint,
                productVariants: product.productVariants
            }
        })
        console.log(tempProduct);
        setProducts(tempProduct);
    } catch {
        console.log('coming inside catch block')
    }
}

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

  if(products?.length == 0) {
    return (
      <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={products?.length == 0}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
      </>
    )
  }

  return (
    <div className="productDataTable">
      {products.length>0 && <DataGrid
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

      />}
    </div>
  )
}

export default ProductDataTable
