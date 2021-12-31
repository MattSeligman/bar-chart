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
  }

  // assign the highest number
  findHighestNumber(data);

  // draws the chart layout
  function drawChartLayout(data, options, element){

    // variable used to prep label name (future to be connected to options)
    let defaultBarName = 'Label';

    // variable to hold theBars created
    let theBars = '';
    let isVertical = '';

    // set theChartAxis to horizontal by default
    let theChartAxis = 'horizontal';

    // If data's options have barChartAxes set to vertical
    if( options.hasOwnProperty('barChartAxes') && options['barChartAxes'] === 'vertical' ) {

      // change theChartAxis to vertical
      theChartAxis = 'vertical';
    }

    // loop through the bar data entries
    for(i = 0; i < data.length; i++){

      // if this bar's data is an object
      if (typeof data[i] === 'object'){

        // assign the currentLabel
        currentLabel = Object.keys(data[i])[0];

        // assign the currentBarValue
        currentBarValue = Object.values(data[i])[0];

      } else {

        // assign the currentLabel
        currentLabel = `${defaultBarName} ${(i + 1)}`;

        // assign the currentBarValue
        currentBarValue = data[i];

      }

      let theAxisStyle = 'height';

      if (theChartAxis === 'vertical'){
        isVertical = 'verticalChart';
        theAxisStyle = 'width';

      }

      // format the bar
      let bar = `
      <div class="bar">
        <div class="bar-highlight" style="${theAxisStyle}:${((currentBarValue / highestNumber) * 100)}%;">
          <div id="chartValue">${currentBarValue}</div>
        </div>
        <label>${currentLabel}</label>
      </div>`;

      // add the current bar to theBars
      theBars += bar;

    }

    // Prepare the chart title display
    let chartTitle = `<div class="chartTitle">
      <h2>Bar Chart</h2>
    </div>`;

    // Prepare the index display
    let indexDisplay = `<div id="index"></div>`;

    // Prepare the bar chart display
    let chartDisplay = `<div id="charts" class="container-2 ${isVertical}">
      ${theBars}
    </div>`;

    // Prepare the Bar Chart
    let barChart = `${chartTitle}
    <div class="container-1">
      ${indexDisplay}
      ${chartDisplay}
    </div>`;

    // Locate the Div mentioned and insert the chart inside it.
    document.getElementById( element.slice(1) ).innerHTML = barChart;

    // Add the CSS for the charts heights 100%
    document.getElementById( element.slice(1) ).style.height = '100%';

  }

  function drawDataIndex(){

    // Loop through the data array and define the highest number
    let indexValue = highestNumber;

    // counting down from the highest number
    for(i = indexValue; i >= 0; i--){

      // add each Index value until reaches zero
      document.getElementById("index").innerHTML += '<div>' + indexValue + '</div>';
      indexValue--;

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

  // Produce the Index's
  drawDataIndex(data);

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
