bill_total = 1200
friends = ["Minte", "Amani", "Eyob", "kal", "Solomon"]
number_of_people = len(friends)

def split_bill(total, people, tip_percentage=0.10):
    tip_amount = total * tip_percentage
    total_with_tip = total + tip_amount
    amount_per_person = total_with_tip / people
    return amount_per_person
share_per_person = split_bill(bill_total, number_of_people)
# print(f"Each person should pay: ${share_per_person:.2f}")
for friend in friends:
    print(f"{friend} should pay: ${share_per_person:.2f}")
