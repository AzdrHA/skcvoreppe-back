FROM nginx:latest
RUN apt update && apt install -y netcat
COPY nginx.conf /etc/nginx/conf.d/default.conf