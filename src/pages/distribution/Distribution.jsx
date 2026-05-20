import React from 'react';
import Download from "../../assets/img/ic_gray_download.png";

const Distribution = () => {
    return (
        <div className='Distribution_Wrap'>
            <div className="distribution_box">
                <div className="distribution_title">
                    <div className="title_text">
                        <div className="title">소음 분포도</div>
                        <div className="caption">건물별 소음 발생 빈도 및 위치 - 색상 코드로 위험도 표시</div>
                    </div>
                    <div className="export_btn">
                        <div className="icon">
                            <img src={Download} alt="Download" />
                        </div>
                        <div className="text">내보내기</div>
                    </div>
                </div>
                <div className="distribution_map">
                    분포도가 표시될 구역입니다.
                </div>
                <div className="divider"></div>
                <div className="map_description">
                    <div className="high">
                        <div className="box"></div>
                        <div className="text">긴급 대응 필요 (관찰 필요 7건 이상 / 고강도 3건 이상)</div>
                    </div>
                    <div className="middle">
                        <div className="box"></div>
                        <div className="text">관찰 필요 (3-6건)</div>
                    </div>
                    <div className="low">
                        <div className="box"></div>
                        <div className="text">정상 (2건 이하)</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Distribution
