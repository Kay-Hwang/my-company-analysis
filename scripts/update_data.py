import os
import requests
import json
from datetime import datetime
import pytz
import feedparser

FRED_API_KEY = os.getenv('FRED_API_KEY')

NEWS_SOURCES = {
    "investing": "https://kr.investing.com/rss/news_25.rss",
    "cnbc": "https://www.cnbc.com/id/100003114/device/rss/rss.html",
    "yahoo": "https://finance.yahoo.com/rss/topstories"
}

FRED_SERIES = {
    "indices": {
        "dji": {"id": 'DJIA', "name": '다우 존스'},
        "spx": {"id": 'SP500', "name": 'S&P 500'},
        "ixic": {"id": 'NASDAQCOM', "name": '나스닥'}
    },
    "inflation": {
      "cpi": {"id": 'CPIAUCSL', "name": '소비자물가지수 (YoY)'},
      "ppi": {"id": 'PPIACO', "name": '생산자물가지수 (YoY)'}
    },
    "labor": {
      "unemployment": {"id": 'UNRATE', "name": '실업률'},
      "joblessClaims": {"id": 'ICSA', "name": '주간 실업수당 청구'}
    },
    "interest_rates": {
      "fedRate": {"id": 'FEDFUNDS', "name": '미국 기준금리'},
      "treasury2Y": {"id": 'DGS2', "name": '2년물 국채금리'},
      "treasury10Y": {"id": 'DGS10', "name": '10년물 국채금리'},
      "treasury20Y": {"id": 'DGS20', "name": '20년물 국채금리'},
      "treasury30Y": {"id": 'DGS30', "name": '30년물 국채금리'}
    }
}

def get_news():
    news_data = {}
    for name, url in NEWS_SOURCES.items():
        feed = feedparser.parse(url)
        news_data[name] = []
        for entry in feed.entries[:10]:
            summary_text = getattr(entry, 'summary', entry.title)
            news_data[name].append({
                "title": entry.title, "link": entry.link,
                "pubDate": entry.get('published', 'N/A'),
                "summary": summary_text.split('<')[0]
            })
    return news_data

def get_indicators():
    indicator_data = {"latest": {}, "history": {}}
    if not FRED_API_KEY:
        print("FRED_API_KEY not found.")
        return indicator_data

    if not os.path.exists('_data/history'):
        os.makedirs('_data/history')

    all_series = {**FRED_SERIES['indices'], **FRED_SERIES['inflation'], **FRED_SERIES['labor'], **FRED_SERIES['interest_rates']}

    for key, series_info in all_series.items():
        series_id = series_info['id']
        history_url = f"https://api.stlouisfed.org/fred/series/observations?series_id={series_id}&api_key={FRED_API_KEY}&file_type=json&observation_start=2000-01-01"
        try:
            res = requests.get(history_url).json()
            observations = [obs for obs in res.get('observations', []) if obs['value'] != '.']
            
            history_content = [{"date": obs['date'], "value": obs['value']} for obs in observations]
            with open(f'_data/history/{series_id}.json', 'w', encoding='utf-8') as f:
                json.dump(history_content, f, ensure_ascii=False)
            
            if observations:
                latest = observations[-1]
                found_group = next((group for group, items in FRED_SERIES.items() if key in items), None)
                if found_group:
                    if group not in indicator_data['latest']:
                        indicator_data['latest'][group] = {}
                    indicator_data['latest'][group][key] = {
                        "name": series_info['name'], 
                        "value": float(latest['value']), 
                        "date": latest['date']
                    }
        except Exception as e:
            print(f"Error fetching {key}: {e}")
            
    return indicator_data

if __name__ == "__main__":
    kst = pytz.timezone('Asia/Seoul')
    
    # 이제 뉴스 데이터와 지표 데이터를 모두 포함합니다.
    final_data = {
        "lastUpdated": datetime.now(kst).strftime('%Y년 %m월 %d일 %H:%M KST'),
        "news": get_news(),
        "indicators": get_indicators()
    }
    
    with open('_data/latest_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)
        
    print("Data update complete.")