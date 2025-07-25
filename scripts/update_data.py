import os
import requests
import json
from datetime import datetime
import pytz
import re

FRED_API_KEY = os.getenv('FRED_API_KEY')

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
    latest_data = {"indices": {}, "groups": {}}
    if not FRED_API_KEY:
        print("FRED_API_KEY not found.")
        return latest_data

    # 상세 페이지용 과거 데이터 저장 폴더 생성
    if not os.path.exists('_data/history'):
        os.makedirs('_data/history')

    all_series = {**FRED_SERIES['indices'], **FRED_SERIES['inflation'], **FRED_SERIES['labor'], **FRED_SERIES['interest_rates']}

    for key, series_info in all_series.items():
        series_id = series_info['id']
        history_url = f"https://api.stlouisfed.org/fred/series/observations?series_id={series_id}&api_key={FRED_API_KEY}&file_type=json&observation_start=2000-01-01"
        try:
            res = requests.get(history_url)
            res.raise_for_status()
            observations = [obs for obs in res.json().get('observations', []) if obs['value'] != '.']
            
            # 1. 과거 데이터는 별도 파일로 저장
            history_content = [{"date": obs['date'], "value": obs['value']} for obs in observations]
            with open(f'_data/history/{series_id}.json', 'w', encoding='utf-8') as f:
                json.dump(history_content, f, ensure_ascii=False)
            
            # 2. 최신 데이터만 추출하여 대시보드용 데이터 구성
            if observations:
                latest = observations[-1]
                found_group = None
                for group, items in FRED_SERIES.items():
                    if key in items:
                        found_group = group
                        break
                if found_group:
                    if group not in latest_data['groups']:
                        latest_data['groups'][group] = {}
                    latest_data['groups'][group][key] = {
                        "name": series_info['name'], 
                        "value": float(latest['value']), 
                        "date": latest['date'],
                        "series_id": series_id
                    }
        except Exception as e:
            print(f"Error fetching {key}: {e}")
            
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