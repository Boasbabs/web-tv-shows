# Web TV Shows

An application that allows users to view [TV shows API](http://www.tvmaze.com/api) to create 
an application that allows users to view a few lists(preferable horizontal list) of
 TV shows based on different genres (drama, comedy, sports, etc.).

Hosted on: [adeyemi.web-tv-shows.surge.sh](http://adeyemi.web-tv-shows.surge.sh)

By [Adeyemi Babalola](mailto:babalolasimeon@gmail.com)

## Instructions

1. Navigate to [repo](https://github.com/Boasbabs/web-tv-shows.git)
2. Clone locally using
   `git clone git@github.com:Boasbabs/web-tv-shows.git`
3. Install dependencies using `yarn install`
4. Run tests using `yarn test`
5. Start your server using `yarn start`
6. Navigate to app in [browser](http://localhost:3000)
7. Enjoy!

## Discussion

I used the following technologies: 
- HTML 
- SCSS 
- React
- Jest 
- React Testing Library

I used [create-react-app](https://goo.gl/26jfy4)
to generate the scaffolding for this app.

## Highlights

- Routing implementation
- Code organization/architecture 
- Integration tests

## Bonuses!

- Datatable is paginated
- Make the app responsive
- Notification for error or bad network request
- Add UI tests; located `src/views/Shows/index.test.js`

## Requirements

- Ability to display a few popular TV shows based on their rating and genre 
- When the user clicks on a TV show, the details of that TV show should be displayed on another screen.
- User can search for a TV show to get the details
