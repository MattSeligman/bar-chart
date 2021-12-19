function drawBarChart(data, options, element){

  // return the values passed from HTML page
  console.log(data,options, element);

  // Update the html based on the element provided
  $(element).html(data);

  function drawDataIndex(data){

    // define a highestNumber variable
    let highestNumber = 0;

    // Loop through each data
    for(let i = 0; i < data.length; i++){

      // if the current number is greater than the highest number
      if (data[i] > highestNumber){

        // Set current number to highest number
        highestNumber = data[i];
      }
    }

    // counting down from the highest number
    for(i = highestNumber; i >= 0; i--){

      // add each Index value until reaches zero
      document.getElementById("index").innerHTML += '<div>' + highestNumber + '</div>';
      highestNumber--;

    }

  }

  function drawBars(data,options){

    console.log(options);
    for(i = 0; i < data.length; i++){

      console.log("Height:" + document.getElementById("charts").offsetHeight)
      let barHeight = (data[i] * 100);

      // Prepare the bar
      let singleBar = '<div class="bar"><div class="bar-highlight" style="height:' + barHeight + 'px;">' + data[i] + '</div><label>Label</label></div>';

      document.getElementById("charts").innerHTML += singleBar;

    }

  }

  // Produce the Index's
  drawDataIndex(data);
  drawBars(data);

}

/*

The data parameter will be the data the chart should work from Start with just an Array of numbers
e.g. [1, 2, 3, 4, 5]

The options parameter should be an object which has options for the chart.
e.g. width and height of the bar chart

The element parameter should be a DOM element or jQuery element that the chart will get rendered into.


Display a list of single values, horizontally as a bar chart

    Numerical values should also be displayed inside of the bar
    The position of values should be customizable too:
        Top, centre or bottom of the bar.

Bar sizes should be dependent on the data that gets passed in

    Bar width should be dependent on the total amount of values passed.
    Bar height should be dependent on the values of the data.

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
