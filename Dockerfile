FROM python:3.13-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./src /src
COPY ./scripts /scripts

WORKDIR /src

EXPOSE 8000

RUN python -m venv /venv && \
    /venv/bin/pip install --upgrade pip && \
    /venv/bin/pip install -r requirements.txt && \
    adduser --disabled-password --no-create-home duser && \
    # add permissions to venv
    chown -R duser:duser /venv && \
    # add permissions to scripts
    chmod -R +x /scripts

ENV PATH="/scripts:/venv/bin:$PATH"

USER duser

CMD ["entrypoint.sh"]