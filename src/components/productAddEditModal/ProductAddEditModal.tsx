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

    const [productImageURL, setProductImageURL] = useState<string | null>(props.editData?.image ? props.editData?.image : null);
    const [productImage, setProductImage] = useState<string | File | null>(props.editData?.image ? props.editData?.image : null);


    const [loading, setLoading] = useState(false)

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(props.editData?.category ? props.editData?.category._id : '');

    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState(props.editData?.brand ? props.editData?.brand._id : '');

    const [colours, setColours] = useState([]);
    const [selectedColours, setSelectedColours] = useState(props.editData?.colour ? props.editData?.colour._id : '');

    const [sizes, setSizes] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState(props.editData?.size ? props.editData?.size._id : '');

    const [uoms, setUoms] = useState([]);
    const [selectedUoms, setSelectedUoms] = useState(props.editData?.uom ? props.editData?.uom._id : '');

    const [productPrice, setProductPrice] = useState(props.editData?.price ? props.editData?.price : '');
    const [productRewardPoint, setProductRewardPoint] = useState(props.editData?.rewardPoint ? props.editData?.rewardPoint : '');

    const [productVariants, setProductVariants] = useState([]);
    
    const [productGalleryImages, setProductGalleryImages] = useState(props.editData?.images ? props.editData?.images : null);
    const [productGalleryImagesURL, setProductGalleryImagesURL] = useState(props.editData?.images ? props.editData?.images : null);
    const productGalleryImageRef = useRef(null);
    const productImageRef = useRef(null);

    useEffect(() => {
        const tempProductVariants = props?.editData?.productVariants?.map(variant => {
            return {
              colour: variant?.colour._id,
              size: variant?.size._id,
              uom: variant?.uom._id,
              packingUnit: variant?.packingUnit,
              price: variant?.price,
              rewardPoint: variant?.rewardPoint
            }
          });
          setProductVariants(tempProductVariants);
    }, [props.editData]);

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
        productGalleryImageRef.current.value = '';
    }

    const handleRemoveProductImage = () => {
        setProductImageURL(null);
        setProductImage('');
        productImageRef.current.value = '';
    }

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
        }
    }
    useEffect(() => {
        getUomsData();
    }, [])
    
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
            productImage && data.append("image", productImage);
            data.set("name", name);
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
                    if (res?.data?.id && productGalleryImages) {
                        let galleryData = new FormData();
                        for (let i = 0; i < productGalleryImages?.length; i++) {
                            galleryData.append(`images`, productGalleryImages[i]);
                        }
                        axios.put(`http://localhost:8000/api/v1/${props.slug}/gallery-images/${res.data.id}`, galleryData).then(
                            res => {
                                // setSuccess(true);
                                // setSuccessMessage("Product created successfully with gallery images!");
                                //clearForm();
                                // setTimeout(() => {
                                //     setSuccess(false);
                                //     setSuccessMessage('');
                                // }, 6000);
                                setLoading(false);
                            }
                        ).catch(err => {
                            console.log("Error while adding gallary photos to the newly created product", err);
    
                            //in this case delete the product created above
                            axios.delete(`http://localhost:8000/api/v1/${props.slug}/${res.data.id}`).then(res => {
                                // setError(true);
                                // setErrorMessage("Error while adding gallary photos! Please try again after changing them");
                                // setTimeout(() => {
                                //     setError(false);
                                //     setErrorMessage('');
                                // }, 6000);
                                setLoading(false);
                            }).catch(err => {
                                console.log("something went wrong please contact support")
                                // setError(true);
                                // setErrorMessage(`Something went wrong! Please contact support by shaing this id: ${res.data.id}`)
                                // setTimeout(() => {
                                //     setError(false);
                                //     setErrorMessage('');
                                // }, 12000);
                                setLoading(false);
    
                            })
                        })
                    }
                    else {
                        // setSuccess(true);
                        // setSuccessMessage("Product created successfully with no gallery image(s)");
                        // setTimeout(() => {
                        //     setSuccess(false);
                        //     setSuccessMessage('');
                        // }, 6000);
                        setLoading(false);
                    }
                    // console.log("bapi", res.data);
                    // props.setIscategoryCreated(true)
                    // setLoading(false);
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
            productImage && typeof (productImage) === 'object' && data.append("image", productImage);
            productGalleryImages && typeof (productGalleryImages) === 'object' && data.append("images", productGalleryImages);
            data.set("name", name);
            selectedBrands !== '' && data.set("brand", selectedBrands);
            selectedColours !== '' && data.set("colour", selectedColours);
            selectedSizes !== '' && data.set("size", selectedSizes);
            selectedUoms !== '' && data.set("uom", selectedUoms);
            productPrice !== '' && data.set("price", productPrice);
            productRewardPoint !== '' && data.set("rewardPoint", productRewardPoint);
            data.set("productVariants", JSON.stringify(productVariants));
            data.set("category", selectedCategory);
            console.log("data before sending in the payload: ", data)
            setLoading(true)
            axios.put(`http://localhost:8000/api/v1/${props.slug}/${props.editData.id}/`, data).then(
                res => {
                    props.setIscategoryCreated(true)
                    setLoading(false)
                }).catch(err => {
                    props.setIscategoryCreated(false)
                    setLoading(true)
                })
        }
    }

    const handleClose = () => {
        props.setOpen(false);
        props.setEditData(null);
    }

    const handleSelectCategory = (e: any) => {
        setSelectedCategory(e.target.value)
    }

    const handleSelectBrand = (e: any) => {
        setSelectedBrands(e.target.value)
    }

    const handleSelectColour = (e: any) => {
        setSelectedColours(e.target.value)
    }

    const handleSelectSize = (e: any) => {
        setSelectedSizes(e.target.value)
    }

    const handleSelectUoms = (e: any) => {
        setSelectedUoms(e.target.value)
    }


    // Addvariant

    const handleAddVariant = (e: any) => {
        e.preventDefault();
        setProductVariants([...productVariants, { colour: '', size: '', uom: '', price: '', packingUnit: '', rewardPoint: '' }])
    }

    const handleVariantChange = (value: any, key: any, index: any) => {
        console.log("Avinash value",value)
        let tempProductVariants = [...productVariants];
        tempProductVariants[index][key]  = value;
        setProductVariants(tempProductVariants);
    }

    const handleDeleteVariant = (index: any) => {
        let tempProductVariants = [...productVariants];
        tempProductVariants = tempProductVariants.filter((variant, i) => {
            return i != index;
        });
        setProductVariants(tempProductVariants);
    }
    
    console.log("avinash productsVariants",productVariants)

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
                    <h1>{props.editData != null ? 'Edit' : 'Add New'} {props.title} </h1>
                    
                    <form onSubmit={handleSubmit}>
                        {columns
                            .filter((item) => item.field !== "id" && item.field !== "img")
                            .map((column) => (
                                <div className="item">
                                    <label>{column.headerName}</label>
                                    <input className='productInputField' type="text" placeholder={column.field} value={column.value} onChange={e => column.changeHandler && column.changeHandler(e.target.value)} />
                                </div>
                            ))}
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
                                    files && files[0] && setProductImage(files[0])
                                    if (files) {
                                        setProductImageURL(URL.createObjectURL(files[0]))
                                    }
                                }}
                                ref={productImageRef}
                            />
                            <div>
                                {productImageURL ? <img src={productImageURL} width={100} height={100} alt={`${props.slug} image`} /> : ""}
                            </div>

                            {productImageURL && <div className='delete_div'>
                                <span>
                                    <button className='delete' onClick={() => handleRemoveProductImage()} >
                                        Remove
                                    </button>
                                </span>
                            </div>}
                        </div>

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
                                        handleRemoveProductGalleryImage()
                                    }} >
                                        Remove
                                    </button>
                                </span>
                            </div>}
                        </div>

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
                                                            value={productVariants[index].colour}
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
                                                            value={productVariants[index].size}
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
                                                            value={productVariants[index].uom}
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
