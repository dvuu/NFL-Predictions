# NFL Predictor

### About
NFL Predictor is an interactive web application that presents rich visualizations of play-by-play win probabilities of historical NFL games outputted from a random forest model.

### Demo
[![NFL Predictor Demo](http://img.youtube.com/vi/XxzFLxDKDis/0.jpg)](http://www.youtube.com/watch?v=XxzFLxDKDis "NFL Predictor")

### Features
- Select and filter historical NFL games between 2000 - 2015 by seasons and weeks.
- Hovering over the chart reveals a tooltip popup that contains quarter, time, and scores of the current play along with the win probability after the play had been made.
- While hovering over chart, additional play information such as type of play, yard gain/loss, win probability swing, down, and yards to go is displayed below on the bird's eye view field widget. 
- A top plays widget displays a list of the top 10 plays of a selected game containing play type, team who made the play, time it was made, the quarter it happened in, and the win probability swing. Top plays are defined by how big a win probability change is.
- Hovering over the top plays widget highlights the corresponding play plot and reveals the tooltip on the chart while also displaying additional play information on the field widget below.
- View top 12 most exciting and top 12 most boring games. Exciting/boring games are defined by the sum of the absolute values of changes in win probability.

### Technology
- HTML
- CSS
- JavaScript
- jQuery
- Node.js
- Express
- Highcharts
- Bootstrap

### Data
[NFL Data from armchairanalysis](http://www.armchairanalysis.com/)

### Future Development
- Migrate data to a SQL database

### Contributors
| ![alt text](https://avatars3.githubusercontent.com/u/16613572?v=3&s=300) | ![alt text](https://avatars0.githubusercontent.com/u/19943214?v=3&s=300 "Anthony Van Pelt") | ![alt text](https://avatars0.githubusercontent.com/u/325055?v=3&s=300 "Greg Pascale")
|:---:|:---:|:---:|
| Dylan Vu | Anthony Van Pelt | Greg Pascale |
| [@dylanvu](https://github.com/dylanvu) | [@AnthonyVanPelt](https://github.com/AnthonyVanPelt) | [@gpascale](https://github.com/gpascale) |
| | | Manager/Mentor |

#### Background information about this project...
Anthony and I came from a program called Year Up, a non-profit that empowers low-income urban young adults by providing hands on training and internships that lead to careers in IT in just one year without a single dime coming out of students pockets. 

After 6 months of training, we were selected by Salesforce to be interns on the data science team. However, we did not have any data science knowledge (long story). Thanks to our incredible mentor, Greg, we were able to make it work. Under his wing, we reviewed the HTML and CSS we briefly covered at Year Up, and then spent 2 months learning JavaScript before beginning to work on NFL Predictor.

Our team wanted us to have something to take with us at the end of internship so our boss thought of visualizing NFL win probabilities. Without exposing company secrets and getting sued (🤞🏼), the idea was to use NFL data as an analogy to Salesforce data to showcase a machine learning algorithm. From learning how to think like a programmer to actually doing the code, it was stressful but rewarding.

Special thanks to our mentor Greg (@gpascale) for being patient, open minded, and helping us the whole way!
