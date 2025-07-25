import os
import requests
import json
from datetime import datetime
import pytz

FRED_API_KEY = os.getenv('FRED_API_KEY')

# ✨ FRED API ID 목록으로 통일 ✨
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

# 뉴스 수집 함수 (변경 없음)
def get_news():
    # ... 이전 코드와 동일 ...
    return {}

# 지표 수집 함수 (FRED API만 사용하도록 단순화)
def get_indicators():
    indicator_data = {"latest": {}, "history": {}}
    if not FRED_API_KEY:
        return indicator_data

    if not os.path.exists('_data/history'):
        os.makedirs('_data/history')

    all_series = {}
    for group in FRED_SERIES.values():
        all_series.update(group)

    for key, series_info in all_series.items():
        series_id = series_info['id']
        history_url = f"https://api.stlouisfed.org/fred/series/observations?series_id={series_id}&api_key={FRED_API_KEY}&file_type=json&observation_start=2000-01-01"
        try:
            res = requests.get(history_url).json()
            observations = [obs for obs in res.get('observations', []) if obs['value'] != '.']
            
            with open(f'_data/history/{series_id}.json', 'w', encoding='utf-8') as f:
                json.dump(observations, f, ensure_ascii=False)
            
            if observations:
                latest = observations[-1]
                found_group_key = next((group for group, items in FRED_SERIES.items() if key in items), None)
                if found_group_key:
                    if found_group_key not in indicator_data['latest']:
                        indicator_data['latest'][found_group_key] = {}
                    indicator_data['latest'][found_group_key][key] = {
                        "name": series_info['name'], "value": float(latest['value']), "date": latest['date']
                    }
        except Exception as e:
            print(f"Error fetching {key}: {e}")
            
    return indicator_data

if __name__ == "__main__":
    # ... 메인 실행 부분은 이전과 동일 ...
    final_data = {
        "lastUpdated": "...",
        "news": get_news(),
        "indicators": get_indicators()
    }
    with open('_data/latest_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)