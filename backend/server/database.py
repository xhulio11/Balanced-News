from flask import g
from config import MONGO_URI
from src.mongodb import Database  # Import the modified Database class

def get_db():
    """Returns a database connection, reusing if already initialized."""
    if "db" not in g:
        g.db = Database(host="localhost", port=27017, database_name="test")  # Your DB details
    return g.db

def close_db(error=None):
    """Closes the database connection at the end of the request."""
    db = g.pop("db", None)
    if db is not None:
        db.close()
