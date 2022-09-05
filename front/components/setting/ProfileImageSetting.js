import React, { useState, useContext } from 'react';
import styles from 'styles/setting.module.css'
import bgPlaceholder from 'public/images/profile-setting-bg.jpg'
import userPlaceholder from 'public/images/userplaceholder.png'
import { BiImageAdd, BiCamera } from "react-icons/bi";
import Image from 'next/image'
import { CreateToken } from '../SideBar'
import axios from 'axios'
import { AiOutlineCloseCircle } from 'react-icons/ai'


const ProfileImageSetting = ({ bgImage, image, name }) => {

    const token = useContext(CreateToken);

    const handleClickCoverImage = (e) => {
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append(
            "file",
            image,
            image.name
        )
        const config = {
            method: "PUT",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        fetch('http://127.0.0.1:8000/user/update-cover-image', config)
            .then(response => response.json())
            .then(function (response) {
                // console.log(response)
            })
            .catch(err => console.log(err))
        window.location.reload()
    }
    const handleClickUserImage = (e) => {
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append(
            "file",
            image,
            image.name
        )
        const config = {
            method: "PUT",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        fetch('http://127.0.0.1:8000/user/update-image', config)
            .then(response => response.json())
            .then(function (response) {
            })
            .catch(err => console.log(err))
        window.location.reload()
    }
    return (
        <div className={`${styles.Profilebg}`} style={{ backgroundImage: `url("${bgImage == null ? bgPlaceholder.src : bgImage}")` }}>
            <div className="d-flex justify-content-end pt-3 pe-3">
                <>
                    <input type="file" id="cover-image"
                        accept="image/*" className={`${styles.inputFile}`}
                        onChange={handleClickCoverImage} />
                    <label className="bg-white p-2 rounded-1" htmlFor="cover-image" role="button">
                        <BiImageAdd /> Change cover
                    </label>
                </>
            </div>
            <div className={`${styles.profileImage} py-4 bg-white text-center rounded-1`}>
                <div className={`${styles.input}`}>
                    <Image src={image == null ? userPlaceholder : image} alt={name}
                        height="100" width="100" border="5px solid var(--doger-blue)" className={`${styles.border} rounded-circle `} />
                    <input type="file" id="user-image"
                        accept="image/*"
                        className={`${styles.inputFile}`}
                        onChange={handleClickUserImage} />
                    <label htmlFor="user-image" role="button">
                        <BiCamera className={`${styles.camera}`} />
                    </label>
                </div>
                <h5>{name}</h5>
            </div>
        </div>
    )
}
export default ProfileImageSetting