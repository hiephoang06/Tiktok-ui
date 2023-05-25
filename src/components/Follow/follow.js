import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function Follow({profile}) {
    const [isFollow,setIsFollow] = useState();
    const accessToken = localStorage.getItem("accessToken");
    const url = process.env.REACT_APP_LOCALHOST
    useEffect(()=>{
        checkFollow()
    })
    console.log(profile?._id)
    async function checkFollow(){
            const res = await fetch(url+`/api/profile/auth/${profile?._id}`,{
                method:"get",
                headers:{
                    'Authorization':`Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json();
            console.log(data)
    }

    // async function handleFollow(){
    //     if(accessToken){
    //         setIsFollow((current) => (!current))

    //         const res = await fetch(`http://localhost:3001/api/profile/${profile?._id}`,{
    //             method:"post",
    //             headers:{
    //                 'Authorization':`Bearer ${accessToken}`,
    //                 'Content-Type': 'application/json',
    //             }
    //         })
    //         const data = await res.json();
    //         console.log(data)
    //     } else {
    //         alert('dang nhap di')
    //     }
    // }

    return ( 
    <div>
        {isFollow ? (
            <div style={{'display':'flex'}}>
                <Button outline to={'/messages'}>Tin nhắn</Button>
                    <Tippy content='Bỏ follow' placement='bottom'>
                        <div 
                        // className={cx('btn-unfollow')} 
                        // onClick={handleFollow}
                        >
                            <FontAwesomeIcon icon={faUserCheck} />
                        </div>
                    </Tippy>
            </div>
        ):(<Button primary 
        // onClick={handleFollow}
        >Follow</Button>)}
    </div> 
    );
}

export default Follow