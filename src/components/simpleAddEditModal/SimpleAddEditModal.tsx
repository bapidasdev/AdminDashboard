
import axios from "axios";
import "./simpleAddEditModal.scss"
import { useEffect, useRef, useState } from "react";

type Props = {
    slug: string;
    //columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsproductCreated: React.Dispatch<React.SetStateAction<boolean>>;
    editData: any;
    setEditData: React.Dispatch<any>;
    title: string;
}

const SimpleAddEditModal = (props: Props) => {
    const [name, setName] = useState<string>(props.editData?.name ? props.editData?.name : '');
    const [imageURL, setImageURL] = useState<string | null>(props.editData?.image ? props.editData?.image : null);
    const [image, setImage] = useState<string | File | null>(props.editData?.image ? props.editData?.image : null);


    //  const userName = useRef<any>();
    //  const password = useRef<any>();

    //  const savehendleSubmit = () => {

    //      localStorage.setItem("UserName", userName.current.value)
    //      localStorage.setItem("Password", password.current.value)

    //      if (localStorage.getItem(userName.current.value && password.current.value)) {
    //          alert("milgya data") //post call
    //      }
    //      else {
    //          alert("data not match")
    //     }
    // }

    //  console.log(localStorage.getItem("UserName" + "" + "Password"));




    useEffect(() => {
        props.setIsproductCreated(false);
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: ' Name', width: 250, value: name, changeHandler: (value: string) => setName(value) }
    ];

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
            console.log("data before sending in the payload: ", data)
            axios.post(`http://localhost:8000/api/v1/${props.slug}/`, data).then(

                res => {
                    console.log(res.data);
                    props.setIsproductCreated(true)
                }).catch(err => {
                    console.log(err);
                    props.setIsproductCreated(false)
                })
        } else {
            //performing EDIT
            props.setOpen(false)
            if (name === '') {
                console.log("name is required!!!!");
                return;
            }
            let data = new FormData();
            // image && typeof(image) === 'object' && data.append("image", image); //bypass this line for UoM and size
            data.set("name", name);
            console.log("data before sending in the payload: ", data)
            axios.put(`http://localhost:8000/api/v1/${props.slug}/${props.editData.id}`, data).then(
                res => {
                    console.log(res.data);
                    props.setIsproductCreated(true)
                }).catch(err => {
                    console.log(err);
                    props.setIsproductCreated(false)
                })
        }
    }



    const handleClose = () => {
        props.setOpen(false);
        props.setEditData(null);
    }

    return (
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
                                <input className="simpleInputField" type="text" placeholder={column.field} value={column.value} onChange={e => column.changeHandler && column.changeHandler(e.target.value)} />
                            </div>
                        ))}


                    <button
                    //  onClick={savehendleSubmit}
                     >Save</button>
                </form>
            </div>
        </div>
    )
}

export default SimpleAddEditModal

