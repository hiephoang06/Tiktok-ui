import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { useParams } from 'react-router-dom';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);




 const UserInfor = ({profile}) => {
    async function handleFollow(){
        const accessToken = localStorage.getItem("accessToken");
        const res = await fetch('http://localhost:3001/api/profile/',{
            method:"post",
            headers:{
                'Authorization':`Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
    }
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
                        <Button primary onClick={handleFollow}>Follow</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Profile() {
    const id = useParams();
    const [showUserVideo, setshowUserVideo] = useState(true);
    const [infor,setInfor] = useState(null);

    useEffect(() => {
        if (showUserVideo) {
            <h3>Video cua minh</h3>;
        } else {
            <h3>Video da like</h3>;
        }
    }, [showUserVideo]);

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
       </div>
    </div>
    );
}

export default Profile;
