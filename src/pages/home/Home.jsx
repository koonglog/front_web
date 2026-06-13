import React, { useEffect, useState } from 'react';
import Logo from "../../assets/img/ic_logo.svg";
import HomeIcon from "../../assets/img/ic_blue_home.svg";
import Warning from "../../assets/img/ic_red_warning.svg";
import Calendar from "../../assets/img/ic_orange_calendar.svg";
import Notice from "../../assets/img/ic_green_notice.svg";
import Edit from "../../assets/img/ic_white_edit.svg";
import Network from "../../assets/img/ic_red_nowifi.svg";
import Data from "../../assets/img/ic_green_database.svg";
import Check from "../../assets/img/ic_green_check.svg";
import { useNavigate } from 'react-router-dom';
import { getDashboardStats, getPendingMediations } from '../../api/dashboardApi';
import { getDashboardNoticeSummary } from '../../api/noticeApi';
import { getSensorStatus } from '../../api/sensorApi';

const Home = () => {
    const navigate = useNavigate();

    const [dashboardStats, setDashboardStats] = useState({
        total_households: 0,
        urgent_households: 0,
        today_noise_count: 0,
        completed_count: 0,
    });

    const [pendingMediations, setPendingMediations] = useState({
        pending_count: 0,
        latest_request: null,
    });

    const [isPendingLoading, setIsPendingLoading] = useState(true);
    const [isPendingError, setIsPendingError] = useState(false);

    const [noticeSummary, setNoticeSummary] = useState({
        total_sent_count: 0,
        recent_sent_count: 0,
        recent_period_days: 7,
        avg_confirmation_rate: 0,
        unconfirmed_households: 0,
        total_recipients: 0,
        latest_notice: null,
    });

    const [isNoticeSummaryLoading, setIsNoticeSummaryLoading] = useState(true);
    const [isNoticeSummaryError, setIsNoticeSummaryError] = useState(false);

    const [offlineSensors, setOfflineSensors] = useState([]);
    const [isSensorLoading, setIsSensorLoading] = useState(true);
    const [isSensorError, setIsSensorError] = useState(false);

    const [isStatsLoading, setIsStatsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                setIsStatsLoading(true);

                const data = await getDashboardStats();

                setDashboardStats({
                    total_households: data.total_households ?? 0,
                    urgent_households: data.urgent_households ?? 0,
                    today_noise_count: data.today_noise_count ?? 0,
                    completed_count: data.completed_count ?? 0,
                });
            } catch (error) {
                console.error("홈 대시보드 통계 조회 실패:", error);
            } finally {
                setIsStatsLoading(false);
            }
        };

        const fetchPendingMediations = async () => {
            try {
                setIsPendingLoading(true);
                setIsPendingError(false);

                const data = await getPendingMediations();

                setPendingMediations({
                    pending_count: data.pending_count ?? 0,
                    latest_request: data.latest_request ?? null,
                });
            } catch (error) {
                console.error("미결재 중재 요청 조회 실패:", error);
                setIsPendingError(true);
            } finally {
                setIsPendingLoading(false);
            }
        };

        fetchDashboardStats();
        fetchPendingMediations();
    }, []);

    useEffect(() => {
        const fetchNoticeSummary = async () => {
            try {
                setIsNoticeSummaryLoading(true);
                setIsNoticeSummaryError(false);

                const data = (await getDashboardNoticeSummary()) ?? {};

                setNoticeSummary({
                    total_sent_count: data.total_sent_count ?? 0,
                    recent_sent_count: data.recent_sent_count ?? 0,
                    recent_period_days: data.recent_period_days ?? 7,
                    avg_confirmation_rate: data.avg_confirmation_rate ?? 0,
                    unconfirmed_households: data.unconfirmed_households ?? 0,
                    total_recipients: data.total_recipients ?? 0,
                    latest_notice: data.latest_notice ?? null,
                });
            } catch (error) {
                console.error("홈 공지사항 요약 조회 실패:", error);
                setIsNoticeSummaryError(true);
            } finally {
                setIsNoticeSummaryLoading(false);
            }
        };

        fetchNoticeSummary();
    }, []);

    useEffect(() => {
        const fetchSensorStatus = async () => {
            try {
                setIsSensorLoading(true);
                setIsSensorError(false);

                const data = await getSensorStatus();

                const offlineSensorList = (data.sensors ?? []).filter(
                    (sensor) => sensor.is_online === false
                );

                setOfflineSensors(offlineSensorList);
            } catch (error) {
                console.error("홈 센서 상태 조회 실패:", error);
                setIsSensorError(true);
            } finally {
                setIsSensorLoading(false);
            }
        };

        fetchSensorStatus();
    }, []);

    const latestNotice = noticeSummary.latest_notice;
    const latestNoticeId = latestNotice?.id ?? latestNotice?.notice_id ?? null;
    const latestNoticeTitle = latestNotice?.title ?? "최근 발송된 공지가 없습니다.";
    const latestNoticeSentAt =
        latestNotice?.sent_at ??
        latestNotice?.created_at ??
        null;
    const latestNoticeReadRate =
        latestNotice?.confirmation_rate ??
        latestNotice?.read_rate ??
        latestNotice?.readRate ??
        noticeSummary.avg_confirmation_rate;

    const formatNoticeDate = (dateString) => {
        if (!dateString) return "발송일 없음";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "발송일 없음";
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${year}.${month}.${day} ${hour}:${minute}`;
    };

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
                    <div className="num">
                        {isPendingLoading ? "-" : pendingMediations.pending_count}건
                    </div>
                    <div className="holding">
                        {isPendingError
                            ? "중재 요청 조회 실패"
                            : "관리자 승인 대기 중"}
                    </div>
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
                                <div className="description">{isStatsLoading ? "-" : dashboardStats.total_households}</div>
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
                                <div className="description">{isStatsLoading ? "-" : dashboardStats.urgent_households}</div>
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
                                <div className="description">{isStatsLoading ? "-" : dashboardStats.today_noise_count}</div>
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
                                <div className="description">{isStatsLoading ? "-" : dashboardStats.completed_count}</div>
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
                        <div className="recent_number">
                            {isNoticeSummaryLoading ? "-" : noticeSummary.recent_sent_count}건
                        </div>
                        <div className="caption">지난 7일</div>
                    </div>
                    <div className="average_confirm_rate">
                        <div className="title">평균 확인률</div>
                        <div className="rate_number">
                            {isNoticeSummaryLoading ? "-" : noticeSummary.avg_confirmation_rate}%
                        </div>
                        <div className="caption">전체 주민 기준</div>
                    </div>
                    <div className="unconfirmed_notice">
                        <div className="title">미확인 세대</div>
                        <div className="unconfirmed_number">
                            {isNoticeSummaryLoading ? "-" : noticeSummary.unconfirmed_households}세대
                        </div>
                        <div className="caption">최근 공지 기준</div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="recents">
                    <div className="recent_title">최근 발송 공지</div>
                    <div className="notice_item">
                        <div className="notice_item_info">
                            <div className="notice_title">
                                {isNoticeSummaryError ? "최근 공지 조회 실패" : latestNoticeTitle}
                            </div>
                            <div className="notice_date">
                                {isNoticeSummaryError
                                    ? "네트워크 또는 서버 상태를 확인해주세요."
                                    : latestNotice
                                        ? `${formatNoticeDate(latestNoticeSentAt)} 발송 · 확인율 ${latestNoticeReadRate}%`
                                        : "아직 발송된 공지가 없습니다."}
                            </div>
                        </div>
                        <div
                            className="notice_item_go"
                            onClick={() => latestNoticeId && navigate(`/notice/${latestNoticeId}`)}
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
                    <div className="network_item_list">
                        {isSensorLoading && (
                            <div className="network_item">
                                <div className="item_left">
                                    <div className="site_name">센서 상태를 불러오는 중입니다.</div>
                                    <div className="issue">잠시만 기다려주세요.</div>
                                </div>
                            </div>
                        )}
                        {isSensorError && (
                            <div className="network_item">
                                <div className="item_left">
                                    <div className="site_name">센서 상태 조회 실패</div>
                                    <div className="issue">네트워크 또는 서버 상태를 확인해주세요.</div>
                                </div>
                            </div>
                        )}
                        {!isSensorLoading && !isSensorError && offlineSensors.length === 0 && (
                            <div className="network_item">
                                <div className="item_left">
                                    <div className="site_name">네트워크 장애 세대가 없습니다.</div>
                                    <div className="issue">현재 모든 센서가 온라인 상태입니다.</div>
                                </div>
                                <div className="item_right">정상</div>
                            </div>
                        )}
                        {!isSensorLoading && !isSensorError && offlineSensors.map((sensor) => (
                            <div className="network_item" key={sensor.sensor_id}>
                                <div className="item_left">
                                    <div className="site_name">{sensor.location_unit}</div>
                                    <div className="issue">
                                        센서 ID: {sensor.sensor_id} · 배터리 {sensor.battery_level}%
                                    </div>
                                </div>
                                <div className="item_right">즉시 점검</div>
                            </div>
                        ))}
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
