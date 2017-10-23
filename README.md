# Watch this. - Project 2

## Heroku Link: https://still-thicket-86849.herokuapp.com/

## Trello Board: https://trello.com/b/9AK94tOo/watch-this

## Wireframes

### Login Page:
![signup_page](https://user-images.githubusercontent.com/22715776/31916691-30c429e8-b811-11e7-8080-a1bffe12514f.png)

### Discover/Media Profile Pages:
![_profile_movie_pages](https://user-images.githubusercontent.com/22715776/31916807-b31dbf1c-b811-11e7-8e68-6479c9b2d36b.png)

### Watched/Review Page:
![home_page](https://user-images.githubusercontent.com/22715776/31916757-8672cbf6-b811-11e7-9bd2-f3aee9baa16a.png)

### App Purpose:
Finding new shows and movies to watch on the fly can be a hassle. "Watch this." helps alleviate that by using an API to search through a massive database and finding just about any movie or show they can think of. Users can add media that interests them to their queue. After they watch that movie or show, they can choose to either remove the media from their queue, or move it to a "watched" list that they can comment on and refer to in the future.

### Approach Taken:
Once the user is logged in, they are taken to the "discover movies" page. From here, an API call is made and pulls the most popular movies accoring to their database. As the user scrolls down the page, the call is made again, this time adjusting the page number of the API call so that content can be loaded forever. Users can also search by genre and by name of media as well. Because the API call is different for movies and television shows, I implemented two different discover sections...one for movies and one for shows.

All of the media is loaded on the page using jquery and are all links to individual media profile pages. When a user clicks on the media poster, they are taken to the profile page.

From the profile page, users add media to their queue. By doing so, the media's ID, Title, and Posterpath are sent to the database and pushed into the corresponding array of the User model. When the user bring up their queued and watched lists, the data being shown is being pulled from these arrays. 

When a user chooses to add media to their watched list, the media is deleted from the queue array in the database for that model and a new model is pushed into their watched array.

In the Schema movies and shows, there is an empty comment property. When users choose to leave a comment on the media, the comment is technically being edited each time.




