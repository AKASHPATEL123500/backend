#include <stdio.h>

int main() {

    // declaring variables
    int number, i, count = 0;

    // Taking input
    printf("Enter a number: ");
    scanf("%d", &number);

    // Checking divisibility
    for (i = 1; i <= number; i++) {
        if (number % i == 0) {
            count++;
        }
    }

    // Prime number has exactly 2 factors
    if (count == 2)
        printf("The number is Prime");
    else
        printf("The number is Not Prime");

    return 0;
}


// prime number:
// A prime number is a natural number greater than 1 that has only two factors: 1 and itself.

// example:

// prime number 7 has two factors:
// 7 / 1 = 7
// 7 / 7 = 1

// 8 is not a prime number as it has more than two factors:
// 8 / 1 = 8
// 8 / 2 = 4
// 8 / 4 = 2
// 8 / 8 = 1


// Explanation:
// This program checks whether a given number is prime or not.


// for (i = 1; i <= number; i++) {
// This loop iterates from 1 to the given number to check for its divisors. 

// if (number % i == 0) {
// This condition checks if 'i' is a divisor of 'number'. If true, it increments the count of divisors.



// DRY RUN:
// For number = 7: Divisors are 1 and 7 -> count = 2 (Prime) increments the count of divisors.
// For number = 10: Divisors are 1, 2, 5, and 10 -> count = 4 (Not Prime)   




// OutPut Example:

// Enter a number: 7
// The number is Prime
// Enter a number: 10
// The number is Not Prime