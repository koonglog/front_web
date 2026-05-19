import React from 'react';
import { noticeSummary, noticeItems } from "../../mocks/noticeData";
import Write from "../../assets/img/ic_white_write.png";
import Calendar from "../../assets/img/ic_gray_calendar.png";
import People from "../../assets/img/ic_gray_people.png";
import Eye from "../../assets/img/ic_gray_eye.png";
import { useNavigate } from 'react-router-dom';

const Notice = () => {
    const navigate = useNavigate();

    return (
        <div className='Notice_Wrap'>
            <div className="notice_box">
                <div className="notice_title">
                    <div className="title_text">
                        <div className="title">공지사항</div>
                        <div className="caption">주민 앱 전송 및 수신 확인 통계</div>
                    </div>
                    <div
                        className="write_btn"
                        onClick={() => navigate("write")}
                    >
                        <div className="icon">
                            <img src={Write} alt="Write" />
                        </div>
                        <div className="text">글쓰기</div>
                    </div>
                </div>
                <div className="notice_info">
                    <div className="total_send">
                        <div className="title">전체 발송</div>
                        <div className="number">{noticeSummary.totalSent}건</div>
                        <div className="caption">지난 30일</div>
                    </div>
                    <div className="average_read">
                        <div className="title">평균 확인율</div>
                        <div className="number">{noticeSummary.averageReadRate}%</div>
                        <div className="caption">전체 공지 기준</div>
                    </div>
                    <div className="recent_send">
                        <div className="title">최근 발송</div>
                        <div className="number">{noticeSummary.recentSentDate}</div>
                        <div className="caption">마지막 발송일</div>
                    </div>
                    <div className="total_receiver">
                        <div className="title">전체 수신자</div>
                        <div className="number">{noticeSummary.totalRecipients}세대</div>
                        <div className="caption">등록된 주민</div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="notice_contents">
                    {noticeItems.map((item) => {
                        const badgeClass = {
                            "생활 에티켓": "green",
                            "장비 점검 안내": "purple",
                            "긴급 알림": "red",
                            "일반 공지": "blue",
                        }[item.type];

                        return (
                            <div className="list_item" key={item.id}>
                                <div className="item_texts">
                                    <div className="item_title">
                                        <div className={`badge ${badgeClass}`}>{item.type}</div>
                                        <div className="title">{item.title}</div>
                                    </div>
                                    <div className="item_info">
                                        <div className="icon">
                                            <img src={Calendar} alt="Calendar" />
                                        </div>
                                        <div className="time">{item.sentAt}</div>
                                        <div className="icon">
                                            <img src={People} alt="People" />
                                        </div>
                                        <div className="receiver">{item.target} · {item.recipients}명</div>
                                        <div className="icon">
                                            <img src={Eye} alt="Eye" />
                                        </div>
                                        <div className="read_text">확인 {item.readCount}명 ({item.readRate}%)</div>
                                    </div>
                                </div>
                                <div
                                    className="goto_detail"
                                    onClick={() => navigate(`/notice/${item.id}`)}
                                >
                                    상세보기
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Notice
