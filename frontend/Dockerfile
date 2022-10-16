FROM node:16 as build
RUN npm install -g @angular/cli
WORKDIR /app
ADD ./package.json /app/
RUN ls -l
RUN npm install
ADD ./ /app
RUN ng build

FROM nginx
COPY --from=build /app/dist/Angular12JwtAuth/ /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

