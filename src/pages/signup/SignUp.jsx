import React, { useState } from 'react';
import Back from "../../assets/img/ic_gray_back.svg";
import Logo from "../../assets/img/ic_logo.svg";
import LogoName from "../../assets/img/ic_logo_name.svg";
import Building from "../../assets/img/ic_green_building.svg";
import People from "../../assets/img/ic_blue_people.svg";
import Stair from "../../assets/img/ic_purple_stair.svg";
import ChevronDown from "../../assets/img/ic_chevron_down.svg";
import ChevronUp from "../../assets/img/ic_chevron_up.svg";
import Hide from "../../assets/img/ic_gray_hide.svg";
import Seek from "../../assets/img/ic_gray_seek.svg";
import Checkbox from "../../assets/img/ic_checked.svg"
import UnCheckbox from "../../assets/img/ic_unchecked.svg";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const [isAuthorityOpen, setIsAuthorityOpen] = useState(false);
    const [selectedAuthority, setSelectedAuthority] = useState("관리원");

    const [isPasswordHide, setIsPasswordHide] = useState(true);
    const [isPasswordCheckHide, setIsPasswordCheckHide] = useState(true);

    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const [agreeTerms, setAgreeTerms] = useState({
        use: false,
        privacy: false,
        approval: false,
    });

    const isAllAgreed = agreeTerms.use && agreeTerms.privacy && agreeTerms.approval;

    const authorityList = ["관리소장", "관리원", "기술팀", "보안팀"];

    return (
        <div className='SignUp_Wrap'>
            <div className="signup_left">
                <div
                    className="back_icon"
                    onClick={() => navigate("/login")}
                >
                    <img src={Back} alt="Back" />
                </div>
                <div className="service_name">
                    <div className="icon">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="name">
                        <img src={LogoName} alt="LogoName" />
                    </div>
                </div>
                <div className="description">
                    <div className="top">관리사무소</div>
                    <div className="bottom">등록 신청</div>
                </div>
                <div className="caption">스마트한 아파트 관리의 시작<br />지금 바로 등록하세요</div>
                <div className="service_description">
                    <div className="dashboard">
                        <div className="icon">
                            <img src={Building} alt="Building" />
                        </div>
                        <div className="text">
                            <div className="title">통합 관리 대시보드</div>
                            <div className="caption">모든 정보를 한눈에 확인하고 관리하세요</div>
                        </div>
                    </div>
                    <div className="communication">
                        <div className="icon">
                            <img src={People} alt="People" />
                        </div>
                        <div className="text">
                            <div className="title">입주민 소통</div>
                            <div className="caption">효율적인 커뮤니케이션 채널 제공</div>
                        </div>
                    </div>
                    <div className="analysis">
                        <div className="icon">
                            <img src={Stair} alt="Stair" />
                        </div>
                        <div className="text">
                            <div className="title">데이터 분석</div>
                            <div className="caption">실시간 통계 및 리포트 생성</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="signup_right">
                <div className="signup_box">
                    <div className="signup_title">
                        <div className="title">
                            <div className="text">관리사무소 등록 신청</div>
                            <div className="icon">
                                <img src={Logo} alt="Logo" />
                            </div>
                        </div>
                        <div className="caption">관리사무소 정보를 입력해주세요</div>
                    </div>
                    <div className="signup_system">
                        <div className="office_name">
                            <div className="title">관리사무소명</div>
                            <div className="name_input">
                                <input type="text" placeholder='관리사무소 이름을 입력해주세요' className="office_name_input" />
                            </div>
                        </div>
                        <div className="office_address">
                            <div className="title">관리사무소 주소</div>
                            <div className="address_input">
                                <input type="text" placeholder='관리사무소 주소를 입력해주세요' className="office_address_input" />
                            </div>
                        </div>
                        <div className="office_user_name">
                            <div className="title">담당자명</div>
                            <div className="name_input">
                                <input type="text" placeholder='담당자의 이름을 입력해주세요' className="user_name_input" />
                            </div>
                        </div>
                        <div className="office_user_authority">
                            <div className="title">담당자 직책</div>
                            <div
                                className="authority_input"
                                onClick={() => setIsAuthorityOpen(!isAuthorityOpen)}
                            >
                                <input
                                    type="text"
                                    value={selectedAuthority}
                                    readOnly
                                    className="user_authority_input"
                                />
                                <div className="icon">
                                    <img
                                        src={isAuthorityOpen ? ChevronUp : ChevronDown}
                                        alt="Chevron"
                                    />
                                </div>
                            </div>
                            {isAuthorityOpen && (
                                <div className="authority_dropdown">
                                    {authorityList.map((authority) => (
                                        <div
                                            key={authority}
                                            className={`authority_option ${selectedAuthority === authority ? "selected" : ""}`}
                                            onClick={() => {
                                                setSelectedAuthority(authority);
                                                setIsAuthorityOpen(false);
                                            }}
                                        >
                                            {authority}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="office_email_input">
                            <div className="title">이메일</div>
                            <div className="email_input">
                                <input type="email" placeholder='이메일을 입력해주세요' className="office_email_input" />
                            </div>
                        </div>
                        <div className="office_pw_input">
                            <div className="title">비밀번호</div>
                            <div className="pw_input">
                                <input
                                    type={isPasswordHide ? "password" : "text"}
                                    placeholder="비밀번호를 입력해주세요"
                                    className="pw_input_text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div
                                    className="icon"
                                    onClick={() => setIsPasswordHide(!isPasswordHide)}
                                >
                                    <img
                                        src={isPasswordHide ? Hide : Seek}
                                        alt="Password Toggle"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="office_pw_check_input">
                            <div className="title">비밀번호 확인</div>
                            <div className="pw_check_input">
                                <input
                                    type={isPasswordCheckHide ? "password" : "text"}
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    className="pw_check_input_text"
                                    value={passwordCheck}
                                    onChange={(e) => setPasswordCheck(e.target.value)}
                                />
                                <div
                                    className="icon"
                                    onClick={() => setIsPasswordCheckHide(!isPasswordCheckHide)}
                                >
                                    <img
                                        src={isPasswordCheckHide ? Hide : Seek}
                                        alt="Password Check Toggle"
                                    />
                                </div>
                            </div>
                            {passwordCheck && (
                                <div className={`check_result ${password === passwordCheck ? "success" : "error"}`}>
                                    {password === passwordCheck
                                        ? "비밀번호가 일치합니다"
                                        : "비밀번호가 다릅니다"}
                                </div>
                            )}
                        </div>
                        <div className="divider"></div>
                        <div className="agree_section">
                            <div className="agree_item">
                                <div
                                    className="agree_icon"
                                    onClick={() =>
                                        setAgreeTerms({
                                            ...agreeTerms,
                                            use: !agreeTerms.use,
                                        })
                                    }
                                >
                                    <img
                                        src={agreeTerms.use ? Checkbox : UnCheckbox}
                                        alt="Use Agree"
                                    />
                                </div>
                                <div className="agree_required">(필수)</div>
                                <div className="agree_text">이용약관에 동의합니다</div>
                            </div>

                            <div className="agree_item">
                                <div
                                    className="agree_icon"
                                    onClick={() =>
                                        setAgreeTerms({
                                            ...agreeTerms,
                                            privacy: !agreeTerms.privacy,
                                        })
                                    }
                                >
                                    <img
                                        src={agreeTerms.privacy ? Checkbox : UnCheckbox}
                                        alt="Privacy Agree"
                                    />
                                </div>
                                <div className="agree_required">(필수)</div>
                                <div className="agree_text">개인정보 처리방침에 동의합니다</div>
                            </div>

                            <div className="agree_item">
                                <div
                                    className="agree_icon"
                                    onClick={() =>
                                        setAgreeTerms({
                                            ...agreeTerms,
                                            approval: !agreeTerms.approval,
                                        })
                                    }
                                >
                                    <img
                                        src={agreeTerms.approval ? Checkbox : UnCheckbox}
                                        alt="Approval Agree"
                                    />
                                </div>
                                <div className="agree_required">(필수)</div>
                                <div className="agree_text">
                                    신청 후 관리자 승인까지 1~2일 소요될 수 있음을 확인하였습니다.
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={`signup_btn ${isAllAgreed ? "active" : "disabled"}`}
                            disabled={!isAllAgreed}
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
