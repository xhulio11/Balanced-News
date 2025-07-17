# Balanced News

A full-stack web application that aggregates articles from multiple outlets, analyses their bias with large-language models, and presents each story in a neutral, side-by-side view.

---

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


