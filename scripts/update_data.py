import os
import requests
import json
from datetime import datetime
import pytz
import re

FRED_API_KEY = os.getenv('FRED_API_KEY')
FRED_SERIES = {
    "indices": { "dji": "DJIA", "spx": "SP500", "ixic": "NASDAQCOM" },
    "inflation": { "cpi": "CPIAUCSL", "ppi": "PPIACO" },
    "labor": { "unemployment": "UNRATE", "joblessClaims": "ICSA" },
    "interest_rates": { "fedRate": "FEDFUNDS", "treasury2Y": "DGS2", "treasury10Y": "DGS10", "treasury20Y": "DGS20", "treasury30Y": "DGS30" }
}

def get_indicators():
    latest_data = {"indices": {}, "groups": {}}
    if not FRED_API_KEY: return latest_data

    # 상세 페이지용 과거 데이터 저장 폴더 생성
    if not os.path.exists('_data/history'):
        os.makedirs('_data/history')

    all_series = {**FRED_SERIES['indices'], **FRED_SERIES['inflation'], **FRED_SERIES['labor'], **FRED_SERIES['interest_rates']}

    for key, series_id in all_series.items():
        history_url = f"https://api.stlouisfed.org/fred/series/observations?series_id={series_id}&api_key={FRED_API_KEY}&file_type=json&observation_start=2000-01-01"
        try:
            res = requests.get(history_url).json()
            observations = res.get('observations', [])
            
            # 1. 과거 데이터는 별도 파일로 저장
            history_content = [{"date": obs['date'], "value": obs['value']} for obs in observations]
            with open(f'_data/history/{series_id}.json', 'w', encoding='utf-8') as f:
                json.dump(history_content, f, ensure_ascii=False, indent=2)

            # 2. 최신 데이터만 추출
            if observations:
                latest = observations[-1]
                latest_data[key] = { "value": float(latest['value']), "date": latest['date'] }
        except Exception as e:
            print(f"Error fetching {key}: {e}")
            latest_data[key] = {"value": "N/A", "date": "N/A"}
            
    return latest_data

if __name__ == "__main__":
    kst = pytz.timezone('Asia/Seoul')
    final_data = {
        "lastUpdated": datetime.now(kst).strftime('%Y년 %m월 %d일 %H:%M KST'),
        "indicators": get_indicators()
    }
    
    with open('_data/dashboard_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)
        
    print("Data update complete.")