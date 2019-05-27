package models

import "time"

type Lottery struct {
	Id          int       `json:"id,omitempty"`
	Name        string    `json:"name"`
	Description string    `json:"description,omitempty"`
	RollFrom    int       `json:"rollFrom"`
	RollTo      int       `json:"rollTo"`
	Roll        *int      `json:"roll,omitempty"`
	DateCreated time.Time `json:"dateCreated"`
	DateRoll    time.Time `json:"dateRoll"`
}
