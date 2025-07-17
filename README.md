# Balanced News

Balanced News is the implementation project for my Master’s thesis, **“Development of a System that Records News Articles and Produces Neutral, Unbiased News.”** The goal is to ingest articles from multiple outlets, quantify ideological bias, and generate a neutral rewrite so readers can compare perspectives side‑by‑side.

---

## 🎓 Thesis context

This research combines open‑weight large‑language models—**Meta Llama 3 8B** and **Mistral 7B‑v0.3**—with Hugging Face pipelines to:

1. **Collect** news via RSS and the News API.  
2. **Embed & analyse** bias with zero‑shot classification and stylistic‑feature probes.  
3. **Rewrite** headlines and bodies toward an evidence‑based neutral style.  
4. **Evaluate** improvements on public benchmarks such as *MediaBias* and *AllSides* (experiments documented in `thesis/`).  
Other repos: [LLMs](https://github.com/xhulio11/LLMs-), [Web-Scraper](https://github.com/xhulio11/GoNews)


## 📂 Run
1️⃣ Start the Flask API
cd backend
pip install -r requirements.txt                 # install backend deps
export FLASK_APP=app                            # or put this in .flaskenv
flask --app app run --debug                     # http://localhost:5000

2️⃣ Start the React client
cd ../react
npm install                                     # first time only
npm start                                       # http://localhost:3000


