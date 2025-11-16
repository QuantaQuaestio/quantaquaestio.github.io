---
title: "2025-11-14-cs50_ch3arrays_pset"
date: 2025-11-14
tags:
  - cs
---
**Chapter 2 C PSet**

**Exercise 3 Runoff - Complete all of the necessary functions to have a runoff style election where a candidate wins by getting more than 50% of the votes. If there is no winner a runoff is held where the candidate with the lowest votes is eliminated and the counts are done again with the remaining candidates going down voter preferences until there is a winner.**
```C
#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max voters and candidates
#define MAX_VOTERS 100
#define MAX_CANDIDATES 9

// preferences[i][j] is jth preference for voter i
int preferences[MAX_VOTERS][MAX_CANDIDATES];

// Candidates have name, vote count, eliminated status
typedef struct
{
    string name;
    int votes;
    bool eliminated;
} candidate;

// Array of candidates
candidate candidates[MAX_CANDIDATES];

// Numbers of voters and candidates
int voter_count;
int candidate_count;

// Function prototypes
bool vote(int voter, int rank, string name);
void tabulate(void);
bool print_winner(void);
int find_min(void);
bool is_tie(int min);
void eliminate(int min);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: runoff [candidate ...]\n");
        return 1;
    }

    // Populate array of candidates
    candidate_count = argc - 1;
    if (candidate_count > MAX_CANDIDATES)
    {
        printf("Maximum number of candidates is %i\n", MAX_CANDIDATES);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i].name = argv[i + 1];
        candidates[i].votes = 0;
        candidates[i].eliminated = false;
    }

    voter_count = get_int("Number of voters: ");
    if (voter_count > MAX_VOTERS)
    {
        printf("Maximum number of voters is %i\n", MAX_VOTERS);
        return 3;
    }

    // Keep querying for votes
    for (int i = 0; i < voter_count; i++)
    {

        // Query for each rank
        for (int j = 0; j < candidate_count; j++)
        {
            string name = get_string("Rank %i: ", j + 1);

            // Record vote, unless it's invalid
            if (!vote(i, j, name))
            {
                printf("Invalid vote.\n");
                return 4;
            }
        }

        printf("\n");
    }

    // Keep holding runoffs until winner exists
    while (true)
    {
        // Calculate votes given remaining candidates
        tabulate();

        // Check if election has been won
        bool won = print_winner();
        if (won)
        {
            break;
        }

        // Eliminate last-place candidates
        int min = find_min();
        bool tie = is_tie(min);

        // If tie, everyone wins
        if (tie)
        {
            for (int i = 0; i < candidate_count; i++)
            {
                if (!candidates[i].eliminated)
                {
                    printf("%s\n", candidates[i].name);
                }
            }
            break;
        }

        // Eliminate anyone with minimum number of votes
        eliminate(min);

        // Reset vote counts back to zero
        for (int i = 0; i < candidate_count; i++)
        {
            candidates[i].votes = 0;
        }
    }
    return 0;
}

// Record preference if vote is valid
bool vote(int voter, int rank, string name)
{
    // Loop through all candidates
    for (int j = 0; j < candidate_count; j++)
    {
        // Compare input name to candidate name
        if(strcmp(name, candidates[j].name) == 0)
        {
            // Store candidate index in preferences
            preferences[voter][rank] = j;
            return true;
        }
    }
    // Name not found
    return false;
}

// Tabulate votes for non-eliminated candidates
void tabulate(void)
{
    // TODO: should look at all of the voters’ preferences and compute the current vote totals,
    // by looking at each voter’s (loop over voters) top choice candidate who hasn’t yet been eliminated


    //pseudocode for all of the voters look at top choice candidate and add a vote to that candidates name only if he has not
    //been eliminated otherwise look at their next top choice
    //to check for elimination have preferences array with voter rank so loop through that and check ifthe first candidate is
    //eliminated using their index the index needs to be used to reference the elimination status of the candidate
    for(int i = 0; i < voter_count; i++)
    {
        for(int j = 0; j < candidate_count; j++)
        {
            if(candidates[preferences[i][j]].eliminated == false)
            {
                candidates[preferences[i][j]].votes ++;
                break;
            }
        }

    }

    return;
}

// Print the winner of the election, if there is one
bool print_winner(void)
{
    // TODO
    for(int i = 0; i < candidate_count; i++)
    {
        if(candidates[i].votes > (voter_count)/2)
        {
            printf("Winner: %s\n", candidates[i].name);
            return true;
        }

    }
    return false;
}

// Return the minimum number of votes any remaining candidate has
int find_min(void)
{
    // TODO
    int min_votes = voter_count;
    for(int i = 0; i < candidate_count; i++)
    {
        if(!candidates[i].eliminated && candidates[i].votes < min_votes)
        {
            min_votes = candidates[i].votes;
        }
    }
    return min_votes;
}

// Return true if the election is tied between all candidates, false otherwise
bool is_tie(int min)
{
    // TODO
    for(int i = 0; i < candidate_count; i++)
    {
        if(!candidates[i].eliminated && candidates[i].votes > min)
        {
            return false;
        }
    }
    return true;
}

// Eliminate the candidate (or candidates) in last place
void eliminate(int min)
{
    // TODO
    for(int i = 0; i < candidate_count; i++)
    {
        if(candidates[i].votes == min)
        {
            candidates[i].eliminated = true;
        }
    }
    return;
}
```

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





