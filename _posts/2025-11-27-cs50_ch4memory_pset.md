---
title: "2025-11-27-cs50_ch4memory_pset"
date: 2025-11-27
tags:
  - cs
---

**Exercise 3 Recover - Make a program that takes a raw file of lost jpgs as input and sorts through the bytes to regenerate the individual images.**


```C
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

int main(int argc, char *argv[])
{
    //Your program should accept exactly one command-line argument, the name of a forensic image from which to recover JPEGs.
    //If your program is not executed with exactly one command-line argument, it should remind the user of correct usage,
    //and main should return 1.
    if(argc != 2)
    {
        printf("Correct usage ./recover FILE\n");
        return 1;
    }
    //If the forensic image cannot be opened for reading, your program should inform the user as much, and main should return 1.

    FILE *card = fopen(argv[1], "r");

    //buffer for block of data
    uint8_t buffer[512];

    FILE *img = NULL;
    int count = 0;
    //while ther is still data being read out
    while(fread(buffer, 1, 512, card) == 512)
    {
        //create jpegs from the data
        if(buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff)
        {
            if(img != NULL)
            {
                fclose(img);
            }

            char filename[8];
            sprintf(filename, "%03i.jpg", count);
            img = fopen(filename, "w");
            count ++;
        }

        if(img != NULL)
        {
            fwrite(buffer, 1, 512, img);
        }
    }
    if(img != NULL)
    {
        fclose(img);
    }
    fclose(card);
}
```


**Exercise 2 Filters - Complete the helper functions to implement greyscale, reflection, sepia, and blurred filters to an image.**

```C
#include "helpers.h"
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            //new value that will be given to each of these individual components
            float grey = (image[i][j].rgbtRed + image[i][j].rgbtBlue + image[i][j].rgbtGreen ) / 3;
            int gray = round(grey);
            //update values
            image[i][j].rgbtRed = image[i][j].rgbtBlue = image[i][j].rgbtGreen = gray;
        }
    }
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            //algorithm for sepia given:
            // sepiaRed = .393 * originalRed + .769 * originalGreen + .189 * originalBlue
            // sepiaGreen = .349 * originalRed + .686 * originalGreen + .168 * originalBlue
            // sepiaBlue = .272 * originalRed + .534 * originalGreen + .131 * originalBlue
            float sepiaRed = .393 * image[i][j].rgbtRed + .769 * image[i][j].rgbtGreen + .189 * image[i][j].rgbtBlue;
            float sepiaGreen = .349 * image[i][j].rgbtRed + .686 * image[i][j].rgbtGreen + .168 * image[i][j].rgbtBlue;
            float sepiaBlue = .272 * image[i][j].rgbtRed + .534 * image[i][j].rgbtGreen + .131 * image[i][j].rgbtBlue;
            //round output
            int sepiared = round(sepiaRed);
            int sepiablue = round(sepiaBlue);
            int sepiagreen = round(sepiaGreen);
            //check if more than 255 make 255
            if(sepiared > 255)
            {
                sepiared = 255;
            }
            if(sepiablue > 255)
            {
                sepiablue = 255;
            }
            if(sepiagreen > 255)
            {
                sepiagreen = 255;
            }
            image[i][j].rgbtBlue = sepiablue;
            image[i][j].rgbtGreen = sepiagreen;
            image[i][j].rgbtRed = sepiared;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    //for reflecting the pixes i can probably find the dimensions of the image by looping over i and j then use that to find the
    //dimensions of the image. based off that i can just loop to switch the first with the last and so on and i only need to do j
    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width / 2; j++)
        {
            int blue = image[i][j].rgbtBlue;
            int green = image[i][j].rgbtGreen;
            int red = image[i][j].rgbtRed;
            image[i][j].rgbtBlue = image[i][width - j - 1].rgbtBlue;
            image[i][j].rgbtGreen = image[i][width - j - 1].rgbtGreen;
            image[i][j].rgbtRed = image[i][width - j - 1].rgbtRed;
            image[i][width - j - 1].rgbtBlue = blue;
            image[i][width - j - 1].rgbtGreen = green;
            image[i][width - j - 1].rgbtRed = red;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    //for this one maybe i can add up pixels [i][j] + [i + 1][j] + [i][j + 1] + [i + 1][j + 1] then set each of those to the average
    RGBTRIPLE copy[height][width];
    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            copy[i][j] = image[i][j];
        }
    }

    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            int red_sum = 0;
                green_sum = 0;
                blue_sum = 0;
                count = 0;
            //make a copy of image to calculate new pixel values and modify original without it factoring into next calc
            //check you are adding only terms that exist
            for(int di = -1; di <= 1; di++)
            {
                for (int dj = -1; dj <= 1; dj++)
                {
                    int ni = i + di;
                    int nj = j + dj;
                    if(ni >=0 && ni < height && nj >= 0 && nj < width)
                    {

                        red_sum += copy[ni][nj].rgbtRed;
                        blue_sum += copy[ni][nj].rgbtBlue;
                        green_sum += copy[ni][nj].rgbtGreen;
                        count ++;
                    }
                }
            }
            image[i][j].rgbtRed = round(red_sum/count);
            image[i][j].rgbtBlue = round(blue_sum / count);
            image[i][j].rgbtGreen = round(green_sum / count);
        }
    }
    return;
}
```

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
