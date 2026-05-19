import React from 'react';
import { noticeItems } from "../../mocks/noticeData";
import { useNavigate, useParams } from 'react-router-dom';
import Back from "../../assets/img/ic_back.png";
import Calendar from "../../assets/img/ic_gray_calendar.png";
import People from "../../assets/img/ic_gray_people.png";

const NoticeDetail = () => {
    const navigate = useNavigate();
    const { noticeId } = useParams();

    const notice = noticeItems.find((item) => item.id === Number(noticeId));

    // if (!notice) {
    //     return (
    //         <div className="NoticeDetail_Wrap">
    //             <div className="notice_detail_box">
    //                 <div className="detail_top">
    //                     <div
    //                         className="back_icon"
    //                         onClick={() => navigate(-1)}
    //                     >
    //                         <img src={Back} alt="Back" />
    //                     </div>
    //                     <div className="title_text">
    //                         <div className="title">공지사항 상세</div>
    //                         <div className="caption">존재하지 않는 공지입니다.</div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    const badgeClass = {
        "생활 에티켓": "green",
        "장비 점검 안내": "purple",
        "긴급 알림": "red",
        "일반 공지": "blue",
    }[notice.type];

    return (
        <div className='NoticeDetail_Wrap'>
            <div className="notice_detail_box">
                <div className="detail_title">
                    <div
                        className="back_icon"
                        onClick={() => navigate(-1)}
                    >
                        <img src={Back} alt="Back" />
                    </div>
                    <div className="title_texts">
                        <div className="title">
                            <div className="text">{notice.title}</div>
                            <div className={`badge ${badgeClass}`}>
                                {notice.type}
                            </div>
                        </div>
                        <div className="caption">
                            <div className="icon">
                                <img src={Calendar} alt="Calendar" />
                            </div>
                            <div className="text">{notice.sentAt}</div>
                            <div className="icon">
                                <img src={People} alt="People" />
                            </div>
                            <div className="text">{notice.target}</div>
                        </div>
                    </div>
                </div>
                <div className="notice_info">
                    <div className="total_receiver">
                        <div className="title">총 수신자</div>
                        <div className="number">{notice.recipients}명</div>
                        <div className="caption">발송 대상</div>
                    </div>
                    <div className="checked_house">
                        <div className="title">확인 완료</div>
                        <div className="number">{notice.readCount}명</div>
                        <div className="caption">{notice.readRate}%</div>
                    </div>
                    <div className="unchecked_house">
                        <div className="title">미확인</div>
                        <div className="number">{notice.unreadCount}명</div>
                        <div className="caption">{notice.unreadRate}%</div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="notice_detail">
                    <div className="title">공지 내용</div>
                    <div className="contents">{notice.content}</div>
                </div>
            </div>
        </div>
    );
}

export default NoticeDetail
