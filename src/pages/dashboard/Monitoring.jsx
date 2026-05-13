import React, { useState } from 'react';
import BackIcon from "../../assets/img/ic_back.png";
import Filter from "../../assets/img/ic_gray_filter.png";
import Download from "../../assets/img/ic_white_download.png";
import Message from "../../assets/img/ic_green_message.png";
import SendMessageModal from '../../components/dashboard/SendMessageModal';

const Monitoring = () => {
    const households = [
        { house: "A동 304호", statusClass: "badge_high", status: "즉시 대응 필요", name: "김철수", phone: "010-1234-5678", today: "7건", high: "3건", time: "23:34" },
        { house: "A동 502호", statusClass: "badge_normal", status: "관찰 필요", name: "이영희", phone: "010-2345-6789", today: "4건", high: "1건", time: "21:15" },
        { house: "B동 1208호", statusClass: "badge_low", status: "정상", name: "박민수", phone: "010-3456-7890", today: "2건", high: "0건", time: "19:30" },
        { house: "A동 705호", statusClass: "badge_high", status: "즉시 대응 필요", name: "정수연", phone: "010-4567-8901", today: "8건", high: "4건", time: "00:12" },
    ];

    const [selectedHousehold, setSelectedHousehold] = useState(null);

    return (
        <div className='Monitoring_Wrap'>
            <div className="monitoring_box">
                <div className="monitoring_top">
                    <div className="monitoring_left">
                        <div className="back_icon">
                            <img src={BackIcon} alt="BackIcon" />
                        </div>
                        <div className="monitoring_text">
                            <div className="title">전체 모니터링 세대</div>
                            <div className="caption">총 {households.length}개 세대 실시간 현황</div>
                        </div>
                    </div>
                    <div className="monitoring_right">
                        <div className="filter_btn">
                            <div className="icon">
                                <img src={Filter} alt="Filter" />
                            </div>
                            <div className="text">필터</div>
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <td>동/호</td>
                        <td>상태</td>
                        <td>입주민</td>
                        <td>연락처</td>
                        <td>오늘 이벤트</td>
                        <td>고강도</td>
                        <td>최근 시간</td>
                        <td>조치</td>
                    </thead>
                    <tbody>
                        {households.map((item) => (
                            <tr key={item.house}>
                                <td className='text_bold'>{item.house}</td>
                                <td className={item.statusClass}>{item.status}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td className='text_bold'>{item.today}</td>
                                <td className='high'>{item.high}</td>
                                <td>{item.time}</td>
                                <td
                                    className='icon'
                                    onClick={() => setSelectedHousehold(item)}
                                >
                                    <img src={Message} alt="Message" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedHousehold && (
                <div className="modal_overlay" onClick={() => setSelectedHousehold(null)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <SendMessageModal
                            receiverHouse={selectedHousehold.house}
                            receiverName={selectedHousehold.name}
                            onClose={() => setSelectedHousehold(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Monitoring
