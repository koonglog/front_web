import React, { useState } from 'react';
import BackIcon from "../../assets/img/ic_gray_back.svg";
import { households } from "../../mocks/dashboardData";
import Filter from "../../assets/img/ic_gray_filter.svg";
import Message from "../../assets/img/ic_green_message.svg";
import SendMessageModal from '../../components/dashboard/SendMessageModal';
import { useNavigate } from 'react-router-dom';

const Monitoring = () => {
    const navigate = useNavigate();

    const [selectedHousehold, setSelectedHousehold] = useState(null);

    return (
        <div className='Monitoring_Wrap'>
            <div className="monitoring_box">
                <div className="monitoring_top">
                    <div className="monitoring_left">
                        <div
                            className="back_icon"
                            onClick={() => navigate(-1)}
                        >
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
