import React, { useState } from 'react';
import { mediationReviewItems } from "../../mocks/reviewData";
import OrangePeople from "../../assets/img/ic_orange_people.svg";
import GreenPeople from "../../assets/img/ic_green_people.svg";
import Message from "../../assets/img/ic_gray_message.svg";
import GreenSend from "../../assets/img/ic_green_send.svg";
import Calendar from "../../assets/img/ic_gray_calendar.svg";
import WhiteCheck from "../../assets/img/ic_white_check.svg";
import GreenCheck from "../../assets/img/ic_green_check.svg";
import Clock from "../../assets/img/ic_gray_clock.svg";

const Review = () => {
    const [activeTab, setActiveTab] = useState("pending");

    const pendingItems = mediationReviewItems.filter(
        (item) => item.status === "pending"
    );

    const finishedItems = mediationReviewItems.filter(
        (item) => item.status === "finished"
    );

    const currentItems = activeTab === "pending" ? pendingItems : finishedItems;

    const hours = Array.from({ length: 24 }, (_, index) => index + 1);

    return (
        <div className='Review_Wrap'>
            <div className="review_box">
                <div className="title_box">
                    <div className="review_title">
                        <div className="title">중재 메시지 검토</div>
                        <div className="caption">비폭력 대화 기반 AI 메시지 생성 및 검토 시스템</div>
                    </div>
                    <div className="tabs">
                        <div
                            className={`pending ${activeTab === "pending" ? "active" : ""}`}
                            onClick={() => setActiveTab("pending")}
                        >
                            승인 대기({pendingItems.length})
                        </div>

                        <div
                            className={`finished ${activeTab === "finished" ? "active" : ""}`}
                            onClick={() => setActiveTab("finished")}
                        >
                            완료({finishedItems.length})
                        </div>
                    </div>
                </div>
                <div className="contents_box">
                    {currentItems.map((item) => {
                        const isPending = item.status === "pending";

                        return (
                            <div className="review_item" key={item.id}>
                                <div className="item_title">
                                    <div className={`icon ${item.status}`}>
                                        <img
                                            src={isPending ? OrangePeople : GreenPeople}
                                            alt={isPending ? "OrangePeople" : "GreenPeople"}
                                        />
                                    </div>
                                    <div className="title_text">
                                        <div className="title">
                                            <div className="house_name">
                                                {item.house} - {item.name}
                                            </div>
                                            <div className={`status_badge ${item.status}`}>
                                                {item.badgeText}
                                            </div>
                                        </div>
                                        <div className="caption">
                                            신청: {item.requestDate} · {item.senderFloor} → {item.receiverFloor}
                                            {item.completedDate && ` · 완료: ${item.completedDate}`}
                                        </div>
                                    </div>
                                </div>
                                <div className="message_compare">
                                    <div className="original_message">
                                        <div className="message_title">
                                            <div className="icon">
                                                <img src={Message} alt="Message" />
                                            </div>
                                            <div className="text">원본 민원</div>
                                        </div>
                                        <div className="message_box">
                                            {item.originalMessage}
                                        </div>
                                    </div>
                                    <div className="ai_message">
                                        <div className="message_title">
                                            <div className="icon">
                                                <img src={GreenSend} alt="GreenSend" />
                                            </div>
                                            <div className="text">AI 생성 중재 메시지</div>
                                            <div className="badge">비폭력 대화</div>
                                        </div>
                                        <div className="message_box">
                                            {item.aiMessage}
                                        </div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                {item.status === "pending" && (
                                    <>
                                        <div className="quiet_time_section">
                                            <div className="quiet_title">
                                                <div className="icon">
                                                    <img src={Calendar} alt="Calendar" />
                                                </div>
                                                <div className="text">민원 세대가 희망하는 조용한 시간</div>
                                            </div>
                                            <div className="hour_grid">
                                                {hours.map((hour) => (
                                                    <div
                                                        key={hour}
                                                        className={`hour_item ${item.suggestedQuietHours.includes(hour)
                                                            ? "selected"
                                                            : ""
                                                            }`}
                                                    >
                                                        {hour}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="approve_btn">
                                            <div className="icon">
                                                <img src={WhiteCheck} alt="WhiteCheck" />
                                            </div>
                                            <div className="text">AI 메시지 승인 및 발송</div>
                                        </div>
                                    </>
                                )}
                                {item.status === "finished" && (
                                    <>
                                        <div className="quiet_time_section">
                                            <div className="quiet_title">
                                                <div className="icon">
                                                    <img src={Clock} alt="Clock" />
                                                </div>
                                                <div className="text">민원 세대가 희망하는 조용한 시간</div>
                                            </div>
                                            <div className="times">
                                                <div className="start_time">{item.suggestedQuietHours.start}</div>
                                                <span>~</span>
                                                <div className="end_time">{item.suggestedQuietHours.end}</div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="complete_btn">
                                            <div className="icon">
                                                <img src={GreenCheck} alt="GreenCheck" />
                                            </div>
                                            <div className="text">중재 메시지 발송 완료</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Review
