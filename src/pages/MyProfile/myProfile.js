import classNames from 'classnames/bind';
import styles from './myProfile.module.scss';
import { useEffect, useState } from 'react';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Video from '~/layouts/components/Video/Video';
import VideoProfile from './VideoProfile';
const cx = classNames.bind(styles);

const UserInfor = ({profile}) => {
    const http = profile?.avatarLarger.split(':')[0];
    return (
    <div>
            <div className={cx('wrapper')}>
                <img 
                    className={cx('avatar')}
                    src={http === 'https' ? profile?.avatarLarger : 'http://localhost:3001/images/' + profile?.avatarLarger}
                />
                <div className={cx('infor')}>
                    <div>
                        <h1>{profile?.uniqueId}</h1>
                        <h3>{profile?.nickName}</h3> 
                    </div>
                    <div>
                        <Link to="/edit">
                            <button className={cx('edit-btn')}>
                                <FontAwesomeIcon icon={faPenToSquare} /> Sửa hồ sơ
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MyProfile() {
    
    const accessToken = localStorage.getItem("accessToken")

    const [showUserVideo, setshowUserVideo] = useState(true);

    const [videoList,setVideoList] = useState([]);

    const [videoLike,setVideoLike] = useState();
    const [userVideo,setUserVideo] = useState();

    const [infor,setInfor] = useState(null);

    useEffect(()=>{
        if(showUserVideo){
            setVideoList(userVideo)
        } else{
            setVideoList(videoLike)
        }
    },[showUserVideo,videoLike,userVideo])

    useEffect(() => {
        async function FetchVideoLike(){
            const response = await fetch('http://localhost:3001/api/video/likedvideo',{
                method:'get',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            setVideoLike(data);
        }
        FetchVideoLike();
    },[])

    useEffect(() => {
        async function FetchUserVideo(){
            const response = await fetch('http://localhost:3001/api/video/postedvideo',{
                method:'get',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            setUserVideo(data);
        }
        FetchUserVideo();
    },[])

    useEffect(() => {
        if (showUserVideo) {
            <h3>Video cua minh</h3>;
        } else {
            <h3>Video da like</h3>;
        }
    }, [showUserVideo]);

    useEffect(() => {
        async function FetchData(){
            const response = await fetch('http://localhost:3001/api/profile/',{
                method:'get',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            setInfor(data);
        }
        FetchData();
    },[])

    localStorage.setItem("userID",infor?.profile?._id)
    localStorage.setItem("uniqueId",infor?.profile?.uniqueId)

    return ( 
        <>
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
                        <VideoProfile key={video} data={video}/>
                    ))
                ) : (
                    <h1>Khogn co video</h1>
                )}
                
            </div>
       </div>
    </>
     );
}

export default MyProfile;