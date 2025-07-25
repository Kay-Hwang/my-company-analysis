import os
import feedparser
import json
from datetime import datetime
import pytz

# 뉴스 소스 URL 목록
NEWS_SOURCES = {
    "investing": "https://kr.investing.com/rss/news_25.rss",
    "cnbc": "https://www.cnbc.com/id/100003114/device/rss/rss.html",
    "yahoo": "https://finance.yahoo.com/rss/topstories"
}

# 뉴스 데이터를 가져오는 함수
def get_news():
    news_data = {}
    for name, url in NEWS_SOURCES.items():
        feed = feedparser.parse(url)
        news_data[name] = []
        for entry in feed.entries[:10]:
            # 'summary'가 없는 경우를 대비하여 안전하게 처리
            summary_text = getattr(entry, 'summary', entry.title)
            news_data[name].append({
                "title": entry.title,
                "link": entry.link,
                "pubDate": entry.get('published', 'N/A'),
                "summary": summary_text.split('<')[0]
            })
    return news_data

# 메인 실행 부분
if __name__ == "__main__":
    kst = pytz.timezone('Asia/Seoul')
    
    # 최종 데이터 구조 생성 (뉴스만 포함)
    final_data = {
        "lastUpdated": datetime.now(kst).strftime('%Y년 %m월 %d일 %H:%M KST'),
        "news": get_news(),
        "indicators": {} # 지표는 일단 비워둠
    }
    
    # _data 폴더가 없으면 생성
    if not os.path.exists('_data'):
        os.makedirs('_data')
        
    # _data/latest_data.json 파일에 저장
    with open('_data/latest_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)
        
    print("News data update complete.")