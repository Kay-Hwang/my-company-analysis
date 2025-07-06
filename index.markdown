---
layout: default
<<<<<<< HEAD
title: "기업 분석 메인 페이지"
---

# AbbVie

# Nextera
=======
title: "기업 분석 대시보드"
---

<h1>여러분의 기업 분석 대시보드에 오신 것을 환영합니다!</h1>

<p>이곳은 다양한 기업에 대한 심층 분석 정보를 제공하는 웹사이트입니다.</p>

<h2>최신 기업 분석</h2>

<ul>
{% for post in site.posts limit: 5 %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}</li>
{% endfor %}
</ul>

<p>
    <a href="/companies.html">모든 기업 분석 보기</a> |
    <a href="/economic-indicators.html">경제 지표 페이지로 이동</a>
</p>
>>>>>>> 9b98610861d024a2ff50e869196c5abee42f7492
