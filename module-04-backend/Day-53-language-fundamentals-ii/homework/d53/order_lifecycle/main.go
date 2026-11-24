
package main

import (
	"errors"
	"fmt"
)

// Status represents the current stage of an order.
type Status int

// iota automatically assigns increasing numbers.
const (
	Pending Status = iota
	Confirmed
	Preparing
	Ready
	Delivered
)

// ErrAlreadyDelivered is returned when an order
// tries to advance beyond Delivered.
var ErrAlreadyDelivered = errors.New("order is already delivered")

// Order represents a customer's order.
type Order struct {
	ID     int
	Status Status
}

// Advance moves the order to the next status.
func (o *Order) Advance() error {
	if o.Status >= Delivered {
		return ErrAlreadyDelivered
	}

	o.Status++
	return nil
}

// String returns a readable status name.
func (s Status) String() string {
	switch s {
	case Pending:
		return "Pending"
	case Confirmed:
		return "Confirmed"
	case Preparing:
		return "Preparing"
	case Ready:
		return "Ready"
	case Delivered:
		return "Delivered"
	default:
		return "Unknown"
	}
}

func runOrderLifecycle() {
	order := Order{
		ID:     101,
		Status: Pending,
	}

	fmt.Println("Order ID:", order.ID)
	fmt.Println("Initial status:", order.Status)

	// Advance through all five stages.
	for i := 0; i < 5; i++ {
		err := order.Advance()

		if err != nil {
			if errors.Is(err, ErrAlreadyDelivered) {
				fmt.Println("Cannot advance:", err)
			}
			break
		}

		fmt.Println("New status:", order.Status)
	}

	// Try to advance after delivery.
	err := order.Advance()

	if errors.Is(err, ErrAlreadyDelivered) {
		fmt.Println("Final check:", err)
	}
}

func main() {
	runOrderLifecycle()
}
