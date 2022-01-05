function drawBarChart(data, options, element){

  // return the values passed from HTML page
  console.log(data,options, element);

  // object to track attributes for chart
  let chart = {
    'highestValue':null,
    'lowestValue':null,
    'amountOfBars': data.length
  }

  function determineIndexRange(data){

    // loop through the bars
    for( let i = 0; i < chart['amountOfBars']; i++ ){

      let indexNumber = data[i];

      // if the data is an object formamt the indexNumber for object values
      if(typeof data[i] === 'object'){

        // set indexNumber to the data value within the object (0 may need to be changed for stacked charts)
        indexNumber = Object.values(data[i])[0];
      }

      // if the chart['lowestValue'] is false (no value) or the indexNumber is less than the chart['lowestValue']
      if (!chart['lowestValue'] || indexNumber < chart['lowestValue']) {

        // update the chart['lowestValue'] to indexNumber
        chart['lowestValue'] = indexNumber;
      }

      // if the indexNumber is greater than the chart['highestValue']
      if (indexNumber >= chart['highestValue']) {

        // update the chart['highestValue'] to indexNumber
        chart['highestValue'] = indexNumber;
      }
    }
  }

  // assigns determined index range (highest & lowest) for the charts use
  determineIndexRange(data);

  // prepare a variable to track the highest number (100%)
  let highestNumber = chart['highestValue'];

  // draws the chart layout
  function drawChartLayout(data, options, element){

    // Default chart options
    let chartOptions = {
      height: '100%',
      width: '98%',
      verticalAxis: false,
      stacked: false,
      titleFontSize: '15px',
      titleFontColour: 'blue',
      barColours: 'blue',
      labelColours: 'blue',
      labelName: 'Label',
      barSpacing: '2%',
      barValuePosition: 'top' // 'top', 'centre', or 'bottom'
    }

    // if the chart is a verticalAxis assign the vertical properties
    if (options['verticalAxis'] === true ){

      chart['type'] = 'vertical';
      chart['barProperty'] = 'width';

    // if the chart isn't a verticalAxis assign the horizontal properties
    } else {

      chart['type'] = 'horizontal';
      chart['barProperty'] = 'height';

    }

    console.log(chart)

    // check through the default chartOptions
    for (let eachOption in chartOptions){

      // check if the options contain eachOption
      if( options.hasOwnProperty( eachOption ) ) {

        // if it does update the chartOptions to the new option
        chartOptions[eachOption] = options[eachOption];
      }
    }

    // if the options contains a custom width
    if( options.hasOwnProperty('width') ) { document.getElementById( element.slice(1) ).style.width = options['width']; }
    else { document.getElementById( element.slice(1) ).style.width = chartOptions['width']; }

    // if the options contains a custom height
    if( options.hasOwnProperty('height') ) { document.getElementById( element.slice(1) ).style.height = options['height']; }
    else { document.getElementById( element.slice(1) ).style.height = chartOptions['height']; }

    // variables for default settings
    let highestIndex = highestNumber;
    let theLeftDisplay = '';
    let theBottomDisplay = '';
    let theBars = '';
    let theLabels = '';
    let theIndexs = '';

    // if the highestIndex (highestNumber) is greater or equal to zero
    for(i = highestIndex; i >= 0 ; i--){

      if (i % 5 === 0 || i === highestIndex){
        theIndexs += `<label>${i}</label>`;
      }
    }

    // loop through the bar data entries
    for(i = 0; i < chart['amountOfBars']; i++){


      // if this bar's data is an object
      if (typeof data[i] === 'object'){

        // assign the currentLabel
        currentLabel = `<label>${Object.keys(data[i])[0]}</label>`;
        theLabels += `<label>${Object.keys(data[i])[0]}</label>`;

        // assign the currentBarValue
        currentBarValue = Object.values(data[i])[0];

      } else {

        // assign the currentLabel
        currentLabel = `<label>${chartOptions['labelName']} ${(i + 1)}</label>`;
        theLabels += `<label>${chartOptions['labelName']} ${(i + 1)}</label>`;


        // assign the currentBarValue
        currentBarValue = data[i];
      }

      // if the chartOptions verticalAxis is true
      if (chartOptions['verticalAxis']){

        // set theLeftDisplay to labels
        theLeftDisplay = `${theLabels}`;

        // set theBottomDisplay to the current Index
        theBottomDisplay = `${theIndexs}`;

        // format the bar for Vertical Axis
        theBars += `
        <div class="bar">
          <div class="bar-highlight" style="${chart['barProperty']}:${((currentBarValue / highestNumber) * 100 )}%;">
            <div class="barValue">${currentBarValue}</div>
          </div>
        </div>`;

      } else {
        // set theLeftDisplay to Index
        theLeftDisplay = `${theIndexs}`;

        // set theBottomDisplay to the current Label
        theBottomDisplay = `${currentLabel}`;

        // format the bar for Horizontal Axis
        theBars += `
        <div class="bar">
          <div class="bar-highlight" style="${chart['barProperty']}:${((currentBarValue / highestNumber) * 100 )}%;">
            <div class="barValue">${currentBarValue}</div>
          </div>
          ${theBottomDisplay}
        </div>`;

      }

    }

    let barChart = `
    <div class="chartTitle">
      <h2>Bar Chart</h2>
    </div>

    <div class="container-1">
      <div id="sidebar" class="left">
        ${theLeftDisplay}
      </div>
      <div id="charts" class="container-2 ${chart['type']}">
        ${theBars}
      </div>
    </div>`;

    if (chartOptions['verticalAxis']){
      barChart += `<div id="verticalIndex">${theBottomDisplay}</div>`;
    }

    // Locate the Div mentioned and insert the chart inside it.
    $(element).html( barChart );

    let gridWidth = (chart['highestValue'] - chart['lowestValue']) / $(".container-2").width();
    let gridHeight = (chart['highestValue'] - chart['lowestValue']) / $(".container-2").height();

    console.log("Height: " + gridHeight + "Width: " + gridWidth)

    let gridIncrement = chart['highestValue'];

    if (options['verticalAxis'] === true ){

      $(".left").css("align-content", 'space-around' );
      $(".container-2").css("background-size", `calc( (1 / ${gridIncrement}) * 100% ) calc( (1 / ${chart['amountOfBars']} ) * 100% )` );

      if (chartOptions['barValuePosition'].toLowerCase() === 'top'){
        $(".barValue").css({"align-self": "center", "text-align": "right"});
      }
      else if (chartOptions['barValuePosition'].toLowerCase() === 'centre'){
        $(".barValue").css({"align-self": "center", "text-align": "center"});
      }
      else if (chartOptions['barValuePosition'].toLowerCase() === 'bottom'){
        $(".barValue").css({"align-self": "center", "text-align": "left"});
      }

    } else {

      $(".left").css("align-content", 'space-between' );
      $(".container-2").css("background-size", `calc( (1 / ${chart['amountOfBars']}) * 100% ) calc( (1 / ${gridIncrement} ) * 100% )` );

      if (chartOptions['barValuePosition'].toLowerCase() === 'top'){
        $(".barValue").css({"align-self": "baseline", "text-align": "center"});
      }
      else if (chartOptions['barValuePosition'].toLowerCase() === 'centre'){
        $(".barValue").css({"align-self": "center", "text-align": "center"});
      }
      else if (chartOptions['barValuePosition'].toLowerCase() === 'bottom'){
        $(".barValue").css({"align-self": "end", "text-align": "center"});
      }

    }

  }

  function setOptions(options, data){

    // If options has titleFontSize
    if( options.hasOwnProperty('titleFontSize') ){

      // Update the titleFontSize
      $(".chartTitle > h2").css("font-size", options['titleFontSize'] );
    }

    // If options has titleFontColour
    if( options.hasOwnProperty('titleFontColour') ){

      // Update the titleFontSize
      $(".chartTitle > h2").css("color", options['titleFontColour'] );
    }

    // If options has barColour
    if( options.hasOwnProperty('barColour') ){

      // grab all the bars by class and assign them as a bars object
      let bars = document.getElementsByClassName("bar-highlight");

      // track the current Colour index
      let colourIndex = 0;

      // for each bar of the bars object
      for (var bar of bars) {

        // if the colourIndex is less than the barColour's length
        if (colourIndex < options['barColour'].length){

          // assign the current bar the current barColour based on the current index.
          bar.style.backgroundColor = options['barColour'][colourIndex];

          // increment to next colour
          colourIndex++;

        // otherwise
        } else {

          // reset the colourIndex back to the start
          colourIndex = 0;

          // assign the current bar the current barColour based on the current index.
          bar.style.backgroundColor = options['barColour'][colourIndex];

          // increment to next colour
          colourIndex++;
        }
      }
    }


    // if options has labelColour set the label to that color
    if( options.hasOwnProperty('labelColour') ){
      $("label").css("color", options['labelColour'] );
    }

    // if options has barSpacing set the barSpacing to that gap
    if( options.hasOwnProperty('barSpacing') ){
      $(".container-2").css("gap", options['barSpacing'] );
    }

    // if options has barChartAxes update the chart layout
    if( options.hasOwnProperty('barChartAxes') ){

      // If the barChartAxes is vertical then produce Vertical Chart
      if(options['barChartAxes'] === 'vertical'){

      // Otherwise produce the Horizontal Chart
      } else {


      }
    }



  }

  // Draw the Chart
  drawChartLayout(data, options, element);

  setOptions(options, data);

}

/*
"data"
The data parameter will be the data the chart
should work from Start with just an Array of numbers
e.g. [1, 2, 3, 4, 5]

"options"
The options parameter should be an object
which has options for the chart.

width of the bar chart
height of the bar chart

"element"
The element parameter should be a DOM element
or jQuery element that the chart will get rendered into.

Display a list of single values, horizontally as a bar chart

    Numerical values should also be displayed inside of the bar
    The position of values should be customizable too:
        Top, centre or bottom of the bar.


Bar properties that should be customizable:

    Bar Colour
    Label Colour
    Bar spacing (space between bars)
    Bar Chart axes

X-axis should show labels for each data value

    Think about how you would need to structure your data to associate a label to each value

Y-axis should show ticks at certain values

    Think about where you would configure these values. Should they be part of the data or the options to the bar chart function.

The title of the bar chart should be able to be set and shown dynamically

The title of the bar chart should also be customizable:

    Font Size
    Font Colour
*/
