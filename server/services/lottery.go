package services

import (
	"database/sql"
	"lottery-server/models"
	"math/rand"
	"time"
)

type LotteryService interface {
	GetLottery(id int) (*models.Lottery, error)
	CreateLottery(lottery *models.Lottery) (*models.Lottery, error)
}

type LotteryServiceEnv struct {
	Db *sql.DB
}

func (lse *LotteryServiceEnv) GetLottery(id int) (*models.Lottery, error) {
	query := `
		SELECT id, name, description, roll_from, roll_to, roll, date_created, date_roll
		FROM lottery.lottery
		WHERE id = $1`
	row := lse.Db.QueryRow(query, id)

	var lottery models.Lottery

	switch err := row.Scan(&lottery.Id, &lottery.Name, &lottery.Description,
		&lottery.RollFrom, &lottery.RollTo, &lottery.Roll, &lottery.DateCreated,
		&lottery.DateRoll); err {
	case sql.ErrNoRows:
		return nil, err
	case nil:
		if time.Now().Before(lottery.DateRoll) {
			lottery.Roll = nil
		}
		return &lottery, nil
	default:
		return nil, err
	}
}

func random(min, max int) int {
	rand.Seed(time.Now().Unix())
	return rand.Intn(max-min) + min
}

func (lse *LotteryServiceEnv) CreateLottery(lottery *models.Lottery) (*models.Lottery, error) {
	var randomValue = random(lottery.RollFrom, lottery.RollTo)
	lottery.Roll = &randomValue

	lottery.DateCreated = time.Now()

	var lastInsertId int
	query := `INSERT INTO
		lottery.lottery(name, description, roll_from, roll_to, roll, date_created, date_roll)
		VALUES($1, $2, $3, $4, $5, $6, $7) returning id`

	err := lse.Db.QueryRow(query, lottery.Name, lottery.Description,
		lottery.RollFrom, lottery.RollTo, *lottery.Roll, lottery.DateCreated,
		lottery.DateRoll).Scan(&lastInsertId)

	if err != nil {
		return nil, err
	}

	lottery.Id = lastInsertId

	return lottery, nil
}
