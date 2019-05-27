package main

import (
	"lottery-server/handlers"
	"lottery-server/services"

	"github.com/gorilla/mux"
)

func ConfigureRoutes(lotteryService services.LotteryService, serverHost string) *mux.Router {
	r := mux.NewRouter()

	r.Handle("/api/lotteries/{id}", &handlers.LotteryGetHandler{LotteryService: lotteryService, ServerHost: serverHost}).
		Methods("GET")

	r.Handle("/api/lotteries", &handlers.LotteryCreateHandler{LotteryService: lotteryService, ServerHost: serverHost}).
		Methods("POST")

	return r
}
