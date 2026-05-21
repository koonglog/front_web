import React from 'react';
import Logout from "../../assets/img/ic_black_logout.svg";
import User from "../../assets/img/ic_black_user.svg";
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
    const navigate = useNavigate();

    return (
        <div className='ProfileDropdown_Wrap'>
            <div
                className="mypage"
                onClick={() => navigate("/mypage")}
            >
                <div className="icon">
                    <img src={User} alt="User" />
                </div>
                <div className="text">마이페이지</div>
            </div>
            <div className="divider"></div>
            <div
                className="logout"
                onClick={() => navigate("/login")}
            >
                <div className="icon">
                    <img src={Logout} alt="Logout" />
                </div>
                <div className="text">로그아웃</div>
            </div>
        </div>
    );
}

export default ProfileDropdown
