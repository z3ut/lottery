package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"
	"fmt"

	"lottery-server/services"

	"github.com/gorilla/mux"
)

type LotteryGetHandler struct {
	LotteryService services.LotteryService
	ServerHost string
}

func (h *LotteryGetHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id_param := vars["id"]

	id, err := strconv.Atoi(id_param)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	lottery, err := h.LotteryService.GetLottery(id)

	if lottery == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	if lottery.DateRoll.Before(time.Now()) {
		w.Header().Add("Cache-Control", "public, max-age=31536000")
	} else {
		w.Header().Add("Expires", lottery.DateRoll.Format(time.RFC1123))
	}

	w.Header().Add("Location", fmt.Sprintf("%s/api/lotteries/%d", h.ServerHost , lottery.Id))

	json.NewEncoder(w).Encode(lottery)
}
