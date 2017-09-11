# react-book-finder

This is a React Progressive Web Application using the Google Books API to find and sort books by a variety of filters and save them to a favorites list. 

Features include:

- search under a variety off filters
- save and remove books to favorties list
- browse favorites offline
- purchase title from Google books

I followed Material Design principles for designing the interface.The project uses the service worker API to cache the app shell and IndexedDB to store the favorites list in the browser for offline viewing. Users can add this add to their mobile screen thanks to the service worker API as well.

The backend is a Mongo database that is accesses through an Node API built with RESTful architecture.

The project uses Google analytics for event tracking, uses schema markup to expose it to search engines and Open Graph Protocol for social sharing.

[View Project](https://joshboyan.github.io/react-book-finder/)

[User story #1: I can look up books in a variety of ways.](https://github.com/joshboyan/react-book-finder/projects/1)

[User story #2: I can purchase the book or save it to a list for later.](https://github.com/joshboyan/react-book-finder/projects/2)

[User story #3: I can use the app with low connectivity.](https://github.com/joshboyan/react-book-finder/projects/3)

[Finishing touches](https://github.com/joshboyan/react-book-finder/projects/4)
