---
layout: default
title: "홈" # 홈페이지의 제목을 "홈"으로 설정
---

<div class="text-center py-16 px-4">
    <h1 class="text-5xl md:text-6xl font-extrabold text-[#004AAD] mb-6 animate-fade-in-down">
        기업 분석 대시보드에 오신 것을 환영합니다!
    </h1>
    <p class="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10 animate-fade-in">
        이곳은 투자자, 분석가, 그리고 기업에 관심 있는 모든 분들을 위한 심층적인 기업 분석 인포그래픽 대시보드입니다.
        다양한 기업의 재무 성과, 산업 동향, 그리고 핵심 지표들을 시각적으로 명확하게 제공하여
        정보에 기반한 의사 결정을 돕습니다.
    </p>
</div>

<style>
    @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-down { animation: fadeInDown 1s ease-out forwards; }
    .animate-fade-in { animation: fadeIn 1.5s ease-out forwards; }
    .animate-fade-in-up { animation: fadeInUp 1.5s ease-out forwards; }
</style>