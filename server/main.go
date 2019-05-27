package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"lottery-server/services"

	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

func main() {
	DB_USER := os.Getenv("LOTTERY_DB_USER")
	DB_PASSWORD := os.Getenv("LOTTERY_DB_PASSWORD")
	DB_NAME := os.Getenv("LOTTERY_DB_NAME")
	DB_HOST := os.Getenv("LOTTERY_DB_HOST")

	SERVER_PORT := os.Getenv("LOTTERY_SERVER_PORT")
	SERVER_HOST := os.Getenv("LOTTERY_SERVER_HOST")

	dbinfo := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable",
		DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
	db, _ := sql.Open("postgres", dbinfo)

	lotteryServiceEnv := &services.LotteryServiceEnv{Db: db}

	r := ConfigureRoutes(lotteryServiceEnv, SERVER_HOST)

	handler := cors.Default().Handler(r)

	http.ListenAndServe(":"+SERVER_PORT, handler)
}
