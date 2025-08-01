---
layout: default
title: "AbbVie 기업 분석"
permalink: /companies/abbvie/
---

{% raw %}
<div class="container mx-auto p-4 md:p-8">
    <header class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-[#004AAD] mb-2">AbbVie (ABBV)</h1>
        <p class="text-xl text-[#387ADF]">배당성장 투자자를 위한 심층 분석 인포그래픽</p>
    </header>

    <section id="kpis" class="mb-12">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-5xl font-bold text-[#004AAD]">11년+</p>
                <p class="mt-2 text-[#387ADF]">연속 배당금 증액</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-5xl font-bold text-[#004AAD]">3.27%</p>
                <p class="mt-2 text-[#387ADF]">현재 배당 수익률</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-5xl font-bold text-[#004AAD]">다각화된</p>
                <p class="mt-2 text-[#387ADF]">포트폴리오</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-5xl font-bold text-[#E63946]">213.59%</p>
                <p class="mt-2 text-[#E63946]">배당성향 (높음)</p>
            </div>
        </div>
        <p class="text-center mt-6 text-gray-600">휴미라 이후 신약 성장과 다각화된 포트폴리오로 견고한 재무 상태를 유지하고 있습니다.</p>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section id="revenue-breakdown" class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-[#004AAD] mb-4">사업 부문별 매출 비중 (Q1 2025)</h2>
            <div class="chart-container h-[350px] md:h-[400px]">
                <canvas id="revenueByMarketChart"></canvas>
            </div>
            <p class="mt-4 text-center text-gray-600">애브비의 다각화된 포트폴리오는 특정 제품 또는 시장 의존도를 줄여 안정적인 성장을 가능하게 합니다.</p>
        </section>

        <section id="financial-trends" class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-[#004AAD] mb-4">주요 재무 추세 (2020-2024)</h2>
            <div class="chart-container h-[350px] md:h-[400px]">
                <canvas id="financialsChart"></canvas>
            </div>
            <p class="mt-4 text-center text-gray-600">매출 및 순이익 변동성은 시장 상황과 전략적 투자를 반영합니다.</p>
        </section>

        <section id="dividend-analysis" class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-[#004AAD] mb-4">배당 성장률 추이</h2>
            <div class="chart-container h-[350px] md:h-[400px]">
                <canvas id="dividendGrowthChart"></canvas>
            </div>
            <p class="mt-4 text-center text-gray-600">꾸준한 배당 성장은 주주 환원 의지를 보여주지만, 최근 성장률 둔화 추세가 관찰됩니다.</p>
        </section>

        <section id="fcf-payout" class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-[#004AAD] mb-4">잉여현금흐름(FCF)과 배당 (2024)</h2>
            <div class="chart-container h-[350px] md:h-[400px]">
                <canvas id="fcfVsDividendChart"></canvas>
            </div>
            <p class="mt-4 text-center text-gray-600">2024년 FCF 대비 배당금 지급액은 높은 투자 주기를 반영합니다.</p>
        </section>
    </div>

    <section id="investment-thesis" class="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-3xl font-bold text-center text-[#004AAD] mb-6">애브비(ABBV) 투자 논리</h2>
        <div id="thesisOutput" class="p-4 bg-[#F0F8FF] rounded-lg border border-[#89CFF0] min-h-[100px] text-gray-700 leading-relaxed text-sm md:text-base">
            <p class="text-gray-500">애브비에 대한 간략한 투자 논리가 여기에 표시됩니다. (이 부분은 나중에 자동 생성기로 대체할 수 있습니다.)</p>
        </div>
    </section>

    <p class="mt-8 text-center">
        <a href="/" class="text-[#004AAD] hover:underline text-lg font-semibold">&larr; 메인 페이지로 돌아가기</a>
    </p>
</div>
{% endraw %}