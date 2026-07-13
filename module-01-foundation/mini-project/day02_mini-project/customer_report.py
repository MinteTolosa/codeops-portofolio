customers = [
    ("Almaz", 1500), ("Dawit", 700), ("Tigist", 200), ("Hanna", 1200), ("Samuel", 450),
]

def tier(balance):
    if balance >= 1000:
        return "premium"
    elif balance >= 500:
        return "Standard"
    return "Basic"

premium_count = 0
standard_count = 0
basic_count = 0

for name, balance in customers:
    tier_type = tier(balance)
    if tier_type == "premium":
        premium_count += 1
    elif tier_type == "Standard":
        standard_count +=1
    else:
        basic_count += 1
print(f"Total Coustomer in premium: {premium_count}")
print(f"Total Coustomer in standard: {standard_count}")
print(f"Total Coustomer in basic: {basic_count}")

for name, balance, in customers:
    print(f"{name}: {tier(balance)} ({balance} ETB)")