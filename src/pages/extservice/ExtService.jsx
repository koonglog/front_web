import React from 'react';
import Call from "../../assets/img/ic_gray_call.png";
import HighlightDocs from "../../assets/img/ic_highlight_docs.png";
import Download from "../../assets/img/ic_white_download.png";
import GrayDocs from "../../assets/img/ic_gray_docs.png";

const ExtService = () => {
    return (
        <div className='ExtService_Wrap'>
            <div className="title_box">
                <div className="title">외부 서비스 및 관리</div>
                <div className="caption">전문 상담, 측정 서비스 연계 및 공공기관 증거 리포트 생성</div>
            </div>
            <div className="speed_extservice">
                <div className="title">빠른 연계 서비스</div>
                <div className="goto_site">
                    <div
                        className="sai"
                        onClick={() => window.open("https://www.noiseinfo.or.kr/index.jsp", "_blank")}
                    >
                        <div className="title">층간소음 이웃사이센터</div>
                        <div className="caption">국가소음정보센터 공식 중재 서비스 연계</div>
                    </div>
                    <div
                        className="experts"
                        onClick={() => window.open("https://floor.noiseinfo.or.kr/floornoise/home/complaint/selfToilet.do", "_blank")}
                    >
                        <div className="title">전문 상담사 예약</div>
                        <div className="caption">갈등 해결 전문가 직접 연결</div>
                    </div>
                    <div
                        className="noise_apply"
                        onClick={() => window.open("https://floor.noiseinfo.or.kr/floornoise/home/complaint/mesure/nmbrCheck.do", "_blank")}
                    >
                        <div className="title">공식 소음 측정 신청</div>
                        <div className="caption">법적 효력이 있는 정밀 측정 서비스</div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="call">
                    <div className="icon">
                        <img src={Call} alt="Call" />
                    </div>
                    <div className="title">긴급 상담 센터</div>
                    <div className="tel">1661-2642 (24시간 운영)</div>
                </div>
            </div>
            <div className="export_report_box">
                <div className="title">객관적 증거 리포트 내보내기</div>
                <div className="caption">공공기관 제출용 객관적 데이터 리포트를 생성합니다. 감정적 표현이 배제된 순수 측정 데이터만 포함됩니다.</div>
                <div className="total_month_analysis_box">
                    <div className="box_left">
                        <div className="icon">
                            <img src={HighlightDocs} alt="HighlightDocs" />
                        </div>
                        <div className="text">
                            <div className="title">전체 동 월간 통계</div>
                            <div className="caption">2026년 4월 전체 데이터</div>  {/* 년도와 월은 오늘 날짜로 받아오기 */}
                        </div>
                    </div>
                    <div className="download_btn">
                        <div className="icon">
                            <img src={Download} alt="Download" />
                        </div>
                        <div className="text">PDF 다운로드</div>
                    </div>
                </div>
                <div className="custom_report_box">
                    <div className="icon">
                        <img src={GrayDocs} alt="GrayDocs" />
                    </div>
                    <div className="title">커스텀 리포트 생성</div>
                    <div className="caption">기간, 세대, 이벤트 유형을 선택하여 맞춤 리포트 생성</div>
                </div>
            </div>
        </div>
    )
}

export default ExtService
