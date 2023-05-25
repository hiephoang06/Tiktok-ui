import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { useParams } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import VideoProfile from '../MyProfile/VideoProfile';
import MyProfile from '../MyProfile/myProfile';

const cx = classNames.bind(styles);

 const UserInfor = ({profile}) => {
    const [isFollow,setIsFollow] = useState();
    const accessToken = localStorage.getItem("accessToken");

    // console.log(`http://localhost:3001/api/profile/auth/${profile?._id}`)

    const url = process.env.REACT_APP_LOCALHOST
    async function handleFollow(){
        if(accessToken){
            setIsFollow((current) => (!current))
            const res = await fetch(url+`/api/profile/${profile?._id}`,{
                method:"post",
                headers:{
                    'Authorization':`Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json();
            console.log(data)
        } else {
            alert('dang nhap di')
        }
    }
    const http = profile?.avatarLarger?.split(':')[0];
    return (
    <div>
            <div className={cx('wrapper')}>
                <img 
                    className={cx('avatar')}
                    src={http === 'https' ? profile?.avatarLarger : url+'/images/' + profile?.avatarLarger}
                />
                <div className={cx('infor')}>
                    <div>
                        <h1>{profile?.uniqueId}</h1>
                        <h3>{profile?.nickName}</h3> 
                    </div>
                    <div>
                        {isFollow ? (
                                <div style={{'display':'flex'}}>
                                    <Button outline to={'/messages'}>Tin nhắn</Button>
                                    <Tippy content='Bỏ follow' placement='bottom'>
                                        <div className={cx('btn-unfollow')} onClick={handleFollow}>
                                            <FontAwesomeIcon icon={faUserCheck} />
                                        </div>
                                    </Tippy>
                                </div>
                            ):(<Button primary onClick={handleFollow}>Follow</Button>)}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

const ShowVideo = ({profile}) =>{
    const [showUserVideo, setshowUserVideo] = useState(true);
    useEffect(() => {
        if (showUserVideo) {
            <h3>Video cua minh</h3>;
        } else {
            <h3>Video da like</h3>;
        }
    }, [showUserVideo]);
    const [videoList,setVideoList] = useState([]);
    const [userVideo,setUserVideo] = useState();
    const [videoLike,setVideoLike] = useState();
    var profileID = profile?._id;

//    console.log(profileID) 

    useEffect(() => {
      async function FetchUserVideo(){
          const response = await fetch(`http://localhost:3001/api/video/${profileID}`)
          const data = await response.json();
          setUserVideo(data);
      }
      FetchUserVideo();
  },[])
  
    useEffect(()=>{
        if(showUserVideo){
            setVideoList(userVideo)
        } else{
            setVideoList(videoLike)
        }
    },[showUserVideo,videoLike,userVideo])
  
    return(
        <div>
               <div className={cx('layout-video-like')}>
                <p className={cx('text-video')}
                    onClick={()=> setshowUserVideo(true)}
                    style={
                        showUserVideo 
                            ? {
                                borderBottomWidth:'2px',
                                borderBottomStyle:'solid'
                            }
                            :{color:'rgb(156 163 175)'}
                    }
                >
                    Video
                </p>
                <p className={cx('text-video')}
                    onClick={()=>setshowUserVideo(false)}
                    style={
                        !showUserVideo
                            ?{
                                borderBottomWidth:'2px',
                                borderBottomStyle:'solid'
                            } 
                            :{
                                color:'rgb(156 163 175)'
                            }  
                    }
                >
                    Liked
                </p>
            </div>

            <div className={cx('show-video')}>
                {videoList?.length > 0 ? (
                    videoList.map((video)=>(
                        <VideoProfile key={video.id} data={video}/>
                    ))
                ) : (
                    <h1>Khong co video</h1>
                )}
                
            </div>
        </div>
    )
}

function Profile() {
    
    const id = useParams();
    const [infor,setInfor] = useState(null);
    const accessToken = localStorage.getItem("accessToken")
    const [isFollow,setIsFollow] = useState();

      useEffect(() => {
        async function fetchMyAPI() {
            try {
                const request = `http://localhost:3001/api/profile/${id.nickname}`
                const response = await fetch(request)
                const responseJson = await response.json()
                setInfor(responseJson)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyAPI()
      }, [])
    
   console.log(infor?.profile?._id)
        return (
            <div>
                <UserInfor {...infor}/>
        
               <div className={cx('count-info')}>
                    <div>
                        <strong> {infor?.following} </strong>
                        <span className={cx('item-count')}>Đang Follow</span>
                    </div>
                    <div>
                        <strong> {infor?.follower} </strong>
                        <span className={cx('item-count')}>Follower</span>
                    </div>
                    <div>
                        <strong> {infor?.totalLikes} </strong>
                        <span className={cx('item-count')}>Thích</span>
                    </div>
               </div>
               <div>
                    <h4>Chưa có tiểu sử</h4>
               </div>
               <div>
                    <ShowVideo {...infor}/>
                 
        
               </div>
            </div>
            );
    
}

export default Profile;
