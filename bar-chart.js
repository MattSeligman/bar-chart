function drawBarChart(data, options, element){

  // return the values passed from HTML page
  console.log(data,options, element);

  // prepare a variable to track the highest number (100%)
  let highestNumber = null;

  // determine the highest Value
  function findHighestNumber(data){

    // loop through the data
    for( let i = 0; i < data.length; i++ ){

      // if the data is an object
      if(typeof data[i] === 'object'){

        // if highestNumber is less than the current objects value
        if (highestNumber < Object.values(data[i])[0]) {

          // update the highestNumber
          highestNumber = Object.values(data[i])[0];
        }

      // else if the data is a number
      } else if(typeof data[i] === 'number'){

        // if the highestNumber less than the current value
        if (highestNumber < data[i]) {

          // update the highestNumber
          highestNumber = data[i];
        }
      }
    }
    return highestNumber;
  }

  // assign the highest number
  findHighestNumber(data);

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
    }

    let chart = {};

    if (options['verticalAxis'] === true ){

      chart['type'] = 'vertical';
      chart['barProperty'] = 'width';

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

    // loop through the bar data entries
    for(i = 0; i < data.length; i++){

      // if the highestIndex (highestNumber) is greater or equal to zero
      if (highestIndex >= 0){
        // add the indexValue to theIndexs variable
        theIndexs += `<label>${highestIndex}</label>`;

        //subtract 1 from the highestIndex
        highestIndex--;
      }

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
            <div id="chartValue">${currentBarValue}</div>
          </div>
        </div>`;

      } else {
        // set theLeftDisplay to Index
        theLeftDisplay = `${theIndexs}`;

        // set theBottomDisplay to the current Label
        theBottomDisplay = `<label>${currentLabel}</label>`;

        // format the bar for Horizontal Axis
        theBars += `
        <div class="bar">
          <div class="bar-highlight" style="${chart['barProperty']}:${((currentBarValue / highestNumber) * 100 )}%;">
            <div id="chartValue">${currentBarValue}</div>
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
      <div id="verticalLabels" class="left">
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
    document.getElementById( element.slice(1) ).innerHTML = barChart;
    console.log(document.getElementById('verticalLabels').clientWidth)
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
