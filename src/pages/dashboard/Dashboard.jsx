import React, { useState } from 'react';
import Search from "../../assets/img/ic_gray_search.svg";
import HomeIcon from "../../assets/img/ic_blue_home.svg";
import Warning from "../../assets/img/ic_red_warning.svg";
import Calendar from "../../assets/img/ic_orange_calendar.svg";
import Check from "../../assets/img/ic_green_check.svg";
import Filter from "../../assets/img/ic_gray_filter.svg";
import Message from "../../assets/img/ic_green_message.svg";
import {
    households,
    feedItems,
    dashboardSummary,
} from "../../mocks/dashboardData";
import Clock from "../../assets/img/ic_gray_clock.svg";
import Notice from "../../assets/img/ic_orange_notice.svg";
import { useNavigate } from 'react-router-dom';
import SendMessageModal from '../../components/dashboard/SendMessageModal';

const Dashboard = () => {
    const navigate = useNavigate();

    const [selectedHousehold, setSelectedHousehold] = useState(households[0]);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

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
                    {households.map((item) => (
                        <div
                            key={item.house}
                            className={selectedHousehold.house === item.house ? "household_item_selected" : "household_item"}
                            onClick={() => setSelectedHousehold(item)}
                        >
                            <div className="household_info">
                                <div className="location">
                                    <div className="text">{item.house}</div>
                                    <div className={`circle ${item.circleClass}`}></div>
                                </div>
                                <div className="time">{item.time}</div>
                            </div>
                            <div className="household_log">
                                <div className="event_number">오늘 {item.today}</div>
                                <div className="high_intensity">
                                    {item.high !== "0건" ? `고강도 ${item.high.replace("건", "")}` : ""}
                                </div>
                            </div>
                        </div>
                    ))}
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
                            <div className="number">{dashboardSummary.monitoring}</div>  {/* 추후 API 연결 예정 */}
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
                            <div className="number">{dashboardSummary.emergency}</div>  {/* 추후 API 연결 예정 */}
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
                            <div className="number">{dashboardSummary.todayTotal}</div>  {/* 추후 API 연결 예정 */}
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
                            <div className="number">{dashboardSummary.finishedAdjust}</div>  {/* 추후 API 연결 예정 */}
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
                            <div className="detail" onClick={() => navigate("/log-analysis")}>자세히 보기</div>
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
                            <div className="low">
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
                            {feedItems.map((item, index) => (
                                <div className="feed_item" key={`${item.house}-${item.issue}-${index}`}>
                                    <div className={item.iconClass}>
                                        <img src={item.icon} alt={item.issue} />
                                    </div>
                                    <div className="text">
                                        <div className="feed_info">{item.house}: {item.issue}</div>
                                        <div className="detail">{item.detail}</div>
                                    </div>
                                </div>
                            ))}
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
                                <div className="location">{selectedHousehold.house}</div>
                                <div className={`badge ${selectedHousehold.statusClass}`}>
                                    {selectedHousehold.status}
                                </div>
                            </div>
                            <div className="recent_event">최근 이벤트: {selectedHousehold.recentEvent}</div>
                        </div>
                        <div className="title_right">
                            {selectedHousehold.status === "즉시 대응 필요" && (
                                <div className="adjust_btn">대응</div>
                            )}
                            <div
                                className="message_btn"
                                onClick={() => setIsMessageModalOpen(true)}
                            >
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
                            <div className="number">{selectedHousehold.today}</div>
                        </div>
                        <div className="high_intensity">
                            <div className="title">고강도</div>
                            <div className="number">{selectedHousehold.high}</div>
                        </div>
                        <div className="average_duration">
                            <div className="title">평균 지속</div>
                            <div className="number">{selectedHousehold.averageDuration}</div>
                        </div>
                    </div>
                    <div className="recent_events">
                        <div className="event_title">최근 이벤트</div>
                        <div className="event_lists">
                            {selectedHousehold.events.map((event, index) => (
                                <div className="event_item" key={`${event.type}-${index}`}>
                                    <div className="event_info">
                                        <div className="info_left">
                                            <div className={event.iconClass}>
                                                <img src={event.icon} alt={event.type} />
                                            </div>
                                            <div className="info_text">
                                                <div className="event_type">{event.type}</div>
                                                <div className="event_from">{event.from}</div>
                                            </div>
                                        </div>
                                        <div className={`info_right_${event.intensityClass}`}>
                                            {event.intensity}
                                        </div>
                                    </div>
                                    <div className="event_detail">
                                        <div className="time">
                                            <div className="icon">
                                                <img src={Clock} alt="Clock" />
                                            </div>
                                            <div className="text">{event.timeRange}</div>
                                            <div className="duration_time">지속 {event.duration}</div>
                                        </div>
                                        <div className="repeat">
                                            <div className="icon">
                                                <img src={Notice} alt="Notice" />
                                            </div>
                                            <div className="text">반복 {event.repeat}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {isMessageModalOpen && (
                        <div className="modal_overlay">
                            <SendMessageModal
                                receiverHouse={selectedHousehold.house}
                                receiverName={selectedHousehold.name}
                                onClose={() => setIsMessageModalOpen(false)}
                            />
                        </div>
                    )}
                </div>
            </main >
        </div >
    )
}

export default Dashboard
