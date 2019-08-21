- demo what we're building: resift rentals

- 10 components in this demo

  - MovieDrawer (shows movie details)
  - MovieForm (allows editing of a movie)
  - Categories (gets every category)
  - Category (gets the movies in the list/infinite scroll)
  - MoviePreview (thumbnail in the category)

- 4 total endpoints:

  - getting all categories
  - getting paginated movies
  - getting a movie
  - updating a movie

- `MovieDrawer`: "normal" fetch that can create many fetch instances

  - component demo
  - what's a fetch? a fetch is like an order
  - movie example: defineFetch creates fetch factories (define the movie fetch in the code)
  - fetch factories create fetch instances
  - usage of `useFetch` inside `MovieDrawer`
    - a fetch instance (aka just a fetch) is used to pull up information associated its key
    - a fetch instance is used to dispatch a request for that data as well

- `Loader`: a component that uses the status and prevents rendering until the status is normal

  - takes in a status
  - accepts a function as a child to prevent rendering until there is data

- `MovieForm`: fetch that shows doing a mutation on the backend

  - component demo
  - creating the fetch
  - what's the difference between `make` args and `request` args?
  - component demo, show inconsistency after update
  - no fear, `namespace` is here
  - current fetch factory + `namespace` + `key` determines how/where to cache the data

- `Categories` "singleton" fetch that can create just one fetch instance

  - component demo
  - creating the fetch
  - but there's no key! --just leave it empty
  - the number of unique fetch instances a fetch factory can create is dependent on the number of unique keys that can exist
  - there is only one unique key
  - convention: invoke the fetch factory once to get the only possible fetch instance, then export that
  - using the `categoriesFetch`, `useFetch` + `dispatch`

- `Category` infinite scroll demo: fetch that uses share to share state between data calls

  - component demo
  - creating the fetch without pagination
  - using the fetch in the component
  - adding the page param to the request args
  - implementing infinite scroll `merge`
  - demo infinite scrolling
  - last thing: using skeleton loaders

- Pre-fetching

  - when the user mouses over the movie preview, we can use it as an event to pre-fetch the movie
  - the results of that fetch will be available because fetches are store and saved globally

- Custom hooks

  - lot of commonalities between `MovieForm` and `MovieDrawer`, we could extract this logic in a custom hook
  - this custom hook will use our other custom hook for routing `useLocation` and `useHistory`
  - behavior of the hook:
    - look at the ID of the movie in the URL
    - dispatch a request if that movie isn't there yet
    - pull that movie out of the store with `useFetch`

- More features

  - ability to write custom data services
  - integration with redux + redux dev tools

That's it!
