FROM python:3.10.5

WORKDIR /app

ENV FLASK_APP=app.py

#remove the following line if you want to run in production
ENV FLASK_DEBUG=1

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0:5000"]

