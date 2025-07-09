---
layout: default
title: Company Analysis
---

<div class="bg-slate-50">
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header class="text-center mb-12">
            <h1 class="text-4xl font-extrabold text-slate-800 tracking-tight sm:text-5xl">
                Company Analysis
            </h1>
            <p class="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
                분석할 기업을 선택하세요.
            </p>
        </header>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-bold text-slate-900">AbbVie</h2>
                        <span class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">ABBV</span>
                    </div>
                    <p class="text-slate-600 mb-4 h-12">
                        면역학, 종양학 등 필수 치료 분야에 집중하는 글로벌 바이오 제약 기업.
                    </p>
                    <a href="{{ '/abbvie.html' | relative_url }}" class="inline-block w-full text-center bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                        분석 리포트 보기
                    </a>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-bold text-slate-900">NextEra Energy</h2>
                        <span class="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">NEE</span>
                    </div>
                    <p class="text-slate-600 mb-4 h-12">
                        세계 최대의 풍력 및 태양광 에너지 생산업체이자 미국 최대의 전력 회사.
                    </p>
                    <a href="{{ '/nextera.html' | relative_url }}" class="inline-block w-full text-center bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                        분석 리포트 보기
                    </a>
                </div>
            </div>

        </div>
    </main>
</div>