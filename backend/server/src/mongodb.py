import traceback 
from config import *
from bson import ObjectId
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# Defining Constants 
BATCH_SIZE = 6

class Database(): 
    
    # Initialize Connection 
    def __init__(self, host = "localhost", port=27017, database_name="admin"): 
        self.host = host
        self.port = port
        self.database_name = database_name

        # Connect to Database 
        try:
            # Try to establish Connection 
            self.client = MongoClient(self.host, self.port)
            self.db = self.client[self.database_name]

        except ConnectionFailure:
            print(f"Connection to database with localhost:{self.host} and port:{self.port} failed.")
            print("Traceback error:\n",traceback.format_exc())
        
        except: 
            print(traceback.format_exc())
    

    """These are Mask Functions"""
    
    def sort_articles(self, collection, batch_size=BATCH_SIZE, prev_id=None):
        try:
            pipeline = []

            # If prev_id is provided, get the corresponding article to retrieve its date
            if prev_id is not None:
                try:
                    prev_object_id = prev_id  # Convert string _id to ObjectId
                except Exception as e:
                    print("Invalid prev_id format:", e)
                    return []  # or handle appropriately

                prev_article = collection.find_one({"_id": prev_object_id})
                if not prev_article:
                    print("Article with prev_id not found")
                    return []  # or handle appropriately

                # Assume 'date' is stored in a format that sorts correctly (e.g., ISODate)
                prev_date = prev_article.get("date")
                
                # Create a compound match condition
                pipeline.append({
                    "$match": {
                        "$or": [
                            {"date": {"$lt": prev_date}},
                            {"date": prev_date, "_id": {"$lt": prev_object_id}}
                        ]
                    }
                })

            # Sorting stage: first by date descending, then by _id descending
            pipeline.append({"$sort": {"date": -1, "_id": -1}})
            
            # Limit the number of articles returned
            pipeline.append({"$limit": BATCH_SIZE * batch_size})

            # Apply the aggregation pipeline
            articles = list(collection.aggregate(pipeline))
            return articles

        except Exception as e:
            print("Error in sort_articles:", e)
            return []
    

    """These Are Callable API Functions"""

    def get_articles(self, collection, batch_size=BATCH_SIZE, prev_id=None): 
        
        # Define Collection 
        collection = self.db[collection]

        # Get the articles 
        articles = self.sort_articles(collection=collection, batch_size=batch_size, prev_id=prev_id) 

        return articles 


    def get_article(self, collection, article_id): 
        # Define collection using a clearer variable name
        coll = self.db[collection]

        try:
            # Get the article
            article = coll.find_one({"_id": article_id})
        except Exception as e:
            # Log the exception with traceback details
            print("Error fetching article with ID %s: %s", article_id, traceback.format_exc())
            # Optionally, re-raise or return None if that fits your use case
            return None

        return article

    def close(self):
        """Close MongoDB connection."""
        self.client.close()