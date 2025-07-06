// assets/js/company-infographic.js (AbbVie 데이터 적용 - 투자 논리 생성기 제외)

// Chart.js Datalabels 플러그인 등록 (default.html에서 CDN으로 불러왔다면 필요)
Chart.register(ChartDataLabels);

const chartColors = {
    primary: '#4A55A2', // Darker Blue for main elements
    secondary: '#7895CB', // Medium Blue
    accent: '#A0BFE0', // Lighter Blue
    neutral: '#C5DFF8', // Very Light Blue
    humira: '#9ca3af', // Gray for Humira/older products
    text: '#1f2937', // Dark Gray for text
    success: '#16a34a', // Green for Buy/Strength
    warning: '#f59e0b', // Amber for Hold/Opportunity
    danger: '#ef4444', // Red for Sell/Weakness/Threat
    info: '#3b82f6', // Blue for info
    bgGray: '#f8f9fa' // Body background
};

const tooltipTitleCallback = (tooltipItems) => {
    const item = tooltipItems[0];
    let label = item.chart.data.labels[item.dataIndex];
    if (Array.isArray(label)) {
        return label.join(' ');
    }
    return label;
};

const defaultChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: chartColors.text,
                font: { size: 12, family: "'Noto Sans KR', sans-serif" }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(31, 41, 55, 0.9)',
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 12,
            callbacks: { title: tooltipTitleCallback }
        },
        datalabels: {
            color: chartColors.text,
            anchor: 'end',
            align: 'top',
            font: {
                weight: 'bold',
                size: 10
            },
            formatter: function(value, context) {
                return value.toFixed(1);
            }
        }
    },
    scales: {
        x: {
            ticks: { color: chartColors.text, font: { family: "'Noto Sans KR', sans-serif" } },
            grid: { display: false }
        },
        y: {
            ticks: { color: chartColors.text, font: { family: "'Noto Sans KR', sans-serif" } },
            grid: { color: '#e5e7eb' }
        }
    }
};

const processLabel = (label) => {
    const maxLength = 16;
    if (typeof label !== 'string' || label.length <= maxLength) return label;
    const words = label.split(' ');
    let lines = [];
    let currentLine = '';
    words.forEach(word => {
        if ((currentLine + ' ' + word).trim().length > maxLength) {
            lines.push(currentLine.trim());
            currentLine = '';
        }
        currentLine += word + ' ';
    });
    lines.push(currentLine.trim());
    return lines;
};

// --- AbbVie 데이터로 차트 초기화 ---

document.addEventListener('DOMContentLoaded', () => {

    // Section: Growth Engine
    new Chart(document.getElementById('growthEngineChart'), {
        type: 'bar',
        data: {
            labels: ['2023', '2024', 'Q1 2025 (연환산)', '2027 (E)'],
            datasets: [
                {
                    label: '휴미라 (억$)',
                    data: [14.4, 12.16, 4.48, 0], // Q1 2025 annualised for consistency (1.121 * 4)
                    backgroundColor: chartColors.humira,
                },
                {
                    label: '스카이리치 + 린보크 (억$)',
                    data: [11.7, 16.1, 20.57, 31], // Q1 2025 annualised for consistency (3.425+1.718)*4
                    backgroundColor: chartColors.primary,
                }
            ]
        },
        options: {
            ...defaultChartOptions,
            scales: {
                y: { ...defaultChartOptions.scales.y, title: { display: true, text: '매출 (10억$)' } }
            }
        }
    });

    // Section: Market Dynamics
    new Chart(document.getElementById('marketDynamicsChart'), {
        type: 'bar',
        data: {
            labels: ['면역학', '종양학', '신경과학', '에스테틱스'].map(processLabel),
            datasets: [
                {
                    label: '2024년 시장 규모 (십억 $)',
                    data: [109.4, 321.19, 45.936, 91.51],
                    backgroundColor: chartColors.secondary,
                }
            ]
        },
        options: {
            ...defaultChartOptions,
            indexAxis: 'x',
            plugins: {
                ...defaultChartOptions.plugins,
                legend: { position: 'top' },
                datalabels: { // Custom datalabels for this chart to show values as Billions with 1 decimal
                    color: chartColors.text,
                    anchor: 'end',
                    align: 'top',
                    font: { weight: 'bold', size: 10 },
                    formatter: function(value) {
                        return '$' + value.toFixed(1) + 'B'; // Format as $X.XB
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: chartColors.text, font: { family: "'Noto Sans KR', sans-serif" } },
                    grid: { display: false }
                },
                y: {
                    ticks: { color: chartColors.text, font: { family: "'Noto Sans KR', sans-serif" } },
                    grid: { display: true, color: '#e5e7eb' },
                    title: { display: true, text: '시장 규모 (십억 $)' },
                    beginAtZero: true
                }
            }
        }
    });

    // Section: Portfolio (도넛 차트 클릭 시 상세 정보 표시)
    const portfolioData = {
        labels: ['면역학', '신경과학', '종양학', '에스테틱스', '기타'],
        datasets: [{
            data: [46.9, 17.1, 12.2, 8.3, 15.5], // Adjusted to sum up to ~100% based on Q1 2025 data, as calculated in thought block
            backgroundColor: [chartColors.primary, chartColors.secondary, chartColors.accent, chartColors.neutral, chartColors.humira],
            borderColor: chartColors.bgGray,
            borderWidth: 4,
            hoverOffset: 8
        }]
    };
    const portfolioDetailsData = [
        {
            title: '면역학 (Immunology)',
            cagr: '12.1%',
            abbvShare: '약 18.8%', // Q1 2025 annualized portfolio revenue / 2024 market size
            productShares: [
                '**스카이리치:** 미국 건선 시장 처방 점유율 <span class="font-bold text-lg text-indigo-600">35%+</span>',
                '**린보크:** 빠르게 성장하며 시장 점유율 확대 중'
            ],
            desc: '애브비의 가장 큰 사업 부문으로, 스카이리치와 린보크가 성장을 주도합니다. 휴미라의 공백을 성공적으로 메우며 시장 리더십을 강화하고 있습니다.',
            color: 'indigo'
        },
        {
            title: '신경과학 (Neuroscience)',
            cagr: '5.6%',
            abbvShare: '약 19.9%', // Q1 2025 annualized portfolio revenue / 2024 market size
            productShares: [
                '**보톡스 치료제:** 특정 적응증 시장 내 강력한 리더십',
                '**브레일라:** 조현병 및 양극성 장애 시장에서 견고한 성장세'
            ],
            desc: '보톡스 치료제, 브레일라 등이 견고한 매출을 보이며, 최근 세레벨 인수를 통해 미래 파이프라인을 대폭 강화했습니다.',
            color: 'blue'
        },
        {
            title: '종양학 (Oncology)',
            cagr: '10.9%',
            abbvShare: '약 2.0%', // Q1 2025 annualized portfolio revenue / 2024 market size
            productShares: [
                '**임브루비카:** 혈액암 시장에서 경쟁 심화 중',
                '**벤클렉스타:** CLL 및 AML 시장에서 견고한 위치 유지'
            ],
            desc: '임브루비카, 벤클렉스타를 기반으로, 최근 엘라히어 등 신규 인수를 통해 고형암 분야로 확장하며 성장 동력을 확보하고 있습니다.',
            color: 'purple'
        },
        {
            title: '에스테틱스 (Aesthetics)',
            cagr: '9.8%',
            abbvShare: '약 4.8%', // Q1 2025 annualized portfolio revenue / 2024 market size
            productShares: [
                '**보톡스 코스메틱:** 미용 신경조절제 시장 점유율 <span class="font-bold text-lg text-sky-600">60-68%</span>',
                '**쥬비덤 컬렉션:** 피부 필러 시장 내 선두 위치'
            ],
            desc: '보톡스 코스메틱과 쥬비덤이 시장을 지배합니다. 소비자 중심의 안정적 수익을 창출하지만 경제 상황에 민감합니다.',
            color: 'sky'
        },
        {
            title: '기타 포트폴리오',
            cagr: 'N/A',
            abbvShare: 'N/A', // Not meaningful to calculate for 'Other'
            productShares: [], // No specific product share for 'Other'
            desc: '안과, 바이러스학 등 다양한 치료 분야의 제품들이 안정적인 수익 기반을 제공하며 전체 포트폴리오의 다각화에 기여합니다.',
            color: 'gray'
        }
    ];

    const detailsContainer = document.getElementById('portfolio-details');
    const updateDetails = (index) => {
        const data = portfolioDetailsData[index];
        let productSharesHtml = '';
        if (data.productShares && data.productShares.length > 0) {
            productSharesHtml = `
                <h4 class="font-semibold text-lg text-gray-900 mt-6 mb-2">주요 제품별 시장 점유율 및 특징</h4>
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                    ${data.productShares.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
        }
        detailsContainer.innerHTML = `
            <h3 class="text-2xl font-bold text-${data.color}-600 mb-4">${data.title}</h3>
            <p class="mt-4 text-gray-500">예상 시장 성장률 (CAGR)</p>
            <p class="text-4xl font-bold text-gray-800">${data.cagr}</p>
            <p class="mt-4 text-gray-500">애브비 시장 점유율 (해당 시장 내)</p>
            <p class="text-3xl font-bold text-${data.color}-600">${data.abbvShare}</p>
            <p class="mt-6 text-gray-700 leading-relaxed">${data.desc}</p>
            ${productSharesHtml}
        `;
    };

    new Chart(document.getElementById('portfolioDonutChart'), {
        type: 'doughnut',
        data: portfolioData,
        options: {
            ...defaultChartOptions,
            onClick: (evt, elements) => {
                if (elements.length > 0) {
                    updateDetails(elements[0].index);
                }
            },
            plugins: {
                ...defaultChartOptions.plugins,
                legend: { position: 'right' },
                datalabels: { // Custom datalabels for donut chart to show percentages
                    color: '#ffffff', // White color for better contrast on colored slices
                    textAlign: 'center',
                    font: { weight: 'bold', size: 10 },
                    formatter: function(value, context) {
                        const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        const percentage = (value / total * 100).toFixed(1);
                        return percentage + '%';
                    }
                }
            },
            scales: { x: { display: false }, y: { display: false } }
        }
    });
    updateDetails(0); // Initial display


    // Section: Key Product Deep Dive (Tabbed Content)
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    let currentChart = {}; // To store chart instances

    const productData = {
        immunology: {
            labels: ['스카이리치', '린보크', '휴미라'],
            data: [3425, 1718, 1121], // Q1 2025 Global Revenue in M$
            desc: `면역학은 애브비의 가장 큰 사업 부문이며, 휴미라의 특허 만료에 대한 성공적인 대응을 통해 스카이리치와 린보크가 새로운 성장 축으로 확고히 자리매김했습니다. 이들은 다양한 자가면역 질환에 대한 폭넓은 적응증을 통해 강력한 시장 침투를 보이고 있습니다.
            <ul class="list-disc list-inside text-gray-700 space-y-1 mt-3">
                <li>**휴미라 (Humira):** Q1 2025 글로벌 매출 $1,121M. 미국 특허 만료로 매출 감소, 점진적 바이오시밀러 경쟁 심화.</li>
                <li>**스카이리치 (Skyrizi):** Q1 2025 글로벌 매출 $3,425M (+72.0% 운영 기준). 건선, 건선성 관절염, 크론병, 궤양성 대장염 등 광범위한 적응증 확보. 미국 건선 시장 처방 점유율 35% 이상.</li>
                <li>**린보크 (Rinvoq):** Q1 2025 글로벌 매출 $1,718M (+59.7% 운영 기준). 류마티스 관절염, 아토피 피부염, 궤양성 대장염, 크론병 등 다수 적응증 승인.</li>
                <li>**전망:** 2027년 스카이리치와 린보크 합산 매출 $310억+ 목표 달성 예상, 이는 휴미라 전성기 매출을 넘어섭니다.</li>
            </ul>`
        },
        oncology: {
            labels: ['임브루비카', '벤클렉스타', '에피킨리'],
            data: [738, 665, 100], // Q1 2025 Global Revenue in M$, Epkinly approx. for visualization
            desc: `애브비의 종양학 사업은 혈액암 치료제에서 고형암으로의 확장을 통해 다각화를 꾀하고 있습니다. 기존 제품의 견고한 매출과 함께 신규 파이프라인의 도입으로 미래 성장 동력을 확보하고 있습니다.
            <ul class="list-disc list-inside text-gray-700 space-y-1 mt-3">
                <li>**임브루비카 (Imbruvica):** Q1 2025 글로벌 매출 $738M (-11.9%). 만성 림프구성 백혈병(CLL) 등에 사용되나, 새로운 경구 치료제와의 경쟁 심화.</li>
                <li>**벤클렉스타 (Venclexta):** Q1 2025 글로벌 매출 $665M (+12.3% 운영 기준). CLL 및 급성 골수성 백혈병(AML)에 사용.</li>
                <li>**신규 제품 (에피킨리, 엘라히어, 에므렐리스):** 최근 포트폴리오에 추가된 제품들로 고형암 분야로의 확장 전략을 실행 중입니다. 특히 에므렐리스는 2025년 3분기부터 매출 기여 예상.</li>
                <li>**전략:** 임브루비카의 경쟁 심화를 상쇄하고 종양학 매출을 다각화하기 위한 고형암 분야 확장이 핵심 전략입니다.</li>
            </ul>`
        },
        neuroscience: {
            labels: ['보톡스 치료제', '브레일라', '우브렐비', '퀼립타'],
            data: [866, 765, 240, 193], // Q1 2025 Global Revenue in M$
            desc: `신경과학은 애브비의 또 다른 중요한 성장 축입니다. 기존 제품의 견고한 성과와 함께 최근 세레벨 테라퓨틱스 인수를 통해 정신과 및 신경학적 질환에 대한 강력한 파이프라인을 확보하며 미래 성장을 위한 발판을 마련했습니다.
            <ul class="list-disc list-inside text-gray-700 space-y-1 mt-3">
                <li>**브레일라 (Vraylar):** Q1 2025 글로벌 매출 $765M. 조현병 및 양극성 장애 치료제.</li>
                <li>**보톡스 치료제 (Botox Therapeutic):** Q1 2025 글로벌 매출 $866M. 편두통, 경부 근긴장이상 등 다양한 치료 적응증.</li>
                <li>**우브렐비 (Ubrelvy) & 퀼립타 (Qulipta):** 급성 편두통 및 편두통 예방 치료제로 성장 견인.</li>
                <li>**세레벨 테라퓨틱스 인수:** 2023년 12월 약 87억 달러에 인수. 상당한 미충족 요구가 남아있는 정신과 및 신경학적 질환 대상의 강력한 임상 파이프라인을 확보하여 이 분야의 리더십 강화.</li>
            </ul>`
        },
        aesthetics: {
            labels: ['보톡스 코스메틱', '쥬비덤 컬렉션'],
            data: [556, 231], // Q1 2025 Global Revenue in M$
            desc: `2020년 앨러간 인수를 통해 애브비는 의료 에스테틱스 시장의 선두 주자로 등극했습니다. 보톡스 코스메틱과 쥬비덤 컬렉션은 이 시장에서 지배적인 위치를 차지하며 안정적인 매출을 창출하고 있으나, 경기 상황에 민감한 특성을 보입니다.
            <ul class="list-disc list-inside text-gray-700 space-y-1 mt-3">
                <li>**보톡스 코스메틱 (Botox Cosmetic):** Q1 2025 글로벌 매출 $556M (-11.7% 운영 기준). 미용 신경조절제 시장의 지배자.</li>
                <li>**쥬비덤 컬렉션 (Juvederm):** Q1 2025 글로벌 매출 $231M. 피부 필러 시장의 선두 주자.</li>
                <li>**시장 역학:** 최소 침습 시술 수요 증가로 시장이 성장하지만, 경쟁 심화와 거시경제적 요인(소비자 지출)에 민감하게 반응합니다.</li>
                <li>**전략:** 전통적인 제약 시장의 규제 압력에 덜 민감하여 포트폴리오 다각화에 기여하지만, 매출 변동성에 대한 지속적인 모니터링이 필요합니다.</li>
            </ul>`
        }
    };

    function createOrUpdateMiniChart(canvasId, category) {
        if (currentChart[canvasId]) {
            currentChart[canvasId].destroy(); // Destroy previous chart instance if exists
        }
        const ctx = document.getElementById(canvasId).getContext('2d');
        const data = productData[category];
        currentChart[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels.map(processLabel),
                datasets: [{
                    label: 'Q1 2025 매출 (백만$)',
                    data: data.data,
                    backgroundColor: [chartColors.primary, chartColors.secondary, chartColors.accent, chartColors.neutral],
                    borderColor: [chartColors.primary, chartColors.secondary, chartColors.accent, chartColors.neutral],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: defaultChartOptions.plugins.tooltip,
                    datalabels: { // Datalabels for mini charts
                        color: chartColors.text,
                        anchor: 'end',
                        align: 'top',
                        font: { weight: 'bold', size: 9 },
                        formatter: function(value) {
                            return '$' + (value / 1000).toFixed(1) + 'B'; // Format to Billions for better readability if needed, or M$ if smaller
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: chartColors.text, font: { family: "'Noto Sans KR', sans-serif" } },
                        grid: { display: false }
                    },
                    y: {
                        ticks: { color: chartColors.text, font: { family: "'Noto Sans KR', sans-serif" } },
                        grid: { color: '#e5e7eb' },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function showTab(tabId) {
        tabContents.forEach(content => content.classList.remove('active'));
        tabButtons.forEach(button => button.classList.remove('active', 'bg-blue-600', 'text-white'));

        document.getElementById(`tab-content-${tabId}`).classList.add('active');
        document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('active', 'bg-blue-600', 'text-white');

        // Update product details text
        document.querySelector(`#tab-content-${tabId} p.text-gray-700.mb-4`).innerHTML = productData[tabId].desc;

        // Re-render chart for the active tab
        createOrUpdateMiniChart(`${tabId}ProductChart`, tabId);
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            showTab(button.dataset.tab);
        });
    });

    showTab('immunology'); // Show immunology tab by default

    // Section: Financials
    new Chart(document.getElementById('stockPriceChart'), {
        type: 'line',
        data: {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025(YTD)'],
            datasets: [{
                label: '애브비 종가 ($)',
                data: [62, 60, 97, 92, 88, 107, 135, 162, 112, 171, 190],
                borderColor: chartColors.secondary,
                backgroundColor: 'rgba(120, 149, 203, 0.1)',
                fill: true,
                tension: 0.2
            }]
        },
        options: { ...defaultChartOptions, plugins: { ...defaultChartOptions.plugins, legend: { display: false }, datalabels: { display: false } } }
    });

    new Chart(document.getElementById('revenueIncomeChart'), {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: '매출 (십억$)',
                    data: [45.8, 56.2, 58.1, 54.3, 56.3],
                    backgroundColor: chartColors.secondary,
                },
                {
                    label: '순이익 (십억$)',
                    data: [4.6, 11.5, 11.8, 4.8, 4.2],
                    backgroundColor: chartColors.accent,
                }
            ]
        },
        options: {
            ...defaultChartOptions,
            plugins: {
                ...defaultChartOptions.plugins,
                legend: { position: 'top' },
                datalabels: { // Custom datalabels for revenue/income chart
                    color: chartColors.text,
                    anchor: 'end',
                    align: 'top',
                    font: { weight: 'bold', size: 10 },
                    formatter: function(value) {
                        return '$' + value.toFixed(1) + 'B';
                    }
                }
            }
        }
    });

    new Chart(document.getElementById('dpsChart'), {
        type: 'line',
        data: {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025(E)'],
            datasets: [{
                label: '주당 배당금 (DPS, $)',
                data: [2.16, 2.28, 2.56, 3.20, 3.60, 4.28, 5.20, 5.64, 5.92, 6.20, 6.56],
                borderColor: chartColors.primary,
                backgroundColor: 'rgba(74, 85, 162, 0.1)',
                fill: true,
                tension: 0.2
            }]
        },
        options: { ...defaultChartOptions, plugins: { ...defaultChartOptions.plugins, legend: { display: false }, datalabels: { display: false } } }
    });

    // Section: Outlook
    new Chart(document.getElementById('analystRatingsChart'), {
        type: 'bar',
        data: {
            labels: ['강력 매수', '매수', '보유', '매도'],
            datasets: [{
                label: '애널리스트 의견',
                data: [21, 21, 5, 1],
                backgroundColor: [
                    chartColors.success,
                    chartColors.success,
                    chartColors.warning,
                    chartColors.danger
                ],
                borderWidth: 0
            }]
        },
        options: {
            ...defaultChartOptions,
            indexAxis: 'y',
            plugins: {
                ...defaultChartOptions.plugins,
                legend: { display: false },
                datalabels: { // Custom datalabels for analyst ratings
                    color: chartColors.text,
                    anchor: 'end',
                    align: 'right',
                    font: { weight: 'bold', size: 10 },
                    formatter: function(value) {
                        return value; // Show raw number of analysts
                    }
                }
            },
            scales: {
                x: {
                    ...defaultChartOptions.scales.x,
                    grid: { display: false },
                    ticks: {
                        callback: function(value) { return value; } // Show raw numbers
                    }
                },
                y: { ...defaultChartOptions.scales.y, grid: { display: false } }
            }
        }
    });

    // Navbar scroll behavior
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.onscroll = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    };

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

</script>