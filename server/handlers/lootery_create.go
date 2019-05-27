package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"lottery-server/models"
	"lottery-server/services"
)

type LotteryCreateHandler struct {
	LotteryService services.LotteryService
	ServerHost string
}

func (h *LotteryCreateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	lottery := &models.Lottery{}

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(lottery)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	lottery, err = h.LotteryService.CreateLottery(lottery)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, err.Error())
		return
	}

	w.Header().Add("Location", fmt.Sprintf("%s/api/lotteries/%d", h.ServerHost , lottery.Id))
	w.Header().Add("Access-Control-Expose-Headers", "Location")
	w.WriteHeader(http.StatusCreated)
}
