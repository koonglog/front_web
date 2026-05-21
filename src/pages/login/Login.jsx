import React, { useState } from 'react';
import Logo from "../../assets/img/ic_logo.svg";
import LogoName from "../../assets/img/ic_logo_name.svg";
import Hide from "../../assets/img/ic_gray_hide.svg";
import Seek from "../../assets/img/ic_gray_seek.svg";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            setErrorMessage('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        setErrorMessage('');

        // 임시 로그인 처리
        localStorage.setItem('isLogin', 'true');
        navigate('/');
    };

    return (
        <div className='Login_Wrap'>
            <div className="login_left">
                <div className="service_name">
                    <div className="icon">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="name">
                        <img src={LogoName} alt="LogoName" />
                    </div>
                </div>
                <div className="description">
                    <div className="top">데이터 기반 층간소음</div>
                    <div className="bottom">중재 플랫폼</div>
                </div>
                <div className="caption">효율적이고 쾌적한 아파트 관리를 위한 AI 관리 시스템</div>
            </div>
            <div className="login_right">
                <div className="login_box">
                    <div className="login_title">
                        <div className="title">
                            <div className="text">관리사무소 로그인</div>
                            <div className="icon">
                                <img src={Logo} alt="Logo" />
                            </div>
                        </div>
                        <div className="caption">관리사무소 계정으로 로그인하세요</div>
                    </div>
                    <div className="login_system">
                        <div className="email_input">
                            <input
                                type="email"
                                placeholder="이메일을 입력해주세요"
                                className="login_email_input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="password_input">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="비밀번호를 입력해주세요"
                                className="login_password_input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div
                                className="icon"
                                onClick={() => setIsPasswordVisible(prev => !prev)}
                            >
                                <img
                                    src={isPasswordVisible ? Seek : Hide}
                                    alt={isPasswordVisible ? "Seek" : "Hide"}
                                />
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="error_message">
                                {errorMessage}
                            </div>
                        )}
                        <div className="login_btn" onClick={handleLogin}>
                            로그인
                        </div>
                        <div className="divider"></div>
                        <div className="option">
                            <div className="find_email">이메일 찾기</div>
                            <div className="divider_text">|</div>
                            <div className="change_pw">비밀번호 변경</div>
                        </div>
                    </div>
                    <div className="goto_signup">
                        <div className="text">쿵로그가 처음이신가요?</div>
                        <div
                            className="signup"
                            onClick={() => navigate("/signup")}
                        >
                            관리사무소 등록하러 가기
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
