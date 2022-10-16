FROM python:3.7
COPY ./ ./
RUN echo "\n # CONTAINER WORKDIR # \n" && echo "$ pwd " && pwd && echo "\n $ ls -al" && ls && echo "\n"
RUN pip install --upgrade pip && pip install -r requirements.txt && rm -rf /root/.cache

# HEROKU
EXPOSE $PORT
CMD uvicorn main:app --host 0.0.0.0 --port $PORT