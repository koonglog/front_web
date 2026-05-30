import React, { useEffect, useState } from 'react';
import MasterIcon from "../../assets/img/ic_orange_master.svg";
import Check from "../../assets/img/ic_green_check.svg";
import Shield from "../../assets/img/ic_orange_shield.svg";
import Network from "../../assets/img/ic_blue_wifi.svg";
import Wrench from "../../assets/img/ic_orange_wrench.svg";
import Setting from "../../assets/img/ic_purple_setting.svg";
import Goal from "../../assets/img/ic_orange_goal.svg";
import Bell from "../../assets/img/ic_orange_bell.svg";
import { getSensorStatus } from '../../api/sensorApi';
import { getAdminProfile } from '../../api/authApi';

const MyPage = () => {
    const [isAlarmBlocked, setIsAlarmBlocked] = useState(false);

    const [adminProfile, setAdminProfile] = useState({
        id: null,
        username: "",
        name: "",
        role: "",
        team: "",
    });

    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [isProfileError, setIsProfileError] = useState(false);

    const location = "푸르지오 아파트 관리사무소";
    const signupDate = "2024.01.15";
    const authorityLevel = "Master";
    const authorityLevelKr = "최고 관리자";

    const [sensorStatus, setSensorStatus] = useState({
        total_sensors: 0,
        online_sensors: 0,
        avg_battery: 0,
        needs_calibration: 0,
        sensors: [],
    });

    const [isSensorLoading, setIsSensorLoading] = useState(true);
    const [isSensorError, setIsSensorError] = useState(false);

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                setIsProfileLoading(true);
                setIsProfileError(false);

                const storedAdmin = JSON.parse(localStorage.getItem("admin"));
                const adminId = storedAdmin?.id;

                if (!adminId) {
                    throw new Error("관리자 ID가 없습니다.");
                }

                const data = await getAdminProfile(adminId);

                setAdminProfile({
                    id: data.id ?? null,
                    username: data.username ?? "",
                    name: data.name ?? "",
                    role: data.role ?? "",
                    team: data.team ?? "",
                });
            } catch (error) {
                console.error("관리자 프로필 조회 실패:", error);
                setIsProfileError(true);
            } finally {
                setIsProfileLoading(false);
            }
        };

        fetchAdminProfile();
    }, []);

    useEffect(() => {
        const fetchSensorStatus = async () => {
            try {
                setIsSensorLoading(true);
                setIsSensorError(false);

                const data = await getSensorStatus();

                setSensorStatus({
                    total_sensors: data.total_sensors ?? 0,
                    online_sensors: data.online_sensors ?? 0,
                    avg_battery: data.avg_battery ?? 0,
                    needs_calibration: data.needs_calibration ?? 0,
                    sensors: data.sensors ?? [],
                });
            } catch (error) {
                console.error("센서 상태 조회 실패:", error);
                setIsSensorError(true);
            } finally {
                setIsSensorLoading(false);
            }
        };

        fetchSensorStatus();
    }, []);

    const offlineSensors = sensorStatus.total_sensors - sensorStatus.online_sensors;
    const calibrationSensors = sensorStatus.sensors.filter(
        (sensor) => sensor.calibration_offset !== 0
    );

    return (
        <div className='MyPage_Wrap'>
            <div className="my_info">
                <div className="title">마이페이지</div>
                <div className="caption">개인 프로필 및 시스템 설정</div>
                <div className="user_info">
                    <div className="info_left">
                        <div className="profile">
                            <img src={MasterIcon} alt="MasterIcon" />
                        </div>
                        <div className="user_name">
                            {isProfileLoading ? "불러오는 중" : isProfileError ? "정보 없음" : adminProfile.name}
                        </div>
                        <div className="user_job">
                            {isProfileLoading ? "-" : isProfileError ? "-" : adminProfile.role}
                        </div>
                        <div className="location">
                            {isProfileLoading ? "-" : isProfileError ? "-" : `${location} · ${adminProfile.team}`}
                        </div>
                        <div className="divider"></div>
                        <div className="id_title">관리자 ID</div>
                        <div className="user_id">
                            {isProfileLoading ? "-" : isProfileError ? "-" : adminProfile.username}
                        </div>
                        <div className="date_title">가입일</div>
                        <div className="signup_date">{signupDate}</div>
                    </div>
                    <div className="info_right">
                        <div className="authority_title">
                            <div className="icon">
                                <img src={Shield} alt="Shield" />
                            </div>
                            <div className="text">권한 관리</div>
                        </div>
                        <div className="authority_level">
                            <div className="level_left">
                                <div className="level_title">권한 레벨</div>
                                <div className="level_name">{authorityLevel}</div>
                            </div>
                            <div className="level_right">{authorityLevelKr}</div>
                        </div>
                        <div className="authority_lists">
                            <div className="list_item">
                                <div className="icon">
                                    <img src={Check} alt="Check" />
                                </div>
                                <div className="text">데이터 조회</div>
                            </div>
                            <div className="list_item">
                                <div className="icon">
                                    <img src={Check} alt="Check" />
                                </div>
                                <div className="text">중재 승인</div>
                            </div>
                            <div className="list_item">
                                <div className="icon">
                                    <img src={Check} alt="Check" />
                                </div>
                                <div className="text">공지 발송</div>
                            </div>
                            <div className="list_item">
                                <div className="icon">
                                    <img src={Check} alt="Check" />
                                </div>
                                <div className="text">시스템 설정</div>
                            </div>
                            <div className="list_item">
                                <div className="icon">
                                    <img src={Check} alt="Check" />
                                </div>
                                <div className="text">IoT 관리</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="infra">
                <div className="infra_title">
                    <div className="icon">
                        <img src={Network} alt="Network" />
                    </div>
                    <div className="text">
                        <div className="title">IoT 인프라 및 장비 관리</div>
                        <div className="caption">아두이노 센서 통합 대시보드</div>
                    </div>
                </div>
                <div className="infra_info">
                    <div className="online">
                        <div className="title">온라인 센서</div>
                        <div className="value">{isSensorLoading ? "-" : `${sensorStatus.online_sensors}개`}</div>
                    </div>
                    <div className="offline">
                        <div className="title">오프라인 센서</div>
                        <div className="value">{isSensorLoading ? "-" : `${offlineSensors}개`}</div>
                    </div>
                    <div className="battery">
                        <div className="title">평균 배터리</div>
                        <div className="value">{isSensorLoading ? "-" : `${sensorStatus.avg_battery}%`}</div>
                    </div>
                    <div className="need_adjust">
                        <div className="title">영점 조정 필요</div>
                        <div className="value">{isSensorLoading ? "-" : `${sensorStatus.needs_calibration}개`}</div>
                    </div>
                </div>
                <div className="adjust_list">
                    <div className="title">영점 조절(Calibration) 리스트</div>
                    <>
                        {isSensorLoading && (
                            <div className="item_list">
                                <div className="item_left">
                                    <div className="text">
                                        <div className="sensor_location">센서 정보를 불러오는 중입니다.</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isSensorError && (
                            <div className="item_list">
                                <div className="item_left">
                                    <div className="text">
                                        <div className="sensor_location">센서 정보를 불러오지 못했습니다.</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!isSensorLoading && !isSensorError && calibrationSensors.length === 0 && (
                            <div className="item_list">
                                <div className="item_left">
                                    <div className="icon">
                                        <img src={Wrench} alt="Wrench" />
                                    </div>
                                    <div className="text">
                                        <div className="sensor_location">영점 조정이 필요한 센서가 없습니다.</div>
                                        <div className="sensor_info">현재 모든 센서가 정상 상태입니다.</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!isSensorLoading && !isSensorError && calibrationSensors.map((sensor) => (
                            <div className="item_list" key={sensor.sensor_id}>
                                <div className="item_left">
                                    <div className="icon">
                                        <img src={Wrench} alt="Wrench" />
                                    </div>
                                    <div className="text">
                                        <div className="sensor_location">{sensor.location_unit}</div>
                                        <div className="sensor_info">
                                            센서 ID: {sensor.sensor_id} · 마지막 점검: {sensor.last_checked?.slice(0, 10)}
                                        </div>
                                    </div>
                                </div>
                                <div className="item_right">원격 영점 조절</div>
                            </div>
                        ))}
                    </>
                </div>
            </div>
            <div className="individualize">
                <div className="individualize_title">
                    <div className="icon">
                        <img src={Setting} alt="Setting" />
                    </div>
                    <div className="text">
                        <div className="title">개인 맞춤형 업무 설정</div>
                        <div className="caption">알림 임계값 및 근무 시간 관리</div>
                    </div>
                </div>
                <div className="dB_setting">
                    <div className="title">
                        <div className="icon">
                            <img src={Goal} alt="Goal" />
                        </div>
                        <div className="text">긴급 알림 임계값 설정</div>
                    </div>
                    <div className="adjust_value">
                        <div className="dB_adjust">
                            <div className="dB_title">소음 레벨 (dB)</div>
                            <input type="text" name="dBThreshold" id="dBThreshold" />
                        </div>
                        <div className="time_adjust">
                            <div className="time_title">지속 시간 (분)</div>
                            <input type="text" name="timeThreshold" id="timeThreshold" />
                        </div>
                    </div>
                    <div className="caption">현재 설정: 40dB 이상의 소음이 10분 이상 지속될 때 브라우저 알림 수신</div>
                </div>
                <div className="alarm_setting">
                    <div className="title">
                        <div className="title_left">
                            <div className="icon">
                                <img src={Bell} alt="Bell" />
                            </div>
                            <div className="text">
                                <div className="alarm_title">업무 시간외 알림 차단</div>
                                <div className="caption">퇴근 후 알림을 자동으로 차단합니다</div>
                            </div>
                        </div>
                        <div className="title_right">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={isAlarmBlocked}
                                    onChange={(e) => setIsAlarmBlocked(e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                    {isAlarmBlocked && (
                        <>
                            <div className="divider"></div>
                            <div className="adjust_value">
                                <div className="time_title">근무 시간 설정</div>
                                <div className="time_adjust">
                                    <input type="text" name="startTimeThreshold" id="startTimeThreshold" />
                                    <div className="tilde">~</div>
                                    <input type="text" name="endTimeThreshold" id="endTimeThreshold" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyPage
