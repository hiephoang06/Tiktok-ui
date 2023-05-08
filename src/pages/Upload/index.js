import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Upload.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Upload() {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState();
    const [wrongFileType, setWrongFileType] = useState(false);

    const uploadVideo = async (e) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

        if (fileTypes.includes(selectedFile.type)) {
        } else {
            setIsLoading(false);
            setWrongFileType(true);
        }
    };

    const accessToken = localStorage.getItem("accessToken");
    const userID = localStorage.getItem("userID")

    const handlePost=()=>{
        fetch('http://localhost:3001/api/video/',{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                file:"",
                desc:"",
                profileId:{userID}
                
            }),
        })
    }

    return (
        <div className={cx('wrapper')}>
            <div>
                <div>
                    <div>
                        <p className={cx('text1')}>Upload Video</p>
                        <p className={cx('text2')}>Dang video vao tai khoan cua ban</p>
                    </div>
                    <div className={cx('upload-video')}>
                        {isLoading ? (
                            <p>Uploading....</p>
                        ) : (
                            <div>
                                {videoAsset ? (
                                    <div>
                                    </div>
                                ) : (
                                    <label className={cx('label-video')}>
                                        <div className={cx('inner-upload')}>
                                            <div className={cx('inner-upload1')}>
                                                <FontAwesomeIcon
                                                    icon={faCloudArrowUp}
                                                    style={{ color: 'gray', fontSize: '3.75rem' }}
                                                />
                                                <p
                                                    style={{
                                                        fontSize: '1.25rem',
                                                        lineHeight: '1.75rem',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    Chon video de tai len
                                                </p>
                                            </div>
                                            <p className={cx('text-des')}>
                                                MP4 hoac WebM <br />
                                                720x1280 tro len <br />
                                                Toi da 30 phut <br />
                                                Nho hon 2Gb <br />
                                            </p>
                                            <p className={cx('select-btn')}>Select file</p>
                                        </div>
                                        <input
                                            type={'file'}
                                            name={'upload-video'}
                                            onChange={uploadVideo}
                                            style={{ width: '0px', height: '0px' }}
                                        />
                                    </label>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('form-upload')}>
                <div>
                    <label>Caption:</label>
                    <input type={'text'} value={''} onChange={() => {}} className={cx('input-caption')} />
                </div>
                <div style={{ display: 'flex', marginTop: '2.5rem', gap: '1.5rem' }}>
                    <button type={'button'} onClick={() => {}} className={cx('cancle-btn')}>
                        Cancle
                    </button>
                    <Button primary onClick={handlePost}>Post</Button>
                </div>
            </div>
        </div>
    );
}

export default Upload;
