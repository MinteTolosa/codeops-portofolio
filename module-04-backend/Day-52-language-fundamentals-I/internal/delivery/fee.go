package main

import "fmt"

func deliveryFeeSantim(area string) (int, error) {
	switch area {
	case "Bole":
		return 3000, nil
	case "Kazanchis":
		return 3500, nil
	}
	return 0, fmt.Errorf("unserved area %q", area)
}
func main() {
	fee, err := deliveryFeeSantim("Ayat")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(fee)
}
