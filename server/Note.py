from db import Base
from sqlalchemy import Column, Integer, String, Text

class Note(Base):
  __tablename__ = 'notes'
  id = Column(Integer, primary_key=True)
  title = Column(String(80))
  content = Column(Text)   # I run the cdm mysql> "alter table notes modify content TEXT;" to change the content column to TEXT 

  def __init__(self, title, content):
    self.title = title
    self.content = content