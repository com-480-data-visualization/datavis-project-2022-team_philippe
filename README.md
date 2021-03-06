# Data Visualization Project (COM-480)

## Studio Bibli

| Student's name | SCIPER |
| -------------- | ------ |
| Guillaume Parchet | 283294 |
| Arnaud Gaudard | 269672 |
| Roxane Pangaud | 283177 |

[Milestone 1](milestones/Milestone1Submission.pdf) • [Milestone 2](milestones/Milestone2Submission.pdf) • [Process Book](milestones/Process_Book_Team_Philippe.pdf) • [Screencast](milestones/screencast.mp4) ([other source](https://cloud.beule.be/s/TTnJzeNrrCxMW9M))

[Website](https://com-480-data-visualization.github.io/datavis-project-2022-team_philippe/website/)

#### Introduction
Our website, Studio Bibli, is a treasure trove of books you've never seen!

Philippe the cat will introduce you. Just tell him about some of the books you like, and whether you're into reading huge chunks of paper, or small novellas. 

Do you just read ebooks because you have no bookshelf? Philippe has got you covered, just filter out the physical book formats. 
Are you tight on money? Or do you like to splurge on limited editions? Studio Bibli allows you to specify that too.

When you're done filling your info, Philippe will prepare for you a bubble map: enjoy exploring a whole universe of books that are just similar to your tastes !

After that, Philippe will get out some statistics from his filing cabinet, for you to enjoy.

#### Requirements
This visualisation is not meant to be used on a mobile device. Please use a computer with a mouse, and a modern browser (no IE, obviously).

If you would like to reproduce our dataset, please refer to the enclosed jupyter notebooks. We have used conda for its large amount of useful libraries.

#### Repository structure
    .
    ├── data                        # raw data required for data processing
    ├── img                         # img used for Repository display 
    ├── milestones                  # handouts and submissions  
    ├── website                     # constains all necessary elements for the website to run
    │   ├── css                     # css files handling layouts
    │   ├── data                    # processed datasets for d3 visualizations
    │   ├── img                     # images ressources displayed in website
    │   ├── js                      # javascript files handling logic
    │   ├── lib                     # required libraries for the website to run
    │   └── index.html              # index of the website
    ├── data_exploration.ipynb      # notebook displaying insights on data statistics 
    └── data_processing.ipynb       # notebook handling all dat processing for website visualizations 

## Milestone 1 (8th April, 5pm)

For the project, we wanted to talk about a subject that all of us enjoy. After some discussions and research, we decided to do something about books. Indeed, since books have covers, it can lead to good visualisation.
![Visualisation](img/draft_pages.png)

### Dataset

The main data basis of our work will be the "Best Books Ever Dataset". Published in November 2020, it can be found on [Zenodo](https://zenodo.org/record/4265096#.Yisi6nrMKUl).

The original data has been collected from [GoodReads - Best Books Ever](https://www.goodreads.com/list/show/1.Best_Books_Ever) and contains 25 variables and 52478 records (books). By default, the dataset contains the following features:

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

After a quick inspection of the data, it seems to be qualitative (low amount of missing data on most important fields, no corrupted data, etc...). It will require some pre-processing though, such as filtering non-english books or grouping them by language and harmonize the publisher names, author names, or settings. 

We will also create new variables like the number of words in the title, the length of the series, some key words of the description and the number of awards won.

### Problematic
This project has two mains purposes. The first one is to implement a nice book library and a dynamic top favorite list based on the genre. The aim is to orient the visitor towards potential future readings. This could be achieved through multiple elements such as:
* A vast similarity graph library where books are grouped based on their description's similarity
* A top favorite list
* Navigation by clicking on a book from the library which leads in turn to other similar books (based on descriptions or genres)

Secondly, we wish to visualise potential books market dynamics. Better understanding what external parameters of a book (such as its prize, number of pages, length of title, type of cover, publisher, number of sequels/prequels...) influence other factors (such as its popularity, ratings, etc...) could be of interest for the readers. Other hypothesis could include: 
* does a typical genre tend to have more pages / be more expensive / more popular than others?
* do vastly liked publishers write more of certain genres ?
* are there tendencies in ratings for books part of a serie ? (for example if the ratings start falling after n^th^ book published)

We are aware that, since we will only consider english books, some similarities in the book descriptions in English, may not be reflected in French (and vice-versa), so the recommendations generated may differ from ones generated with French descriptions (or others). The general conclusions of our hypothesis will be biased towards typical english books readers.

<!--Here are some ideas of some visualisation that we could do:
 1) Just a giant library like we can have on the TV on Netflix but it is on the web for books, alphabeticaly sorted. The idea is that when you select a book, you will get the informations about the book (Title, desciption, cover type, ...) and some recommandations about other book "similar" to that one.
 2) A "Top favorite" graph where the user can select a genre and see the most liked book of the genre
 3) A visualisation of the biggest publishers, what genre of book they publish, the cost of their books and how much they are liked.
 4) A time table of when the books were published (or first published if the variable exist for the book)-->

<!--First sktech drawings of what the main pages could look like:

<p align="center">

| Main view | Statistic view | Another view? |
| :---------------: | :--------------------------------------------------: | :------------------------------------------------------: |
| <img src="/Images/random_image.jpeg" width="300" > | <img src="/Images/random_image.jpeg" width="300" > | <img src="/Images/random_image.jpeg" width="300" > |

</p>-->

### Exploratory Data Analysis

One can find the detailed procedure of our Exploratory Data Analysis in the [Jupyter Notebook](/stats.ipynb).

In short, we mainly used Pandas to find the distribution of some interesting categorical columns (author, language, genre, publisher, setting).
We wanted to know if the categories were uniformly spread, or if there were many rarely-used categories and a few common ones. It turns out that the latter is true for every categorical column, though at different amplitudes.

For the publishers, we had noticed that many entries were very very similar but not exactly equal. We call them quasi-duplicates. We tried to do some statistical analysis to show that, but neither the method nor the results were really conclusive. Still, we gave some examples of the issue. 
These quasi-duplicates are a problem if we want to make a meaningful visualization later on. This worsens the previously mentioned non-uniform spread of values, too.

For the languages, a large majority of books in the dataset were written in English (42661 books), and only a few thousands of books are available in all the other languages. We'll surely select only English books in our visualization, so that it's easier to make similarity analyses between their descriptions.

We tried seeing if the author had a significant correlation with the book's rating, and we found a correlation of about 0. Also, we saw that the large majority of ratings are high. We count only 310 ratings under 3 out of 5, out of the 68'000 available ratings. Their mean is 4.04 and their standard deviation is 0.35, so we will probably rescale them.

Finally, we checked if there were any obvious correlations between the different numerical statistics from the books. The analysis is yet fairly simple and only yields minor insights (summarizing correlation visualization below, more details in the notebook).

![Correlation of numerical columns](img/first_numerical_corr.png)

With this picture, we see that we do not have strong correlations on first sight. There might be little relevant to show graphs about how a variable influence another as we initially planned. Assessing the correlations would require more in-depth analysis.

### Related work

What has been already done with this data:
The "Best Book Dataset" has been used by Stacy Stephanie McDonald for her Master's paper. She used this Dataset to simulate a library dataset as she was developing a Library Management System. You can see her paper [here](https://cdr.lib.unc.edu/downloads/wd376493v). 

#### Originality of our approach:

Our approach is interesting as it focuses on recommendation based on a similarity measure on the books' descriptions. Also, in our website, we don't want to sell books. We want to display them. So the way we will visualize them will be totally different.

#### Sources of inspiration for the project:
Here are some websites that inspire us for our web design. They do not use the same dataset as we.

* [What Should I Read Next?](https://www.whatshouldireadnext.com/) - In this website, the search bar and the way it is showing the recommendations in a list are great.
* [PlaySuisse](https://www.playsuisse.ch/) - The way the films are shown is instinctive and fluid. It would be very innovative to do so with books. Also, when we put our mouse on a film without clicking on it, we have more infomation that shows, such as the title, the genre and the duration. We can imagine to do the same for the books with the title, the author, the genre and the number of pages.
* [Whichbook](https://www.whichbook.net/) - In the bottom, under the "Trending books", is the type of visualisation we want. Here also, when you select one of those books, the way it displays informations about that book is what we want to achieve.

## Milestone 2 (6th May, 5pm)

The PDF of Milestone 2 can be found [here](milestones/Milestone2Submission.pdf)
