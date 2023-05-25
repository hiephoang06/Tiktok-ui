import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './Upload.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Upload() {
   
    const [caption,setCaption] = useState('');
    const accessToken = localStorage.getItem("accessToken");

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};
    const url = process.env.REACT_APP_LOCALHOST
    const handlePost= async ()=>{
        if(accessToken){
            if(isFilePicked !== null){
                const formData = new FormData();
                formData.append('uploaded_file', selectedFile);
                formData.append('desc',caption)
                const res = await fetch(url+'/api/video/',{
                    method:'POST',
                    headers:{
                        "Authorization":`Bearer ${accessToken}`,                
                    },
                    body:formData,
                })
            } else {
                alert('chưa có file')
            }
        } else { 
            alert('dang nhap di')
        }
 
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
                            <div>
                                {isFilePicked ? (
                                    <div>
                                        <div>Video</div>
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
                                        <input type="file" name="file" onChange={changeHandler} />
                                    </label>
                                )}
                            </div>
                    </div>
                </div>
            </div>
            <div className={cx('form-upload')}>
                <div>
                    <label>Caption:</label>
                    <input type={'text'}  onChange={(e) => setCaption(e.target.value)} className={cx('input-caption')} />
                </div>
                <div style={{ display: 'flex', marginTop: '2.5rem', gap: '1.5rem' }}>
                    <button type={'button'} onClick={() => {}} className={cx('cancle-btn')}>
                        Cancle
                    </button>
                    {isFilePicked? (
                        <div>
                            <Button primary onClick={handlePost}>Post</Button> 
                            <Button> Chỉnh sửa</Button>
                        </div>
                        ):(
                            <></>
                        )}
                    
                </div>
            </div>
        </div>
    );
}

export default Upload;
