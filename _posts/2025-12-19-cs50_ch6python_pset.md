---
title: "2025-12-19-cs50_ch6python_pset"
date: 2025-12-19
tags:
  - cs
---
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
