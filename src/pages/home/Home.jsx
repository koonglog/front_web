import React from 'react';
import Logo from "../../assets/img/ic_logo.svg";
import HomeIcon from "../../assets/img/ic_blue_home.png";
import Warning from "../../assets/img/ic_red_warning.png";
import Calendar from "../../assets/img/ic_orange_calendar.png";
import Notice from "../../assets/img/ic_green_notice.png";
import Edit from "../../assets/img/ic_edit.png";
import Network from "../../assets/img/ic_red_network.png";
import Data from "../../assets/img/ic_green_data.png";
import Check from "../../assets/img/ic_green_check.png";
import { noticeItems } from "../../mocks/noticeData";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const request_number = 3;
    const recent_notice_number = 5;
    const rate_number = 87;
    const unconfirmed_number = 12;
    const monitoring_number = 4;
    const emergency_number = 2;
    const today_total_number = 21;
    const finished_action_number = 3;

    const recentNotice = noticeItems[0];

    return (
        <div className='Home_Wrap'>
            <div className="home_top">
                <div className="top_left">
                    <div className="imgNgoto">
                        <div className="icon">
                            <img src={Logo} alt="Logo" />
                        </div>
                        <div
                            className="goto_mediation"
                            onClick={() => navigate("/review")}
                        >
                            바로가기
                        </div>
                    </div>
                    <div className="title">미결재 중재 요청</div>
                    <div className="num">{request_number}건</div>
                    <div className="holding">관리자 승인 대기 중</div>
                </div>
                <div className="top_right">
                    <div className="manage_info_top">
                        <div
                            className="monitoring"
                            onClick={() => navigate("/dashboard/monitoring")}
                        >
                            <div className="icon">
                                <img src={HomeIcon} alt="HomeIcon" />
                            </div>
                            <div className="text">
                                <div className="title">모니터링 세대</div>
                                <div className="description">{monitoring_number}</div>
                            </div>
                        </div>
                        <div
                            className="emergency"
                            onClick={() => navigate("/dashboard/emergency")}
                        >
                            <div className="icon">
                                <img src={Warning} alt="Warning" />
                            </div>
                            <div className="text">
                                <div className="title">긴급 대응 필요</div>
                                <div className="description">{emergency_number}</div>
                            </div>
                        </div>
                    </div>
                    <div className="manage_info_bottom">
                        <div
                            className="today_total"
                            onClick={() => navigate("/dashboard/todayTotal")}
                        >
                            <div className="icon">
                                <img src={Calendar} alt="Calendar" />
                            </div>
                            <div className="text">
                                <div className="title">오늘 발생 소음 총합</div>
                                <div className="description">{today_total_number}</div>
                            </div>
                        </div>
                        <div
                            className="finished_action"
                            onClick={() => navigate("/dashboard/finishedAdjust")}
                        >
                            <div className="icon">
                                <img src={Check} alt="Check" />
                            </div>
                            <div className="text">
                                <div className="title">조치 완료</div>
                                <div className="description">{finished_action_number}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home_middle">
                <div className="middle_title">
                    <div className="title_left">
                        <div className="icon">
                            <img src={Notice} alt="Notice" />
                        </div>
                        <div className="text">
                            <div className="title">공지사항 관리</div>
                            <div className="description">주민 앱 전송 및 수신 확인</div>  {/* TODO: 날짜는 오늘 날짜로 받아오기 */}
                        </div>
                    </div>
                    <div
                        className="title_right"
                        onClick={() => navigate("/notice/write")}
                    >
                        <img src={Edit} alt="Edit" />
                        <div className="write_notice">공지 작성</div>
                    </div>
                </div>
                <div className="notice_info">
                    <div className="recent_notice">
                        <div className="title">최근 발송</div>
                        <div className="recent_number">{recent_notice_number}건</div>
                        <div className="caption">지난 7일</div>
                    </div>
                    <div className="average_confirm_rate">
                        <div className="title">평균 확인률</div>
                        <div className="rate_number">{rate_number}%</div>
                        <div className="caption">전체 주민 기준</div>
                    </div>
                    <div className="unconfirmed_notice">
                        <div className="title">미확인 세대</div>
                        <div className="unconfirmed_number">{unconfirmed_number}세대</div>
                        <div className="caption">최근 공지 기준</div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="recents">
                    <div className="recent_title">최근 발송 공지</div>
                    <div className="notice_item">
                        <div className="notice_item_info">
                            <div className="notice_title">{recentNotice.title}</div>
                            <div className="notice_date">{recentNotice.sentAt} 발송 · 확인율 {recentNotice.readRate}%</div>
                        </div>
                        <div
                            className="notice_item_go"
                            onClick={() => navigate(`/notice/${recentNotice.id}`)}
                        >
                            보기
                        </div>
                    </div>
                </div>
            </div>
            <div className="home_bottom">
                <div className="network">
                    <div className="title">
                        <div className="icon">
                            <img src={Network} alt="Network" />
                        </div>
                        <div className="text">
                            <div className="title">네트워크 장애 세대</div>
                            <div className="caption">통신 끊김 센서</div>
                        </div>
                    </div>
                    <div className="network_item">
                        <div className="item_left">
                            <div className="site_name">B동 803호</div>  {/* TODO: 이름은 API 연동 */}
                            <div className="issue">센서 ID: SN-B803-01</div>  {/* TODO: 센서 ID는 API 연동 */}
                        </div>
                        <div className="item_right">즉시 점검</div>
                    </div>
                </div>
                <div className="data_backup">
                    <div className="title">
                        <div className="icon">
                            <img src={Data} alt="Data" />
                        </div>
                        <div className="text">
                            <div className="title">데이터 백업 상태</div>
                            <div className="caption">클라우드 동기화</div>
                        </div>
                    </div>
                    <div className="data_item">
                        <div className="item_left">
                            <div className="icon">
                                <img src={Check} alt="Check" />
                            </div>
                            <div className="text">
                                <div className="backup_title">소음 로그 데이터</div>
                                <div className="last_backup">마지막 백업: 2분 전</div>  {/* TODO: 마지막 백업은 API 연동 */}
                            </div>
                        </div>
                        <div className="item_right">정상</div>
                    </div>
                    <div className="data_item">
                        <div className="item_left">
                            <div className="icon">
                                <img src={Check} alt="Check" />
                            </div>
                            <div className="text">
                                <div className="backup_title">중재 기록</div>
                                <div className="last_backup">마지막 백업: 5분 전</div>  {/* TODO: 마지막 백업은 API 연동 */}
                            </div>
                        </div>
                        <div className="item_right">정상</div>
                    </div>
                    <div className="data_item">
                        <div className="item_left">
                            <div className="icon">
                                <img src={Check} alt="Check" />
                            </div>
                            <div className="text">
                                <div className="backup_title">센서 상태 로그</div>
                                <div className="last_backup">마지막 백업: 1분 전</div>  {/* TODO: 마지막 백업은 API 연동 */}
                            </div>
                        </div>
                        <div className="item_right">정상</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
