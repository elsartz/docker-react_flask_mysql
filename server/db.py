from os import getenv
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from flask import g

import socket
server = socket.socket() 
server.bind(("localhost", 3306)) 
server.listen(4) 
client_socket, client_address = server.accept()
print(client_address, "has connected")



load_dotenv()

# connect to database using env variable
engine = create_engine('mysql+pymysql://root:vardis1base@localhost:3307/nova_db', pool_pre_ping=True, echo=True, pool_size=20, max_overflow=0)
Session = sessionmaker(bind=engine)
Base = declarative_base()

def init_db(app):
  Base.metadata.create_all(engine)
  app.teardown_appcontext(close_db)
  
def get_db():
  if 'db' not in g:
    # store db connection in app context
    g.db = Session()
  print('-----Session-----')
  return g.db

def close_db(e=None):
  db = g.pop('db', None)

  if db is not None:
    db.close()

while True:
    recvieved_data = client_socket.recv(1024)
    print(recvieved_data)