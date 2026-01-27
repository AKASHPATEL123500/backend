

#include <stdio.h>
int main() {

    // declaring variables
    float principal, rate, time, interest;

    // taking input from the user
    printf("Enter principal amount, rate of interest and time (in years): ");
    scanf("%f %f %f", &principal, &rate, &time);

    // calculating simple interest
    interest = (principal * rate * time) / 100;

    // displaying result
    printf("Simple Interest: %.2f\n", interest);

    return 0;
}


// simple intrest formula: (P * R * T) / 100


// DRY RUN:
// For principal = 1000, rate = 5, time = 3
// interest = (1000 * 5 * 3) / 100 = 150.00



// OutPut Example:
// Enter principal amount, rate of interest and time (in years): 1000 5 3
// principal amount = 1000, rate of interest = 5, time = 3
// Simple Interest: 150.00

