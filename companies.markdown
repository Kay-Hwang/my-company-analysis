---
layout: default
title: Company Analysis
---

<style>
    .placeholder { background-color: #e5e7eb; border-radius: 0.25rem; min-height: 1.1rem; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
    #simulator-results th, #simulator-results td { padding: 0.75rem 1rem; text-align: right; font-size: 0.9rem; }
    @media (max-width: 768px) { #simulator-results th, #simulator-results td { padding: 0.5rem; font-size: 0.75rem; } }
</style>

<div class="bg-slate-50">
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header class="text-center mb-12">
            <h1 class="text-4xl font-extrabold text-slate-800 tracking-tight sm:text-5xl">Company Analysis</h1>
            <p class="mt-4 max-w-2xl mx-auto text-xl text-slate-600">분석할 기업을 선택하세요.</p>
        </header>

        <section id="simulator" class="mb-16 bg-white p-8 rounded-xl shadow-lg">
            <h2 class="text-3xl font-bold text-center text-slate-800 mb-6">배당 성장 시뮬레이터 📈</h2>
            <p class="text-center text-slate-600 mb-8 -mt-4 text-sm">※ 시뮬레이션은 아래 대시보드에 표시된 '5년 평균 배당 성장률'을 기준으로 계산됩니다.</p>
            <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                <div class="w-full md:w-auto"><label for="initial-investment" class="block text-lg font-medium text-slate-700 mb-2">초기 투자금 (USD):</label><input type="number" id="initial-investment" value="10000" class="w-full md:w-64 p-3 border border-slate-300 rounded-lg text-lg text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></div>
                <button id="calculate-button" class="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 self-end">계산하기</button>
            </div>
            <div id="simulator-results-container" class="hidden">
                <h3 class="text-2xl font-bold text-center text-slate-700 mb-4">예상 연간 배당금</h3>
                <div class="overflow-x-auto">
                    <table id="simulator-results" class="min-w-full bg-white border">
                        <thead class="bg-slate-100"><tr><th class="text-left">기간</th><th>1년 후</th><th>5년 후</th><th>10년 후</th><th>15년 후</th><th>20년 후</th><th>30년 후</th></tr></thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </section>

        <hr class="mb-12">

        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center text-slate-700 mb-8">주요 기업 현황 (시뮬레이션 대상 선택)</h2>
            <div id="company-dashboard" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div class="bg-white p-3 rounded-lg shadow-md border-l-4" id="abbv-border"><div class="flex justify-between items-center mb-2"><div><h3 class="text-base font-bold text-slate-800">AbbVie</h3><p class="text-xs text-slate-500">ABBV</p></div><input type="checkbox" data-ticker="ABBV" class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"></div><div class="space-y-1"><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">주가</p><p id="abbv-price" class="text-sm font-semibold text-slate-900 placeholder w-16"></p></div><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">배당률</p><p id="abbv-yield" class="text-sm font-semibold text-slate-900 placeholder w-14"></p></div><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">5년DGR</p><p id="abbv-dgr" class="text-sm font-semibold text-slate-900 placeholder w-14"></p></div></div></div>
                <div class="bg-white p-3 rounded-lg shadow-md border-l-4" id="nee-border"><div class="flex justify-between items-center mb-2"><div><h3 class="text-base font-bold text-slate-800">NextEra</h3><p class="text-xs text-slate-500">NEE</p></div><input type="checkbox" data-ticker="NEE" class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"></div><div class="space-y-1"><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">주가</p><p id="nee-price" class="text-sm font-semibold text-slate-900 placeholder w-16"></p></div><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">배당률</p><p id="nee-yield" class="text-sm font-semibold text-slate-900 placeholder w-14"></p></div><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">5년DGR</p><p id="nee-dgr" class="text-sm font-semibold text-slate-900 placeholder w-14"></p></div></div></div>
                <div class="bg-white p-3 rounded-lg shadow-md border-l-4" id="unh-border"><div class="flex justify-between items-center mb-2"><div><h3 class="text-base font-bold text-slate-800">UnitedHealth</h3><p class="text-xs text-slate-500">UNH</p></div><input type="checkbox" data-ticker="UNH" class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"></div><div class="space-y-1"><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">주가</p><p id="unh-price" class="text-sm font-semibold text-slate-900 placeholder w-16"></p></div><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">배당률</p><p id="unh-yield" class="text-sm font-semibold text-slate-900 placeholder w-14"></p></div><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">5년DGR</p><p id="unh-dgr" class="text-sm font-semibold text-slate-900 placeholder w-14"></p></div></div></div>
                <div class="bg-white p-3 rounded-lg shadow-md border-l-4" id="jnj-border"><div class="flex justify-between items-center mb-2"><div><h3 class="text-base font-bold text-slate-800">J&J</h3><p class="text-xs text-slate-500">JNJ</p></div><input type="checkbox" data-ticker="JNJ" class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"></div><div class="space-y-1"><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">주가</p><p id="jnj-price" class="text-sm font-semibold text-slate-900 placeholder w-16"></p></div><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">배당률</p><p id="jnj-yield" class="text-sm font-semibold text-slate-900 placeholder w-14"></p></div><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">5년DGR</p><p id="jnj-dgr" class="text-sm font-semibold text-slate-900 placeholder w-14"></p></div></div></div>
                <div class="bg-white p-3 rounded-lg shadow-md border-l-4" id="txn-border"><div class="flex justify-between items-center mb-2"><div><h3 class="text-base font-bold text-slate-800">TI</h3><p class="text-xs text-slate-500">TXN</p></div><input type="checkbox" data-ticker="TXN" class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"></div><div class="space-y-1"><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">주가</p><p id="txn-price" class="text-sm font-semibold text-slate-900 placeholder w-16"></p></div><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">배당률</p><p id="txn-yield" class="text-sm font-semibold text-slate-900 placeholder w-14"></p></div><div class="flex justify-between items-baseline"><p class="text-xs text-slate-500">5년DGR</p><p id="txn-dgr" class="text-sm font-semibold text-slate-900 placeholder w-14"></p></div></div></div>
            </div>
        </section>
        
        <hr class="mb-12">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"><div class="p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-2xl font-bold text-slate-900">AbbVie</h2><span class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">ABBV</span></div><p class="text-slate-600 mb-4 h-12">면역학, 종양학 등 필수 치료 분야에 집중하는 글로벌 바이오 제약 기업.</p><a href="{{ '/abbvie.html' | relative_url }}" class="inline-block w-full text-center bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">분석 리포트 보기</a></div></div>
            <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"><div class="p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-2xl font-bold text-slate-900">NextEra Energy</h2><span class="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">NEE</span></div><p class="text-slate-600 mb-4 h-12">세계 최대의 풍력 및 태양광 에너지 생산업체이자 미국 최대의 전력 회사.</p><a href="{{ '/nextera.html' | relative_url }}" class="inline-block w-full text-center bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">분석 리포트 보기</a></div></div>
            <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"><div class="p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-2xl font-bold text-slate-900">UnitedHealth</h2><span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">UNH</span></div><p class="text-slate-600 mb-4 h-12">미국 최대 의료 서비스 제공자이자 다각화된 헬스케어 기업.</p><a href="{{ '/unh.html' | relative_url }}" class="inline-block w-full text-center bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">분석 리포트 보기</a></div></div>
            <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"><div class="p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-2xl font-bold text-slate-900">J&J</h2><span class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">JNJ</span></div><p class="text-slate-600 mb-4 h-12">혁신 의약품과 의료기기에 집중하는 글로벌 헬스케어 리더.</p><a href="{{ '/jnj.html' | relative_url }}" class="inline-block w-full text-center bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">분석 리포트 보기</a></div></div>
            <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"><div class="p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-2xl font-bold text-slate-900">Texas Instruments</h2><span class="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">TXN</span></div><p class="text-slate-600 mb-4 h-12">아날로그 및 임베디드 반도체 시장의 글로벌 리더.</p><a href="{{ '/txn.html' | relative_url }}" class="inline-block w-full text-center bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">분석 리포트 보기</a></div></div>
        </div>
    </main>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const apiKey = "{{ site.finnhub_api_key }}";
    const tickers = ["ABBV", "NEE", "UNH", "JNJ", "TXN"];
    const companyMetrics = {};
    const manualDGR = { "ABBV": 10.51, "NEE": 10.23, "UNH": 16.05, "JNJ": 5.68, "TXN": 15.3 };

    async function fetchCompanyData(ticker) {
        try {
            const quoteResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`);
            const quoteData = await quoteResponse.json();
            const dividendResponse = await fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${apiKey}`);
            const dividendData = await dividendResponse.json();
            
            const price = quoteData.c || 0;
            const dividendYield = dividendData.metric.dividendYieldIndicatedAnnual || 0;
            const dividendGrowthRate = manualDGR[ticker] || 0;
            const isPositive = quoteData.d >= 0;

            companyMetrics[ticker] = { yield: dividendYield, growth: dividendGrowthRate / 100 };

            const id_prefix = ticker.toLowerCase();
            document.getElementById(`${id_prefix}-price`).innerText = `$${price.toFixed(2)}`;
            document.getElementById(`${id_prefix}-yield`).innerText = `${dividendYield.toFixed(2)}%`;
            document.getElementById(`${id_prefix}-dgr`).innerText = `${dividendGrowthRate.toFixed(2)}%`;
            
            const borderEl = document.getElementById(`${id_prefix}-border`);
            if (borderEl) {
                borderEl.classList.add(isPositive ? 'border-green-500' : 'border-red-500');
            }
            [...document.querySelectorAll(`#${id_prefix}-price, #${id_prefix}-yield, #${id_prefix}-dgr`)].forEach(el => el.classList.remove('placeholder'));

        } catch (error) { console.error(`Error fetching data for ${ticker}:`, error); }
    }

    tickers.forEach(fetchCompanyData);

    const calculateButton = document.getElementById('calculate-button');
    if (calculateButton) {
        calculateButton.addEventListener('click', () => {
            const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
            const selectedTickers = [...document.querySelectorAll('#company-dashboard input[type="checkbox"]:checked')].map(cb => cb.dataset.ticker);
            if (selectedTickers.length === 0 || !initialInvestment) { alert('기업을 하나 이상 선택하고 투자금을 입력해주세요.'); return; }
            const investmentPerCompany = initialInvestment / selectedTickers.length;
            const results = {};
            selectedTickers.forEach(ticker => {
                const metrics = companyMetrics[ticker];
                if (!metrics) return;
                const initialDividend = investmentPerCompany * (metrics.yield / 100);
                results[ticker] = {
                    y1: initialDividend * Math.pow(1 + metrics.growth, 1), y5: initialDividend * Math.pow(1 + metrics.growth, 5), y10: initialDividend * Math.pow(1 + metrics.growth, 10),
                    y15: initialDividend * Math.pow(1 + metrics.growth, 15), y20: initialDividend * Math.pow(1 + metrics.growth, 20), y30: initialDividend * Math.pow(1 + metrics.growth, 30),
                };
            });
            const resultsBody = document.querySelector('#simulator-results tbody');
            resultsBody.innerHTML = '';
            for(const ticker in results) {
                const row = results[ticker];
                const tr = document.createElement('tr');
                tr.innerHTML = `<td class="text-left font-semibold">${ticker}</td><td>$${row.y1.toFixed(2)}</td><td>$${row.y5.toFixed(2)}</td><td>$${row.y10.toFixed(2)}</td><td>$${row.y15.toFixed(2)}</td><td>$${row.y20.toFixed(2)}</td><td>$${row.y30.toFixed(2)}</td>`;
                resultsBody.appendChild(tr);
            }
            if (selectedTickers.length > 1) {
                const total = { y1: 0, y5: 0, y10: 0, y15: 0, y20: 0, y30: 0 };
                for(const ticker in results) { Object.keys(total).forEach(year => total[year] += results[ticker][year]); }
                const totalRow = document.createElement('tr');
                totalRow.className = 'bg-slate-200 font-bold';
                totalRow.innerHTML = `<td class="text-left">합계</td><td>$${total.y1.toFixed(2)}</td><td>$${total.y5.toFixed(2)}</td><td>$${total.y10.toFixed(2)}</td><td>$${total.y15.toFixed(2)}</td><td>$${total.y20.toFixed(2)}</td><td>$${total.y30.toFixed(2)}</td>`;
                resultsBody.appendChild(totalRow);
            }
            document.getElementById('simulator-results-container').classList.remove('hidden');
        });
    }
});
</script>