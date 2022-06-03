import csv
import random

random.seed()

with open('../../data/books.csv', newline='') as csvfile:
    with open('degueu.csv', 'w', newline='') as outfile:
        reader = csv.DictReader(csvfile)
        writer = csv.DictWriter(
            outfile,
            ['id', 'parent', 'likeability', 'coverurl', 'desc', 'title'],
        )

        writer.writeheader()
        writer.writerow({
            "id": "ROOT",
            "parent": "",
            "likeability": "",
            "coverurl": "",
            "desc": "",
            "title": ""
        })

        genres = set()
        count = 0

        for row in reader:
            if count > 5000:
                break

            try:
                genre = eval(row["genres"])[0]  # dinguerie
            except:
                genre = "Unknown"
            genres.add(genre)

            writer.writerow({
                "id": row["bookId"],
                "parent": genre,
                "likeability": random.uniform(0.0, 1.0),
                "coverurl": row["coverImg"],
                "desc": row["description"].replace("\n", " ").replace("`", "'s"),
                "title": row["title"]
            })

            count += 1

        for genre in genres:
            writer.writerow({
                "id": genre,
                "parent": "ROOT",
                "likeability": "",
                "coverurl": "",
                "desc": "",
                "title": genre
            })
