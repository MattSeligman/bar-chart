# Bar Chart

Use a Bar Chart to show off your latest data. Customize each chart by choosing the options that work best for you.


## Badges

Updates & Size            |  Issue(s) / Rating
:-------------------|:-----------
| ![GitHub issue/pull request detail](https://img.shields.io/github/issues/detail/last-update/MattSeligman/bar-chart/1) | [![GitHub issues](https://img.shields.io/github/issues/MattSeligman/bar-chart)](https://github.com/MattSeligman/bar-chart/issues)  |
| ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/MattSeligman/bar-chart) | [![GitHub forks](https://img.shields.io/github/forks/MattSeligman/bar-chart)](https://github.com/MattSeligman/bar-chart/network) |
|  | [![GitHub stars](https://img.shields.io/github/stars/MattSeligman/bar-chart)](https://github.com/MattSeligman/bar-chart/stargazers) |  

## Features

- Horizontal, Vertical & Stacked layouts
- Custom Width & Height
- Multiple options on the apperance of the chart Title, Bar, and Labels

## Chart Data Methods of Input
The bar chart supports a series of numbers or an object with labels and their values.

### Example of an Array
In the example below 1 array contains 7 number values. (Ended by a comma)  
`[ 10, 20, 3.5, 7, 5, 6, 15 ],`

To add a new bar value include `10,` within the array.

#### Chart Array Example
```Javascript
drawBarChart(
  [ 10, 20, 3.5, 7, 5, 6, 15 ],
  {
    width: '100%',
    height: '100%',
    verticalAxis: false,
    stacked: false
  }, 
  '#chart'
)
```

### Example of an Object
In the example below 1 array which contains 7 objects with the label name, and the value. (Ended by a comma)   
`[ {'Monday':10}, {'Tuesday':20}, {'Wednesday':3.5}, {'Thursday':7}, {'Friday':5}, {'Saturday':6}, {'Sunday':15} ],`

To add a new object include `{ 'Label': 10 },` within the array.

#### Chart Object Example
```Javascript
drawBarChart(
  [ {'Monday':10}, {'Tuesday':20}, {'Wednesday':3.5}, {'Thursday':7}, {'Friday':5}, {'Saturday':6}, {'Sunday':15} ],
  {
    width: '100%',
    height: '100%',
    verticalAxis: false,
    stacked: false
  }, 
  '#chart'
)
```

## Chart Options
Note: Add a comma unless it's the last option

| Chart Options | Attributions / Code  | Usage | Input Supports |
| :---          | :---- | :---  | :---     |
| width         | `width: '100%',`| Adjust the Width of the chart   | A `String` containing a `value` followed by a `%` or `px`.  |
| height        | `height: '100%',`| Adjust the height of the chart   | A `String` containing a `value` followed by a `%` or `px`.  |
| verticalAxis  | `verticalAxis: true,`| Adjust between vertical and horizontal chart layout | `true` or `false`  |
| stacked       | `stacked: true,`| Enables your chart to become stacked. Default: `false` | `true` or `false`  |
| incrementBy   | `incrementBy: 5,`| Adjust the value your axis increments | number |
| titleFontSize | `titleFontSize: '15px',`| Adjust the value your axis increments | A `String` containing a `value` followed by a `%` or `px`. |
| titleFontColour | `titleFontColour: 'green',`| Adjust the colour of your chart title | A `String` containing `colour name` or `hex code`. |
| barColour | `barColour: [ 'blue', 'orange', 'red'],`| Adjust the colour(s) shown per bar. (Loops if less colours than bars) | An `array` containing/or a `String` containing the `colour name(s)` or `hex codes`. |
| labelColour | `labelColour: [ 'blue', 'orange', 'red'],`| Adjust the colours shown per bar. (Loops if less colours than bars) | An `array` containing/or a `String` containing the `colour name(s)` or `hex codes`. |
| labelName | `labelName: 'Label',`| Adjust the default label name shown if a label isn't provided in the data. | A `string` of text |
| labelFontSize | `labelFontSize: '10px',`| Adjust the default label font size | A `String` containing a `value` followed by a `%` or `px`. |
| barSpacing | `barSpacing: '5px',`| Adjust the gap/spacing between the bars | A `String` containing a `value` followed by a `%` or `px`. |
| barValueFontSize | `barValueFontSize: '15px',`| Adjust the bar value's font size | A `String` containing a `value` followed by a `%` or `px`. |
| barValueFontWeight | `barValueFontWeight: 'normal',`| Adjust the bar chart value's font weight. | A `string` or `number` containing the `font weight` |
| barValueColour | `barValueColour: '#FFFFFF',`| Adjust the bar value's colour | A `String` containing `colour name` or `hex code`. |
| barValuePosition | `barValuePosition: 'top',`| Adjust the value's position inside the bar | A `string` containing: `top`, `centre`, or `bottom` |
  
## Installation

[Download the Zip](https://github.com/MattSeligman/bar-chart/archive/refs/heads/main.zip) or install using git using the followings Steps: 

### Step 1 
Use the following to tell git you wish to clone the bar-chart
```bash
  git clone https://github.com/MattSeligman/bar-chart.git
```

### Step 2
In this step, you will choose the directory where you want the bar-chart to be created.  
In this step it is named "*bar-chart*" which can be renamed to your preference.
```bash
  cd bar-chart
```
### Step 3
In this step git pull's the bar-chart to the folder defined in *Step 2*.
```bash
  git pull https://github.com/MattSeligman/bar-chart.git
```
## Usage/Examples
Include the following scripts & css in your *head* element.  

### Step 1
```javascript
<script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="bar-chart.js"></script>
<link rel="stylesheet" href="chartStyle.css">
```  
If you host jQuery using a Content Delivery Network change `node_modules/jquery/dist/jquery.min.js` to `https://code.jquery.com/jquery-3.6.0.min.js`  
If you host jQuery locally you may need to modify the path `node_modules/jquery/dist/jquery.min.js`.

### Step 2
Create a div with a unique `id` which will be the element in the drawBarChart function.

```html
<div id="chart"></div>
```

### Step 3
As shown below start within a script element adding `drawBarChart( array, object, element)`.  

#### Array Example
In this example the array is `[ 1, 2, 3, 4, 5, 6, 7 ]`.  
In this example the object is `{ verticalAxis: false, stacked: false, width: '100%', height: '100%' }`.  
In this example the element selector is `'#chart'`.  

```javascript
<script>
drawBarChart(
  [ 1, 2, 3, 4, 5, 6, 7 ],
  {
    verticalAxis: false,
    stacked: false,
    width: '100%',
    height: '100%'
  }, 
  '#chart'
)
</script>
```
#### Object Example
In this example the array containing objects is is `[ {'Monday':10}, {'Tuesday':20}, {'Wednesday':3.5}, {'Thursday':7}, {'Friday':5}, {'Saturday':6}, {'Sunday':15} ]`.  
In this example the object is `{ width: '100%', height: '100%', verticalAxis: false, stacked: false }`.  
In this example the element selector is `'#chart'`.  

```Javascript
drawBarChart(
  [ {'Monday':10}, {'Tuesday':20}, {'Wednesday':3.5}, {'Thursday':7}, {'Friday':5}, {'Saturday':6}, {'Sunday':15} ],
  {
    width: '100%',
    height: '100%',
    verticalAxis: false,
    stacked: false
  }, 
  '#chart'
)

```

## Screenshots
![Chart Layouts](https://i.imgur.com/FE7k3yy.jpeg)

## Author

- [@MattSeligman](https://github.com/MattSeligman)
