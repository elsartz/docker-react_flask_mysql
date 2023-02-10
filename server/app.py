from os import getenv
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from db import init_db, get_db
from Note import Note
import json
import jsonpickle
from json import JSONEncoder

load_dotenv()

# app = Flask(__name__)

# @app.route('/api', methods=['GET'])
# def index():
#     return {
#         "id": 1,
#         "title": "Hello World",
#         "content": "This is a sample post"
#     }

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0')


def create_app(test_config=None):
  # set up app config
  app = Flask(__name__)
  CORS(app)
  app.config['SQLALCHEMY_DATABASE_URI'] = getenv('DB_HOST')
  db = SQLAlchemy(app)
  app.url_map.strict_slashes = False
  app.config.from_mapping(
    SECRET_KEY='super_secret_key'
  )
 

  init_db(app)

  @app.route('/api')
  def index():
    return app.send_static_file('index.html')

  @app.route('/api/notes', methods=['GET'])
  def get_notes():
    dbase = get_db()
    notes = dbase.query(Note).all()
   
    sampleJson = jsonpickle.encode(notes)
    json_data = json.loads(sampleJson)

    return jsonify(json_data)

  @app.route('/api/notes', methods=['POST'])
  def add_note():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    note = Note(title, content)
    db.session.add(note)
    db.session.commit()
    return jsonify({'message': 'note added successfully'})

  @app.route('/api/notes/<id>', methods=['PUT'])
  def update_note(id):
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    note = Note.query.get(id)
    note.title = title
    note.content = content
    db.session.commit()
    return jsonify({'message': 'note updated successfully'})

  @app.route('/api/notes/<id>', methods=['DELETE'])
  def delete_note(id):
    dbase = get_db()
    # note = Note.query.get(id)
    note = dbase.query(Note).filter(Note.id == id).one()
    print(note)
    dbase.delete(note)
    # dbase.session.delete(note)
    dbase.commit()
    # db.session.commit()
    return jsonify({'message': 'note deleted successfully'})

  return app

