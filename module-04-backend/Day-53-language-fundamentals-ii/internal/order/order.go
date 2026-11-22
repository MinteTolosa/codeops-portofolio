package order

import (
	"errors"
	"fmt"

	"github.com/MinteTolosa/addis-eats-backend/internal/delivery"
	"github.com/MinteTolosa/addis-eats-backend/internal/menu"
)

var ErrEmptyOrder = errors.New("order has no items")

type Order struct {
	Items []menu.Dish
	Area  string
}

func (o *Order) AddItem(d menu.Dish) {
	o.Items = append(o.Items, d)
}

func (o Order) SubtotalSantim() int {
	total := 0

	for _, dish := range o.Items {
		total += dish.PriceSantim
	}

	return total
}

func (o Order) TotalSantim() (int, error) {
	if len(o.Items) == 0 {
		return 0, ErrEmptyOrder
	}

	subtotal := o.SubtotalSantim()
	serviceFee := subtotal * 5 / 100

	deliveryFee, err := delivery.FeeSantim(o.Area)
	if err != nil {
		return 0, fmt.Errorf("calculating order total: %w", err)
	}

	freeDeliveryThreshold := 100000
	if subtotal >= freeDeliveryThreshold {
		deliveryFee = 0
	}

	return subtotal + serviceFee + deliveryFee, nil
}
