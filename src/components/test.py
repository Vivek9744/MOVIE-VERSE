def max_crossing_subarray(arr, low, mid, high):
    left_sum = float('-inf')
    max_left = max_right = 0
    sum_left = 0

    for i in range(mid, low - 1, -1):
        sum_left += arr[i]
        if sum_left > left_sum:
            left_sum = sum_left
            max_left = i

    right_sum = float('-inf')
    sum_right = 0

    for j in range(mid + 1, high + 1):
        sum_right += arr[j]
        if sum_right > right_sum:
            right_sum = sum_right
            max_right = j

    return max_left, max_right, left_sum + right_sum

def find_max_subarray(arr, low, high):
    if low == high:
        return low, high, arr[low]

    mid = (low + high) // 2

    left_low, left_high, left_sum = find_max_subarray(arr, low, mid)
    right_low, right_high, right_sum = find_max_subarray(arr, mid + 1, high)
    cross_low, cross_high, cross_sum = max_crossing_subarray(arr, low, mid, high)

    if left_sum >= right_sum and left_sum >= cross_sum:
        return left_low, left_high, left_sum
    elif right_sum >= left_sum and right_sum >= cross_sum:
        return right_low, right_high, right_sum
    else:
        return cross_low, cross_high, cross_sum

def max_subarray(arr):
    low, high, max_sum = find_max_subarray(arr, 0, len(arr) - 1)
    return arr[low:high + 1]

# Example usage:
arr = [13,-3,-25,20,-3,-16,-23,18,20,-7,12,-5]
max_subarr = max_subarray(arr)
print("Maximum subarray:", max_subarr)
