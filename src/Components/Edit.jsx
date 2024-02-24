import React, { useState } from "react";
import { GlobalContext } from "./HomePage";
import { useContext} from "react";
import axios from "axios";

const EditCard = () => {
    const {setInvokeEdit, editId, fetchContacts} = useContext(GlobalContext)
    const [editdata, setEditData] = useState({name:"", designation:"", company:"", industry:"", email:"", phoneNumber:"", country:""})
    const token = JSON.parse(localStorage.getItem("token"))
    const handleEdit = () => {
        setInvokeEdit(false)
        for(let i in editdata){
            if(!editdata[i]){
                editdata[i] = editId[i]
            }
        }
        axios(`https://custmang-server.onrender.com/api/v1/contacts/${editId._id}`, {
            method:"put",
            headers:{
                "Content-Type":"Application/json",
                "Authorization":token
            },
            data:editdata
        })
        .then((res)=>{ 
            console.log("entered edit")
            setInvokeEdit(false)
            fetchContacts()})
        .catch((e)=>console.log(e))
        }
    
    
    return(
        <div id='popupCardEdit' className='popup-card'>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Company</th>
                            <th>Industry</th>
                            <th>Email</th>
                            <th>PhoneNumber</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td><input placeholder={editId.name} onChange={(e) => setEditData({...editdata, name : e.target.value})} /></td>
                            <td><input placeholder={editId.designation} onChange={(e) => setEditData({...editdata, designation : e.target.value})}/></td>
                            <td><input placeholder={editId.company} onChange={(e) => setEditData({...editdata, company : e.target.value})}/></td>
                            <td><input placeholder={editId.industry} onChange={(e) => setEditData({...editdata, industry : e.target.value})}/></td>
                            <td><input placeholder={editId.email} onChange={(e) => setEditData({...editdata, email : e.target.value})}/></td>
                            <td><input placeholder={editId.phoneNumber} onChange={(e) => setEditData({...editdata, phoneNumber : e.target.value})}/></td>
                            <td><input placeholder={editId.country} onChange={(e) => setEditData({...editdata, country : e.target.value})}/></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleEdit}>save</button>
            </div>
        </div>
    )
    
}
export default EditCard;