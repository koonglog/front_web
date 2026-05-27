import React, { useEffect, useState } from 'react';
import Download from "../../assets/img/ic_gray_download.svg";
import { getNoiseDistribution, getNoiseDistributionExport } from '../../api/noiseApi';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PretendardRegular from "../../assets/font/Pretendard-Regular.ttf";
import PretendardMedium from "../../assets/font/Pretendard-Medium.ttf";
import PretendardSemiBold from "../../assets/font/Pretendard-SemiBold.ttf";
import PretendardBold from "../../assets/font/Pretendard-Bold.ttf";

const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);

    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });

    return btoa(binary);
};

const addFontToPdf = async (doc, fontUrl, fileName, fontName, fontStyle) => {
    const response = await fetch(fontUrl);
    const fontBuffer = await response.arrayBuffer();
    const fontBase64 = arrayBufferToBase64(fontBuffer);

    doc.addFileToVFS(fileName, fontBase64);
    doc.addFont(fileName, fontName, fontStyle);
};

const loadKoreanFonts = async (doc) => {
    await addFontToPdf(
        doc,
        PretendardRegular,
        "Pretendard-Regular.ttf",
        "Pretendard",
        "normal"
    );

    await addFontToPdf(
        doc,
        PretendardMedium,
        "Pretendard-Medium.ttf",
        "Pretendard",
        "medium"
    );

    await addFontToPdf(
        doc,
        PretendardSemiBold,
        "Pretendard-SemiBold.ttf",
        "Pretendard",
        "semibold"
    );

    await addFontToPdf(
        doc,
        PretendardBold,
        "Pretendard-Bold.ttf",
        "Pretendard",
        "bold"
    );

    doc.setFont("Pretendard", "normal");
};

const Distribution = () => {
    const [distributionData, setDistributionData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        const fetchDistribution = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const data = await getNoiseDistribution();

                setDistributionData(data.buildings || {});
            } catch (error) {
                console.error("소음 분포도 조회 실패:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDistribution();
    }, []);

    const getRiskClassName = (riskLevel) => {
        switch (riskLevel) {
            case "urgent":
                return "urgent";
            case "caution":
                return "caution";
            case "normal":
            default:
                return "normal";
        }
    };

    const handleExportPdf = async () => {
        try {
            setIsExporting(true);

            const response = await getNoiseDistributionExport();
            const exportData = response.data || [];

            if (exportData.length === 0) {
                alert("내보낼 소음 분포도 데이터가 없습니다.");
                return;
            }

            const doc = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4",
            });

            await loadKoreanFonts(doc);

            const today = new Date().toLocaleDateString("ko-KR");

            doc.setFont("Pretendard", "bold");
            doc.setFontSize(18);
            doc.text("소음 분포도 리포트", 14, 18);

            doc.setFont("Pretendard", "normal");
            doc.setFontSize(10);
            doc.text(`생성일: ${today}`, 14, 26);

            doc.setFont("Pretendard", "medium");
            doc.text(`전체 세대 수: ${response.total ?? exportData.length}`, 14, 32);

            const tableColumns = [
                "Household",
                "Building",
                "Unit",
                "Total Events",
                "High Events",
                "Night Events",
                "Risk Level",
            ];

            const tableRows = exportData.map((item) => [
                item["세대"],
                item["건물"],
                item["호수"],
                item["총 이벤트"],
                item["고강도 이벤트"],
                item["야간 이벤트"],
                item["위험도"],
            ]);

            autoTable(doc, {
                head: [tableColumns],
                body: tableRows,
                startY: 40,
                styles: {
                    font: "Pretendard",
                    fontStyle: "normal",
                    fontSize: 9,
                    cellPadding: 3,
                    halign: "center",
                    valign: "middle",
                },
                headStyles: {
                    font: "Pretendard",
                    fontStyle: "semibold",
                    fillColor: [80, 80, 80],
                    textColor: [255, 255, 255],
                },
            });

            doc.save(`noise_distribution_${Date.now()}.pdf`);
        } catch (error) {
            console.error("소음 분포도 PDF 내보내기 실패:", error);
            alert("PDF 내보내기에 실패했습니다.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className='Distribution_Wrap'>
            <div className="distribution_box">
                <div className="distribution_title">
                    <div className="title_text">
                        <div className="title">소음 분포도</div>
                        <div className="caption">건물별 소음 발생 빈도 및 위치 - 색상 코드로 위험도 표시</div>
                    </div>
                    <button
                        type="button"
                        className="export_btn"
                        onClick={handleExportPdf}
                        disabled={isExporting}
                    >
                        <div className="icon">
                            <img src={Download} alt="Download" />
                        </div>
                        <div className="text">
                            {isExporting ? "내보내는 중" : "내보내기"}
                        </div>
                    </button>
                </div>
                <div className="distribution_map">
                    {isLoading && (
                        <div className="map_status">분포도를 불러오는 중입니다.</div>
                    )}

                    {isError && (
                        <div className="map_status">소음 분포도 조회에 실패했습니다.</div>
                    )}

                    {!isLoading && !isError && (
                        <div className="building_list">
                            {Object.entries(distributionData).map(([buildingName, households]) => (
                                <div className="building_card" key={buildingName}>
                                    <div className="building_name">{buildingName}</div>
                                    <div className="household_list">
                                        {households.map((household) => (
                                            <div
                                                className={`household_item ${getRiskClassName(household.risk_level)}`}
                                                key={household.household_id}
                                            >
                                                <div className="unit_number">
                                                    {household.unit_number.replace("호", "")}
                                                </div>
                                                <div className="count">
                                                    {household.total_count}건
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
