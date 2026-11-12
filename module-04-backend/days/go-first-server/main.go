
package main

import (
    "encoding/json"
    "net/http"
)

type Dish struct {
    ID       int    `json:"id"`
    Name     string `json:"name"`
    Price    int    `json:"price"`
    Currency string `json:"currency"`
}

func dishesHandler(w http.ResponseWriter, r *http.Request) {

    dishes := []Dish{
        {ID: 1, Name: "Doro Wat", Price: 350, Currency: "ETB"},
        {ID: 2, Name: "Shiro", Price: 120, Currency: "ETB"},
        {ID: 3, Name: "Kitfo", Price: 320, Currency: "ETB"},
    }

    w.Header().Set("Content-Type", "application/json")

    json.NewEncoder(w).Encode(dishes)
}

func main() {
    http.HandleFunc("/api/v1/dishes", dishesHandler)

    http.ListenAndServe(":8080", nil)
}

package main

import (
    "encoding/json"
    "net/http"
)

type Dish struct {
    ID       int    `json:"id"`
    Name     string `json:"name"`
    Price    int    `json:"price"`
    Currency string `json:"currency"`
}

func dishesHandler(w http.ResponseWriter, r *http.Request) {

    dishes := []Dish{
        {ID: 1, Name: "Doro Wat", Price: 350, Currency: "ETB"},
        {ID: 2, Name: "Shiro", Price: 120, Currency: "ETB"},
        {ID: 3, Name: "Kitfo", Price: 320, Currency: "ETB"},
    }

    w.Header().Set("Content-Type", "application/json")

    json.NewEncoder(w).Encode(dishes)
}

func main() {
    http.HandleFunc("/api/v1/dishes", dishesHandler)

    http.ListenAndServe(":8080", nil)
}
