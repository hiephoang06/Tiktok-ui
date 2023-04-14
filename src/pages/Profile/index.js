import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile() {
    const uniqueId = useParams();
    console.log(uniqueId);
    const [showUserVideo, setshowUserVideo] = useState(true);
    useEffect(() => {
        if (showUserVideo) {
            <h3>Video cua minh</h3>;
        } else {
            <h3>Video da like</h3>;
        }
    }, [showUserVideo]);

    return (
        <div>
            {/* thông tin người dùng */}
            <div className={cx('wrapper')}>
                <img
                    className={cx('avatar')}
                    src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/f0d5299a324e257a6972ea68015c85c4.jpeg?x-expires=1677758400&x-signature=Xrn3UO8wKoaRPW1Hy%2FgmbAmSBZo%3D"
                    alt="avatar"
                />
                <div className={cx('infor')}>
                    <div>
                        <h1>{uniqueId.nickname}</h1>
                        <h3>Nickname</h3>
                    </div>
                    <div>
                        <button className={cx('edit-btn')}>
                            <FontAwesomeIcon icon={faPenToSquare} /> Sửa hồ sơ
                        </button>
                    </div>
                </div>
            </div>
            {/* hiển thị follow */}
            <div className={cx('count-info')}>
                <div>
                    <strong>0 </strong>
                    <span className={cx('item-count')}>Đang Follow</span>
                </div>
                <div>
                    <strong>0 </strong>
                    <span className={cx('item-count')}>Follower</span>
                </div>
                <div>
                    <strong>0 </strong>
                    <span className={cx('item-count')}>Thích</span>
                </div>
            </div>
            {/* description */}
            <div>
                <h4>Chưa có tiểu sử</h4>
            </div>

            <div>
                <div className={cx('layout-video-like')}>
                    <p
                        className={cx('text-video')}
                        onClick={() => setshowUserVideo(true)}
                        style={
                            showUserVideo
                                ? {
                                      borderColor: 'rgb(0 0 0);',
                                      borderBottomWidth: '2px',
                                      borderBottomStyle: 'solid',
                                  }
                                : { color: 'rgb(156 163 175)' }
                        }
                    >
                        Video
                    </p>
                    <p
                        className={cx('text-video')}
                        onClick={() => setshowUserVideo(false)}
                        style={
                            !showUserVideo
                                ? {
                                      borderColor: 'rgb(0 0 0);',
                                      borderBottomWidth: '2px',
                                      borderBottomStyle: 'solid',
                                  }
                                : { color: 'rgb(156 163 175)' }
                        }
                    >
                        Liked
                    </p>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default Profile;
