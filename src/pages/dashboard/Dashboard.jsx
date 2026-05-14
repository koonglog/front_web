import React from 'react';
import Search from "../../assets/img/ic_gray_search.png";
import HomeIcon from "../../assets/img/ic_blue_home.png";
import Warning from "../../assets/img/ic_red_warning.png";
import Calendar from "../../assets/img/ic_orange_calendar.png";
import Check from "../../assets/img/ic_green_check.png";
import Filter from "../../assets/img/ic_gray_filter.png";
import Message from "../../assets/img/ic_green_message.png";
import RedSound from "../../assets/img/ic_red_sound.png";
import OrangeSound from "../../assets/img/ic_orange_sound.png";
import Clock from "../../assets/img/ic_gray_clock.png";
import Notice from "../../assets/img/ic_orange_warning.png";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className='Dashboard_Wrap'>
            <aside className='dashboard_aside'>
                <div className="aside_title">세대 현황</div>
                <div className="aside_search">
                    <div className="icon">
                        <img src={Search} alt="Search" />
                    </div>
                    <input type="search" placeholder="동/호수 검색" name="aside_search" id="aside_search" />
                </div>
                <div className="aside_lists">
                    <div className="household_item_selected">
                        <div className="household_info">
                            <div className="location">
                                <div className="text">A동 304호</div>  {/* 추후 API 연결 예정 */}
                                <div className="circle"></div>
                            </div>
                            <div className="time">23:34</div>  {/* 추후 API 연결 예정 */}
                        </div>
                        <div className="household_log">
                            <div className="event_number">오늘 7건</div>  {/* 추후 API 연결 예정 */}
                            <div className="high_intensity">고강도 3</div>  {/* 추후 API 연결 예정 */}
                        </div>
                    </div>
                    <div className="household_item">
                        <div className="household_info">
                            <div className="location">
                                <div className="text">A동 502호</div>  {/* 추후 API 연결 예정 */}
                                <div className="circle"></div>
                            </div>
                            <div className="time">21:15</div>  {/* 추후 API 연결 예정 */}
                        </div>
                        <div className="household_log">
                            <div className="event_number">오늘 4건</div>  {/* 추후 API 연결 예정 */}
                            <div className="high_intensity">고강도 1</div>  {/* 추후 API 연결 예정 */}
                        </div>
                    </div>
                    <div className="household_item">
                        <div className="household_info">
                            <div className="location">
                                <div className="text">B동 1208호</div>  {/* 추후 API 연결 예정 */}
                                <div className="circle"></div>
                            </div>
                            <div className="time">19:30</div>  {/* 추후 API 연결 예정 */}
                        </div>
                        <div className="household_log">
                            <div className="event_number">오늘 2건</div>  {/* 추후 API 연결 예정 */}
                            <div className="high_intensity"></div>  {/* 추후 API 연결 예정 */}
                        </div>
                    </div>
                    <div className="household_item">
                        <div className="household_info">
                            <div className="location">
                                <div className="text">A동 705호</div>  {/* 추후 API 연결 예정 */}
                                <div className="circle"></div>
                            </div>
                            <div className="time">00:12</div>  {/* 추후 API 연결 예정 */}
                        </div>
                        <div className="household_log">
                            <div className="event_number">오늘 8건</div>  {/* 추후 API 연결 예정 */}
                            <div className="high_intensity">고강도 4</div>  {/* 추후 API 연결 예정 */}
                        </div>
                    </div>
                </div>
            </aside>
            <main className="dashboard_main">
                <div className="manage_info">
                    <div
                        className="monitoring"
                        onClick={() => navigate("monitoring")}
                    >
                        <div className="icon">
                            <img src={HomeIcon} alt="HomeIcon" />
                        </div>
                        <div className="text">
                            <div className="title">모니터링 세대</div>
                            <div className="number">4</div>  {/* 추후 API 연결 예정 */}
                        </div>
                    </div>
                    <div
                        className="emergency"
                        onClick={() => navigate("emergency")}
                    >
                        <div className="icon">
                            <img src={Warning} alt="Warning" />
                        </div>
                        <div className="text">
                            <div className="title">긴급 대응 필요</div>
                            <div className="number">2</div>  {/* 추후 API 연결 예정 */}
                        </div>
                    </div>
                    <div
                        className="today_total"
                        onClick={() => navigate("todayTotal")}
                    >
                        <div className="icon">
                            <img src={Calendar} alt="Calendar" />
                        </div>
                        <div className="text">
                            <div className="title">오늘 발생 소음 총합</div>
                            <div className="number">21</div>  {/* 추후 API 연결 예정 */}
                        </div>
                    </div>
                    <div
                        className="finished_adjust"
                        onClick={() => navigate("finishedAdjust")}
                    >
                        <div className="icon">
                            <img src={Check} alt="Check" />
                        </div>
                        <div className="text">
                            <div className="title">조치 완료</div>
                            <div className="number">3</div>  {/* 추후 API 연결 예정 */}
                        </div>
                    </div>
                </div>
                <div className="mapNfeed">
                    <div className="hotspot">
                        <div className="hotspot_title">
                            <div className="text">
                                <div className="title">갈등 핫스팟 맵</div>
                                <div className="caption">건물별 소음 발생 현황</div>
                            </div>
                            <div className="detail">자세히 보기</div>
                        </div>
                        <div className="hotspot_map">
                            핫스팟 맵이 있는 자리입니다.
                        </div>  {/* 추후 API 연결 예정 */}
                        <div className="divider"></div>
                        <div className="value_info">
                            <div className="emergency">
                                <div className="circle"></div>
                                <div className="text">긴급</div>
                            </div>
                            <div className="observation">
                                <div className="circle"></div>
                                <div className="text">관찰</div>
                            </div>
                            <div className="normal">
                                <div className="circle"></div>
                                <div className="text">정상</div>
                            </div>
                        </div>
                    </div>
                    <div className="realtime_feed">
                        <div className="feed_title">
                            <div className="title">실시간 피드</div>
                            <div className="caption">최근 감지된 이벤트</div>
                        </div>
                        <div className="feed_lists">
                            <div className="feed_item">
                                <div className="icon_red">
                                    <img src={RedSound} alt="RedSound" />
                                </div>
                                <div className="text">
                                    <div className="feed_info">A동 304호: 반복 충격음</div>  {/* 추후 API 연결 예정 */}
                                    <div className="detail">23:34 · 14분</div>  {/* 추후 API 연결 예정 */}
                                </div>
                            </div>
                            <div className="feed_item">
                                <div className="icon_red">
                                    <img src={RedSound} alt="RedSound" />
                                </div>
                                <div className="text">
                                    <div className="feed_info">A동 705호: 끄는 소리</div>  {/* 추후 API 연결 예정 */}
                                    <div className="detail">23:15 · 18분</div>  {/* 추후 API 연결 예정 */}
                                </div>
                            </div>
                            <div className="feed_item">
                                <div className="icon_orange">
                                    <img src={OrangeSound} alt="OrangeSound" />
                                </div>
                                <div className="text">
                                    <div className="feed_info">A동 304호: 끄는 소리</div>  {/* 추후 API 연결 예정 */}
                                    <div className="detail">22:45 · 7분</div>  {/* 추후 API 연결 예정 */}
                                </div>
                            </div>
                            <div className="feed_item">
                                <div className="icon_orange">
                                    <img src={OrangeSound} alt="OrangeSound" />
                                </div>
                                <div className="text">
                                    <div className="feed_info">A동 502호: 충격음</div>  {/* 추후 API 연결 예정 */}
                                    <div className="detail">21:15 · 5분</div>  {/* 추후 API 연결 예정 */}
                                </div>
                            </div>
                            <div className="feed_item">
                                <div className="icon_red">
                                    <img src={RedSound} alt="RedSound" />
                                </div>
                                <div className="text">
                                    <div className="feed_info">A동 304호: 반복 충격음</div>  {/* 추후 API 연결 예정 */}
                                    <div className="detail">23:34 · 14분</div>  {/* 추후 API 연결 예정 */}
                                </div>
                            </div>
                            <div className="feed_item">
                                <div className="icon_red">
                                    <img src={RedSound} alt="RedSound" />
                                </div>
                                <div className="text">
                                    <div className="feed_info">A동 705호: 끄는 소리</div>  {/* 추후 API 연결 예정 */}
                                    <div className="detail">23:15 · 18분</div>  {/* 추후 API 연결 예정 */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overall_status">
                    <div className="status_title">
                        <div className="title_left">
                            <div className="title">전체 시간대별 발생 현황</div>
                            <div className="caption">모든 세대 합산 · 최근 24시간</div>
                        </div>
                        <div className="title_right">
                            <div className="icon">
                                <img src={Filter} alt="Filter" />
                            </div>
                            <div className="text">필터</div>
                        </div>
                    </div>
                    <div className="status_graph">
                        전체 시간대별 소음 발생 현황입니다.
                    </div>  {/* 추후 API 연결 예정 */}
                </div>
                <div className="household_analysis">
                    <div className="household_title">
                        <div className="title_left">
                            <div className="title">
                                <div className="location">A동 304호</div>  {/* 추후 API 연결 예정 */}
                                <div className="badge">즉시 대응 필요</div>  {/* 추후 API 연결 예정 */}
                            </div>
                            <div className="recent_event">최근 이벤트: 23:34</div>  {/* 추후 API 연결 예정 */}
                        </div>
                        <div className="title_right">
                            <div className="apply_consultation">상담 신청</div>
                            <div className="reservation_site">현장진단 예약</div>
                            <div className="message_btn">
                                <div className="icon">
                                    <img src={Message} alt="Message" />
                                </div>
                                <div className="text">메시지</div>
                            </div>
                        </div>
                    </div>
                    <div className="household_manage">
                        <div className="today_event">
                            <div className="title">오늘 감지</div>
                            <div className="number">7건</div>
                        </div>
                        <div className="high_intensity">
                            <div className="title">고강도</div>
                            <div className="number">3건</div>
                        </div>
                        <div className="average_duration">
                            <div className="title">평균 지속</div>
                            <div className="number">12분</div>
                        </div>
                    </div>
                    <div className="recent_events">
                        <div className="event_title">최근 이벤트</div>
                        <div className="event_lists">
                            <div className="event_item">
                                <div className="event_info">
                                    <div className="info_left">
                                        <div className="icon_red">
                                            <img src={RedSound} alt="RedSound" />
                                        </div>
                                        <div className="info_text">
                                            <div className="event_type">반복 충격음</div>
                                            <div className="event_from">위층</div>
                                        </div>
                                    </div>
                                    <div className="info_right_red">강도 강</div>
                                </div>
                                <div className="event_detail">
                                    <div className="time">
                                        <div className="icon">
                                            <img src={Clock} alt="Clock" />
                                        </div>
                                        <div className="text">23:20 ~ 23:34</div>
                                        <div className="duration_time">지속 14분</div>
                                    </div>
                                    <div className="repeat">
                                        <div className="icon">
                                            <img src={Notice} alt="Notice" />
                                        </div>
                                        <div className="text">반복 7회</div>
                                    </div>
                                </div>
                            </div>
                            <div className="event_item">
                                <div className="event_info">
                                    <div className="info_left">
                                        <div className="icon_orange">
                                            <img src={OrangeSound} alt="OrangeSound" />
                                        </div>
                                        <div className="info_text">
                                            <div className="event_type">끄는 소리</div>
                                            <div className="event_from">위층</div>
                                        </div>
                                    </div>
                                    <div className="info_right_orange">강도 중</div>
                                </div>
                                <div className="event_detail">
                                    <div className="time">
                                        <div className="icon">
                                            <img src={Clock} alt="Clock" />
                                        </div>
                                        <div className="text">22:45 ~ 22:52</div>
                                    </div>
                                    <div className="duration_time">지속 7분</div>
                                    <div className="repeat">
                                        <div className="icon">
                                            <img src={Notice} alt="Notice" />
                                        </div>
                                        <div className="text">반복 3회</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    )
}

export default Dashboard
