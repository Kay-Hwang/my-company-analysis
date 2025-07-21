import os
import feedparser
import requests
import json
from datetime import datetime
import pytz

# FRED API 키를 환경 변수에서 가져옵니다.
FRED_API_KEY = os.getenv('FRED_API_KEY')

# 뉴스 소스 URL
NEWS_SOURCES = {
    "investing": "https://kr.investing.com/rss/news_25.rss",
    "wsj": "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",
    "yahoo": "https://finance.yahoo.com/rss/topstories"
}

# FRED 지표 ID
FRED_SERIES = {
    "inflation": {
        "cpi": {"id": 'CPIAUCSL', "name": '소비자물가지수 (YoY)'},
        "ppi": {"id": 'PPIACO', "name": '생산자물가지수 (YoY)'}
    },
    "labor": {
        "unemployment": {"id": 'UNRATE', "name": '실업률'},
        "joblessClaims": {"id": 'ICSA', "name": '주간 실업수당 청구'}
    },
    "growth_consumption": {
        "gdp": {"id": 'GDP', "name": '실질 GDP (QoQ)'},
        "retailSales": {"id": 'RSAFS', "name": '소매판매 (MoM)'}
    },
    "interest_rates": {
        "fedRate": {"id": 'FEDFUNDS', "name": '미국 기준금리'},
        "treasury10Y": {"id": 'DGS10', "name": '10년물 국채금리'}
    }
}

def get_news():
    news_data = {}
    for name, url in NEWS_SOURCES.items():
        feed = feedparser.parse(url)
        news_data[name] = []
        for entry in feed.entries[:10]:
            news_data[name].append({
                "title": entry.title,
                "link": entry.link,
                "pubDate": entry.published,
                "summary": entry.summary.split('<')[0]
            })
    return news_data

def get_indicators():
    indicator_data = {}
    for group, items in FRED_SERIES.items():
        indicator_data[group] = {}
        for key, series in items.items():
            url = f"https://api.stlouisfed.org/fred/series/observations?series_id={series['id']}&api_key={FRED_API_KEY}&file_type=json&sort_order=desc&limit=1"
            try:
                response = requests.get(url)
                response.raise_for_status()
                data = response.json()
                latest = data['observations'][0]
                indicator_data[group][key] = {
                    "name": series['name'],
                    "value": float(latest['value']),
                    "date": latest['date']
                }
            except Exception as e:
                print(f"Error fetching {key}: {e}")
                indicator_data[group][key] = {"name": series['name'], "value": "N/A", "date": "N/A"}
    return indicator_data

if __name__ == "__main__":
    kst = pytz.timezone('Asia/Seoul')
    
    final_data = {
        "lastUpdated": datetime.now(kst).strftime('%Y년 %m월 %d일 %H:%M KST'),
        "news": get_news(),
        "indicators": get_indicators()
    }
    
    # Jekyll이 읽을 수 있도록 _data 폴더에 저장
    if not os.path.exists('_data'):
        os.makedirs('_data')
        
    with open('_data/latest_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)
        
    print("Data update complete.")