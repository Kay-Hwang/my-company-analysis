import os
import requests
import json
from datetime import datetime
import pytz
import re

FRED_API_KEY = os.getenv('FRED_API_KEY')

# ✨✨✨ 상세 페이지를 위한 FRED ID 목록 ✨✨✨
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

def get_indicators():
    indicator_data = {"latest": {}, "history": {}}
    if not FRED_API_KEY:
        print("FRED_API_KEY is not set.")
        return indicator_data

    all_series = {**FRED_SERIES['indices'], **FRED_SERIES['inflation'], **FRED_SERIES['labor'], **FRED_SERIES['interest_rates']}

    for key, series in all_series.items():
        # 1. 과거 데이터 수집 (2000년부터)
        history_url = f"https://api.stlouisfed.org/fred/series/observations?series_id={series['id']}&api_key={FRED_API_KEY}&file_type=json&observation_start=2000-01-01"
        try:
            h_res = requests.get(history_url).json()
            observations = h_res.get('observations', [])
            # JSON 파일에 날짜와 값만 저장
            indicator_data['history'][series['id']] = [{"date": obs['date'], "value": obs['value']} for obs in observations]
            
            # 2. 최신 데이터는 과거 데이터의 마지막 값으로 사용
            if observations:
                latest = observations[-1]
                indicator_data['latest'][key] = {
                    "name": series['name'], 
                    "value": float(latest['value']), 
                    "date": latest['date'],
                    "series_id": series['id']
                }
            else:
                 indicator_data['latest'][key] = {"name": series['name'], "value": "N/A", "date": "N/A", "series_id": series['id']}
        except Exception as e:
            print(f"Error fetching {key}: {e}")
            indicator_data['latest'][key] = {"name": series['name'], "value": "N/A", "date": "N/A", "series_id": series['id']}
            
    return indicator_data


if __name__ == "__main__":
    kst = pytz.timezone('Asia/Seoul')
    
    final_data = {
        "lastUpdated": datetime.now(kst).strftime('%Y년 %m월 %d일 %H:%M KST'),
        "indicators": get_indicators()
    }
    
    if not os.path.exists('_data'):
        os.makedirs('_data')
        
    with open('_data/latest_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)
        
    print("Data update complete.")