from flask import Flask,render_template,request
from flask_pymongo import PyMongo
import json
app=Flask(__name__)
#mongo=PyMongo(app)

@app.route('/')

def index():
	#online_users=mongo.db.users.find({'online':True})
	return render_template('index.html')

@app.route('/',methods=["POST"])

def getData():
    if request.method=="POST":
        data=request.data
        #print(data)
        #print(type(data))
        data=json.loads(data)
        name=data["name"]
        print name
        email=data['email']
        print email
        score=data['score']
        print score
        return "Success"

if __name__=='__main__':
    app.run(debug=True,host='0.0.0.0')
