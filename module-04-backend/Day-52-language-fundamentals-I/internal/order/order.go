package order

func ServiceFeeSantim(subtotal int) int {
	return int(float64(subtotal) * 0.05)
}

func LineTotal(priceSantim, qty int) int {
	return priceSantim * qty
}

func TotalSantim(subtotal, fee, delivery int) int {
	return subtotal + fee + delivery
}
