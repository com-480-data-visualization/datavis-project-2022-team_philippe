
////////////////////////////////////////////////////////////////////////////////
//
// JavaScript code for the Tinder Pages
//
// I took the 10 first books of our dataset in "data"
////////////////////////////////////////////////////////////////////////////////

// Copy paste of 10 books
const ten_csv_data = `bookId,"title","series","author","rating","description","language","isbn","genres","characters","bookFormat","edition","pages","publisher","publishDate","firstPublishDate","awards","numRatings","ratingsByStars","likedPercent","setting","coverImg","bbeScore","bbeVotes","price"
2767052-the-hunger-games,"The Hunger Games","The Hunger Games #1","Suzanne Collins","4.33","WINNING MEANS FAME AND FORTUNE.LOSING MEANS CERTAIN DEATH.THE HUNGER GAMES HAVE BEGUN. . . .In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and once girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.Sixteen-year-old Katniss Everdeen regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead beforeâ€”and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.","English","9780439023481","['Young Adult', 'Fiction', 'Dystopia', 'Fantasy', 'Science Fiction', 'Romance', 'Adventure', 'Teen', 'Post Apocalyptic', 'Action']","['Katniss Everdeen', 'Peeta Mellark', 'Cato (Hunger Games)', 'Primrose Everdeen', 'Gale Hawthorne', 'Effie Trinket', 'Haymitch Abernathy', 'Cinna', 'President Coriolanus Snow', 'Rue', 'Flavius', 'Lavinia (Hunger Games)', 'Marvel', 'Glimmer', 'Clove', 'Foxface', 'Thresh', 'Greasy Sae', 'Madge Undersee', 'Caesar Flickerman', 'Claudius Templesmith', 'Octavia (Hunger Games)', 'Portia (hunger Games)']","Hardcover","First Edition","374","Scholastic Press","09/14/08","","['Locus Award Nominee for Best Young Adult Book (2009)', 'Georgia Peach Book Award (2009)', 'Buxtehuder Bulle (2009)', 'Golden Duck Award for Young Adult (Hal Clement Award) (2009)', ""Grand Prix de l'Imaginaire Nominee for Roman jeunesse Ã©tranger (2010)"", 'Books I Loved Best Yearly (BILBY) Awards for Older Readers (2012)', ""West Australian Young Readers' Book Award (WAYRBA) for Older Readers (2010)"", ""Red House Children's Book Award for Older Readers & Overall (2010)"", 'South Carolina Book Award for Junior and Young Adult Book (2011)', 'Charlotte Award (2010)', 'Colorado Blue Spruce Young Adult Book Award (2010)', 'Teen Buckeye Book Award (2009)', ""Pennsylvania Young Readers' Choice Award for Young Adults (2010)"", 'Rhode Island Teen Book Award (2010)', ""Dorothy Canfield Fisher Children's Book Award (2010)"", 'Evergreen Teen Book Award (2011)', 'Soaring Eagle Book Award (2009)', 'Milwaukee County Teen Book Award Nominee (2010)', 'Sakura Medal for Middle School Book (2010)', 'Michigan Library Association Thumbs Up! Award (2009)', 'Florida Teens Read (2009)', 'Deutscher Jugendliteraturpreis for Preis der Jugendjury (2010)', 'Iowa High School Book Award (2011)', 'New Mexico Land of Enchantment Award for Young Adult (2011)', 'Eliot Rosewater Indiana High School Book Award (2010)', 'The Inky Awards for Silver Inky (2009)', 'California Young Readers Medal for Young Adult (2011)', 'Lincoln Award (2011)', 'Kinderboekwinkelprijs (2010)', 'Missouri Truman Readers Award (2011)', 'CYBILS Award for Young Adult Fantasy & Science Fiction (2008)', 'Literaturpreis der Jury der jungen Leser for Jugendbuch (2010)', 'The Inky Awards Shortlist for Silver Inky (2009)', 'Prix Et-lisez-moi (2011)', 'Missouri Gateway Readers Award (2011)', 'Oklahoma Sequoyah Award for High School and Intermediate (2011)', 'Premio El Templo de las Mil Puertas for Mejor novela extranjera perteneciente a saga (2009)', ""Rebecca Caudill Young Readers' Book Award (2011)"", 'LovelyBooks Leserpreis for Fantasy (2009)', 'LovelyBooks Leserpreis for Bestes Cover/Umschlag (2009)', 'Premi Protagonista Jove for Categoria 13-14 anys (2010)']","6376780","['3444695', '1921313', '745221', '171994', '93557']","96","['District 12, Panem', 'Capitol, Panem', 'Panem (United States)']","https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722975l/2767052.jpg","2993816","30516",5.09
2.Harry_Potter_and_the_Order_of_the_Phoenix,"Harry Potter and the Order of the Phoenix","Harry Potter #5","J.K. Rowling, Mary GrandPrÃ© (Illustrator)","4.50","There is a door at the end of a silent corridor. And itâ€™s haunting Harry Pottterâ€™s dreams. Why else would he be waking in the middle of the night, screaming in terror?Harry has a lot on his mind for this, his fifth year at Hogwarts: a Defense Against the Dark Arts teacher with a personality like poisoned honey a big surprise on the Gryffindor Quidditch team and the looming terror of the Ordinary Wizarding Level exams. But all these things pale next to the growing threat of He-Who-Must-Not-Be-Named - a threat that neither the magical government nor the authorities at Hogwarts can stop.As the grasp of darkness tightens, Harry must discover the true depth and strength of his friends, the importance of boundless loyalty, and the shocking price of unbearable sacrifice.His fate depends on them all.","English","9780439358071","['Fantasy', 'Young Adult', 'Fiction', 'Magic', 'Childrens', 'Adventure', 'Audiobook', 'Middle Grade', 'Classics', 'Science Fiction Fantasy']","['Sirius Black', 'Draco Malfoy', 'Ron Weasley', 'Petunia Dursley', 'Vernon Dursley', 'Dudley Dursley', 'Severus Snape', 'Rubeus Hagrid', 'Lord Voldemort', 'Minerva McGonagall', 'Neville Longbottom', 'Fred Weasley', 'George Weasley', 'Percy Weasley', 'Ginny Weasley', 'Colin Creevey', 'Filius Flitwick', 'Gilderoy Lockhart', 'Lucius Malfoy', 'Pomona Sprout', 'Arthur Weasley', 'Molly Weasley', 'Cho Chang', 'Cornelius Fudge', 'Remus Lupin', 'Sybil Trelawney', 'Stan Shunpike', 'Bellatrix Lestrange', 'Alastor Moody', 'Rita Skeeter', 'Luna Lovegood', 'Nymphadora Tonks', 'Dolores Umbridge', 'Dobby', 'Kingsley Shacklebolt', 'Padma Patil', 'Parvati Patil', 'Kreacher', 'Dean Thomas', 'Seamus Finnigan', 'Albus Dumbledore', 'Harry Potter', 'Hermione Granger', 'Lavender Brown']","Paperback","US Edition","870","Scholastic Inc.","09/28/04","06/21/03","['Bram Stoker Award for Works for Young Readers (2003)', 'Anthony Award for Young Adult (2004)', ""Mythopoeic Fantasy Award for Children's Literature (2008)"", 'Audie Award for Audiobook of the Year (2004)', 'Books I Loved Best Yearly (BILBY) Awards for Older Readers (2004)', 'Colorado Blue Spruce Young Adult Book Award (2006)', 'Golden Archer Award for Middle/Junior High (2005)', 'Deutscher Jugendliteraturpreis Nominee for Preis der Jugendjury (2004)', 'Carnegie Medal Nominee (2003)']","2507623","['1593642', '637516', '222366', '39573', '14526']","98","['Hogwarts School of Witchcraft and Wizardry (United Kingdom)', 'London, England']","https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546910265l/2.jpg","2632233","26923",7.38
2657.To_Kill_a_Mockingbird,"To Kill a Mockingbird","To Kill a Mockingbird","Harper Lee","4.28","The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.Compassionate, dramatic, and deeply moving, To Kill A Mockingbird takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature.","English","9999999999999","['Classics', 'Fiction', 'Historical Fiction', 'School', 'Literature', 'Young Adult', 'Historical', 'Novels', 'Read For School', 'High School']","['Scout Finch', 'Atticus Finch', 'Jem Finch', 'Arthur Radley', 'Mayella Ewell', 'Aunt Alexandra', 'Bob Ewell', 'Calpurnia (housekeeper)', 'Tom Robinson', 'Miss Maudie Atkinson', 'Judge John Taylor', 'Dill Harris', 'Heck Tate', 'Stephanie Crawford']","Paperback","","324","Harper Perennial Modern Classics","05/23/06","07/11/60","['Pulitzer Prize for Fiction (1961)', 'Audie Award for Classic (2007)', 'National Book Award Finalist for Fiction (1961)', 'Alabama Author Award for Fiction (1961)']","4501075","['2363896', '1333153', '573280', '149952', '80794']","95","['Maycomb, Alabama (United States)']","https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg","2269402","23328",""
1885.Pride_and_Prejudice,"Pride and Prejudice","","Jane Austen, Anna Quindlen (Introduction)","4.26","Alternate cover edition of ISBN 9780679783268Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work ""her own darling child"" and its vivacious heroine, Elizabeth Bennet, ""as delightful a creature as ever appeared in print."" The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy, is a splendid performance of civilized sparring. And Jane Austen's radiant wit sparkles as her characters dance a delicate quadrille of flirtation and intrigue, making this book the most superb comedy of manners of Regency England.","English","9999999999999","['Classics', 'Fiction', 'Romance', 'Historical Fiction', 'Literature', 'Historical', 'Novels', 'Historical Romance', 'Classic Literature', 'Adult']","['Mr. Bennet', 'Mrs. Bennet', 'Jane Bennet', 'Elizabeth Bennet', 'Mary Bennet', 'Kitty Bennet', 'Lydia Bennet', 'Louisa Hurst', 'Caroline Bingley', 'Fitzwilliam Darcy', 'Georgiana Darcy', 'Lady Catherine de Bourgh', 'Anne de Bourgh', 'Colonel Fitzwilliam', 'Mr. Gardiner', 'Mrs. Gardiner', 'Sir William Lucas', 'Lady Lucas', 'Charlotte Lucas', 'Maria Lucas', 'Mr. Darcy', 'Charles Bingley', 'George Wickham', 'Mr. William Collins']","Paperback","Modern Library Classics, USA / CAN","279","Modern Library","10/10/00","01/28/13","[]","2998241","['1617567', '816659', '373311', '113934', '76770']","94","['United Kingdom', 'Derbyshire, England (United Kingdom)', 'England', 'Hertfordshire, England (United Kingdom)']","https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885.jpg","1983116","20452",""
41865.Twilight,"Twilight","The Twilight Saga #1","Stephenie Meyer","3.60","About three things I was absolutely positive. First, Edward was a vampire. Second, there was a part of himâ€”and I didn't know how dominant that part might beâ€”that thirsted for my blood. And third, I was unconditionally and irrevocably in love with him. Deeply seductive and extraordinarily suspenseful, Twilight is a love story with bite.","English","9780316015844","['Young Adult', 'Fantasy', 'Romance', 'Vampires', 'Fiction', 'Paranormal', 'Paranormal Romance', 'Supernatural', 'Teen', 'Urban Fantasy']","['Edward Cullen', 'Jacob Black', 'Laurent', 'Renee', 'Bella Swan', 'Billy Black', 'Esme Cullen', 'Alice Cullen', 'Jasper Hale', 'Carlisle Cullen', 'Emmett Cullen', 'Rosalie Hale', 'Charlie Swan', 'Mike Newton', 'Jessica Stanley', 'Angela Weber', 'Tyler Crowley']","Paperback","","501","Little, Brown and Company","09/06/06","10/05/05","['Georgia Peach Book Award (2007)', 'Buxtehuder Bulle (2006)', 'Kentucky Bluegrass Award for 9-12 (2007)', 'Prijs van de Kinder- en Jeugdjury Vlaanderen (2008)', 'Books I Loved Best Yearly (BILBY) Awards for Older Readers (2009)', ""West Australian Young Readers' Book Award (WAYRBA) for Older Readers (2008)"", 'Garden State Book Award for Fiction (Grades 9-12) (2008)', 'South Carolina Book Award for Young Adult Book Award (2008)', 'Grand Canyon Reader Award for Teen Book (2008)', 'Maryland Black-Eyed Susan Book Award for High School (2008)', 'Golden Sower Award for Young Adult (2009)', ""Nevada Young Readers' Award for Young Adult Category  (2007)"", ""The Flume: New Hampshire Teen Reader's Choice Award (2007)"", ""Pennsylvania Young Readers' Choice Award for Young Adult (2009)"", 'Rhode Island Teen Book Award (2007)', 'Evergreen Teen Book Award (2008)', 'Michigan Library Association Thumbs Up! Award Nominee (2006)', 'Teen Read Award Nominee for Best All-Time-Fave (2010)', 'Deutscher Jugendliteraturpreis Nominee for Preis der Jugendjury (2007)', 'Iowa High School Book Award (2008)', 'Eliot Rosewater Indiana High School Book Award (2008)', 'Lincoln Award (2008)', 'Literaturpreis der Jury der jungen Leser for Cover (2007)', 'Prix Et-lisez-moi (2008)', 'Missouri Gateway Readers Award (2008)']","4964519","['1751460', '1113682', '1008686', '542017', '548674']","78","['Forks, Washington (United States)', 'Phoenix, Arizona (United States)', 'Washington (state) (United States)']","https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1361039443l/41865.jpg","1459448","14874",2.1
19063.The_Book_Thief,"The Book Thief","","Markus Zusak (Goodreads Author)","4.37","Librarian's note: An alternate cover edition can be found hereIt is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will be busier still.By her brother's graveside, Liesel's life is changed when she picks up a single object, partially hidden in the snow. It is The Gravedigger's Handbook, left behind there by accident, and it is her first act of book thievery. So begins a love affair with books and words, as Liesel, with the help of her accordian-playing foster father, learns to read. Soon she is stealing books from Nazi book-burnings, the mayor's wife's library, wherever there are books to be found.But these are dangerous times. When Liesel's foster family hides a Jew in their basement, Liesel's world is both opened up, and closed down.In superbly crafted writing that burns with intensity, award-winning author Markus Zusak has given us one of the most enduring stories of our time.(Note: this title was not published as YA fiction)","English","9780375831003","['Historical Fiction', 'Fiction', 'Young Adult', 'Historical', 'Classics', 'War', 'Holocaust', 'World War II', 'Books About Books', 'Audiobook']","['Liesel Meminger', 'Hans Hubermann', 'Rudy Steiner', 'Rosa Hubermann', 'Max Vandenburg', 'Tommy MÃ¼ller', 'Ilsa Hermann', 'Frau Holtzapfel']","Hardcover","First American Edition","552","Alfred A. Knopf","03/14/06","09/01/05","['National Jewish Book Award for Childrenâ€™s and Young Adult Literature (2006)', ""Book Sense Book of the Year Award for Children's Literature (2007)"", 'Buxtehuder Bulle (2008)', 'Sydney Taylor Book Award for Teen Readers (2007)', 'Prijs van de Kinder- en Jeugdjury Vlaanderen (2009)', 'Michael L. Printz Award Nominee (2007)', 'Exclusive Books Boeke Prize (2007)', 'Rhode Island Teen Book Award Nominee (2008)', 'The Quill Award Nominee for Young Adult/Teen (2006)', 'Zilveren Zoen (2008)', 'Teen Read Award Nominee for Best All-Time-Fave (2010)', 'Deutscher Jugendliteraturpreis for Preis der Jugendjury (2009)', 'Association of Jewish Libraries for Teen Book Award (2006)', 'Lincoln Award Nominee (2010)', 'Australian Book Industry Award (ABIA) Nominee for Literary Fiction (2008)', 'Kathleen Mitchell Award', 'Ena Noel Award (2008)', 'Literaturpreis der Jury der jungen Leser for Jugendbuch (2009)', 'LovelyBooks Leserpreis for Allgemeine Literatur (2009)', 'Margaret A. Edwards Award (2014)']","1834276","['1048230', '524674', '186297', '48864', '26211']","96","['Molching (Germany)', 'Germany']","https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1522157426l/19063._SY475_.jpg","1372809","14168",3.8
170448.Animal_Farm,"Animal Farm","","George Orwell, Russell Baker (Preface), C.M. Woodhouse (Introduction)","3.95","Librarian's note: There is an Alternate Cover Edition for this edition of this book here.A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality. Thus the stage is set for one of the most telling satiric fables ever penned â€“a razor-edged fairy tale for grown-ups that records the evolution from revolution against tyranny to a totalitarianism just as terrible. When Animal Farm was first published, Stalinist Russia was seen as its target. Today it is devastatingly clear that wherever and whenever freedom is attacked, under whatever banner, the cutting clarity and savage comedy of George Orwellâ€™s masterpiece have a meaning and message still ferociously fresh.","English","9780451526342","['Classics', 'Fiction', 'Dystopia', 'Fantasy', 'Literature', 'Politics', 'School', 'Science Fiction', 'Novels', 'Read For School']","['Snowball', 'Napoleon', 'Clover', 'Boxer', 'Old Major', 'Muriel', 'Jones', 'Squealer', 'Moses the Raven', 'Benjamin']","Mass Market Paperback","","141","Signet Classics","04/28/96","08/17/45","['Prometheus Hall of Fame Award (2011)', 'Retro Hugo Award for Best Novella (1996)']","2740713","['986764', '958699', '545475', '165093', '84682']","91","['England', 'United Kingdom']","https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1325861570l/170448.jpg","1276599","13264",4.42
11127.The_Chronicles_of_Narnia,"The Chronicles of Narnia","The Chronicles of Narnia (Publication Order) #1â€“7","C.S. Lewis, Pauline Baynes (Illustrator)","4.26","Journeys to the end of the world, fantastic creatures, and epic battles between good and evilâ€”what more could any reader ask for in one book? The book that has it all is The Lion, the Witch and the Wardrobe, written in 1949 by Clive Staples Lewis. But Lewis did not stop there. Six more books followed, and together they became known as The Chronicles of Narnia.For the past fifty years, The Chronicles of Narnia have transcended the fantasy genre to become part of the canon of classic literature. Each of the seven books is a masterpiece, drawing the reader into a land where magic meets reality, and the result is a fictional world whose scope has fascinated generations.This edition presents all seven booksâ€”unabridgedâ€”in one impressive volume. The books are presented here in chronlogical order, each chapter graced with an illustration by the original artist, Pauline Baynes. Deceptively simple and direct, The Chronicles of Narnia continue to captivate fans with adventures, characters, and truths that speak to readers of all ages, even fifty years after they were first published.","English","9999999999999","['Fantasy', 'Classics', 'Fiction', 'Young Adult', 'Childrens', 'Christian', 'Adventure', 'Science Fiction Fantasy', 'Middle Grade', 'Christian Fiction']","['Polly', 'Aslan', 'Lucy Pevensie', 'Edmund Pevensie', 'Eustace Scrubb', 'Prince Caspian', 'Jill Pole', 'Prince Rilian', 'Puddleglum', 'Trumpkin', 'Jewel', 'Aravis', 'Mr. Tumnus', 'Puzzle', 'King Tirian', 'Digory Kirke', 'Peter Pevensie', 'Susan Pevensie', 'Reepicheep', 'Jadis', 'Bacchus (god)', 'Mr. & Mrs. Beaver', 'Andrew Kirke', 'Shasta', 'Silenus', 'Nikabrik', 'King Miraz', 'Dr. Cornelius', 'Trufflehunter', 'Shift']","Paperback","Reissue Edition","767","HarperCollins","09/16/02","10/28/56","[]","517740","['254964', '167572', '74362', '15423', '5419']","96","['London, England']","https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1449868701l/11127._SY475_.jpg","1238556","12949",""
30.J_R_R_Tolkien_4_Book_Boxed_Set,"J.R.R. Tolkien 4-Book Boxed Set: The Hobbit and The Lord of the Rings","The Lord of the Rings #0-3","J.R.R. Tolkien","4.60","This four-volume, boxed set contains J.R.R. Tolkien's epic masterworks The Hobbit and the three volumes of The Lord of the Rings (The Fellowship of the Ring, The Two Towers, and The Return of the King).In The Hobbit, Bilbo Baggins is whisked away from his comfortable, unambitious life in Hobbiton by the wizard Gandalf and a company of dwarves. He finds himself caught up in a plot to raid the treasure hoard of Smaug the Magnificent, a large and very dangerous dragon.The Lord of the Rings tells of the great quest undertaken by Frodo Baggins and the Fellowship of the Ring: Gandalf the wizard the hobbits Merry, Pippin, and Sam Gimli, the dwarf, Legolas the elf, Boromir of Gondor,  and a tall, mysterious stranger called Strider. J.R.R. Tolkien's three volume masterpiece is at once a classic myth and a modern fairy taleâ€”a story of high and heroic adventure set in the unforgettable landscape of Middle-earth","English","9780345538376","['Fantasy', 'Fiction', 'Classics', 'Adventure', 'Science Fiction Fantasy', 'Epic Fantasy', 'High Fantasy', 'Young Adult', 'Literature', 'Magic']","['Frodo Baggins', 'Gandalf', 'Bilbo Baggins', 'Gollum']","Mass Market Paperback","Hobbit Movie Tie-in Boxed set","1728","Ballantine Books","09/25/12","10/20/55","[]","110146","['78217', '22857', '6628', '1477', '967']","98","['Middle-earth']","https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1346072396l/30.jpg","1159802","12111",21.15
18405.Gone_with_the_Wind,"Gone with the Wind","","Margaret Mitchell","4.30","Scarlett O'Hara, the beautiful, spoiled daughter of a well-to-do Georgia plantation owner, must use every means at her disposal to claw her way out of the poverty she finds herself in after Sherman's March to the Sea.","English","9780446675536","['Classics', 'Historical Fiction', 'Fiction', 'Romance', 'Historical', 'War', 'Literature', 'Civil War', 'Historical Romance', 'Novels']","[""Scarlett O'Hara"", 'Rhett Butler', 'Ashley Wilkes', 'Melanie Hamilton Wilkes', 'Wade Hampton Hamilton', 'Ella Lorena Kennedy', 'Eugenie Victoria ""Bonnie Blue"" Butler', 'Beau Wilkes', 'India Wilkes', 'Honey Wilkes', 'John  Wilkes', ""Gerald O'Hara"", ""Ellen O'Hara"", ""Suellen O'Hara"", ""Carreen O'Hara"", 'Eulalie', 'Pauline', 'Mammy Abigail', 'Prissy', 'Pork', 'Dilcey', 'Charles Hamilton', 'Frank Kennedy', 'Belle Watling', 'Jonas Wilkerson', 'Emmie Slattery', 'Will Benteen', 'Aunt Pittypat Hamilton', 'Uncle Peter']","Mass Market Paperback","","1037","Warner Books","04/01/99","06/30/36","['Pulitzer Prize for Novel (1937)', 'National Book Award for Novel (1936)']","1074620","['602138', '275517', '133535', '39008', '24422']","94","['Atlanta, Georgia (United States)']","https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1551144577l/18405._SY475_.jpg","1087732","11211",5.58`;

// Transform data to object
const tinder_data = d3.csvParse(ten_csv_data);

//console.log(data);
//console.log(data[0]);

for (let i=0 ; i<10 ; i++){

    // Grenerate a card
    var CardId = "TinderCard"+i;
    //console.log(CardId);
    var TinderCard = document.createElement('div');
    TinderCard.classList.add("tinder--card");
    TinderCard.id = CardId;
    document.getElementById("TinderCards").appendChild(TinderCard);

   //Display the image
   var TinderImageUrl = tinder_data[i].coverImg;
   var TinderImg = document.createElement('img');
   TinderImg.src = TinderImageUrl;
   document.getElementById(CardId).appendChild(TinderImg);
}




//////////////////////////////////////////////////////////// Tinder card Code
'use strict';

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');

function initCards(card, index) {
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });

  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  ///////////////// CARD MOVMENT ///////////////////////
  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  ///////////////// CARD RELEASE /////////////////
  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');


    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    ////////////////// COMME BACK //////////////////
    if (keep) {
      event.target.style.transform = '';

    ///////////////// VANISH ///////////////////
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      if(xMulti>0){
        console.log("<3");
      }else {
        console.log("X");
      }

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add('removed');

    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
      console.log("<3")
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
      console.log("X")
    }

    initCards();

    event.preventDefault();
  };
}


var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);
