// assets/js/why-dividend-growth.js (Why 배당성장주 페이지 전용 스크립트)

document.addEventListener('DOMContentLoaded', () => {
    // Chart.js Datalabels 플러그인 등록 (default.html에서 이미 등록하도록 변경되어 주석 처리함)
    // Chart.register(ChartDataLabels); 

    const monthlyInvestmentSlider = document.getElementById('monthlyInvestment');
    const monthlyInvestmentValue = document.getElementById('monthlyInvestmentValue');
    const initialYieldSlider = document.getElementById('initialYield');
    const initialYieldValue = document.getElementById('initialYieldValue');
    const dividendGrowthSlider = document.getElementById('dividendGrowth');
    const dividendGrowthValue = document.getElementById('dividendGrowthValue');
    const priceGrowthSlider = document.getElementById('priceGrowth');
    const priceGrowthValue = document.getElementById('priceGrowthValue');
    const simulationSummary = document.getElementById('simulation-summary');

    let dividendChart, portfolioChart, comparisonChart;

    const formatCurrency = (value) => {
        if (value >= 100000000) {
            return `${(value / 100000000).toFixed(2)}억`;
        }
        return `${(value / 10000).toFixed(0)}만`;
    };

    const formatFullCurrency = (value) => {
        const man = Math.floor(value / 10000);
        const eok = Math.floor(man / 10000);
        const manUnit = man % 10000;

        let result = "";
        if (eok > 0) {
            result += `${eok}억 `;
        }
        if (manUnit > 0) {
            result += `${manUnit}만원`;
        } else if (eok === 0) {
            result = '0원';
        }
        return result.trim();
    }

    function calculateSimulation() {
        const monthlyInv = parseFloat(monthlyInvestmentValue.value) * 10000;
        const annualInv = monthlyInv * 12;
        const initialYield = parseFloat(initialYieldValue.value) / 100;
        const dividendGrowth = parseFloat(dividendGrowthValue.value) / 100;
        const priceGrowth = parseFloat(priceGrowthValue.value) / 100;

        let portfolioValue = 0;
        let principal = 0;
        const years = 30;

        const labels = Array.from({ length: years + 1 }, (_, i) => `${i}년`);
        const dividendData = [0];
        const portfolioData = [0];
        const principalData = [0];

        for (let year = 1; year <= years; year++) {
            principal += annualInv;

            let annualDividend = portfolioValue * (initialYield * Math.pow(1 + dividendGrowth, year - 1));
            portfolioValue += annualInv;
            portfolioValue *= (1 + priceGrowth); 
            portfolioValue += annualDividend;

            dividendData.push(annualDividend);
            portfolioData.push(portfolioValue);
            principalData.push(principal);
        }

        return { labels, dividendData, portfolioData, principalData };
    }

    function updateSummary(portfolioData, dividendData, principalData) {
        const finalPrincipal = principalData[principalData.length - 1];
        const finalPortfolio = portfolioData[portfolioData.length - 1];
        const finalDividend = dividendData[dividendData.length - 1];

        simulationSummary.innerHTML = `
            ${portfolioData.length -1}년 후, 누적 투자 원금 <span class="font-bold text-blue-600">${formatFullCurrency(finalPrincipal)}</span>은 약 <span class="font-bold text-blue-600">${formatFullCurrency(finalPortfolio)}</span>의 포트폴리오 가치로 성장하며, 연간 배당금은 약 <span class="font-bold text-blue-600">${formatFullCurrency(finalDividend)}</span>에 도달합니다. 이는 꾸준한 투자와 배당 재투자가 만들어내는 강력한 복리 효과를 보여줍니다.
        `;
    }

    function createOrUpdateCharts() {
        const { labels, dividendData, portfolioData, principalData } = calculateSimulation();

        updateSummary(portfolioData, dividendData, principalData);

        if (dividendChart) dividendChart.destroy();
        dividendChart = new Chart(document.getElementById('dividendChart'), {
            type: 'bar',
            data: {
                labels: labels.slice(1),
                datasets: [{
                    label: '연간 배당금 (만원)',
                    data: dividendData.slice(1).map(d => d / 10000),
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { 
                        beginAtZero: true,
                        ticks: { callback: value => `${value.toLocaleString()}만` }
                    }
                },
                plugins: {
                    tooltip: { callbacks: { label: context => `${context.dataset.label}: ${context.parsed.y.toLocaleString()}만원` } }
                    // datalabels for dividendChart added below
                }
            }
        });

        if (portfolioChart) portfolioChart.destroy();
        portfolioChart = new Chart(document.getElementById('portfolioChart'), {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: '총 포트폴리오 가치',
                    data: portfolioData.map(p => p / 10000),
                    borderColor: 'rgba(234, 88, 12, 1)',
                    backgroundColor: 'rgba(234, 88, 12, 0.1)',
                    fill: true,
                    tension: 0.1
                }, {
                    label: '누적 투자 원금',
                    data: principalData.map(p => p / 10000),
                    borderColor: 'rgba(107, 114, 128, 1)',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { 
                        beginAtZero: true,
                        ticks: { callback: value => formatCurrency(value * 10000) }
                    }
                },
                plugins: {
                    tooltip: { callbacks: { label: context => `${context.dataset.label}: ${formatCurrency(context.parsed.y * 10000)}원` } }
                    // datalabels for portfolioChart added below
                }
            }
        });
    }

    function createComparisonChart() {
        const ctx = document.getElementById('comparisonChart');
        if (comparisonChart) comparisonChart.destroy();
        comparisonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['10년 연평균', '20년 연평균'],
                datasets: [
                    {
                        label: 'S&P 500 배당 귀족주',
                        data: [9.62, 8.51],
                        backgroundColor: 'rgba(22, 163, 74, 0.7)',
                        borderColor: 'rgba(22, 163, 74, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'S&P 500',
                        data: [11.01, 8.87],
                        backgroundColor: 'rgba(107, 114, 128, 0.7)',
                        borderColor: 'rgba(107, 114, 128, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '연평균 총 수익률 (%)'
                        }
                    }
                },
                plugins: {
                    tooltip: { callbacks: { label: context => `${context.dataset.label}: ${context.parsed.y}%` } }
                    // datalabels for comparisonChart added below
                }
            }
        });
    }

    const inputs = [
        { slider: monthlyInvestmentSlider, value: monthlyInvestmentValue },
        { slider: initialYieldSlider, value: initialYieldValue },
        { slider: dividendGrowthSlider, value: dividendGrowthValue },
        { slider: priceGrowthSlider, value: priceGrowthValue },
    ];

    inputs.forEach(({slider, value}) => {
        slider.addEventListener('input', () => {
            value.value = slider.value;
            createOrUpdateCharts();
        });
        value.addEventListener('input', () => {
            slider.value = value.value;
            createOrUpdateCharts();
        });
    });

    createOrUpdateCharts();
    createComparisonChart();
});