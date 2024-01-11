from flask_sqlalchemy import SQLAlchemy

from flask_cors import CORS

from flask import Flask, request




app = Flask(__name__)

with app.app_context():
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"

    db = SQLAlchemy(app)
    CORS(app)


    class roster(db.Model):
        id = db.Column(db.Integer, primary_key=True)

        Nomen = db.Column(db.String, nullable=False, unique=True)

        Score = db.Column(db.Float, nullable=False, unique=False)



        def __init__(self, Nomen, Score):
            self.Nomen = Nomen

            self.Score = Score


    db.create_all()

def createJson(hall):
    json = {}
    for Pupil in hall:
        json.update({Pupil.Nomen: Pupil.Score})
    return json


@app.route('/')
def leanin():  # put application's code here
    return 'Leanin'

@app.route('/grades' , methods = ['POST'])
def new_pupil():
    ultmatum = request.get_json()
    Score = ultmatum['grade']

    Nomen = ultmatum['name']

    Pupil = roster(Nomen, Score)

    db.session.add(Pupil)

    db.session.commit()

    return {Nomen: Score}



@app.route('/grades/<id>', methods = ['PUT'])
def change_score(id):
    ultmatum = request.get_json()

    novoScore = ultmatum['grade']

    Pupil = roster.query.filter_by(Nomen=id)

    Pupil = Pupil.update(dict(Score=novoScore))

    db.session.commit()

    return createJson(roster.query.all())



@app.route('/grades/<id>', methods = ['DELETE'])
def remove_pupil(id):
    db.session.delete(roster.query.filter_by(Nomen=id).first())

    db.session.commit()

    return createJson(roster.query.all())

@app.route('/grades', methods = ['GET'])
def retrieve_scores():

    return createJson(roster.query.all())


@app.route('/grades/<id>', methods = ['GET'])
def retrieve_pupil(id):

    return createJson(roster.query.filter_by(Nomen = id))






if __name__ == '__main__':
    app.run()
