---
title: "2025-11-27-cs50_ch4memory_pset"
date: 2025-11-27
tags:
  - cs
---
**Exercise 1 Volume - Complete the two necessary functions to first copy the header of a wav music file and then to scale the volume of the file by multiplying each sample by the factor indicated by the user as input.**

```C
// Modifies the volume of an audio file

#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

// Number of bytes in .wav header
const int HEADER_SIZE = 44;

int main(int argc, char *argv[])
{
    // Check command-line arguments
    if (argc != 4)
    {
        printf("Usage: ./volume input.wav output.wav factor\n");
        return 1;
    }

    // Open files and determine scaling factor
    FILE *input = fopen(argv[1], "r");
    if (input == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    FILE *output = fopen(argv[2], "w");
    if (output == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    float factor = atof(argv[3]);

    // TODO: Copy header from input file to output file
    uint8_t header[HEADER_SIZE];
    fread(header, 1, HEADER_SIZE, input);
    fwrite(header, 1, HEADER_SIZE, output);


    // TODO: Read samples from input file and write updated data to output file
    int16_t buffer;
    while(fread(&buffer, sizeof(int16_t), 1, input) == 1)
    {
        buffer *= factor;
        fwrite(&buffer, sizeof(int16_t), 1, output);
    }



    // Close files
    fclose(input);
    fclose(output);
}
```
