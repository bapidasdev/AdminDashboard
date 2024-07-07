import React, { useEffect, useState } from "react";
import axios from "axios";
import "./subCategoryAddEditModal.scss"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
    slug: string;
    setSubCategoriesOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIscategoryCreated: React.Dispatch<React.SetStateAction<boolean>>;
    editData: any;
    setEditData: React.Dispatch<any>;
    title: string
}

const SubCategoryAddEditModal = (props: Props) => {

    const [name, setName] = useState<string>(props.editData?.name ? props.editData?.name : '');
    const [imageURL, setImageURL] = useState<string | null>(props.editData?.image ? props.editData?.image : null);
    const [image, setImage] = useState<string | File | null>(props.editData?.image ? props.editData?.image : null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        try {
            const res = await Promise.all([
                fetch("http://localhost:8000/api/v1/categories/"),

            ]);
            const data = await Promise.all(res.map(res => res.json()))

            console.log("Data: ", data);
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
        getData();
    }, [])

    useEffect(() => {
        props.setIscategoryCreated(false);
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: ' Name', width: 250, value: name, changeHandler: (value: string) => setName(value) }
    ]
console.log("avinash selectedcategory",selectedCategory)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //performing ADD
        if (props.editData == null) {
            //props.setSubCategoriesOpen(false)
            if (name === '') {
                console.log("name is required!!!!");
                return;
            }
            let data = new FormData();
            image && data.append("image", image);
            data.set("name", name);
            selectedCategory && data.set("category",selectedCategory);
            setLoading(true)
            axios.post(`http://localhost:8000/api/v1/subCategories`, data).then(
                res => {
                    console.log(res.data);
                    props.setIscategoryCreated(true)
                    setLoading(false);
                    props.setSubCategoriesOpen(false)
                }).catch(err => {
                    console.log(err);
                    props.setIscategoryCreated(false)
                    setLoading(false);
                    props.setSubCategoriesOpen(false)
                })
        } else {
            //performing EDIT
            //props.setSubCategoriesOpen(false)
            if (name === '') {
                console.log("name is required!!!!");
                return;
            }
            let data = new FormData();
            image && typeof (image) === 'object' && data.append("image", image); //bypass this line for UoM and size
            data.set("name", name);
            selectedCategory && data.set("category",selectedCategory);
            console.log("data before sending in the payload: ", data)
            setLoading(true)
            axios.put(`http://localhost:8000/api/v1/subCategories/${props.editData.id}/`, data).then(
                res => {
                    console.log(res.data);
                    props.setIscategoryCreated(true)
                    setLoading(false)
                    props.setSubCategoriesOpen(false)
                }).catch(err => {
                    console.log(err);
                    props.setIscategoryCreated(false)
                    setLoading(true)
                    props.setSubCategoriesOpen(false)
                })
        }
    }

    const handleClose = () => {
        props.setSubCategoriesOpen(false);
        props.setEditData(null);
    }
    console.log("selectedCategory ", selectedCategory)

    const handleSelect = (e) => {
        console.log("value inside handleSelect", e.target.value)
        setSelectedCategory(e.target.value)
    }
    return (
        <>
            {loading && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    subCategoriesOpen={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <div className="add">
                <div className="modal">
                    <span className="close" onClick={() => handleClose()}>
                        X
                    </span>
                    <h1>Add New {props.title}</h1>
                    <form onSubmit={handleSubmit}>
                        {columns
                            .filter((item) => item.field !== "id" && item.field !== "img")
                            .map((column) => (
                                <div className="item">
                                    <label>{column.headerName}</label>
                                    <input type="text" placeholder={column.field} value={column.value} onChange={e => column.changeHandler && column.changeHandler(e.target.value)} />
                                </div>
                            ))}
                        <div className="item" >
                            <label>Image</label>
                            <input type="file" accept='image/*' placeholder="upload image"
                                onChange={({ target: { files } }) => {
                                    files && files[0] && setImage(files[0])
                                    if (files) {
                                        setImageURL(URL.createObjectURL(files[0]))
                                    }
                                }}
                            />
                            <div>
                                {imageURL ? <img src={imageURL} width={200} height={150} alt={`${props.slug} image`} /> : ""}
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
                        <div>
                            <FormControl style={{ border: '1px solid white', marginBottom: "15px" }}>
                                <InputLabel id="category-select" style={{ color: 'white' }}>Category</InputLabel>
                                <Select
                                    style={{ width: '180px', height: '45px' }}
                                    labelId="category-select"
                                    id="select"
                                    value={selectedCategory}
                                    label="Category"
                                    onChange={(e) => handleSelect(e)}
                                >
                                    {categories?.map((item, index) => (<MenuItem key={index} value={item?.value}>{item?.label}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>
                        <button>Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SubCategoryAddEditModal
