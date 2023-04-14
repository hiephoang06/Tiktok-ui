import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Followbtn.module.scss';

const cx = classNames.bind(styles);
function FollowBtn() {
    const [isFollowing, setIsFollowing] = useState(false);
    const handleFollow = () => {
        setIsFollowing((current) => !current);
    };
    return (
        <div>
            {!isFollowing ? (
                <button className={cx('follow-btn')} onClick={handleFollow}>
                    Follow
                </button>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default FollowBtn;
