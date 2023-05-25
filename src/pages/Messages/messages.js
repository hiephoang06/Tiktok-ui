import { faCircleArrowLeft, faPaperPlane, faPhone} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "~/layouts/components/Header/Header";
import classNames from "classnames/bind";
import styles from './messages.module.scss';
import {Container , Row, Col, Form} from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css';  
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import {io} from "socket.io-client";


const cx = classNames.bind(styles) 

function Messages() {
    const navigate = useNavigate();
    const [userMess,setUserMess] = useState([])
    const [messages,setMessages] = useState('');
    const [mess,setMess] = useState([]);
    const [myMess,setMyMess] = useState([]);

    const [userSelect,setUsetSelect] = useState();

    const accessToken = localStorage.getItem("accessToken");

    useEffect(()=>{
        FetchUserFollow()
    },[])
    const url = process.env.REACT_APP_LOCALHOST
    const FetchUserFollow = async () =>{
        const res = await fetch(url+'/api/chat/listUser',{
            headers:{
                'Authorization':`Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json();
        setUserMess(data)
    }

    const socket = useMemo(
        () =>
          io('localhost:3001', {
            extraHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          }),
        []
      );

      useEffect(() => {
    
        socket.on('new_message', (data) => {
            setMess(oldMsgs => [...oldMsgs, data])
        });
    
        return () => {
          socket.disconnect();
        };
      }, []);

      const HandleSend = () => {

        socket.emit('send_message', {messages, receiver: userSelect?._id});
        // setMess(oldMsgs => [...oldMsgs,messages])
        setMess(oldMsgs => [...oldMsgs, {messages:messages,receiver:''}])
        setMessages('')
      }

    const renderMess =  mess.map((m, index) =>
      
      <div key={index} 
      className={cx(`${m.receiver === '' ? 'your-message':'other-people' }`)}>
        {m.messages}
      </div>
      
    )

    const onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
            HandleSend()
        }
    }

    function handleCall(){
        window.open('google.com')
    }

    
    return ( 
       <div>
        <div>
            <Header/>
        </div>
        <div className={cx('bg-cl')}>
            <Container className={cx('wrapper')}>  
                <Row>  
                    <Col sm={1} className={cx('btn-back')}>
                        <FontAwesomeIcon icon={faCircleArrowLeft} onClick={() => navigate(-1)}/>
                    </Col>  
                    <Col sm={3} style={{'backgroundColor':'white','marginRight':'20px'}} className={cx('wrapper-nt')}>
                        <div className={cx('header-nt')}>
                            <h1 className={cx('text')}>Tin nhắn</h1>
                        </div>
                        <div style={{'height': '100%'}}>
                            {userMess ? (
                                <div >
                                    {userMess.map((user)=>(
                                        <h3 key={user._id} onClick={()=>setUsetSelect(user)}>{user.nickName}</h3>

                                    ))}
                                </div>
                            ):(
                                <div><h3>Chưa có tin nhắn nào</h3></div>
                                
                            )}
                        </div>
                    </Col>  
                    <Col sm={7} style={{'backgroundColor':'white'}}>
                        <div className={cx('chatbox')}>
                        {userMess ? (
                            <div>
                                <div className={cx('infor')}>
                                    <h1>{userSelect?.nickName}</h1> 
                                    <FontAwesomeIcon icon={faPhone} className={cx('btn-call')} onClick={handleCall}/>
                                </div>
                                <div className={cx('chatMain')} id="chatbox">
                                        {renderMess} 
                                        
                                </div>
                                <div className={cx('ChatBottom')}>
                                    <input type="text" className={cx('input-chat')} 
                                        onChange={(e)=>setMessages(e.target.value)}  
                                        value={messages}
                                        onKeyDown={onEnterPress}
                                        />
                                    <FontAwesomeIcon icon={faPaperPlane} className={cx('btn-send')} onClick={HandleSend}/>
                                </div>
                            </div>
                        ):(
                            <div></div>
                        )}
                        </div>
                    </Col>  
                </Row>  
            </Container>  
        </div>
       </div>
    );
}

export default Messages;