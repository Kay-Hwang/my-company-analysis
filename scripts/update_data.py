import os
import feedparser
import json
from datetime import datetime
import pytz

NEWS_SOURCES = {
    "investing": "https://kr.investing.com/rss/news_25.rss",
    "cnbc": "https://www.cnbc.com/id/100003114/device/rss/rss.html",
    "yahoo": "https://finance.yahoo.com/rss/topstories"
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

if __name__ == "__main__":
    kst = pytz.timezone('Asia/Seoul')
    
    final_data = {
        "lastUpdated": datetime.now(kst).strftime('%Y년 %m월 %d일 %H:%M KST'),
        "news": get_news()
    }
    
    if not os.path.exists('_data'):
        os.makedirs('_data')
        
    with open('_data/latest_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)
        
    print("News data update complete.")