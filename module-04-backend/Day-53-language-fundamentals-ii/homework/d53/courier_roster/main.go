
package main

import (
	"fmt"
	"sort"
)

// Person stores basic personal information.
type Person struct {
	Name  string
	Phone string
}

// Courier embeds Person.
type Courier struct {
	Person
	Area      string
	Available bool
}

// Availability reports whether a courier is available.
func (c Courier) Availability() string {
	if c.Available {
		return "Available"
	}

	return "Unavailable"
}

// PrintRoster groups couriers by area and prints areas in sorted order.
func PrintRoster(couriers []Courier) {
	grouped := make(map[string][]Courier)

	// Group couriers by their delivery area.
	for _, courier := range couriers {
		grouped[courier.Area] = append(grouped[courier.Area], courier)
	}

	// Get all area names.
	areas := make([]string, 0, len(grouped))

	for area := range grouped {
		areas = append(areas, area)
	}

	// Sort area names alphabetically.
	sort.Strings(areas)

	// Print couriers in each area.
	for _, area := range areas {
		fmt.Println("\nArea:", area)

		for _, courier := range grouped[area] {
			fmt.Printf(
				"  Name: %-15s Phone: %-12s Status: %s\n",
				courier.Name,
				courier.Phone,
				courier.Availability(),
			)
		}
	}
}

func main() {
	couriers := []Courier{
		{
			Person:    Person{Name: "Dawit", Phone: "0911223344"},
			Area:      "Bole",
			Available: true,
		},
		{
			Person:    Person{Name: "Abebe", Phone: "0911334455"},
			Area:      "Bole",
			Available: false,
		},
		{
			Person:    Person{Name: "Mekdes", Phone: "0911445566"},
			Area:      "Kazanchis",
			Available: true,
		},
		{
			Person:    Person{Name: "Hana", Phone: "0911556677"},
			Area:      "Piassa",
			Available: true,
		},
		{
			Person:    Person{Name: "Samuel", Phone: "0911667788"},
			Area:      "Megenagna",
			Available: false,
		},
		{
			Person:    Person{Name: "Meron", Phone: "0911778899"},
			Area:      "Piassa",
			Available: true,
		},
	}

	PrintRoster(couriers)
}
