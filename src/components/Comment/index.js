import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Comment({data}) {
    const url = process.env.REACT_APP_LOCALHOST
    const id = data[0]?._id
    const [content,setContent] = useState('');
    const accessToken = localStorage.getItem("accessToken")
    // console.log(localStorage)
    async function handleSubmit(){
        
        if(accessToken){
            if(content==''){
                alert('Nhap tin ')
            }else{
                const res = await fetch(url+'/api/comment/'+id,{
                    method:"POST",
                    mode:'cors',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body:JSON.stringify({
                        message: content
                    })
                })
                const data = await res.json();
                window.location.reload();

                }
        } else {
            alert('dang nhap di')
        }
       
        }

    return (
        <div className={cx('comment')}>
            <input className={cx('input-cmt')} type="text" spellCheck={false} placeholder="Thêm bình luận ..." 
            onChange={(e)=>setContent(e.target.value)}/>
            <button onClick={handleSubmit} className={cx('btn-submit')}>Đăng</button>
        </div>
    );
}

export default Comment;
