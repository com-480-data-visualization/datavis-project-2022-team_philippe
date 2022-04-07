# Data Visualization Project (COM-480)

## Insert outstanding title **TODO**

| Student's name | SCIPER |
| -------------- | ------ |
| Guillaume Parchet | 283294 |
| Arnaud Gaudard | 269672 |
| Roxane Pangaud | 283177 |

## Milestone 1 (8th April, 5pm)

### Dataset

The main data basis of our work will be the "Best Books Ever Dataset". Published in November 2020, it can be found on [Zenodo](https://zenodo.org/record/4265096#.Yisi6nrMKUl).

The original data has been collected from [GoodReads - Best Books Ever](https://www.goodreads.com/list/show/1.Best_Books_Ever) and contains 25 variables and 52478 records. By default, the dataset contains the following features:

| Attributes  | Definition | Completeness |
| ------------- | ------------- | ------------- |
| bookId  | Book Identifier as in goodreads.com  | 100% |
| title  | Book title | 100% |
| series | Series Name | 45% |
| author | Book's Author | 100% |
| rating | Global goodreads rating | 100% |
| description | Book's description | 97% |
| language | Book's language | 93% |
| isbn | Book's ISBN | 92% |
| genres | Book's genres | 91% |
| characters | Main characters | 26% |
| bookFormat | Type of binding | 97% |
| edition | Type of edition (ex. Anniversary Edition) | 9% |
| pages | Number of pages | 96% |
| publisher | Editorial | 93% |
| publishDate | publication date | 98% |
| firstPublishDate | Publication date of first edition | 59% |
| awards | List of awards | 20% |
| numRatings | Number of total ratings | 100% |
| ratingsByStars | Number of ratings by stars | 97% |
| likedPercent | Derived field, percent of ratings over 2 starts (as in GoodReads) | 99% |
| setting | Story setting | 22% |
| coverImg | URL to cover image | 99% |
| bbeScore | Score in Best Books Ever list | 100% |
| bbeVotes | Number of votes in Best Books Ever list | 100% |
| price | Book's price (extracted from Iberlibro) | 73% |

After a quick inspection of the data, it seems to be qualitative (low amount of missing data on most important fields, no corrupted data, etc...). It will require some pre-processing
such as filtering non-english books or grouping them by language, **TODO if more**.

### Problematic

The main aspect we would like to show with our visualization is


Examples of vues that could bring value to the visualization:
 - 1
 - 2
 - 3
 - etc...

First sktech drawings of what the main pages could look like:

<p align="center">

| Main view | Statistic view | Another view? |
| :---------------: | :--------------------------------------------------: | :------------------------------------------------------: |
| <img src="/Images/random_image.jpeg" width="300" > | <img src="/Images/random_image.jpeg" width="300" > | <img src="/Images/random_image.jpeg" width="300" > |

</p>

### Exploratory Data Analysis

One can find the detailed procedure of our Exploratory Data Analysis in the [Jupyter Notebook](/stats.ipynb).

In short, we mainly used Pandas to find the distribution of some interesting categorical columns (author, language, genre, publisher, setting).
We wanted to know if the categories were uniformly spread, or if there were many rarely-used categories and a few common ones. It turns out that the latter is true for every categorical column, though at different amplitudes.

For the publishers, we had noticed that many entries were very very similar but not exactly equal. We call them quasi-duplicates. We tried to do some statistical analysis to show that, but the method nor the results were really conclusive. Still, we gave some examples. This is a problem if we want to make a meaningful visualization later on. This worsens the previously mentioned non-uniform spread of values, too.

For the languages, a large majority of books in the dataset were written in English (42661 books), and only a few thousands of books are available in all the other languages. We'll surely select only English books in our visualization, so that it's easier to make similarity analyses between their descriptions.

We tried seeing if the author had a significant correlation with the book's rating, and we found a correlation of about 0. Also, we saw that the large majority of ratings are high. We count only 310 ratings under 3 out of 5, out of the 68'000 available ratings. Their mean is 4.04 and their standard deviation is 0.35, so maybe they're not so helpful...

### Related work


What has been already done with this data:



Originality of our approach:

Our approach is interesting as it focuses on **TODO**


Sources of inspiration for the project:



## Milestone 2 (6th May, 5pm)



## Milestone 3 (3rd June, 5pm)
