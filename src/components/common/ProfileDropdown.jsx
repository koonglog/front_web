import React, { useState } from 'react';
import Logout from "../../assets/img/ic_black_logout.svg";
import User from "../../assets/img/ic_black_user.svg";
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../api/authApi';

const ProfileDropdown = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);

            await logoutAdmin();
        } catch (error) {
            console.error(error);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('tokenType');
            localStorage.removeItem('admin');
            localStorage.removeItem('isLogin');

            setIsLoading(false);
            navigate("/login", { replace: true });
        }
    };


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
                onClick={isLoading ? undefined : handleLogout}
            >
                <div className="icon">
                    <img src={Logout} alt="Logout" />
                </div>
                <div className="text">
                    {isLoading ? "로그아웃 중..." : "로그아웃"}
                </div>
            </div>
        </div>
    );
}

export default ProfileDropdown
