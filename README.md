# NFL Predictor

## About
NFL Predictor is an interactive web application that presents rich visualizations of play-by-play win probabilities of all NFL games from 2000 to 2015. To showcase a machine learning algorithm, we were tasked with visualizing the win probabilities outputted by a random forest model trained on a set of NFL data. This project was built during my internship at Salesforce to visualize a prediction algorithm using NFL data for demonstration purposes.

## Contributors
[@dylanvu](https://github.com/dylanvu) - Intern
[@AnthonyVanPelt](https://github.com/AnthonyVanPelt) - Intern
[@gpascale](https://github.com/gpascale) - Manager

## Demo
[![NFL Predictor Demo](http://img.youtube.com/vi/XxzFLxDKDis/0.jpg)](http://www.youtube.com/watch?v=XxzFLxDKDis "NFL Predictor")

## Features
- Select and filter historical NFL games between 2000 - 2015 by seasons and weeks.
- Hovering over the chart reveals a tooltip popup that contains quarter, time, and scores of the current play along with the win probability after the play had been made.
- While hovering over chart, additional play information such as type of play, yard gain/loss, win probability swing, down, and yards to go is displayed below on the bird's eye view field widget. 
- A top plays widget displays a list of the top 10 plays of a selected game containing play type, team who made the play, time it was made, the quarter it happened in, and the win probability swing. Top plays are defined by how big a win probability change is.
- Hovering over the top plays widget highlights the corresponding play plot and reveals the tooltip on the chart while also displaying additional play information on the field widget below.
- View top 12 most exciting and top 12 most boring games. Exciting/boring games are defined by the sum of the absolute values of changes in win probability.

## Technology
- HTML
- CSS
- JavaScript
- jQuery
- Node.js
- Express
- Highcharts
- Bootstrap

## Data
[NFL Data from armchairanalysis](http://www.armchairanalysis.com/)
