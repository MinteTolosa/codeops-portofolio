###################################################################################################
#Recursive sum. Write a recursive total(nums) that sums a list, and a recursive count_down(n)     #
# that prints n down to 1.                                                                        #
###################################################################################################
print("---------- Exercise 1: Recursive Sum ----------")

def total(nums):
   
    if not nums:
        return 0
   
    return nums[0] + total(nums[1:])

def count_down(n):
    if n < 1:
        return
    print(n)
    count_down(n - 1)


print("\n" + "#"*50 + "\n")

###################################################################################################
# Binary search. Implement binary_search(items, target) on a sorted list and return the index,    #
# or -1. Test it on a sorted list of balances.                                                    #                   #
###################################################################################################

print("-------Exercise 2: Binary Search  -------")

def binary_search(items, target):
    low = 0
    high = len(items) - 1
    
    while low <= high:
        mid = (low + high) // 2
        guess = items[mid]
        
        if guess == target:
            return mid  
        if guess > target:
            high = mid - 1  
        else:
            low = mid + 1   
            
    return -1  

# Testing on a sorted list of balances
balances = [10.50, 45.00, 120.75, 300.00, 1500.25]
print(binary_search(balances, 120.75))  
print(binary_search(balances, 99.99))   


print("\n" + "#"*50 + "\n")

###################################################################################################
# Merge sort. Implement merge_sort(items) and its merge helper. Confirm it matches sorted()       #
# on random lists.                                                                                #
###################################################################################################

print("----- Exercise 3: Merge Sort -----")

import random

def merge_sort(items):
    
    if len(items) <= 1:
        return items
        
    mid = len(items) // 2
    left_half = merge_sort(items[:mid])
    right_half = merge_sort(items[mid:])
    
    return merge(left_half, right_half)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result
random_list = [random.randint(1, 100) for _ in range(20)]
print("Matches sorted():", merge_sort(random_list) == sorted(random_list))  


print("\n" + "#"*50 + "\n")

###################################################################################################
# Sort with a key. Given a list of (name, balance) tuples, sort it by balance descending using    #
# sorted(key=...).                                                                                #
###################################################################################################

print("----- Exercise 4: Sorting with a key -----")

accounts = [("Alice", 450.00), ("Bob", 1200.50), ("Charlie", 75.25), ("Diana", 300.00)]

sorted_accounts = sorted(accounts, key=lambda account: account[1], reverse=True)

print(sorted_accounts)


print("\n" + "#"*50 + "\n")
#################################################################################################
# Two pointers. Write has_pair(nums, target) for a sorted list, returning whether two values    #
# sum to the target.                                                                            #    
#################################################################################################
print("----- Exercise 5: Two Pointer Technique -----")

def has_pair(nums, target):
    left = 0
    right = len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        
        if current_sum == target:
            return True  
        elif current_sum < target:
            left += 1    
        else:
            right -= 1   
            
    return False

sorted_nums = [1, 2, 4, 6, 10, 15]
print(has_pair(sorted_nums, 14))  
print(has_pair(sorted_nums, 5))   

