import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/img/ic_logo.svg';
import Alarm from '../../assets/img/ic_alarm.svg';
import Dashboard from '../../assets/img/ic_dashboard.svg';
import Distribution from '../../assets/img/ic_distribution.svg';
import LogAnalysis from '../../assets/img/ic_loganalysis.svg';
import Review from '../../assets/img/ic_review.svg';
import Notice from '../../assets/img/ic_notice.svg';
import ExtService from '../../assets/img/ic_extservice.svg';

const Nav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        {
            path: '/dashboard',
            icon: Dashboard,
            alt: 'Dashboard',
            text: '대시보드',
        },
        {
            path: '/distribution',
            icon: Distribution,
            alt: 'Distribution',
            text: '소음 분포도',
        },
        {
            path: '/log-analysis',
            icon: LogAnalysis,
            alt: 'Log Analysis',
            text: '소음 분석',
        },
        {
            path: '/review',
            icon: Review,
            alt: 'Review',
            text: '중재 메시지 검토',
        },
        {
            path: '/notice',
            icon: Notice,
            alt: 'Notice',
            text: '공지사항',
        },
        {
            path: '/external-service',
            icon: ExtService,
            alt: 'External Service',
            text: '외부 서비스',
        },
    ];

    const isHome = location.pathname === '/';

    return (
        <div className='Nav_Wrap'>
            <div className="nav_top">
                <div className="nav_home">
                    <div
                        className={`nav_logo ${isHome ? 'active' : ''}`}
                        onClick={() => navigate('/')}
                    >
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="nav_text">
                        <div className="koonglog">쿵로그 관리 시스템</div>
                        <div className="location">푸르지오 아파트 관리사무소</div>  {/* 추후에 API에서 받아올 예정 */}
                    </div>
                </div>
                <div className="nav_right">
                    <div className="nav_alarm">
                        <img src={Alarm} alt="Alarm" />
                    </div>
                    <div className="nav_user">김관리 관리자</div>  {/* 추후에 API에서 받아올 예정 */}
                </div>
            </div>
            <div className="divider"></div>
            <div className="nav_bottom">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <div
                            key={item.path}
                            className={`nav_list ${isActive ? 'active' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            <div className="icon">
                                <img src={item.icon} alt={item.alt} />
                            </div>
                            <div className="text">{item.text}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Nav
