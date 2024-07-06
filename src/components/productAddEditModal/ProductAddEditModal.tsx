import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { InputLabel, MenuItem } from '@mui/material';
import "./productAddEditModal.scss"
import { MdDelete } from 'react-icons/md';

type Props = {
    slug: string;
    //columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIscategoryCreated: React.Dispatch<React.SetStateAction<boolean>>;
    editData: any;
    setEditData: React.Dispatch<any>;
    title: string
}

const ProductAddEditModal = (props: Props) => {
    const [name, setName] = useState<string>(props.editData?.name ? props.editData?.name : '');
    const [imageURL, setImageURL] = useState<string | null>(props.editData?.image ? props.editData?.image : null);
    const [image, setImage] = useState<string | File | null>(props.editData?.image ? props.editData?.image : null);


    const [loading, setLoading] = useState(false)

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState('');

    const [colours, setColours] = useState([]);
    const [selectedColours, setSelectedColours] = useState('');

    const [sizes, setSizes] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState('');

    const [uoms, setUoms] = useState([]);
    const [selectedUoms, setSelectedUoms] = useState('');

    const [productPrice, setProductPrice] = useState("");
    const [productRewardPoint, setProductRewardPoint] = useState("");

    // const [products, setProducts] = useState([]);
    // const [selectedProducts, setSelectedProducts] = useState('');

    const [productVariants, setProductVariants] = useState([]);

    // const [imageURLMultiple, setImageURLMultiple] = useState<string | null>(props.editData?.image ? props.editData?.image : null);
    const [productGalleryImages, setProductGalleryImages] = useState(null);
    const [productGalleryImagesURL, setProductGalleryImagesURL] = useState(null);
    const productGalleryImageRef = useRef(null);

    const handleProductGalleryImage = (e: any) => {
        setProductGalleryImages(e.target.files);
        let tempURLs = [];
        for (let i = 0; i < e.target.files.length; i++) {
            tempURLs.push(URL.createObjectURL(e.target.files[i]));
        }
        setProductGalleryImagesURL(tempURLs);
    }

    const handleRemoveProductGalleryImage = () => {
        setProductGalleryImagesURL(null);
        setProductGalleryImages('');
        productGalleryImageRef.current.value = "";
    }
    // const [imageMultiple, setImageMultiple] = useState<string | File | null>(props.editData?.image ? props.editData?.image : null);

   

    // ________________________________________________________________________________________________________________________
    const getCategoryData = async () => {
        try {
            const res = await Promise.all([
                fetch("http://localhost:8000/api/v1/categories/"),
            ]);
            const data = await Promise.all(res.map(res => res.json()))

            //console.log("Data: ", data);
            const tempCategories = data[0]?.map((category: any) => {
                return {
                    label: category.name,
                    value: category.id,
                    subCategories: category.subCategories,
                }
            })
            setCategories(tempCategories);
        } catch {
            console.log('coming inside catch block')
            //throw Error("Promise failed");
        }
    }
    useEffect(() => {
        getCategoryData();
    }, [])
    // ________________________________________________________________________________________________________________________
    const getBrandsData = async () => {
        try {
            const res = await Promise.all([
                fetch("http://localhost:8000/api/v1/brands/"),
            ]);
            const data = await Promise.all(res.map(res => res.json()))

            // console.log("Data: ", data);
            const tempCategories = data[0]?.map((brand: any) => {
                return {
                    label: brand.name,
                    value: brand.id,
                    subCategories: brand.subCategories,
                }
            })
            setBrands(tempCategories);
        } catch {
            console.log('coming inside catch block')
            //throw Error("Promise failed");
        }
    }
    useEffect(() => {
        getBrandsData();
    }, [])
    // ________________________________________________________________________________________________________________________
    const getColoursData = async () => {
        try {
            const res = await Promise.all([
                fetch("http://localhost:8000/api/v1/colours/"),
            ]);
            const data = await Promise.all(res.map(res => res.json()))

            // console.log("Data: ", data);
            const tempCategories = data[0]?.map((colour: any) => {
                return {
                    label: colour.name,
                    value: colour.id,
                    subCategories: colour.subCategories,
                }
            })
            setColours(tempCategories);
        } catch {
            console.log('coming inside catch block')
            //throw Error("Promise failed");
        }
    }
    useEffect(() => {
        getColoursData();
    }, [])
    // ________________________________________________________________________________________________________________________

    // ________________________________________________________________________________________________________________________
    const getSizesData = async () => {
        try {
            const res = await Promise.all([
                fetch("http://localhost:8000/api/v1/sizes/"),
            ]);
            const data = await Promise.all(res.map(res => res.json()))

            // console.log("Data: ", data);
            const tempCategories = data[0]?.map((size: any) => {
                return {
                    label: size.name,
                    value: size.id,
                    subCategories: size.subCategories,
                }
            })
            setSizes(tempCategories);
        } catch {
            console.log('coming inside catch block')
            //throw Error("Promise failed");
        }
    }
    useEffect(() => {
        getSizesData();
    }, [])
    // ________________________________________________________________________________________________________________________

    // ________________________________________________________________________________________________________________________
    const getUomsData = async () => {
        try {
            const res = await Promise.all([
                fetch("http://localhost:8000/api/v1/uoms/"),
            ]);
            const data = await Promise.all(res.map(res => res.json()))

            //console.log("Data: ", data);
            const tempCategories = data[0]?.map((uom: any) => {
                return {
                    label: uom.name,
                    value: uom.id,
                    subCategories: uom.subCategories,
                }
            })
            setUoms(tempCategories);
        } catch {
            console.log('coming inside catch block')
            //throw Error("Promise failed");
        }
    }
    useEffect(() => {
        getUomsData();
    }, [])
    

    //console.log("categories: ", categories)
    useEffect(() => {
        props.setIscategoryCreated(false);
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: ' Name', width: 250, value: name, changeHandler: (value: string) => setName(value) }
    ]

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //performing ADD
        if (props.editData == null) {
            props.setOpen(false)
            if (name === '') {
                console.log("name is required!!!!");
                return;
            }
            let data = new FormData();
            image && data.append("image", image); //bypass this line for UoM and size
            data.set("name", name);
            //data append korbo
            selectedBrands !== '' && data.set("brand", selectedBrands);
            selectedColours !== '' && data.set("colour", selectedColours);
            selectedSizes !== '' && data.set("size", selectedSizes);
            selectedUoms !== '' && data.set("uom", selectedUoms);
            productPrice !== '' && data.set("price", productPrice);
            productRewardPoint !== '' && data.set("rewardPoint", productRewardPoint);
            data.set("productVariants", JSON.stringify(productVariants));
            data.set("category", selectedCategory);
            setLoading(true)
            axios.post(`http://localhost:8000/api/v1/${props.slug}/`, data).then(

                res => {
                    console.log("bapi", res.data);
                    props.setIscategoryCreated(true)
                    setLoading(false);
                }).catch(err => {
                    console.log(err);
                    props.setIscategoryCreated(false)
                    setLoading(false);
                })
        } else {
            //performing EDIT
            props.setOpen(false)
            if (name === '') {
                console.log("name is required!!!!");
                return;
            }
            let data = new FormData();
            image && typeof (image) === 'object' && data.append("image", image); //bypass this line for UoM and size
            data.set("name", name);
            console.log("data before sending in the payload: ", data)
            setLoading(true)
            axios.put(`http://localhost:8000/api/v1/${props.slug}/${props.editData.id}/`, data).then(
                res => {
                    console.log(res.data);
                    props.setIscategoryCreated(true)
                    setLoading(false)
                }).catch(err => {
                    console.log(err);
                    props.setIscategoryCreated(false)
                    setLoading(true)
                })
        }
    }

    const handleClose = () => {
        props.setOpen(false);
        props.setEditData(null);
    }
    console.log("selectedCategory ", selectedCategory)

    const handleSelectCategory = (e: any) => {
        console.log("value inside handleSelect", e.target.value)
        setSelectedCategory(e.target.value)
    }

    const handleSelectBrand = (e: any) => {
        console.log("value inside handleSelect", e.target.value)
        setSelectedBrands(e.target.value)
    }

    const handleSelectColour = (e: any) => {
        console.log("value inside handleSelect", e.target.value)
        setSelectedColours(e.target.value)
    }

    const handleSelectSize = (e: any) => {
        console.log("value inside handleSelect", e.target.value)
        setSelectedSizes(e.target.value)
    }

    const handleSelectUoms = (e: any) => {
        console.log("value inside handleSelect", e.target.value)
        setSelectedUoms(e.target.value)
    }


    // Addvariant

    const handleAddVariant = (e: any) => {
        e.preventDefault();
        setProductVariants([...productVariants, { colour: '', size: '', uom: '', price: '', packingUnit: '', rewardPoint: '' }])
    }

    const handleVariantChange = (value: any, key: any, index: any) => {
        let tempProductVariants = [...productVariants];
        tempProductVariants[index][key]  = ['price', 'packingUnit', 'rewardPoint'].includes(key) ? value : value.id;
        tempProductVariants[index][`${key}Value`] = !['price', 'packingUnit', 'rewardPoint'].includes(key) ? value : undefined;
        setProductVariants(tempProductVariants);
    }

    const handleDeleteVariant = (index: any) => {
        let tempProductVariants = [...productVariants];
        tempProductVariants = tempProductVariants.filter((variant, i) => {
            return i != index;
        });
        setProductVariants(tempProductVariants);
    }
    
    

    return (
        <>
            {loading && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}

            <div className="add">
                <div className="modal">
                    <span className="close" onClick={() => handleClose()}>
                        X
                    </span>
                    <h1>Add New {props.title} </h1>
                    
                    <form onSubmit={handleSubmit}>
                        {columns
                            .filter((item) => item.field !== "id" && item.field !== "img")
                            .map((column) => (
                                <div className="item">
                                    <label>{column.headerName}</label>
                                    <input className='productInputField' type="text" placeholder={column.field} value={column.value} onChange={e => column.changeHandler && column.changeHandler(e.target.value)} />
                                </div>
                            ))}
                        {/* //hide this below image section for UoM and size */}


                        {/* ____________________________ ____________________________ ____________________________ */}
                        <div style={{ marginTop: "20px" }}>

                            <FormControl >
                                <InputLabel id="category-select" style={{ color: 'white' }}>Category</InputLabel>
                                <Select
                                    className='productDropDown'

                                    labelId="category-select"
                                    id="select"
                                    value={selectedCategory}
                                    label="Category"
                                    onChange={handleSelectCategory}
                                >
                                    {categories?.map((item, index) => (<MenuItem key={index} value={item?.value}>{item?.label}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>




                        <div>
                            <FormControl>
                                <InputLabel id="category-select" style={{ color: 'white' }}>Brand</InputLabel>
                                <Select
                                    style={{ width: '250px' }}
                                    className='productDropDown'
                                    labelId="category-select"
                                    id="select"
                                    value={selectedBrands}
                                    label="Category"
                                    onChange={handleSelectBrand}
                                >
                                    {brands?.map((item, index) => (<MenuItem key={index} value={item?.value}>{item?.label}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>


                        <div>
                            <FormControl>
                                <InputLabel id="category-select" style={{ color: 'white' }}>Colour</InputLabel>
                                <Select
                                    className='productDropDown'
                                    labelId="category-select"
                                    id="select"
                                    value={selectedColours}
                                    label="Category"
                                    onChange={handleSelectColour}
                                >
                                    {colours?.map((item, index) => (<MenuItem key={index} value={item?.value}>{item?.label}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>


                        <div>
                            <FormControl>
                                <InputLabel id="category-select" style={{ color: 'white' }}>Size</InputLabel>
                                <Select
                                    style={{ width: '250px', marginTop: "10px" }}
                                    className='productDropDown'
                                    labelId="category-select"
                                    id="select"
                                    value={selectedSizes}
                                    label="Category"
                                    onChange={handleSelectSize}
                                >
                                    {sizes?.map((item, index) => (<MenuItem key={index} value={item?.value}>{item?.label}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>


                        <div>
                            <FormControl >
                                <InputLabel id="category-select" style={{ color: 'white' }}>Unit Of Measure</InputLabel>
                                <Select
                                    style={{ marginTop: "10px" }}
                                    className='productDropDown'
                                    labelId="category-select"
                                    id="select"
                                    value={selectedUoms}
                                    label="Category"
                                    onChange={handleSelectUoms}
                                >
                                    {uoms?.map((item, index) => (<MenuItem key={index} value={item?.value}>{item?.label}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className='productMrpField'>
                            <label>MRP</label>
                            <input
                                className='productMrpFieldInput'
                                type="text"
                                placeholder='MRP'
                                onChange={e => setProductPrice(e.target.value)}
                                value={productPrice}
                            />
                        </div>

                        <div className='productRewardField'>
                            <label>Reward Point</label>
                            <input
                             className='productRewardFieldInput'
                              type="number"
                               placeholder='Reward Point' 
                               onChange={e => setProductRewardPoint(e.target.value)}
                               value={productRewardPoint}
                               />
                        </div>


                        <div className="items productImageUpload" >
                            <label>Product image :</label>
                            <input type="file" accept='image/*' placeholder="upload image"
                                onChange={({ target: { files } }) => {
                                    files && files[0] && setImage(files[0])
                                    if (files) {
                                        setImageURL(URL.createObjectURL(files[0]))
                                    }
                                }}
                            />
                            <div>
                                {imageURL ? <img src={imageURL} width={100} height={100} alt={`${props.slug} image`} /> : ""}
                            </div>

                            {imageURL && <div className='delete_div'>
                                <span>
                                    <button className='delete' onClick={() => {
                                        setImageURL(null)
                                        setImage("")
                                    }} >
                                        Remove
                                    </button>
                                </span>
                            </div>}
                        </div>

                        {/* ____________________________ ____________________________ ____________________________ */}


                        <div className='items productImageUpload' >
                            <label >Product Gallery Images : </label>
                            <input ref={productGalleryImageRef} onChange={e => handleProductGalleryImage(e)} type='file' name='productGallaryImage'
                                multiple accept='image/*' placeholder="upload image"
                            />
                            <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '10px', rowGap: '10px' }}>
                                {productGalleryImagesURL && (productGalleryImagesURL.map(image => {
                                    return (
                                        <img className='multiple_img' src={image} height={100} width={90} />
                                    )
                                }))}
                            </div>

                            {productGalleryImagesURL && <div className='delete_div'>
                                <span>
                                    <button className='delete' onClick={() => {
                                        handleRemoveProductGalleryImage
                                    }} >
                                        Remove
                                    </button>
                                </span>
                            </div>}
                        </div>

                        {/* ____________________________ ____________________________ ____________________________ */}

                        {/* Add variant */}

                        <div className='productAddVariant'>
                            <span style={{ marginRight: "10px" }}>Add Product Variant :</span>
                            <span
                                onClick={(e) => handleAddVariant(e)}
                                className='productAddVariantBtn'
                            >Add variant</span>

                            {productVariants?.map((variant, index) => {

                                return (
                                    <div key={index} className='addInput'>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div className='input_div'>
                                                <div className='addInputBox'>
                                                    <FormControl>
                                                        <InputLabel id="variant-colour-select" style={{ color: 'white' }}>Colour</InputLabel>
                                                        <Select
                                                            className='productDropDown'
                                                            labelId="variant-colour-select"
                                                            id="select"
                                                            value={productVariants[index].colourValue}
                                                            label="Category"
                                                            onChange={(e) => { handleVariantChange(e.target.value, 'colour', index) }}
                                                        >
                                                            {colours?.map((item, index) => (<MenuItem key={index} value={item?.value}>{item?.label}</MenuItem>))}
                                                        </Select>
                                                    </FormControl>
                                                </div>

                                                <div className='addInputBox'>
                                                    <FormControl>
                                                        <InputLabel id="variant-size-select" style={{ color: 'white' }}>Size</InputLabel>
                                                        <Select
                                                            style={{ width: '250px', marginTop: "10px" }}
                                                            className='productDropDown'
                                                            labelId="variant-size-select"
                                                            id="select"
                                                            value={productVariants[index].sizeValue}
                                                            label="Category"
                                                            onChange={(e) => { handleVariantChange(e.target.value, 'size', index) }}
                                                        >
                                                            {sizes?.map((item, index) => (<MenuItem key={index} value={item?.value}>{item?.label}</MenuItem>))}
                                                        </Select>
                                                    </FormControl>
                                                </div>

                                                <div className='addInputBox'>
                                                    <FormControl >
                                                        <InputLabel id="variant-uom-select" style={{ color: 'white' }}>Unit Of Measure</InputLabel>
                                                        <Select
                                                            style={{ marginTop: "10px" }}
                                                            className='productDropDown'
                                                            labelId="variant-uom-select"
                                                            id="select"
                                                            value={productVariants[index].uomValue}
                                                            label="Category"
                                                            onChange={(e) => { handleVariantChange(e.target.value, 'uom', index) }}
                                                        >
                                                            {uoms?.map((item, index) => (<MenuItem key={index} value={item?.value}>{item?.label}</MenuItem>))}
                                                        </Select>
                                                    </FormControl>
                                                </div>

                                                <div className='addInputBox'>
                                                    <label>Price :</label>
                                                    <input required={true} type='number' name='price' placeholder='Price'
                                                        value={productVariants[index].price} onChange={(e) => { handleVariantChange(e.target.value, 'price', index) }} />
                                                </div>

                                                <div className='addInputBox'>
                                                    <label>Packing :</label>
                                                    <input type='number' name='packingUnit' placeholder='Packing Unit'
                                                        value={productVariants[index].packingUnit} onChange={(e) => { handleVariantChange(e.target.value, 'packingUnit', index) }} />
                                                </div>

                                                <div className='addInputBox'>
                                                    <label>Reward :</label>
                                                    <input type='number' name='rewardPoint' placeholder='Reward Point'
                                                        value={productVariants[index].rewardPoint} onChange={(e) => { handleVariantChange(e.target.value, 'rewardPoint', index) }} />
                                                </div>
                                            </div>

                                            <div className='button_div'>
                                                <button className='delete_icon'><MdDelete className='AddvaDelete' onClick={(e) => { handleDeleteVariant(index) }} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>


                        {/* Add variant */}
                        <button>Save</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductAddEditModal
