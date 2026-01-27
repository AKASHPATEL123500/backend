
#include <stdio.h>
int main() {

    // declaring variable
    int number;

    // taking input from the user
    printf("Enter an integer: ");
    scanf("%d", &number);

    // checking even or odd
    if (number % 2 == 0) {
        printf("%d is Even\n", number);
    } else {
        printf("%d is Odd\n", number);
    }

    return 0;
}

// OutPut Example:

// Enter an integer: 4  
// 4 is Even

// Enter an integer: 7
// 7 is Odd


// Explanation:
// This program checks whether a given integer is even or odd.

// if (number % 2 == 0) {
// The condition checks if the remainder when 'number' is divided by 2 is zero.
// If true, the number is even; otherwise, it is odd.


// DRY RUN:
// For number = 4: 4 % 2 = 0 (Even)
// For number = 7: 7 % 2 = 1 (Odd)