from flask import Flask
from routes.articles import articles_bp
from database import close_db

app = Flask(__name__)
app.register_blueprint(articles_bp, url_prefix="/api")

@app.route("/")
def home():
    print("Hello World!")

@app.teardown_appcontext
def teardown_db(exception):
    close_db(exception)

if __name__ == "__main__":
    app.run(debug=True)
    