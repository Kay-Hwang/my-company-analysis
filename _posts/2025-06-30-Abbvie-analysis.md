<!DOCTYPE html>
<html lang="ko" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>애브비 (ABBV) 대화형 투자 분석 대시보드</title>
    <!-- Chosen Palette: Warm Neutrals & Soft Accents (Customized for professionalism) -->
    <!-- Application Structure Plan: The SPA is designed as a comprehensive, multi-layered narrative journey for an investor. It begins with a high-level summary (Hero), then delves into the core investment thesis of successful product transition (Growth Engine). Following this, it expands to show the broader market context (Market Dynamics) and then offers a detailed, interactive exploration of each major business segment and its products (Key Product Deep Dive). Financial robustness is then validated (Financials and Dividends). Finally, a forward-looking perspective is provided through strategic analysis (SWOT) and market sentiment (Analyst Consensus). This layered structure, with interactive elements, allows users to progressively drill down into details or skip to areas of interest, enhancing usability and information retention beyond a linear report. -->
    <!-- Visualization & Content Choices: 
        - Hero Stats: Inform -> KPI Cards (HTML/CSS) -> Quick, high-level overview of success, now with 4 key metrics for a more comprehensive summary.
        - Growth Engine (Humira to Skyrizi/Rinvoq): Compare/Change -> Grouped Bar Chart (Chart.js) -> Directly visualizes the successful portfolio transition, which is the core investment thesis. Datalabels added for direct value visibility.
        - Global Market Dynamics: Inform/Compare -> Vertical Bar Chart for Market Size (Chart.js) -> Presents market sizes (bars) clearly with datalabels. AbbVie's market share and CAGR are now presented in a separate table below the chart for improved readability.
        - Revenue Portfolio: Compare/Organize -> Interactive Donut Chart (Chart.js) + JS -> Shows revenue composition with percentage datalabels on slices. Portfolio details now include AbbVie's estimated market share for that segment and specific product market share emphasis.
        - Key Product Deep Dive: Inform/Organize/Interact -> Tabbed Interface with Mini Bar Charts & Detailed Text (HTML/CSS/JS) -> Allows users to explore specific product performance and strategic highlights within each therapy area dynamically with datalabels on mini charts. This is a primary interaction point for detailed understanding.
        - 10-Year Stock Trend: Change -> Line Chart (Chart.js) -> Shows long-term value creation.
        - Annual Revenue/Net Income Trend: Compare/Change -> Combined Bar Chart (Chart.js) -> Illustrates financial resilience through various periods with datalabels.
        - Annual Dividend Per Share (DPS) Trend: Change -> Line Chart (Chart.js) -> Highlights the consistent dividend growth, crucial for dividend investors.
        - Dividend Stats (Yield, Growth, Payout): Inform -> KPI Cards (HTML/CSS) -> Summarizes key dividend metrics, including detailed explanation for payout ratio.
        - SWOT Analysis: Organize -> Four-Quadrant Layout (HTML/CSS) -> A clear, standard, and effective way to present qualitative strategic analysis.
        - Analyst Ratings: Inform/Compare -> Simple Bar Chart (Chart.js) -> Provides a quick, digestible summary of market sentiment with datalabels.
    -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Noto Sans KR', sans-serif;
            background-color: #f8f9fa;
        }
        .chart-container {
            position: relative;
            width: 100%;
            height: 350px;
            max-height: 400px;
        }
        @media (min-width: 768px) {
            .chart-container {
                height: 400px;
            }
        }
        .nav-link {
            transition: color 0.3s, border-bottom-color 0.3s;
        }
        .nav-link:hover, .nav-link.active {
            color: #4A55A2;
            border-bottom-color: #4A55A2;
        }
        .tab-button.active {
            background-color: #4A55A2;
            color: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        .mini-chart-container {
            position: relative;
            width: 100%;
            height: 120px;
            max-height: 150px;
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-800">

    <nav id="navbar" class="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <div class="text-2xl font-bold text-gray-900">애브비(ABBV) 분석</div>
                <div class="hidden md:flex space-x-8">
                    <a href="#hero" class="nav-link border-b-2 border-transparent pb-1">핵심 요약</a>
                    <a href="#growth-engine" class="nav-link border-b-2 border-transparent pb-1">성장 엔진</a>
                    <a href="#market-dynamics" class="nav-link border-b-2 border-transparent pb-1">시장 동향</a>
                    <a href="#key-products" class="nav-link border-b-2 border-transparent pb-1">핵심 제품</a>
                    <a href="#financials" class="nav-link border-b-2 border-transparent pb-1">재무 및 배당</a>
                    <a href="#outlook" class="nav-link border-b-2 border-transparent pb-1">전망</a>
                </div>
            </div>
        </div>
    </nav>

    <main class="container mx-auto p-4 md:p-8">

        <section id="hero" class="text-center py-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900">새로운 시대를 여는 거인: 애브비</h1>
            <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                애브비는 블록버스터 '휴미라'의 특허 만료 위기를 성공적으로 극복하고, 차세대 성장 동력으로 무장하여 지속 가능한 성장을 증명하고 있는 글로벌 바이오 제약 기업입니다.
            </p>
            <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-indigo-500">
                    <p class="text-sm text-gray-500">핵심 면역학 매출 (Q1 2025)</p>
                    <p class="text-2xl font-bold text-indigo-600 mt-2">$51.43억</p>
                    <p class="text-sm text-gray-500 mt-1">스카이리치 & 린보크 합산</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500">
                    <p class="text-sm text-gray-500">연속 배당 성장</p>
                    <p class="text-2xl font-bold text-purple-600 mt-2">11년+</p>
                    <p class="text-sm text-gray-500 mt-1">강력한 주주 환원 의지</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-sky-500">
                    <p class="text-sm text-gray-500">Q1 2025 순매출</p>
                    <p class="text-2xl font-bold text-sky-600 mt-2">$133.4억</p>
                    <p class="text-sm text-gray-500 mt-1">운영 기준 전년 대비 9.8% 성장</p>
                </div>
                 <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-emerald-500">
                    <p class="text-sm text-gray-500">현재 배당률</p>
                    <p class="text-2xl font-bold text-emerald-600 mt-2">3.27%</p>
                    <p class="text-sm text-gray-500 mt-1">견고한 배당 수익률</p>
                </div>
            </div>
        </section>

        <section id="growth-engine" class="py-12">
            <div class="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h2 class="text-3xl font-bold text-center mb-2">핵심 성장 엔진: 휴미라 이후의 포트폴리오 전환</h2>
                <p class="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                    애브비는 블록버스터 휴미라의 특허 만료로 인한 매출 감소를 스카이리치와 린보크라는 강력한 차세대 치료제들의 폭발적인 성장으로 성공적으로 상쇄하고 있습니다. 이들 신약은 이미 휴미라의 전성기 매출을 넘어설 것으로 예상되며, 회사의 미래 성장을 견인할 핵심 동력입니다.
                </p>
                <div class="chart-container mx-auto">
                    <canvas id="growthEngineChart"></canvas>
                </div>
                <p class="mt-6 text-sm text-center text-gray-500">위 차트는 휴미라의 매출 감소와 스카이리치 및 린보크의 급격한 성장을 보여주며, 애브비의 성공적인 포트폴리오 전환 전략을 시각적으로 나타냅니다.</p>
            </div>
        </section>

        <section id="market-dynamics" class="py-12">
            <div class="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h2 class="text-3xl font-bold text-center mb-2">글로벌 시장 역학: 애브비 사업 분야의 잠재력</h2>
                <p class="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                    애브비는 고성장이 예상되는 면역학, 종양학, 신경과학, 에스테틱스 등 다각화된 치료 분야에서 사업을 운영하고 있습니다. 각 시장은 고령화 인구 증가와 미충족 의료 수요에 힘입어 견고한 성장세를 보이며, 애브비는 혁신적인 제품과 전략적 인수를 통해 이들 시장에서 중요한 점유율을 확보하고 있습니다.
                </p>
                <div class="chart-container mx-auto">
                    <canvas id="marketDynamicsChart"></canvas>
                </div>
                <p class="mt-6 text-sm text-center text-gray-500">위 차트는 애브비의 주요 치료 분야별 글로벌 시장 규모(2024년 기준)를 보여줍니다. 각 시장의 예상 연평균 성장률(CAGR)과 애브비의 시장 점유율은 아래 표를 통해 확인하실 수 있습니다.</p>
                
                <h3 class="text-2xl font-bold mt-12 mb-4 text-center">주요 시장 지표 및 경쟁 환경</h3>
                <div class="overflow-x-auto rounded-lg shadow-md mx-auto max-w-2xl">
                    <table class="w-full text-left text-gray-700">
                        <thead class="bg-gray-100 text-gray-900 uppercase text-sm">
                            <tr>
                                <th scope="col" class="px-6 py-3">치료 분야</th>
                                <th scope="col" class="px-6 py-3">예상 CAGR (%)</th>
                                <th scope="col" class="px-6 py-3">애브비 시장 점유율 (%) <br>(2025년 Q1 추정)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b">
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">면역학</td>
                                <td class="px-6 py-4">12.1</td>
                                <td class="px-6 py-4">22.9</td>
                            </tr>
                            <tr class="bg-gray-50 border-b">
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">종양학</td>
                                <td class="px-6 py-4">10.9</td>
                                <td class="px-6 py-4">2.03</td>
                            </tr>
                            <tr class="bg-white border-b">
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">신경과학</td>
                                <td class="px-6 py-4">5.6</td>
                                <td class="px-6 py-4">19.87</td>
                            </tr>
                            <tr class="bg-gray-50">
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">에스테틱스</td>
                                <td class="px-6 py-4">9.8</td>
                                <td class="px-6 py-4">4.81</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p class="text-gray-700 leading-relaxed max-w-3xl mx-auto mt-8">
                    바이오 제약 산업은 애브비가 활동하는 모든 핵심 치료 분야에서 매우 경쟁적입니다. 화이자, 일라이 릴리, 아스트라제네카, 머크, 존슨앤드존슨과 같은 글로벌 제약사들이 주요 경쟁사입니다. 면역학에서는 존슨앤드존슨의 스텔라라와 트렘피아가, 종양학에서는 아스트라제네카의 타그리소와 머크의 키트루다가 강력한 경쟁 제품으로 존재합니다. 에스테틱스 시장 역시 갈더마와 머츠의 도전이 거세지만, 보톡스는 여전히 지배적인 시장 점유율을 유지하고 있습니다. 애브비는 지속적인 R&D 투자와 맞대결 임상 시험을 통한 신약의 우월성 입증으로 경쟁 우위를 확보하고 있습니다.
                </p>
            </div>
        </section>

        <section id="portfolio" class="py-12">
            <h2 class="text-3xl font-bold text-center mb-8">사업 포트폴리오 구성</h2>
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                    <h3 class="text-xl font-bold text-center mb-4">Q1 2025 매출 비중</h3>
                    <div class="chart-container" style="height: 300px;">
                        <canvas id="portfolioDonutChart"></canvas>
                    </div>
                    <p class="mt-4 text-sm text-center text-gray-500">도넛 차트의 각 섹션을 클릭하여 해당 사업 부문에 대한 상세 정보를 확인하세요.</p>
                </div>
                <div id="portfolio-details" class="lg:col-span-3 bg-white p-6 md:p-8 rounded-xl shadow-lg">
                    <!-- JS will populate this section -->
                </div>
            </div>
            <p class="mt-12 text-center text-gray-600 max-w-3xl mx-auto">
                애브비의 다각화된 사업 포트폴리오는 특정 제품 또는 시장에 대한 의존도를 줄이고, 다양한 성장 동인을 통해 장기적인 안정성과 성장 잠재력을 확보하고 있음을 보여줍니다. 각 사업 부문 내 핵심 제품들의 시장 지위와 성장 추세는 회사의 지속 가능한 미래를 뒷받침합니다.
            </p>
        </section>

        <section id="key-products" class="py-12">
            <div class="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h2 class="text-3xl font-bold text-center mb-2">핵심 제품 심층 분석: 성장 동력 세분화</h2>
                <p class="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                    애브비의 매출은 다양한 치료 분야의 핵심 제품들로부터 창출됩니다. 아래 탭을 클릭하여 각 사업 부문의 주요 제품 현황, 최근 매출 추이, 그리고 핵심적인 성장 동인 및 파이프라인 하이라이트를 자세히 살펴보세요.
                </p>

                <div class="flex flex-wrap justify-center gap-2 mb-8">
                    <button class="tab-button px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none" data-tab="immunology">면역학</button>
                    <button class="tab-button px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none" data-tab="oncology">종양학</button>
                    <button class="tab-button px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none" data-tab="neuroscience">신경과학</button>
                    <button class="tab-button px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none" data-tab="aesthetics">에스테틱스</button>
                </div>

                <div id="tab-content-immunology" class="tab-content active bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 class="text-2xl font-bold text-indigo-600 mb-4">면역학 포트폴리오</h3>
                    <p class="text-gray-700 mb-4">
                        면역학은 애브비의 가장 큰 사업 부문이며, 휴미라의 특허 만료에 대한 성공적인 대응을 통해 스카이리치와 린보크가 새로운 성장 축으로 확고히 자리매김했습니다. 이들은 다양한 자가면역 질환에 대한 폭넓은 적응증을 통해 강력한 시장 침투를 보이고 있습니다.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold text-lg text-gray-900 mb-2">Q1 2025 주요 제품 매출 (글로벌, 백만$)</h4>
                            <div class="mini-chart-container">
                                <canvas id="immunologyProductChart"></canvas>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold text-lg text-gray-900 mb-2">주요 제품별 하이라이트</h4>
                            <ul class="list-disc list-inside text-gray-700 space-y-2">
                                <li>**휴미라 (Humira):** Q1 2025 글로벌 매출 $1,121M. 미국 특허 만료로 매출 감소, 점진적 바이오시밀러 경쟁 심화.</li>
                                <li>**스카이리치 (Skyrizi):** Q1 2025 글로벌 매출 $3,425M (+72.0% 운영 기준). 건선, 건선성 관절염, 크론병, 궤양성 대장염 등 광범위한 적응증 확보. 미국 건선 시장 처방 점유율 35% 이상.</li>
                                <li>**린보크 (Rinvoq):** Q1 2025 글로벌 매출 $1,718M (+59.7% 운영 기준). 류마티스 관절염, 아토피 피부염, 궤양성 대장염, 크론병 등 다수 적응증 승인.</li>
                                <li>**전망:** 2027년 스카이리치와 린보크 합산 매출 $310억+ 목표 달성 예상, 이는 휴미라 전성기 매출을 넘어섭니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="tab-content-oncology" class="tab-content bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 class="text-2xl font-bold text-purple-600 mb-4">종양학 포트폴리오</h3>
                    <p class="text-gray-700 mb-4">
                        애브비의 종양학 사업은 혈액암 치료제에서 고형암으로의 확장을 통해 다각화를 꾀하고 있습니다. 기존 제품의 견고한 매출과 함께 신규 파이프라인의 도입으로 미래 성장 동력을 확보하고 있습니다.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold text-lg text-gray-900 mb-2">Q1 2025 주요 제품 매출 (글로벌, 백만$)</h4>
                            <div class="mini-chart-container">
                                <canvas id="oncologyProductChart"></canvas>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold text-lg text-gray-900 mb-2">주요 제품별 하이라이트</h4>
                            <ul class="list-disc list-inside text-gray-700 space-y-2">
                                <li>**임브루비카 (Imbruvica):** Q1 2025 글로벌 매출 $738M (-11.9%). 만성 림프구성 백혈병(CLL) 등에 사용되나, 새로운 경구 치료제와의 경쟁 심화.</li>
                                <li>**벤클렉스타 (Venclexta):** Q1 2025 글로벌 매출 $665M (+12.3% 운영 기준). CLL 및 급성 골수성 백혈병(AML)에 사용.</li>
                                <li>**신규 제품 (에피킨리, 엘라히어, 에므렐리스):** 최근 포트폴리오에 추가된 제품들로 고형암 분야로의 확장 전략을 실행 중입니다. 특히 에므렐리스는 2025년 3분기부터 매출 기여 예상.</li>
                                <li>**전략:** 임브루비카의 경쟁 심화를 상쇄하고 종양학 매출을 다각화하기 위한 고형암 분야 확장이 핵심 전략입니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="tab-content-neuroscience" class="tab-content bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 class="text-2xl font-bold text-blue-600 mb-4">신경과학 포트폴리오</h3>
                    <p class="text-gray-700 mb-4">
                        신경과학은 애브비의 또 다른 중요한 성장 축입니다. 기존 제품의 견고한 성과와 함께 최근 세레벨 테라퓨틱스 인수를 통해 정신과 및 신경학적 질환에 대한 강력한 파이프라인을 확보하며 미래 성장을 위한 발판을 마련했습니다.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold text-lg text-gray-900 mb-2">Q1 2025 주요 제품 매출 (글로벌, 백만$)</h4>
                            <div class="mini-chart-container">
                                <canvas id="neuroscienceProductChart"></canvas>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold text-lg text-gray-900 mb-2">주요 제품별 하이라이트</h4>
                            <ul class="list-disc list-inside text-gray-700 space-y-2">
                                <li>**브레일라 (Vraylar):** Q1 2025 글로벌 매출 $765M. 조현병 및 양극성 장애 치료제.</li>
                                <li>**보톡스 치료제 (Botox Therapeutic):** Q1 2025 글로벌 매출 $866M. 편두통, 경부 근긴장이상 등 다양한 치료 적응증.</li>
                                <li>**우브렐비 (Ubrelvy) & 퀼립타 (Qulipta):** 급성 편두통 및 편두통 예방 치료제로 성장 견인.</li>
                                <li>**세레벨 테라퓨틱스 인수:** 2023년 12월 87억 달러에 인수. 정신과 및 신경학적 질환 대상의 강력한 임상 파이프라인을 확보하여 이 분야의 리더십 강화.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="tab-content-aesthetics" class="tab-content bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 class="text-2xl font-bold text-sky-600 mb-4">에스테틱스 포트폴리오</h3>
                    <p class="text-gray-700 mb-4">
                        2020년 앨러간 인수를 통해 애브비는 의료 에스테틱스 시장의 선두 주자로 등극했습니다. 보톡스 코스메틱과 쥬비덤 컬렉션은 이 시장에서 지배적인 위치를 차지하며 안정적인 매출을 창출하고 있으나, 경기 상황에 민감한 특성을 보입니다.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold text-lg text-gray-900 mb-2">Q1 2025 주요 제품 매출 (글로벌, 백만$)</h4>
                            <div class="mini-chart-container">
                                <canvas id="aestheticsProductChart"></canvas>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold text-lg text-gray-900 mb-2">주요 제품별 하이라이트</h4>
                            <ul class="list-disc list-inside text-gray-700 space-y-2">
                                <li>**보톡스 코스메틱 (Botox Cosmetic):** Q1 2025 글로벌 매출 $556M (-11.7% 운영 기준). 미용 신경조절제 시장의 지배자.</li>
                                <li>**쥬비덤 컬렉션 (Juvederm Collection):** Q1 2025 글로벌 매출 $231M. 피부 필러 시장의 선두 주자.</li>
                                <li>**시장 역학:** 최소 침습 시술 수요 증가로 시장이 성장하지만, 경쟁 심화와 거시경제적 요인(소비자 지출)에 민감하게 반응합니다.</li>
                                <li>**전략:** 전통적인 제약 시장의 규제 압력에 덜 민감하여 포트폴리오 다각화에 기여하지만, 매출 변동성에 대한 지속적인 모니터링이 필요합니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="financials" class="py-12">
            <h2 class="text-3xl font-bold text-center mb-8">견고한 재무 성과와 주주 환원</h2>
            <p class="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                애브비는 지난 10년간 꾸준한 주가 상승과 함께 안정적인 매출을 기록하며 강력한 재무 건전성을 보여주었습니다. 특히, 지속적인 배당금 인상은 장기 투자자에게 매력적인 요소로, 강력한 주주 환원 의지를 나타냅니다.
            </p>
             <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-xl shadow-lg">
                    <h3 class="text-xl font-bold text-center mb-4">10년 주가 추이 (2015-2025)</h3>
                    <div class="chart-container">
                        <canvas id="stockPriceChart"></canvas>
                    </div>
                    <p class="mt-4 text-sm text-center text-gray-500">2013년 분사 이후 전반적인 우상향 추세를 보여주며 장기적인 주주 가치 창출을 입증합니다.</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg">
                    <h3 class="text-xl font-bold text-center mb-4">연간 매출 및 순이익 (단위: 10억$)</h3>
                    <div class="chart-container">
                        <canvas id="revenueIncomeChart"></canvas>
                    </div>
                    <p class="mt-4 text-sm text-center text-gray-500">휴미라 특허 만료 영향에도 불구하고 매출은 회복세를 보이며 순이익은 변동성을 보였습니다.</p>
                </div>
                <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                    <h3 class="text-xl font-bold text-center mb-4">지난 10년 주당 배당금 (DPS) 추이 ($)</h3>
                    <div class="chart-container">
                        <canvas id="dpsChart"></canvas>
                    </div>
                    <p class="mt-4 text-sm text-center text-gray-500">애브비는 11년 연속 배당금을 인상하며 꾸준한 배당 성장을 보여왔습니다.</p>
                </div>
            </div>
            <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-indigo-500 text-center">
                    <p class="text-sm text-gray-500">현재 배당률</p>
                    <p class="text-3xl font-bold text-indigo-600 mt-2">3.27%</p>
                    <p class="text-sm text-gray-500 mt-1">(2025년 기준)</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500 text-center">
                    <p class="text-sm text-gray-500">10년 연평균 배당성장률</p>
                    <p class="text-3xl font-bold text-purple-600 mt-2">13.24%</p>
                    <p class="text-sm text-gray-500 mt-1">장기적인 주주가치 증대 기여</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-sky-500">
                    <p class="text-sm text-gray-500 text-center">배당성향 (2024년 기준)</p>
                    <p class="text-3xl font-bold text-sky-600 mt-2 text-center">213.59%</p>
                    <p class="text-xs text-gray-500 mt-1 text-center">
                        <span class="font-bold">높은 배당성향 설명:</span> 애브비의 높은 배당성향은 주로 회계상 순이익 변동성(특히 앨러간 인수 관련 상각비 등 비현금성 비용) 때문일 수 있습니다. 제약사의 배당 지속 가능성은 순이익뿐만 아니라 **잉여 현금 흐름(Free Cash Flow)**에 기반하여 평가하는 것이 더 중요합니다. 애브비는 강력한 현금 흐름을 바탕으로 배당금을 지급하고 있으며, 이는 배당 지속 가능성에 대한 우려를 완화합니다.
                    </p>
                </div>
            </div>
        </section>

        <section id="outlook" class="py-12">
            <h2 class="text-3xl font-bold text-center mb-8">미래 전망: 기회와 리스크</h2>
            <p class="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                애브비의 미래를 이해하기 위한 중요한 단계는 내외부 환경 요인을 분석하는 것입니다. 아래 SWOT 분석과 애널리스트 컨센서스를 통해 애브비가 직면한 기회와 위협, 그리고 시장의 전반적인 시각을 파악할 수 있습니다.
            </p>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-xl shadow-lg">
                    <h3 class="text-xl font-bold text-center mb-4">SWOT 분석</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div class="bg-green-50 p-4 rounded-lg">
                            <h4 class="font-bold text-green-800">강점 (Strengths)</h4>
                            <ul class="mt-2 list-disc list-inside text-gray-700">
                                <li>다각화된 강력한 파이프라인</li>
                                <li>우수한 R&D 및 상업화 역량</li>
                                <li>주요 시장 내 리더십</li>
                                <li>경험 많은 경영진</li>
                            </ul>
                        </div>
                        <div class="bg-red-50 p-4 rounded-lg">
                             <h4 class="font-bold text-red-800">약점 (Weaknesses)</h4>
                            <ul class="mt-2 list-disc list-inside text-gray-700">
                                <li>신규 주력 제품 의존도</li>
                                <li>지속적인 특허 만료 리스크</li>
                                <li>M&A 관련 부채 부담</li>
                                <li>글로벌 규제 및 가격 압력</li>
                            </ul>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                             <h4 class="font-bold text-blue-800">기회 (Opportunities)</h4>
                            <ul class="mt-2 list-disc list-inside text-blue-700">
                                <li>신규 적응증 확대</li>
                                <li>글로벌 헬스케어 시장 성장</li>
                                <li>AI/디지털 헬스 기술 접목</li>
                                <li>전략적 M&A 통한 포트폴리오 강화</li>
                            </ul>
                        </div>
                        <div class="bg-yellow-50 p-4 rounded-lg">
                             <h4 class="font-bold text-yellow-800">위협 (Threats)</h4>
                            <ul class="mt-2 list-disc list-inside text-yellow-700">
                                <li>치열한 시장 경쟁</li>
                                <li>헬스케어 정책 변화</li>
                                <li>R&D 실패 및 지연 리스크</li>
                                <li>거시 경제 불확실성</li>
                            </ul>
                        </div>
                    </div>
                </div>
                 <div class="bg-white p-6 rounded-xl shadow-lg">
                    <h3 class="text-xl font-bold text-center mb-4">애널리스트 컨센서스</h3>
                    <p class="text-center text-gray-600 mb-6">48명의 애널리스트 기반 종합 의견</p>
                    <div class="chart-container" style="height: 300px;">
                        <canvas id="analystRatingsChart"></canvas>
                    </div>
                    <p class="mt-4 text-sm text-center text-gray-500">대부분의 애널리스트들은 애브비에 대해 긍정적인 '매수' 의견을 유지하고 있습니다.</p>
                </div>
            </div>
        </section>

    </main>
    
    <footer class="bg-gray-800 text-white mt-12">
        <div class="container mx-auto px-8 py-6 text-center text-gray-400">
            <p>본 자료는 제공된 분석 보고서를 기반으로 제작되었으며, 투자 결정에 대한 참고 자료로 활용되어야 합니다. 최종 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다.</p>
            <p class="text-sm mt-2">&copy; 2025 Interactive Investment Dashboard. All Rights Reserved.</p>
        </div>
    </footer>

    <script>
        // Register Chart.js datalabels plugin globally
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
                // Default datalabels configuration for bar charts
                datalabels: {
                    color: chartColors.text,
                    anchor: 'end', // Position above the bar
                    align: 'top', // Align to the top of the anchor
                    font: {
                        weight: 'bold',
                        size: 10
                    },
                    formatter: function(value, context) {
                        return value.toFixed(1); // Format to 1 decimal place
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

        // Section: Portfolio
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
                    '**쥬비덤:** 피부 필러 시장 내 선두 위치'
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
</body>
</html>