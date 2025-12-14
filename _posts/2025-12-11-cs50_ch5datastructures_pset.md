---
title: "2025-12-11-cs50_ch5datastructures_pset"
date: 2025-12-11
tags:
  - cs
---
**Exercise 2 Spell Checker - Implement the hash, load, unload, check, and size functions of a spellchecker initially using a 26 index hash function. V3 does hasing using first letter, length up to 10, and second letter resulting in 7456 total buckets. V2 Uses 104 buckets by hashing based on first letter and 4 buckets for each letter based on word lengths <=3, <= 6, <=9, and >10.**

```C
V3
Student                                                         Staff
WORDS MISSPELLED:     955                                       WORDS MISSPELLED:     955
WORDS IN DICTIONARY:  143091                                    WORDS IN DICTIONARY:  143091
WORDS IN TEXT:        17756                                     WORDS IN TEXT:        17756
TIME IN load:         0.03                                    | TIME IN load:         0.04
TIME IN check:        0.03                                    | TIME IN check:        0.02
TIME IN size:         0.00                                      TIME IN size:         0.00
TIME IN unload:       0.00                                    | TIME IN unload:       0.02
TIME IN TOTAL:        0.06                                    | TIME IN TOTAL:        0.07
```

```C
//V3 Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <string.h>
#include "dictionary.h"
#include <stdlib.h>
#include <stdio.h>


int word_count = 0;

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

// TODO: Choose number of buckets in hash table
const unsigned int N = 7456;

// Hash table
node *table[N];

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // TODO
    char lword[LENGTH + 1];
    //while you are not at the null character keep lowercasing word and adding it to the same i index of lword increasing i every time
    int i = 0;
    while(word[i] != '\0')
    {
        lword[i] = tolower(word[i]);
        i++;
    }
    lword[i] = '\0';
    //get bucket in hash table to search based on current implementation indexing by first letter
    unsigned int index = hash(lword);
    //want to compare to the linked list at each index using a loop to see if word is there or not
    //maybe can do a while loop that runs until true where the node to check is updated every time based on the current node to
    //move down the linked list
    node *cursor = table[index];
    while(cursor != NULL)
    {
        if(strcmp(lword, cursor->word) == 0)
        {
            return true;
        }
        //move the cursor to point to the next word
        cursor = cursor->next;
    }
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    // TODO: Improve this hash function
    int letter_index = toupper(word[0]) - 'A';
    int letter2_index = toupper(word[1]) - 'A';
    int length = strlen(word);
    if(word[0] == '\'')
    {
        return 0;
    }
    if(word[1] == '\0')
    {
        letter2_index = 0;
    }
    if (length > 10)
    {
        length = 10;
    }
    return (letter_index * 26 + letter2_index) * 11 + length;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // TODO first create buffer for every word then as long as there are still characters keep loading them into their own words array

    //create empty array for words and open dictionary file
    char word[LENGTH + 1];
    FILE *dic = fopen(dictionary, "r");

    if(dic == NULL)
    {
        return false;
    }

    //read each word in the file
    while(fscanf(dic, "%s", word) != EOF)
    {
        node *new_node = malloc(sizeof(node));
        if(new_node == NULL)
        {
            return false;
        }
        strcpy(new_node->word, word);

        unsigned int index = hash(word);
        new_node->next = table[index];
        table[index] = new_node;
        word_count ++;

    }
    //close file
    fclose(dic);

    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    // TODO
    {
        return word_count;
    }
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    // TODO
    for(int i = 0; i < 26; i++)
    {
        node *cursor = table[i];
        while(cursor != NULL)
        {
            node *tmp = cursor;
            cursor = cursor->next;
            free(tmp);
        }
    }
    return true;
}

```

```C
V2
Student                                                         Staff
WORDS MISSPELLED:     955                                       WORDS MISSPELLED:     955
WORDS IN DICTIONARY:  143091                                    WORDS IN DICTIONARY:  143091
WORDS IN TEXT:        17756                                     WORDS IN TEXT:        17756
TIME IN load:         0.03                                    | TIME IN load:         0.04
TIME IN check:        0.17                                    | TIME IN check:        0.02
TIME IN size:         0.00                                      TIME IN size:         0.00
TIME IN unload:       0.00                                    | TIME IN unload:       0.02
TIME IN TOTAL:        0.20                                    | TIME IN TOTAL:        0.07
```

```C
//V2 Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <string.h>
#include "dictionary.h"
#include <stdlib.h>
#include <stdio.h>


int word_count = 0;

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

// TODO: Choose number of buckets in hash table
const unsigned int N = 104;

// Hash table
node *table[N];

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // TODO
    char lword[LENGTH + 1];
    //while you are not at the null character keep lowercasing word and adding it to the same i index of lword increasing i every time
    int i = 0;
    while(word[i] != '\0')
    {
        lword[i] = tolower(word[i]);
        i++;
    }
    lword[i] = '\0';
    //get bucket in hash table to search based on current implementation indexing by first letter
    unsigned int index = hash(lword);
    //want to compare to the linked list at each index using a loop to see if word is there or not
    //maybe can do a while loop that runs until true where the node to check is updated every time based on the current node to
    //move down the linked list
    node *cursor = table[index];
    while(cursor != NULL)
    {
        if(strcmp(lword, cursor->word) == 0)
        {
            return true;
        }
        //move the cursor to point to the next word
        cursor = cursor->next;
    }
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    // TODO: Improve this hash function
    int letter_index = toupper(word[0]) - 'A';
    int length = strlen(word);
    if(word[0] == '\'')
    {
        return 0;
    }
    if (length <= 3)
    {
        int final_index = letter_index * 4 + 0;
        return final_index;
    }
    else if(length <= 6)
    {
        int final_index = letter_index * 4 + 1;
        return final_index;
    }
    else if(length <= 9)
    {
        int final_index = letter_index * 4 + 2;
        return final_index;
    }
    else
    {
        int final_index = letter_index * 4 + 3;
        return final_index;
    }
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // TODO first create buffer for every word then as long as there are still characters keep loading them into their own words array

    //create empty array for words and open dictionary file
    char word[LENGTH + 1];
    FILE *dic = fopen(dictionary, "r");

    if(dic == NULL)
    {
        return false;
    }

    //read each word in the file
    while(fscanf(dic, "%s", word) != EOF)
    {
        node *new_node = malloc(sizeof(node));
        if(new_node == NULL)
        {
            return false;
        }
        strcpy(new_node->word, word);

        unsigned int index = hash(word);
        new_node->next = table[index];
        table[index] = new_node;
        word_count ++;

    }
    //close file
    fclose(dic);

    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    // TODO
    {
        return word_count;
    }
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    // TODO
    for(int i = 0; i < 26; i++)
    {
        node *cursor = table[i];
        while(cursor != NULL)
        {
            node *tmp = cursor;
            cursor = cursor->next;
            free(tmp);
        }
    }
    return true;
}
```


```C
V1
Student                                                         Staff
WORDS MISSPELLED:     955                                       WORDS MISSPELLED:     955
WORDS IN DICTIONARY:  143091                                    WORDS IN DICTIONARY:  143091
WORDS IN TEXT:        17756                                     WORDS IN TEXT:        17756
TIME IN load:         0.06                                    | TIME IN load:         0.04
TIME IN check:        0.65                                    | TIME IN check:        0.02
TIME IN size:         0.00                                      TIME IN size:         0.00
TIME IN unload:       0.00                                    | TIME IN unload:       0.02
TIME IN TOTAL:        0.71                                    | TIME IN TOTAL:        0.07
```


```C
// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <string.h>
#include "dictionary.h"
#include <stdlib.h>
#include <stdio.h>


int word_count = 0;

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

// TODO: Choose number of buckets in hash table
const unsigned int N = 26;

// Hash table
node *table[N];

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // TODO
    char lword[LENGTH + 1];
    //while you are not at the null character keep lowercasing word and adding it to the same i index of lword increasing i every time
    int i = 0;
    while(word[i] != '\0')
    {
        lword[i] = tolower(word[i]);
        i++;
    }
    lword[i] = '\0';
    //get bucket in hash table to search based on current implementation indexing by first letter
    unsigned int index = hash(lword);
    //want to compare to the linked list at each index using a loop to see if word is there or not
    //maybe can do a while loop that runs until true where the node to check is updated every time based on the current node to
    //move down the linked list
    node *cursor = table[index];
    while(cursor != NULL)
    {
        if(strcmp(lword, cursor->word) == 0)
        {
            return true;
        }
        //move the cursor to point to the next word
        cursor = cursor->next;
    }
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    // TODO: Improve this hash function
    return toupper(word[0]) - 'A';
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // TODO first create buffer for every word then as long as there are still characters keep loading them into their own words array

    //create empty array for words and open dictionary file
    char word[LENGTH + 1];
    FILE *dic = fopen(dictionary, "r");

    if(dic == NULL)
    {
        return false;
    }

    //read each word in the file
    while(fscanf(dic, "%s", word) != EOF)
    {
        node *new_node = malloc(sizeof(node));
        if(new_node == NULL)
        {
            return false;
        }
        strcpy(new_node->word, word);

        unsigned int index = hash(word);
        new_node->next = table[index];
        table[index] = new_node;
        word_count ++;

    }
    //close file
    fclose(dic);

    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    // TODO
    {
        return word_count;
    }
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    // TODO
    for(int i = 0; i < 26; i++)
    {
        node *cursor = table[i];
        while(cursor != NULL)
        {
            node *tmp = cursor;
            cursor = cursor->next;
            free(tmp);
        }
    }
    return true;
}
```

**Exercise 1 Inheritance - Build a program that assigns a first generation alleles randomly then creates two parent generations based on the alleles for the child using pointers.**


```C
// Simulate genetic inheritance of blood type
#define _DEFAULT_SOURCE
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Each person has two parents and two alleles
typedef struct person
{
    struct person *parents[2];
    char alleles[2];
} person;

const int GENERATIONS = 3;
const int INDENT_LENGTH = 4;

person *create_family(int generations);
void print_family(person *p, int generation);
void free_family(person *p);
char random_allele();

int main(void)
{
    // Seed random number generator
    srandom(time(0));

    // Create a new family with three generations
    person *p = create_family(GENERATIONS);

    // Print family tree of blood types
    print_family(p, 0);

    // Free memory
    free_family(p);
}

// Create a new individual with `generations`
person *create_family(int generations)
{
    // TODO: Allocate memory for new person
    person *new_person = malloc(sizeof(person));

    // If there are still generations left to create
    if (generations > 1)
    {
        // Create two new parents for current person by recursively calling create_family
        person *parent0 = create_family(generations - 1);
        person *parent1 = create_family(generations - 1);

        // TODO: Set parent pointers for current person
        new_person->parents[0] = parent0;
        new_person->parents[1] = parent1;


        //TODO: Randomly assign current person's alleles based on the alleles of their parents
        new_person->alleles[0] = parent0->alleles[random() % 2];
        new_person->alleles[1] = parent1->alleles[random() % 2];
    }

    // If there are no generations left to create
    else
    {
        // TODO: Set parent pointers to NULL
        new_person->parents[0] = NULL;
        new_person->parents[1] = NULL;

        //TODO: Randomly assign alleles
        new_person->alleles[0] = random_allele();
        new_person->alleles[1] = random_allele();
    }

    // TODO: Return newly created person
    return new_person;
}

// Free `p` and all ancestors of `p`.
void free_family(person *p)
{
    // ?TODO: Handle base case
    if(p == NULL)
    {
        return;
    }

    //TODO: Free parents recursively
    free_family(p->parents[0]);
    free_family(p->parents[1]);



    // TODO: Free child
    free_family(p);
}

// Print each family member and their alleles.
void print_family(person *p, int generation)
{
    // Handle base case
    if (p == NULL)
    {
        return;
    }

    // Print indentation
    for (int i = 0; i < generation * INDENT_LENGTH; i++)
    {
        printf(" ");
    }

    // Print person
    if (generation == 0)
    {
        printf("Child (Generation %i): blood type %c%c\n", generation, p->alleles[0], p->alleles[1]);
    }
    else if (generation == 1)
    {
        printf("Parent (Generation %i): blood type %c%c\n", generation, p->alleles[0], p->alleles[1]);
    }
    else
    {
        for (int i = 0; i < generation - 2; i++)
        {
            printf("Great-");
        }
        printf("Grandparent (Generation %i): blood type %c%c\n", generation, p->alleles[0], p->alleles[1]);
    }

    // Print parents of current generation
    print_family(p->parents[0], generation + 1);
    print_family(p->parents[1], generation + 1);
}

// Randomly chooses a blood type allele.
char random_allele()
{
    int r = random() % 3;
    if (r == 0)
    {
        return 'A';
    }
    else if (r == 1)
    {
        return 'B';
    }
    else
    {
        return 'O';
    }
}

```
