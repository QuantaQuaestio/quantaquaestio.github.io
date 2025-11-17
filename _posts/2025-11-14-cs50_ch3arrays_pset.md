---
title: "2025-11-14-cs50_ch3arrays_pset"
date: 2025-11-14
tags:
  - cs
---
**Exercise 3.2 Challenge Problem Tideman - Make all the necessary functions to run a tideman election where candidates are compared based on head on matchups where the strongest winner is locked in first and subsequent ones are locked based on strength of victory. The person with no edges pointing to it wins. No cycles allowed so have to ensure a new lock does not create a cycle.**
```C
#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max number of candidates
#define MAX 9

// preferences[i][j] is number of voters who prefer i over j
int preferences[MAX][MAX];

// locked[i][j] means i is locked in over j
bool locked[MAX][MAX];

// Each pair has a winner, loser
typedef struct
{
    int winner;
    int loser;
} pair;

// Array of candidates
string candidates[MAX];
pair pairs[MAX * (MAX - 1) / 2];

int pair_count;
int candidate_count;

// Function prototypes
bool vote(int rank, string name, int ranks[]);
void record_preferences(int ranks[]);
void add_pairs(void);
void sort_pairs(void);
void lock_pairs(void);
void print_winner(void);
bool creates_cycle(int winner, int loser);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: tideman [candidate ...]\n");
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
        candidates[i] = argv[i + 1];
    }

    // Clear graph of locked in pairs
    for (int i = 0; i < candidate_count; i++)
    {
        for (int j = 0; j < candidate_count; j++)
        {
            locked[i][j] = false;
        }
    }

    pair_count = 0;
    int voter_count = get_int("Number of voters: ");

    // Query for votes
    for (int i = 0; i < voter_count; i++)
    {
        // ranks[i] is voter's ith preference
        int ranks[candidate_count];

        // Query for each rank
        for (int j = 0; j < candidate_count; j++)
        {
            string name = get_string("Rank %i: ", j + 1);

            if (!vote(j, name, ranks))
            {
                printf("Invalid vote.\n");
                return 3;
            }
        }

        record_preferences(ranks);

        printf("\n");
    }

    add_pairs();
    sort_pairs();
    lock_pairs();
    print_winner();
    return 0;
}

// Update ranks given a new vote
bool vote(int rank, string name, int ranks[])
{
    // Loop through all candidates
    for (int j = 0; j < candidate_count; j++)
    {
        // Compare input name to candidate name
        if(strcmp(name, candidates[j]) == 0)
        {
            // Store candidate index in ranks
            ranks[rank] = j;
            return true;
        }
    }
    // Name not found
    return false;
}

// Update preferences given one voter's ranks

//okay so i want to look at ranks and see if the rank index of candidate i is lower than the rank index of candidate j
// if it is then add 1 to the preferences[i][j] array for that pair.
void record_preferences(int ranks[])
{
    // TODO
    for(int i = 0; i < candidate_count; i++)
    {
        for(int j = i + 1; j < candidate_count; j++)
        {
            if(ranks[i] < ranks[j])
            {
                preferences[ranks[i]][ranks[j]]++;
            }
        }
    }

    return;
}

// Record pairs of candidates where one is preferred over the other

//now need to go over the preferences array and for every one where the ij is more than the ji mark it as a preferred pair
void add_pairs(void)
{
    // TODO
    for(int i = 0; i < candidate_count; i++)
    {
        for(int j = 1 + i; j < candidate_count; j++)
        {
            if(preferences[i][j] > preferences[j][i])
            {
                pairs[pair_count].winner = i;
                pairs[pair_count].loser = j;
            }
            else if(preferences[i][j] < preferences[j][i])
            {
                pairs[pair_count].winner = j;
                pairs[pair_count].loser = i;
            }
        }
    }

    return;
}

// Sort pairs in decreasing order by strength of victory
void sort_pairs(void)
{
    // TODO
    for(int i = 0; i < pair_count + 1; i++)
    {
        for(int j = i + 1; j < pair_count; j++)
        {
            if(preferences[pairs[i].winner][pairs[i].loser] < preferences[pairs[j].winner][pairs[i].loser])
            //swap pairs[i] and pairs[j]
            {
                pair temp = pairs[i];
                pairs[i] = pairs[j];
                pairs[j] = temp;
            }

        }
    }
    return;
}

// Lock pairs into the candidate graph in order, without creating cycles
void lock_pairs(void)
{
    // TODO
    for(int i = 0; i < pair_count; i++)
    {
        if(creates_cycle(pairs[i].winner, pairs[i].loser) == false)
        {
            locked[pairs[i].winner][pairs[i].loser] = true;

        }

    }
    return;
}

// Print the winner of the election
void print_winner(void)
{
    // TODO
    //check in all locks for the node that has no locks directed towards it and print that one
    for(int i = 0; i < candidate_count; i++)
    {
        bool hasincoming = false;
        for(int j = 0; j < candidate_count; j++)
        {
            if(locked[j][i] == true)
            {
                hasincoming = true;
                break;

            }
        }
        if(!hasincoming)
        {
            printf("winner: %s\n", candidates[i]);
            return;
        }
    }
    return;
}

bool creates_cycle(int winner, int loser)
{
    if(loser == winner)
    {
        return true;
    }
    for(int i = 0; i < candidate_count; i++)
    {
        if(locked[winner][i] == true)
        {
            if(creates_cycle(i, loser) == true)
            {
                return true;
            }
        }
    }
    return false;  // no cycle found
}
```

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





