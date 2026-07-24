# ############
# A program inventory.py for a small Addis Ababa pharmacy that loads stock from a file into a
# dictionary, lets you update quantities, reports low-stock items, and saves the updated stock back to
# the file.
# Requirements
# • Read stock.txt (one item,quantity per line) into a dictionary, inside a try / except for a
# missing file.
# • Add a function that increases or decreases an item's quantity by a given amount.
# • Use a comprehension or loop to print every item where the quantity is below 10 (low stock).
# • Write the updated dictionary back to stock.txt so the changes persist.
# ############
print(" ---Exercise 1: Pharmacy Inventory System ----")

stock = {}
try:
    with open("stock.txt", "r") as f:
        for line in f:
            if line.strip():
                item, qty = line.strip().split(",")
                stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file yet — starting empty")

def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount

def print_low_stock():
    low = [item for item, qty in stock.items() if qty < 10]
    print("Low stock:", low)

def save_stock():
    with open("stock.txt", "w") as f:
        for item, qty in stock.items():
            f.write(f"{item},{qty}\n")

if not stock:
    adjust("Paracetamol", 50)
    adjust("Amoxicillin", 8)
    adjust("Vitamin C", 5)
    adjust("Metformin", 30)

print("Current Stock:", stock)

print_low_stock()

print("\nUpdating stock...")
adjust("Amoxicillin", 5)
adjust("Paracetamol", -45)

print("Updated Stock:", stock)
print_low_stock()

save_stock()
print("\nStock successfully saved to stock.txt")
