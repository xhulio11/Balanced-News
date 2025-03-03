from flask import Blueprint, jsonify, request
from database import get_db

articles_bp = Blueprint("articles", __name__)

@articles_bp.route("/articles", methods=["GET"])
def get_articles():
    db = get_db()  # Get database instance
    batch_size = int(request.args.get("batch_size", 2))
    prev_id = request.args.get("prev_id", None)
    articles = db.get_articles(collection="google", batch_size=batch_size, prev_id=prev_id)
    
    return jsonify(articles)


@articles_bp.route("/articles/<articleId>", methods=["GET"])
def get_article(articleId): 
    print(articleId)
    db = get_db() 
    article = db.get_article("google", articleId)

    return jsonify(article)