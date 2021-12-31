function drawBarChart(data, options, element){

  // return the values passed from HTML page
  console.log(data,options, element);

  // Draws the Chart and Bars Layout
  function drawChartLayout(data, element){

    // Define the highest number
    let highestNumber = Math.max(...data);

    // Variable to hold bars produced
    let barOutput = "";

    // Loop through all of the data's bar entries
    for(i = 0; i < data.length; i++){

      // Define the Label
      let label = '<label>Label ' + (i + 1) + '</label>';

      // Define the Bar
      let bar = '<div class="bar"><div class="bar-highlight" style="height:' +  ((data[i] / highestNumber) * 100) + '%;"><div id="chartValue">' + data[i] + '</div></div>' + label + '</div>';

      // Add the current bar to the barOutput
      barOutput += bar;

    }

    // Prepare the chart title display
    let chartTitle = `<div class="chartTitle">
      <h2>Bar Chart</h2>
    </div>`;

    // Prepare the index display
    let indexDisplay = `<div id="index"></div>`;

    // Prepare the bar chart display
    let chartDisplay = `<div id="charts" class="container-2">
      ${barOutput}
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

  function drawDataIndex(data){

    // Loop through the data array and define the highest number
    let highestNumber = Math.max(...data);

    // counting down from the highest number
    for(i = highestNumber; i >= 0; i--){

      // add each Index value until reaches zero
      document.getElementById("index").innerHTML += '<div>' + highestNumber + '</div>';
      highestNumber--;

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
  drawChartLayout(data, element);

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
