from abc import ABC, abstractmethod

# ############
# 1. Vehicle hierarchy. Make a Vehicle base class with make, model, and a describe() method.
# Add Car and Truck subclasses.
# 2. Use super(). Give Truck a capacity attribute, setting make and model via super().__init__().
# 3. Override. Override describe() in Truck so it also mentions the capacity.
# 4. Polymorphism. Put several vehicles in a list and loop over them, calling describe() on each.
# 5. Abstract method. Make Vehicle an abstract base class with an abstract wheels() method, and
# have each subclass return its own number.
# ############
print(" ---Exercise 1: Vehicle hierarchy ----")
print(" ---Exercise 2: Use super() ----")
print(" ---Exercise 3: Override ----")
print(" ---Exercise 4: Polymorphism ----")
print(" ---Exercise 5: Abstract method ----")

class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        return f"{self.make} {self.model}"

    @abstractmethod
    def wheels(self):
        pass

class Car(Vehicle):
    def wheels(self):
        return 4

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

    def describe(self):
        base_description = super().describe()
        return f"{base_description} with a payload capacity of {self.capacity} tons"

    def wheels(self):
        return 6

fleet = [
    Car("Toyota", "Camry"),
    Truck("Ford", "F-150", 1.5),
    Car("Tesla", "Model 3"),
    Truck("Volvo", "FH16", 25.0)
]

for vehicle in fleet:
    print(f"Vehicle details: {vehicle.describe()}")
    print(f"Number of wheels: {vehicle.wheels()}")
