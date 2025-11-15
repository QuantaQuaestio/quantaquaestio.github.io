---
title: "2025-11-14-cs50_ch3arrays_pset"
date: 2025-11-14
tags:
  - cs
---
**Chapter 2 C PSet**

**Exercise 2 Plurality - goal is to fix the function that determines if the vote is valid and keeps count of the number of votes for each candidate and also to make the function that prints the winner(s)**

```C
#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max number of candidates
#define MAX 9

// Candidates have name and vote count
typedef struct
{
    string name;
    int votes;
} candidate;

// Array of candidates of the newly defined candidate structure
candidate candidates[MAX];

// Number of candidates
int candidate_count;

// Function prototypes
bool vote(string name);
void print_winner(void);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: plurality [candidate ...]\n");
        return 1;
    }

    // Populate array of candidates
    candidate_count = argc - 1;
    if (candidate_count > MAX)
    {
        printf("Maximum number of candidates is %i\n", MAX);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i].name = argv[i + 1];
        candidates[i].votes = 0;
    }

    int voter_count = get_int("Number of voters: ");

    // Loop over all voters
    for (int i = 0; i < voter_count; i++)
    {
        string name = get_string("Vote: ");

        // Check for invalid vote
        if (!vote(name))
        {
            printf("Invalid vote.\n");
        }
    }

    // Display winner of election
    print_winner();
}

// Update vote totals given a new vote
bool vote(string name)
{
    // TODO
    for(int i = 0; i < candidate_count; i++)
    {
        if(strcmp(name, candidates[i].name) == 0)
        {
            candidates[i].votes ++;
            return true;
        }
    }
    return false;
}

// Print the winner (or winners) of the election
void print_winner(void)
{
    // TODO
    int max_votes = 0;
    for(int i = 0; i < candidate_count; i++)
    {
        if(candidates[i].votes > max_votes)
        {
            max_votes = candidates[i].votes;
        }

    }
    for(int i = 0; i < candidate_count; i++)
    {
        if(max_votes == candidates[i].votes)
        {
            printf("Winner: %s\n", candidates[i].name);
        }

    }
    return;
}

```


**Exercise 1:Figure out which type of sorting three different programs use based on a set of 50000 numbers either randomized, sorted, or reversed**

```C
Which program uses mergesort, bubble sort, and selection sort?

sort1 uses: bubble sort

How do you know?: because in the sorted set of numbers it run faster that sort3 since it only does a comparison n times since the numbers are sorted

sort2 uses: merge-sort

How do you know?: Shortest running time in randomized 50,000 number set.

sort3 uses: selection sort

How do you know?: it takes less time to run on the reversed set than sort 1 because it places numbers correctly at every switch 
```





