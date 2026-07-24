# ############
# 1. Unique cities. Given a list with repeated city names, use a set to print the distinct cities, then
# the count.
# ############
print(" ---Exercise 1: Unique cities ----")

cities = ["Addis Ababa", "Hawassa", "Addis Ababa", "Bahir Dar", "Hawassa", "Gondar"]
distinct_cities = set(cities)

for city in distinct_cities:
    print(city)

print("Count of distinct cities:", len(distinct_cities))


# ############
# 2. Price report. Make a dictionary of five grocery items and prices in ETB. Loop with .items() to
# print each on its own line.
# ############
print(" ---Exercise 2: Price report ----")

grocery_prices = {
    "Teff": 120,
    "Coffee Beans": 450,
    "Injera": 15,
    "Shuro": 85,
    "Bananas": 60
}

for item, price in grocery_prices.items():
    print(f"{item}: {price} ETB")


# ############
# 3. Tax comprehension. Given prices =, use one comprehension to build
# a list with 15% tax added.
# ############
print(" ---Exercise 3: Tax comprehension ----")

prices = [100, 250, 400, 80]
taxed_prices = [price * 1.15 for price in prices]

print(taxed_prices)


# ############
# 4. Cheap items. From the same list, use a comprehension with a condition to keep only prices
# under 200.
# ############
print(" ---Exercise 4: Cheap items ----")

cheap_prices = [price for price in prices if price < 200]

print(cheap_prices)


# ############
# 5. Write & read. Write three customer names to names.txt, then open it and print each name
# back, one per line.
# ############
print(" ---Exercise 5: Write & read ----")

customer_names = ["Abel", "Chaltu", "Yohannes"]

with open("names.txt", "w") as file:
    for name in customer_names:
        file.write(name + "\n")

with open("names.txt", "r") as file:
    for line in file:
        print(line.strip())


# ############
# 6. Safe division. Ask the user for a number and divide 1000 by it, catching both ValueError and
# ZeroDivisionError.
# ############
print(" ---Exercise 6: Safe division ----")

try:
    user_input = input("Enter a number to divide 1000 by: ")
    number = float(user_input)
    result = 1000 / number
    print(f"Result: {result}")
except ValueError:
    print("Error: Invalid input. Please enter a valid number.")
except ZeroDivisionError:
    print("Error: Cannot divide by zero.")
