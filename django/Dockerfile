FROM python:3

EXPOSE 8000

RUN mkdir -p /code
COPY . /code/
WORKDIR /code

RUN pip install -r requirements.txt
#ENTRYPOINT ["/code/start.sh"]





