
#include <stdio.h>
int main(){
    // declaring variables
    int i, j;

    // Outer loop controls rows
    for(i = 1; i <= 5; i++){

        // Inner loop controls columns
        for(j = 1; j <= i; j++){
            printf(" *");
        }

        // for new line
        printf("\n");
    }
    return 0 ;
}

// explanation:

// This program prints a right-angled triangle pattern of asterisks.

// for(i = 1; i <= 5; i++){
// The outer loop runs 5 times, each iteration representing a row in the triangle.


// for(j = 1; j <= i; j++){
// The inner loop runs 'i' times, printing asterisks in each row.

// j <= i means:
// Row 1: 1 asterisk
// Row 2: 2 asterisks   
// Row 3: 3 asterisks
// Row 4: 4 asterisks
// Row 5: 5 asterisks


// DRY RUN:
// When i = 1: j runs from 1 to 1 -> prints 1 asterisk  *
// When i = 2: j runs from 1 to 2 -> prints 2 asterisks **
// When i = 3: j runs from 1 to 3 -> prints 3 asterisks ***
// When i = 4: j runs from 1 to 4 -> prints 4 asterisks ****
// When i = 5: j runs from 1 to 5 -> prints 5 asterisks *****



// output example: 
//  *
//  * *
//  * * *
//  * * * *
//  * * * * *