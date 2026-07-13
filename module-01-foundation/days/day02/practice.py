# =====================================================================
# 1. Temperature label
# =====================================================================
print("Exercise 1: Temperature Label")
celsius_input = input("Enter a temperature in °C: ")
temp = float(celsius_input)

if temp < 15:
    print("cold")
elif 15 <= temp <= 28:
    print("warm")
else:
    print("hot")

print("\n" + "="*40 + "\n") 


# =====================================================================
# 2. Receipt loop
# =====================================================================
print("--- Exercise 2: Receipt Loop ---")

for n in range(1, 11):
    print(f"Receipt #{n}")

print("\n" + "="*40 + "\n")


# =====================================================================
# 3. Even numbers
# =====================================================================
print("Exercise 3: Even Numbers")
for num in range(1, 21):
    if num % 2 == 0:
        print(num)

print("\n" + "="*40 + "\n")


# =====================================================================
# 4. Discount function
# =====================================================================
print("Exercise 4: Discount Function")
def apply_discount(price, percent=10):
    discount_amount = price * (percent / 100)
    final_price = price - discount_amount
    return final_price

# Test 1
result_default = apply_discount(200)
print(f"Testing default (10% off $200): ${result_default}")

# Test 2
result_custom = apply_discount(200, percent=25)
print(f"Testing custom (25% off $200): ${result_custom}")

print("\n" + "="*40 + "\n")


# =====================================================================
# 5. Countdown
# =====================================================================
print("Exercise 5: Countdown")
count = 5
while count >= 1:
    print(count)
    count -= 1  
print("Liftoff!")
