---
title: "2025-12-19-cs50_ch6python_pset"
date: 2025-12-19
tags:
  - cs
---
**Exercise 7 DNA - Implement a program that takes in a database of str repeats for different people as a csv and an individual sequence to compare to and tries to find a match in the database.**

```Python
import csv
import sys


def main():

    # TODO: Check for command-line usage
    if len(sys.argv) != 3:
        print("usage: python dna.py database.csv sample.csv")
        sys.exit(1)

    # TODO: Read database file into a variable
    with open(sys.argv[1]) as file:
        reader = csv.DictReader(file)
        print(reader.fieldnames)

    rows = []
    with open(sys.argv[1]) as file:
        reader = csv.DictReader(file)
        for row in reader:
            rows.append(row)
    print(rows)

    # TODO: Read DNA sequence file into a variable
    with open(sys.argv[2]) as file:
        sequence = file.read().strip()
        print(sequence)

    # TODO: Find longest match of each STR in DNA sequence
    strs = reader.fieldnames[1:]
    print(strs)
    counts = {}
    for str_seq in strs:
        counts[str_seq] = longest_match(sequence, str_seq)
    print(counts)

    # TODO: Check database for matching profiles
    #convert values in rows to int to compare
    for row in rows:
        for key in row:
            if key != 'name':
                row[key] = int(row[key])

    for row in rows:
        match = True
        for key in row:
            if key != 'name':
                if row[key] != counts[key]:
                    match = False
        if match == True:
            print(f"sample is {row['name']}")
            return
    print("no match")
    return


def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):

        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move substring to next potential match in sequence
        # Continue moving substring and checking for matches until out of consecutive matches
        while True:

            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1

            # If there is no match in the substring
            else:
                break

        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    # After checking for runs at each character in seqeuence, return longest run found
    return longest_run


main()
```

**Exercise 1-6 C pset1 and 2 programs to python - Implement hello, mario-less, mario-more, cash, credit, and readability referencing C code.**

**Readability.**

```Python
def main():
    txt = input("enter text:")
    #text check
    print(txt)

    letters = int(calletters(txt))
    sentences = int(calsent(txt))
    words = int(calwords(txt))

    score = coleliau(letters, sentences, words)

    if score < 16:
        print(f"grade level: {score}")
    elif score >= 16:
        print("grade level 16+")


def calletters(txt):
    letters = 0
    for c in txt:
       if c.isalpha:
          letters += 1
    return letters

def calwords(txt):
    words = 0
    for c in txt:
       if c == ' ':
          words += 1
    return words

def calsent(txt):
    sentences = 0
    for c in txt:
       if c in {'!', '.', '?'}:
          sentences += 1
    return sentences

def coleliau(letters, sentences, words):
   L = float(letters / words) * 100
   S = float(sentences / words) * 100
   index = int(0.0588 * L - 0.296 * S - 15.8)
   return index


main()
```
**Credit.**

```Python
n = 0
while (n < 1000000000000):
    n = int(input("CC number:"))

#13-digit VISA
if n >= 1000000000000 and n <= 9999999999999:
    d = []
    for i in range(13):
        d.append((n // (10**i)) % 10)

    sm = 0
    sm += d[0] + d[2] + d[4] + d[6] + d[8] + d[10] + d[12]

    for i in range(1, 12, 2):
        d[i] = d[i] *2
        if d[i] >= 10:
            d[i] -= 9
        sm += d[i]

    for i in range(13):
        print(d[i])

    if sm % 10 == 0:
        print("VISA")
    else:
        print("NOT VALID")

#15-digit AMEX
elif n >= 100000000000000 and n <= 999999999999999:
    d = []
    for i in range(15):
        d.append((n // (10**i)) % 10)

    sm = 0
    sm += d[0] + d[2] + d[4] + d[6] + d[8] + d[10] + d[12] + d[14]

    for i in range(1, 14, 2):
        d[i] = d[i] * 2
        if d[i] >= 10:
            d[i] -= 9
        sm += d[i]

    if sm % 10 == 0:
        print("AMEX")
    else:
        print("NOT VALID")

#16 digit VISA and MASTERCARD
elif n >= 1000000000000000 and n <= 9999999999999999:
    d = []
    for i in range(16):
        d.append((n // (10**i)) % 10)

    sm = 0
    sm += d[0] + d[2] + d[4] + d[6] + d[8] + d[10] + d[12] + d[14]

    for i in range(1, 16, 2):
        dub = d[i] * 2
        if dub >= 10:
            dub -= 9
        sm += dub

    if sm % 10 == 0:
        if d[15] == 4:
            print("VISA")
        elif d[15] == 5 and d[14] >= 1 and d[14] <= 5:
            print("MASTERCARD")
        else:
            print("unkwnon")
    else:
        print("NOT VALID")
```
**Cash.**

```Python
import cs50

m = cs50.get_int("input change due:")

def main():
    q = m // 25
    r0 = m - q * 25
    d = r0 // 10
    r1 = m - q * 25 - d * 10
    n = r1 // 5
    r2 = m - q * 25 - d * 10 - n * 5
    p = r2 // 1

    f = q + d + n + p


    print(f)

main()
```
**Mario-more.**

```Python
import cs50

h = cs50.get_int("height:")

def main():
    for i in range(h):
        print_row(h - i - 1, i + 1, 1, i + 1, h - i - 1)

def print_row(spaces, bricks, one, brick2, spaces2):
    for i in range(spaces):
        print(" ", end = "")
    for i in range(bricks):
        print('#', end="")
    for i in range(one):
        print(" ", end="")
    for i in range(brick2):
        print("#", end="")
    for i in range(spaces2):
        print(" ", end="")
    print()
main()
```
**Mario-less.**

```Python
import cs50

h = cs50.get_int("height:")

def main():
    for i in range(h):
        print_row(h - i - 1, i + 1)

def print_row(spaces, bricks):
    for i in range(spaces):
        print(" ", end = "")
    for i in range(bricks):
        print('#', end="")
    print()
main()
```
**Hello.**

```Python
n = input("what is your name:")
print(f"Hello, {n}")
```
