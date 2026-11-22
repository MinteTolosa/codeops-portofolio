package delivery

import (
	"errors"
	"fmt"
)

var ErrUnservedArea = errors.New("unserved delivery area")

var fees = map[string]int{
	"Bole":      3000,
	"Kazanchis": 3500,
	"Piassa":    4000,
	"Megenagna": 4500,
}

func FeeSantim(area string) (int, error) {
	fee, ok := fees[area]

	if !ok {
		return 0, fmt.Errorf("%q: %w", area, ErrUnservedArea)
	}

	return fee, nil
}
