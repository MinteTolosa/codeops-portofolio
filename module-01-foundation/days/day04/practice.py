########################################################
# ........ Practical Exercise 1 - Book Class ...........
#########################################################
print("Exercise 1 - Book Class")
print("\n" + "-"*40 + "\n")
class Book:
    def __init__(self, title, author, pages=30):
        self.title = title
        self.author = author
        self.pages = pages
    def describe(self):
        print(f"{self.title} by {self.author} has {self.pages} pages")


book1 = Book("Atomic Habit", "James clear", 300)
book2 = Book("Spritual Growth", "Dr.Mamusha Fenta", 250)

book2.describe()
book1.describe()

print("\n" + "="*40 + "\n")


#########################################################
# ........ Practical Exercise 1 - Product Class .........
#########################################################

print("Exercise 2 - Product Class")
print("\n" + "-"*40 + "\n")

class product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
    def restock(self, n):
        self.quantity += n
        return self.quantity
    def sell(self, n):
        self.quantity -= n
    def statment(self):
        print(f"{self.name} price :{self.price} ETB and {self.quantity} in stock")

Computer = product("TOSHIBA", 20000, 30)
Car = product("TOYOTA", 120000, 3)

Computer.restock(8)
Computer.sell(30)
Computer.statment()

Car.sell(2)
Car.statment()

print("\n" + "#"*40 + "\n")

#########################################################
# ........ Practical Exercise 3 - Make it Private .........
#########################################################

print("Exercise 3 - Change Quantity to Private")
print("\n" + "-"*40 + "\n")

class product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity     #Private
    @property
    def quantity(self):
        return self.__quantity
    def restock(self, n):
        self.__quantity += n
        return self.__quantity
    def sell(self, n):
        self.__quantity -= n
    def statment(self):
        print(f"{self.name} price :{self.price} ETB and {self.__quantity} in stock")

Computer = product("TOSHIBA", 20000, 30)
Car = product("TOYOTA", 120000, 3)

Computer.restock(8)
Computer.sell(30)
Computer.statment()

Car.sell(2)
Car.statment()

#########################################################
# ........ Practical Exercise 4 and 5 
# - Validate and Prove Independence            .........
#########################################################

print("Exercise 4 - Product class Validation")
print("\n" + "-"*40 + "\n")

class product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity     #Private
    @property
    def quantity(self):
        return self.__quantity
    def restock(self, n):
        self.__quantity += n
        return self.__quantity
    def sell(self, n):
        self.__quantity -= n
        if self.__quantity < 0:
            raise ValueError("stock must have Postive")
        # self.__quantity -= n
    def statment(self):
        print(f"{self.name} price :{self.price} ETB and we have {self.__quantity} in stock")

Computer = product("TOSHIBA", 20000, 30)
Car = product("TOYOTA", 120000, 3)
Phone = product("iphone", 150000, 1000)

Computer.restock(8)
Computer.sell(30)
Computer.statment()

Car.sell(3)
Car.statment()

Phone.sell(300)
Phone.statment()

