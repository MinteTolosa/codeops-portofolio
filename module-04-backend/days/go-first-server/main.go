package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Dish struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Price    int    `json:"price"`
	Currency string `json:"currency"`
}

func dishesHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	dishes := []Dish{
		{ID: 1, Name: "Doro Wat", Price: 350, Currency: "ETB"},
		{ID: 2, Name: "Shiro Wat", Price: 250, Currency: "ETB"},
		{ID: 3, Name: "Tibs", Price: 400, Currency: "ETB"},
		{ID: 4, Name: "Fir_Fir", Price: 300, Currency: "ETB"},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dishes)
}

func main() {
	http.HandleFunc("/api/V1/dishes", dishesHandler)

	fmt.Println(" the localhost:8080 Server is running .... ")

	http.ListenAndServe(":8080", nil)
}
