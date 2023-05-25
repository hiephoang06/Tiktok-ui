import { faCircleXmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import InforUser from '~/components/InforUser';
import Comment from '~/components/Comment';
// import ShowComment from '~/layouts/components/ShowComments';
import styles from './Details.module.scss';
import ReactPlayer from 'react-player';
import { Link, useNavigate, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function Details() {

    const navigate = useNavigate();
    const url = process.env.REACT_APP_LOCALHOST  

    // const videoRef = useRef(null);
    // const [playing, setPlaying] = useState(false);
    // const [videos, setVideos] = useState([]);
    const params = useParams();
    const [details, setDetails] = useState([{}]);
    // const [infor, setInfor] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(url+`/api/video/${params.uniqueId}/${params.id}`)
                .then((res) => res.json())
                .then((details) => setDetails(details));
        };
        fetchData().catch(console.error);
    }, []);

    const [ShowComment,setShowComment] = useState();

    const handleFetchAPI = async () =>{
        const response = await fetch(url+`/api/video/${params.id}/comments`,)
        const result = await response.json();
        setShowComment(result)
      }

    useEffect(() => {
        handleFetchAPI()
    },[])


    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('cancle')}>
                    <p>
                        {/* <Link to={'/'}> */}
                            <FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: '35px', color: 'white' }} onClick={() => navigate(-1)} />
                        {/* </Link> */}
                    </p>
                </div>
                <div style={{ position: 'relative' }}>
                    <div className={cx('video')}>
                        <ReactPlayer
                            url={url+'/videos/' + details[0]?.videoUrl}
                            height="100%"
                            playing={true}
                            controls={true}
                        />
                    </div>
                </div>
            </div>

            <div style={{'marginLeft':'5px'}}>
                <VideoDetails data={details}/>
                <div>
                    {ShowComment?.map((cmt) => (
                        <ShowComments key={cmt} data={cmt}/>
                    ))}
                    
                </div>
                <div>
                    <Comment data={details}/>
                </div>
            </div>
        </div>
    );
}

 const VideoDetails = ({data})=>{
    const infor = data
    const user = infor[0]?.author
    const http = user?.avatarLarger.split(':')[0];
    const url = process.env.REACT_APP_LOCALHOST
    return(<> 
        <div>
            <div className={cx('wrapper-user')}>
                <div style={{"display":"flex"}}>
                    <img
                        className={cx('avatar')}
                        src={http === 'https' ? user?.avatarLarger : url+'/images/' + user?.avatarLarger}
                        alt="avatar"
                    />
                    <div style={{"marginLeft":"15px"}}>
                        <h3>{user?.uniqueId}</h3>
                        <p>{user?.nickName}</p>
                    </div>
                </div>
                <div> <p>{data[0].desc}</p> </div>
            </div>

        </div>
    </>)
}

const ShowComments = ({data}) => {
    console.log(data)
    const http = data?.author?.avatarLarger.split(':')[0];
    const url = process.env.REACT_APP_LOCALHOST
    return (
        <div className={cx('wrapper-cmt')}>
            <div className={cx('inner-cmt')}>
                <div className={cx('wrapper-user-cmt')}>
                    <img
                        className={cx('avatar-user-cmt')}
                        src={http === 'https' ? data?.author?.avatarLarger : url+'/images/' + data?.author?.avatarLarger}
                        alt="avatar"
                    />
                    <div className={cx('infor-user-cmt')}>
                        <div>
                            {/* <Link to={'@' + author.uniqueId}> */}
                            <Link to={{
                                pathname:'@'+ data.author._id,
                                state:{id:data.author._id}
                            }}>
                            </Link>
                            <a href="#"> {data.author.nickName}</a>
                        </div>
                    </div>
                </div>
                <div className={cx('comment')}>
                    {data.message}
                    <div className={cx('text-cmt')}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Details;
