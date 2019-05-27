FROM golang AS build-env
ENV GO111MODULE=on
WORKDIR /go/src/go-web-server/server
ADD . /go/src/go-web-server/server
RUN go get ./...
RUN cd /go/src/go-web-server/server && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app

FROM alpine
WORKDIR /app
COPY --from=build-env /go/src/go-web-server/server/app .
EXPOSE 80
ENTRYPOINT ./app
