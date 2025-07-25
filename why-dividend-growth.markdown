---
layout: default
title: Why Dividend Stock
---

<main class="container mx-auto p-4 sm:p-6 lg:p-8">
    
    <section id="intro" class="mb-16 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-slate-900">시간과 함께 성장하는 자산, 배당성장주</h2>
        <p class="max-w-3xl mx-auto text-slate-600 text-lg">
            배당성장주 투자는 단순히 배당금을 받는 것을 넘어, 매년 증가하는 배당을 통해 복리의 마법을 극대화하는 장기 투자 전략입니다. 이 분석기는 여러분의 투자 시나리오에 따라 미래의 자산과 배당 소득이 어떻게 성장하는지 직관적으로 보여줍니다.
        </p>
    </section>

    <section id="simulator" class="mb-16 scroll-mt-20">
        <div class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h3 class="text-2xl md:text-3xl font-bold mb-2 text-slate-900">장기 성장 시뮬레이터</h3>
            <p class="text-slate-500 mb-8">아래 슬라이더와 입력 필드를 조정하여 자신만의 투자 시나리오를 만들어보세요. 차트가 실시간으로 업데이트됩니다.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div>
                    <label for="monthlyInvestment" class="block text-sm font-medium text-slate-700">월 투자금 (만원)</label>
                    <input type="range" id="monthlyInvestment" min="0" max="200" value="50" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    <input type="number" id="monthlyInvestmentValue" value="50" class="mt-2 w-full p-2 text-center rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 no-spinner">
                </div>
                <div>
                    <label for="initialYield" class="block text-sm font-medium text-slate-700">초기 배당률 (%)</label>
                    <input type="range" id="initialYield" min="1" max="10" value="3" step="0.1" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    <input type="number" id="initialYieldValue" value="3" step="0.1" class="mt-2 w-full p-2 text-center rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 no-spinner">
                </div>
                <div>
                    <label for="dividendGrowth" class="block text-sm font-medium text-slate-700">연평균 배당 성장률 (%)</label>
                    <input type="range" id="dividendGrowth" min="1" max="20" value="10" step="0.1" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    <input type="number" id="dividendGrowthValue" value="10" step="0.1" class="mt-2 w-full p-2 text-center rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 no-spinner">
                </div>
                <div>
                    <label for="priceGrowth" class="block text-sm font-medium text-slate-700">연평균 주가 상승률 (%)</label>
                    <input type="range" id="priceGrowth" min="1" max="20" value="10" step="0.1" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    <input type="number" id="priceGrowthValue" value="10" step="0.1" class="mt-2 w-full p-2 text-center rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 no-spinner">
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h4 class="text-xl font-semibold text-center mb-4">연간 배당금 성장 추이</h4>
                    <div class="chart-container" style="height: 400px;">
                        <canvas id="dividendChart"></canvas>
                    </div>
                </div>
                <div>
                    <h4 class="text-xl font-semibold text-center mb-4">총 포트폴리오 가치 변화</h4>
                    <div class="chart-container" style="height: 400px;">
                        <canvas id="portfolioChart"></canvas>
                    </div>
                </div>
            </div>
             <div class="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <h4 class="text-lg font-bold text-blue-800">시뮬레이션 분석</h4>
                <p id="simulation-summary" class="mt-2 text-slate-700">
                    30년 후, 누적 투자 원금 <span class="font-bold text-blue-600">1억 8,000만원</span>은 약 <span class="font-bold text-blue-600">51억 6,054만원</span>의 포트폴리오 가치로 성장하며, 연간 배당금은 약 <span class="font-bold text-blue-600">2억 9,872만원</span>에 도달합니다. 이는 꾸준한 투자와 배당 재투자가 만들어내는 강력한 복리 효과를 보여줍니다.
                </p>
            </div>
        </div>
    </section>

    <section id="comparison" class="mb-16 scroll-mt-20">
        <div class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h3 class="text-2xl md:text-3xl font-bold mb-2 text-slate-900">시장 성과 비교: 배당성장주 vs S&P 500</h3>
            <p class="text-slate-500 mb-8">배당성장주 그룹(S&P 500 배당 귀족주)은 시장 지수와 비교했을 때 어떤 성과를 보였을까요? 아래 차트는 역사적 연평균 총 수익률을 비교한 결과입니다.</p>
            <div class="chart-container" style="height: 400px;">
                <canvas id="comparisonChart"></canvas>
            </div>
            <div class="mt-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                <h4 class="text-lg font-bold text-green-800">성과 비교 분석</h4>
                <p class="mt-2 text-slate-700">
                    장기적인 관점에서 배당성장주는 S&P 500 지수와 유사한 총 수익률을 기록하면서도, 일반적으로 **더 낮은 변동성**을 보이는 경향이 있습니다. 이는 시장 하락기에 자산을 방어하고 안정적인 위험 조정 수익률을 추구하는 투자자에게 매력적인 특징입니다. 
                </p>
            </div>
        </div>
    </section>

    <section id="strategy" class="mb-16 scroll-mt-20">
        <h3 class="text-2xl md:text-3xl font-bold mb-8 text-center text-slate-900">성공적인 투자를 위한 핵심 전략</h3>
        <p class="max-w-3xl mx-auto text-slate-600 text-lg mb-10 text-center">
            성공적인 배당성장주 투자를 위해서는 몇 가지 핵심 재무 지표를 이해하고, 장기적인 원칙을 지키는 것이 중요합니다.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h4 class="text-xl font-bold mb-3 text-slate-800">📊 핵심 재무 지표 확인</h4>
                <p class="text-slate-600">단순히 배당수익률만 보지 말고, 배당성장률, 배당성향, 잉여현금흐름(FCF), 자기자본이익률(ROE) 등을 종합적으로 분석하여 기업의 재무 건전성과 성장 지속성을 판단해야 합니다.</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h4 class="text-xl font-bold mb-3 text-slate-800">⏳ 장기적 관점 유지</h4>
                <p class="text-slate-600">배당성장 투자는 단기 시세차익이 아닌, 꾸준히 증가하는 배당을 통한 복리 효과를 목표로 합니다. 시장의 단기 변동에 흔들리지 않는 인내심이 필수적입니다.</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h4 class="text-xl font-bold mb-3 text-slate-800">🔄 배당금 재투자의 생활화</h4>
                <p class="text-slate-600">지급받은 배당금을 다시 투자하여 주식 수를 늘리는 것은 복리 효과를 극대화하는 가장 중요한 행동입니다. 이는 시간이 지날수록 자산 성장을 가속화시키는 핵심 동력입니다.</p>
            </div>
             <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h4 class="text-xl font-bold mb-3 text-slate-800">🌐 분산 투자 원칙</h4>
                <p class="text-slate-600">아무리 좋은 기업이라도 한 종목에 '올인'하는 것은 위험합니다. 다양한 산업과 지역의 우량 배당성장주에 분산 투자하여 포트폴리오의 안정성을 높여야 합니다.</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h4 class="text-xl font-bold mb-3 text-slate-800">👑 '배당 귀족'과 '배당 왕'</h4>
                <p class="text-slate-600">25년 이상(배당 귀족) 또는 50년 이상(배당 왕) 배당을 늘려온 기업들은 경제 위기 속에서도 살아남은 강력한 비즈니스 모델을 가졌을 가능성이 높습니다. 이들을 우선적으로 살펴보세요.</p>
            </div>
             <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h4 class="text-xl font-bold mb-3 text-slate-800">🏢 기업의 질적 분석</h4>
                <p class="text-slate-600">숫자 뒤에 숨은 이야기를 보세요. 기업이 속한 산업의 미래, 강력한 브랜드 파워, 대체 불가능한 기술 등 질적인 요소를 함께 고려하여 '경제적 해자'가 있는 기업을 선택하세요.</p>
            </div>
        </div>
    </section>

    <section id="risks" class="scroll-mt-20">
        <h3 class="text-2xl md:text-3xl font-bold mb-8 text-center text-slate-900">주의해야 할 주요 위험 요소</h3>
         <p class="max-w-3xl mx-auto text-slate-600 text-lg mb-10 text-center">
            모든 투자에는 위험이 따릅니다. 배당성장주 투자 시 발생할 수 있는 잠재적 위험을 이해하고 대비하는 것이 중요합니다.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-md">
                <h4 class="text-xl font-bold mb-3 text-red-700">📉 배당 삭감 위험</h4>
                <p class="text-slate-600">기업의 재무 상태가 악화되면 배당금을 줄이거나 중단할 수 있습니다. 이는 주가 하락과 투자자 신뢰도 저하로 이어질 수 있으므로, 기업의 펀더멘털을 지속적으로 점검해야 합니다.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border-l-4 border-amber-500 shadow-md">
                <h4 class="text-xl font-bold mb-3 text-amber-700">🎣 수익률 함정 (Yield Trap)</h4>
                <p class="text-slate-600">주가가 급락하여 일시적으로 배당수익률이 높아 보이는 경우를 경계해야 합니다. 이는 기업의 근본적인 문제 신호일 수 있으며, 지속 불가능한 배당일 가능성이 높습니다.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border-l-4 border-orange-500 shadow-md">
                <h4 class="text-xl font-bold mb-3 text-orange-700">집중 위험</h4>
                <p class="text-slate-600">배당주 포트폴리오가 특정 산업(예: 유틸리티, 필수소비재)에 과도하게 집중될 수 있습니다. 해당 섹터가 부진할 경우 손실이 커질 수 있으므로 항상 분산 원칙을 지켜야 합니다.</p>
            </div>
        </div>
    </section>

</main>

<footer class="bg-white mt-16 py-8">
    <div class="container mx-auto px-4 text-center text-slate-500">
        <p>&copy; 2024 대화형 배당성장주 투자 분석기. All Rights Reserved.</p>
        <p class="text-sm mt-2">본 시뮬레이션은 가정에 기반한 예측이며, 미래 수익을 보장하지 않습니다. 모든 투자 결정에 대한 책임은 투자자 본인에게 있습니다.</p>
    </div>
</footer>

<script>
    document.addEventListener('DOMContentLoaded', () => {
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
</script>