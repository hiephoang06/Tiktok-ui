import classNames from "classnames/bind";
import styles from './edit.module.scss';
import Button from "~/components/Button/Button";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles)

function Edit() {
    const [name,setName] = useState("");
    const [uniqueID,setUniqueID] = useState("");
    const accessToken = localStorage.getItem("accessToken");
    // const oldName = localStorage.getItem("name");
    // const oldUserID = localStorage.getItem("userID")
    const url = process.env.REACT_APP_LOCALHOST
    async function handleSubmit(){
        const res = await fetch(url+'/api/profile/',{
            method:"PATCH",
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body:JSON.stringify({
                nickName: name,
                uniqueId: uniqueID,
            })
        })
        const data = await res.json();

    }

    return ( 
        <>
        <div>
            <h1>Sửa hồ sơ</h1>
            <div>
                <label className={cx('label-item')}>Tên: </label>
                <input type="text" className={cx('input-edit')} onChange={(e)=>setName(e.target.value)}></input>
            </div>
            <div>
                <label className={cx('label-item')}>Tiktok ID: </label>
                <input type="text" className={cx('input-edit')} onChange={(e)=>setUniqueID(e.target.value)}></input>
            </div>
            <Button outline onClick={handleSubmit}> Lưu</Button>
        </div>

        </>
     );
}

export default Edit;