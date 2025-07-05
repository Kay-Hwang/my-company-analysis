// assets/js/company-infographic.js (AbbVie 데이터 적용)

document.addEventListener('DOMContentLoaded', () => {

    const tooltipTitleCallback = (tooltipItems) => {
        const item = tooltipItems[0];
        let label = item.chart.data.labels[item.dataIndex];
        if (Array.isArray(label)) {
            return label.join(' ');
        }
        return label;
    };

    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#333333',
                    font: { size: 12 }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                callbacks: {
                    title: tooltipTitleCallback
                }
            }
        }
    };

    const brilliantBlues = {
        deepBlue: '#004AAD',
        brightBlue: '#387ADF',
        babyBlue: '#89CFF0',
        lightSkyBlue: '#C2DFFF',
        aliceBlue: '#F0F8FF',
        darkGray: '#333333',
        dangerRed: '#E63946'
    };

    // --- AbbVie 데이터로 차트 초기화 ---

    // Chart 1: AbbVie 사업부문 매출 비중 (도넛 차트 - 예시 데이터, 실제 비율에 맞게 수정 필요)
    // 이전에 언급된 사업부문: 면역학, 종양학, 신경과학, 에스테틱스
    new Chart(document.getElementById('revenueByMarketChart'), {
        type: 'doughnut',
        data: {
            labels: ['면역학', '종양학', '신경과학', '에스테틱스', '기타'],
            datasets: [{
                label: '매출 비중',
                data: [55, 15, 15, 10, 5], // 🚨🚨 이 데이터를 AbbVie 실제 매출 비중에 맞게 수정하세요 🚨🚨
                backgroundColor: [brilliantBlues.deepBlue, brilliantBlues.brightBlue, brilliantBlues.babyBlue, brilliantBlues.lightSkyBlue, '#D3D3D3'],
                borderColor: brilliantBlues.aliceBlue,
                borderWidth: 2
            }]
        },
        options: { ...commonChartOptions }
    });

    // Chart 2: AbbVie 주요 재무 추세 (2020-2024 - 예시 데이터, 실제 값으로 수정 필요)
    new Chart(document.getElementById('financialsChart'), {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                    label: '매출 (십억 $)',
                    data: [45.8, 56.1, 58.0, 54.3, 52.8], // 🚨🚨 이 데이터를 AbbVie 실제 매출로 수정하세요 🚨🚨
                    backgroundColor: brilliantBlues.brightBlue,
                    yAxisID: 'y',
                },
                {
                    label: '순이익 (십억 $)',
                    data: [7.0, 10.5, 12.0, 8.5, 6.0], // 🚨🚨 이 데이터를 AbbVie 실제 순이익으로 수정하세요 🚨🚨
                    backgroundColor: brilliantBlues.babyBlue,
                    yAxisID: 'y',
                },
                {
                    label: '잉여현금흐름(FCF) (십억 $)',
                    data: [15.0, 18.2, 19.5, 16.0, 15.5], // 🚨🚨 이 데이터를 AbbVie 실제 FCF로 수정하세요 🚨🚨
                    borderColor: brilliantBlues.deepBlue,
                    backgroundColor: brilliantBlues.deepBlue,
                    type: 'line',
                    yAxisID: 'y',
                    borderWidth: 3,
                    tension: 0.1
                }
            ]
        },
        options: {
            ...commonChartOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '금액 (십억 달러)'
                    }
                }
            }
        }
    });

    // Chart 3: AbbVie 배당 성장률 추세 (예시 데이터, 실제 값으로 수정 필요)
    new Chart(document.getElementById('dividendGrowthChart'), {
        type: 'line',
        data: {
            labels: ['10년 평균', '5년 평균', '3년 평균', '최근 1년'],
            datasets: [{
                label: '연간 배당 성장률 (%)',
                data: [18.0, 12.5, 9.0, 7.5], // 🚨🚨 이 데이터를 AbbVie 실제 배당 성장률로 수정하세요 🚨🚨
                borderColor: brilliantBlues.deepBlue,
                backgroundColor: brilliantBlues.brightBlue,
                fill: false,
                tension: 0.1,
                borderWidth: 3
            }]
        },
        options: {
            ...commonChartOptions,
            scales: {
                y: {
                    beginAtZero: false,
                    title: { display: true, text: '성장률 (%)' }
                }
            }
        }
    });

    // Chart 4: AbbVie 잉여현금흐름(FCF)과 배당 (2024 - 예시 데이터, 실제 값으로 수정 필요)
    // 이전에 주신 AbbVie 데이터: 지급된 배당금($57억)은 생성된 잉여현금흐름($15억)을 크게 초과했습니다.
    new Chart(document.getElementById('fcfVsDividendChart'), {
        type: 'bar',
        data: {
            labels: ['2024년 현금 흐름'],
            datasets: [
                {
                    label: '잉여현금흐름(FCF)',
                    data: [1.5], // 🚨🚨 이 데이터를 AbbVie 실제 FCF(십억$)로 수정하세요 🚨🚨
                    backgroundColor: brilliantBlues.brightBlue,
                },
                {
                    label: '지급된 배당금',
                    data: [5.7], // 🚨🚨 이 데이터를 AbbVie 실제 지급 배당금(십억$)로 수정하세요 🚨🚨
                    backgroundColor: brilliantBlues.dangerRed,
                }
            ]
        },
        options: {
            ...commonChartOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '금액 (십억 달러)'
                    }
                }
            }
        }
    });

    // --- 투자 논리 생성기 (Gemini API 호출 부분) ---
    const generateThesisBtn = document.getElementById('generateThesisBtn');
    const thesisOutput = document.getElementById('thesisOutput');
    const thesisPlaceholder = document.getElementById('thesisPlaceholder');
    const loadingIndicator = document.getElementById('loadingIndicator');

    generateThesisBtn.addEventListener('click', async () => {
        thesisPlaceholder.classList.add('hidden');
        thesisOutput.innerHTML = ''; // Clear previous content
        loadingIndicator.classList.remove('hidden');

        // 🚨🚨🚨 이 프롬프트를 AbbVie 데이터에 맞게 수정하세요 🚨🚨🚨
        const prompt = `애브비(ABBV)에 대한 다음 데이터를 바탕으로 면역학 및 종양학 분야 투자자를 위한 간결한 투자 논리(150-200 단어)를 작성해 주세요. 투자 유인 요소(휴미라 이후 성장 동력, 다각화된 파이프라인, 배당 역사)와 우려 사항(휴미라 특허 만료 영향, 높은 배당성향, 경쟁 심화)을 모두 다루고, 투자 접근 방식에 대한 권고 사항으로 마무리해 주세요.
주요 강점: 휴미라 이후 스카이리치와 린보크의 폭발적 성장, 11년 연속 배당금 증액, 면역학/종양학/신경과학/에스테틱스 다각화된 포트폴리오.
주요 약점/위험: 휴미라 특허 만료로 인한 매출 감소, 경쟁 심화 (특히 임브루비카), 높은 배당성향 (2024년 기준 213.59%)
최근 재무 (Q1 2025): 순매출 $133.4억 (+9.8% 운영 기준), 핵심 면역학 매출 $51.43억 (스카이리치 & 린보크 합산).
주요 제품 성장: 스카이리치 Q1 2025 매출 $34.25억 (+72.0%), 린보크 Q1 2025 매출 $17.18억 (+59.7%).
잉여현금흐름(2024년): $15억. 지급된 배당금: $57억. (FCF보다 배당금이 높음)
전략: 휴미라 매출 감소 상쇄, 고형암 분야 확장 (신규 제품 에피킨리, 엘라히어, 에므렐리스), 세레벨 테라퓨틱스 인수를 통한 신경과학 강화.
`;

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            // 🚨🚨🚨 이 부분입니다! 대략 170번째 줄 근처에 위치합니다. 🚨🚨🚨
            const apiKey = "AIzaSyBnveZbD5OD4P_w2ANNGfZrZwVOuQywBUg"; // 발급받은 실제 Gemini API 키로 변경하세요!
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                thesisOutput.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
            } else {
                thesisOutput.innerHTML = `<p class="text-red-600">투자 논리를 생성하는 데 실패했습니다. 다시 시도해 주세요.</p>`;
            }
        } catch (error) {
            console.error('Error generating thesis:', error);
            thesisOutput.innerHTML = `<p class="text-red-600">오류 발생: ${error.message}. 네트워크 연결을 확인하거나 나중에 다시 시도해 주세요.</p>`;
        } finally {
            loadingIndicator.classList.add('hidden');
            thesisOutput.classList.remove('flex', 'items-center', 'justify-center'); // Remove centering if content fills
        }
    });
});