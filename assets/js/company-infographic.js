// assets/js/company-infographic.js (AbbVie 데이터 적용 - 투자 논리 생성기 제외)

// Chart.js Datalabels 플러그인 등록
Chart.register(ChartDataLabels);

const FPL_COLOR = '#0077b6';
const NEER_COLOR = '#00bfa5';

const chartColors = { // Common color palette for all charts
    primary: FPL_COLOR, // Main blue
    secondary: NEER_COLOR, // Accent green
    accent: '#48cae4', // Lighter blue
    neutral: '#ade8f4', // Even lighter blue
    success: '#16a34a', // Green for positive
    warning: '#f59e0b', // Amber for neutral/warning
    danger: '#ef4444', // Red for negative
    text: '#343a40', // Dark text
    bgGray: '#f8f9fa' // Light background
};

const tooltipTitleCallback = (tooltipItems) => {
    const item = tooltipItems[0];
    let label = item.chart.data.labels[item.dataIndex];
    if (Array.isArray(label)) return label.join(' ');
    return label;
};

const defaultChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: { display: false }, // 기본적으로 범례는 숨깁니다.
        tooltip: {
            enabled: true,
            callbacks: { title: tooltipTitleCallback },
            bodyFont: { family: "'Noto Sans KR', sans-serif" },
            titleFont: { family: "'Noto Sans KR', sans-serif" },
            backgroundColor: '#495057', // Dark gray tooltip background
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            padding: 10,
            cornerRadius: 4
        },
        datalabels: { // Default datalabels for bars/pies
            color: chartColors.text,
            anchor: 'end',
            align: 'top',
            font: { weight: 'bold', size: 10 },
            formatter: value => value.toFixed(1)
        }
    },
    scales: {
        x: {
            ticks: { font: { family: "'Noto Sans KR', sans-serif", size: 10 }, color: '#6c757d' },
            grid: { display: false }
        },
        y: {
            ticks: { font: { family: "'Noto Sans KR', sans-serif", size: 10 }, color: '#6c757d' },
            grid: { color: '#e9ecef' },
            beginAtZero: true
        }
    }
};

// Custom function to process labels for multi-line display if too long
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

document.addEventListener('DOMContentLoaded', () => {
    // Chart: Revenue Split
    new Chart(document.getElementById('revenueSplitChart'), {
        type: 'doughnut',
        data: {
            labels: ['FPL (규제 유틸리티)', 'NEER (재생에너지)'],
            datasets: [{
                data: [69.29, 30.71], // 2024년 매출 비중
                backgroundColor: [FPL_COLOR, NEER_COLOR],
                borderColor: '#ffffff',
                borderWidth: 4
            }]
        },
        options: {
            ...defaultChartOptions,
            plugins: {
                ...defaultChartOptions.plugins,
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: c => `${c.label}: ${c.raw.toFixed(2)}%` } },
                datalabels: {
                    color: '#ffffff',
                    anchor: 'center',
                    align: 'center',
                    font: { weight: 'bold', size: 14 },
                    formatter: value => `${value.toFixed(1)}%`
                }
            }
        }
    });

    // Chart: Financials (Tabbed)
    const financialsChartConfig = {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: '총 매출 (십억 $)',
                data: [18.00, 17.07, 20.96, 28.11, 24.75],
                backgroundColor: 'rgba(0, 119, 182, 0.7)',
                yAxisID: 'y',
            }, {
                type: 'line',
                label: '순이익 (십억 $)',
                data: [2.92, 2.83, 3.25, 7.31, 6.95],
                borderColor: '#00bfa5',
                backgroundColor: 'rgba(0, 191, 165, 0.2)',
                fill: true,
                tension: 0.3,
                yAxisID: 'y',
            }]
        },
        options: {
            ...defaultChartOptions,
            plugins: { ...defaultChartOptions.plugins, legend: { display: true, position: 'top' } },
            scales: {
                ...defaultChartOptions.scales,
                y: { ...defaultChartOptions.scales.y, title: { display: true, text: '단위: 십억 달러', font: { size: 10 } } }
            }
        }
    };
    let financialsChart = new Chart(document.getElementById('financialsChart'), financialsChartConfig);

    const stockPriceChartConfig = {
        type: 'line',
        data: {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'NEE 월별 조정 주가 (USD)',
                data: [20.41, 24.36, 32.73, 34.38, 53.38, 69.43, 85.68, 78.36, 58.54, 77.83, 70.89],
                borderColor: '#0077b6',
                backgroundColor: 'rgba(0, 119, 182, 0.1)',
                fill: true,
                tension: 0.1,
                pointRadius: 0
            }]
        },
        options: {
            ...defaultChartOptions,
            plugins: { ...defaultChartOptions.plugins, legend: { display: true, position: 'top' }, datalabels: { display: false } }
        }
    };
    let stockPriceChart; // Initialize as undefined

    const perfBtn = document.getElementById('perfBtn');
    const stockBtn = document.getElementById('stockBtn');
    const ratioBtn = document.getElementById('ratioBtn');
    const perfContent = document.getElementById('perfContent');
    const stockContent = document.getElementById('stockContent');
    const ratioContent = document.getElementById('ratioContent');

    function showFinancialTab(tabId) {
        perfContent.classList.add('hidden');
        stockContent.classList.add('hidden');
        ratioContent.classList.add('hidden');
        perfBtn.classList.remove('active');
        stockBtn.classList.remove('active');
        ratioBtn.classList.remove('active');

        document.getElementById(`${tabId}Content`).classList.remove('hidden');
        document.getElementById(`${tabId}Btn`).classList.add('active');

        // Re-render chart for the active tab if it's a chart tab
        if (tabId === 'perf') {
            if (financialsChart) financialsChart.destroy();
            financialsChart = new Chart(document.getElementById('financialsChart'), financialsChartConfig);
        } else if (tabId === 'stock') {
            if (stockPriceChart) stockPriceChart.destroy();
            stockPriceChart = new Chart(document.getElementById('stockPriceChart'), stockPriceChartConfig);
        }
        // ratioBtn 클릭 시에는 차트가 없으므로 별도 처리 필요 없음
    }

    perfBtn.addEventListener('click', () => showFinancialTab('perf'));
    stockBtn.addEventListener('click', () => showFinancialTab('stock'));
    ratioBtn.addEventListener('click', () => showFinancialTab('ratio'));

    // Initial load
    showFinancialTab('perf');


    // Chart: Market Growth (Horizontal Bar)
    new Chart(document.getElementById('marketGrowthChart'), {
        type: 'bar',
        data: {
            labels: ['재생에너지 시장', '에너지 저장 시장', '미국 전력 송배전'].map(processLabel),
            datasets: [{
                data: [14.9, 14.31, 2.95],
                backgroundColor: [NEER_COLOR, '#94d2bd', FPL_COLOR]
            }]
        },
        options: {
            ...defaultChartOptions,
            indexAxis: 'y', // 가로 막대 그래프
            plugins: {
                ...defaultChartOptions.plugins,
                datalabels: {
                    color: '#ffffff',
                    anchor: 'center',
                    align: 'center',
                    font: { weight: 'bold' },
                    formatter: value => `${value}%`
                }
            },
            scales: {
                x: { ...commonOptions.scales.x, ticks: { callback: v => `${v}%` } },
                y: { ...commonOptions.scales.y, grid: { display: false } }
            }
        }
    });

    // Chart: Generation Mix (Pie Chart)
    new Chart(document.getElementById('generationMixChart'), {
        type: 'pie',
        data: {
            labels: ['풍력', '원자력', '태양광'],
            datasets: [{
                data: [64, 19, 17], // 예시 데이터, 실제 비율에 맞게 수정
                backgroundColor: ['#0077b6', '#48cae4', '#ade8f4'],
                borderColor: '#ffffff',
                borderWidth: 4
            }]
        },
        options: {
            ...defaultChartOptions,
            plugins: {
                ...defaultChartOptions.plugins,
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: c => `${c.label}: ${c.raw}%` } },
                datalabels: {
                    color: '#ffffff',
                    font: { weight: 'bold', size: 14 },
                    formatter: value => `${value}%`
                }
            }
        }
    });
</script>