import classNames from 'classnames/bind';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

function Comment() {
    return (
        <div className={cx('comment')}>
            <input className={cx('input-cmt')} type="text" spellCheck={false} placeholder="Thêm bình luận ..." />
        </div>
    );
}

export default Comment;
