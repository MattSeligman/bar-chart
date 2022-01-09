function drawBarChart(data, options, element){

  // return the values passed from HTML page
  console.log("== Start of " + element + " ==" + `\nType of Data: '${typeof data[0]}'`)
  console.log(data);

  // object to track attributes for chart
  let chart = {
    'highestValue':null,
    'lowestValue':null,
    'amountOfBars': data.length,
    'barValues': []
  }

  // increment through the data bar's provided
  for (let i = 0; i < data.length; i++){

    // if the data is an object (contains custom labels/categories)
    if(typeof data[i] === 'object'){

      // for each value in the current data[i]
      for(var value in data[i]) {

        // add the barValue value to the chart['barValues']
        chart['barValues'].push( data[i][value] );
      }

    // if the data isn't an object
    } else {

      // add the barValue to the chart['barValues']
      chart['barValues'].push( data[i] );
    }
  }

  // Sort the barValues in accending order
  chart['barValues'] = chart['barValues'].sort( (a,b) => a-b );

  // Reverse the chart['barValues'] used for stacked bars
  chart['barValues'].reverse();

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

  // Default chart options
  let chartOptions = {
    height: '100%',
    width: '98%',
    verticalAxis: false,
    stacked: false,
    titleFontSize: '15px',
    titleFontColour: 'green',
    barColour: ['grey','#ccc'],
    labelColours: 'blue',
    labelName: 'Label',
    barSpacing: '0px',
    barValueFontSize: '15px',
    barValueWeight: "normal",
    barValueColour: '#ffffff',
    barValuePosition: 'top' // 'top', 'centre', or 'bottom'
  }

  // draws the chart layout
  function drawChartLayout(data, options, element){

    // if the chart is a verticalAxis assign the vertical properties
    if (options['verticalAxis'] === true ){

      chart['type'] = 'vertical';
      chart['barProperty'] = 'width';

    // if the chart isn't a verticalAxis assign the horizontal properties
    } else {

      chart['type'] = 'horizontal';
      chart['barProperty'] = 'height';

    }

    // check through the default chartOptions
    for (let eachOption in chartOptions){

      // check if the options contain eachOption
      if( options.hasOwnProperty( eachOption ) ) {

        // if it does update the chartOptions to the new option
        chartOptions[eachOption] = options[eachOption];
      }
    }


    // variables for default settings
    let highestIndex = highestNumber;
    let theLeftDisplay = '';
    let theBottomDisplay = '';
    let theBars = '';
    let theLabels = '';
    let theIndexs = '';
    let barColour = `background-color: ${chartOptions['barColour']}`;

    // if the highestIndex (highestNumber) is greater or equal to zero
    for(i = highestIndex; i >= 0 ; i--){

      if (i % 5 === 0 || i === highestIndex){
        theIndexs += `<label>${i}</label>`;
      }
    }

    let colourIndex = 0;

    // loop through the bar data entries
    for(i = 0; i < chart['amountOfBars']; i++){

      let currentOrder = i;

      // if the colourIndex passes the length
      if ( colourIndex >= chartOptions['barColour'].length){

        // reset the colourIndex
        colourIndex = 0;
      }

      if ( options.hasOwnProperty('barColour') ){

        if( options['barColour'].length === 1){
          barColour = `background-color: ${options['barColour']}`;
        }

        if( options['barColour'].length >= 2){
          barColour = `background-color: ${options['barColour'][colourIndex]}`;
          colourIndex ++;
        }

      } else

      if ( chartOptions.hasOwnProperty('barColour') ){

        if( chartOptions['barColour'].length === 1){
          barColour = `background-color: ${chartOptions['barColour']}`;
        }

        if( chartOptions['barColour'].length >= 2){
          barColour = `background-color: ${chartOptions['barColour'][colourIndex]}`;
          colourIndex ++;
        }

      }

      // if this bar's data is an object
      if (typeof data[i] === 'object'){

        // assign the currentLabel
        currentLabel = `<label>${Object.keys(data[i])[0]}</label>`;

        if(chartOptions['stacked']){
          theLabels += `<div class="legendCategory"><div class="legendColour" style="${barColour}"></div><label>${Object.keys(data[i])[0]}</label></div>`;

        } else {
          theLabels += `<label>${Object.keys(data[i])[0]}</label>`;
        }

        // assign the currentBarValue
        currentBarValue = Object.values(data[i])[0];

      } else {

        // assign the currentLabel
        currentLabel = `<label>${chartOptions['labelName']} ${(i + 1)}</label>`;

        if(chartOptions['stacked']){
          theLabels += `<div class="legendCategory"><div class="legendColour" style="${barColour}"></div><label>${chartOptions['labelName']} ${(i + 1)}</label></div>`;

        } else {
          theLabels += `<label>${chartOptions['labelName']} ${(i + 1)}</label>`;
        }


        // assign the currentBarValue
        currentBarValue = data[i];
      }

      // if chartOptions['verticalAxis'] === true (Chart is Vertical)
      if (chartOptions['verticalAxis']){

        // set theLeftDisplay to labels
        theLeftDisplay = `${theLabels}`;

        // set theBottomDisplay to the current Index
        theBottomDisplay = `${theIndexs}`;

        // if chartOptions['verticalAxis'] === true && chartOptions['stacked'] === true
        if (chartOptions['stacked']){

          // format the bar for stackedBar
          theBars += `
          <div class="bar" style="${chart['barProperty']}:${((currentBarValue / highestNumber) * 100 )}%; order='';">
            <div class="bar-highlight" style="${barColour}; ${chart['barProperty']}:100%; ">
              <div class="barValue">${currentBarValue}</div>
            </div>
          </div>`;

        // if chartOptions['verticalAxis'] === true && chartOptions['stacked'] === false
        } else {

          theBars += `
          <div class="bar">
            <div class="bar-highlight" style="${chart['barProperty']}:${((currentBarValue / highestNumber) * 100 )}%; ${barColour}">
              <div class="barValue">${currentBarValue}</div>
            </div>
          </div>`;
        }

      // if chartOptions['verticalAxis'] === false ( Chart is Horizontal)
      } else {

        // set theLeftDisplay to Index
        theLeftDisplay = `${theIndexs}`;

        // set theBottomDisplay to the current Label
        theBottomDisplay = `${currentLabel}`;

        // if chartOptions['stacked'] === true
        if (chartOptions['stacked']){

          // format the bar for Stacked Horizontal Axis
          theBars += `
          <div class="bar" order="${currentOrder}" value="${currentBarValue}" style="${chart['barProperty']}:${((currentBarValue / highestNumber) * 100 )}%;">
            <div class="bar-highlight" style="${chart['barProperty']}: 100%; ${barColour}">
              <div class="barValue">${currentBarValue}</div>
            </div>
          </div>`;

        // if chartOptions['verticalAxis'] === false && chartOptions['stacked'] === false
        } else {

          // format the bar for Horizontal Axis
          theBars += `
          <div class="bar">
            <div class="bar-highlight" style="${chart['barProperty']}:${((currentBarValue / highestNumber) * 100 )}%; ${barColour}">
              <div class="barValue">${currentBarValue}</div>
            </div>
            ${theBottomDisplay}
          </div>`;
        }

      }

    }

    let barChart = `
    <div class="chartTitle">
      <h2>${element} - Stacked: ${chartOptions['stacked']} Vertical: ${chartOptions['verticalAxis']}</h2>
    </div>

    <div class="container-1">
      <div id="sidebar" class="left">
        ${theLeftDisplay}
      </div>
      <div id="charts" class="container-2 ${chart['type']}">
        ${theBars}
      </div>
    </div>`;

    // if the chart has a verticalAxis place the index at the end of the barChart.
    if (chartOptions['verticalAxis']){
      barChart += `<div id="verticalIndex">${theBottomDisplay}</div>`;
    }
    else if ( chartOptions['verticalAxis'] === false && chartOptions['stacked'] === true ) {
      barChart += `<div id="horizontalIndex">${theLabels}</div>`;
    }

    // Locate the Div mentioned and insert the chart inside it.
    $(element).html( barChart );

    // If the chart has a width apply it, otherwise apply default chartOptions['width']
    if( options.hasOwnProperty("width") ) { $(element).css("width", options["width"]); } else { $(element).css("width", chartOptions["width"]); }

    // If the chart has a height apply it, otherwise apply default chartOptions['height']
    if( options.hasOwnProperty("height") ) { $(element).css("height", options["height"]); } else { $(element).css("height", chartOptions["height"]); }

  }

  // function checks attribute against Vertical & Horizontal axis and apply css accordingly
    function applyAxisCSS(attribute, verticalSelector,verticalCSS, horizontalSelector, horizontalCSS){

      // check if the options contain the attribute
      if (options.hasOwnProperty(attribute) ) {

        // if the chart is Vertical apply vertical CSS
        if (chartOptions['verticalAxis']){
          $(`${element} ${verticalSelector}`).css(`${verticalCSS}`, `${options[attribute]}` );

        // if the chart is horizontal apply horizontal CSS
        } else {
          $(`${element} ${horizontalSelector}`).css(`${horizontalCSS}`, `${options[attribute]}` );
        }

      // attribute doesn't exist, set default attribute
      } else {

        // if the chart is Vertical apply vertical CSS
        if (chartOptions['verticalAxis']){
          $(`${element} ${verticalSelector}`).css(`${verticalCSS}`, `${chartOptions[attribute]}` );

        // if the chart is horizontal apply horizontal CSS
        } else {
          $(`${element} ${horizontalSelector}`).css(`${horizontalCSS}`, `${chartOptions[attribute]}` );
        }
      }
    }

  // applies setOptions or runs default chartOptions.
  function setOptions(options, element){

  // Label Attributes ----------------
    // apply 'labelFontSize' attributes if set
    applyAxisCSS('labelFontSize', '.container-1 > .left > label', 'font-size', '.container-1 > .container-2 > .bar > label', 'font-size');


  // Title Attributes ----------------

    // apply 'titleFontSize' attributes if set
    applyAxisCSS('titleFontSize', '.chartTitle > h2', 'font-size', '.chartTitle > h2', 'font-size');

    // apply 'titleFontColour' attributes if set
    applyAxisCSS('titleFontColour', '.chartTitle > h2', 'color', '.chartTitle > h2', 'color');

  // Bar Attributes ----------------

    // apply 'barValueFontSize' attributes if set
    applyAxisCSS('barValueFontSize', '.container-1 > .container-2 > .bar > .bar-highlight > .barValue', 'font-size', '.container-1 > .container-2 > .bar > .bar-highlight > .barValue', 'font-size');

    // apply 'barValueColour' attributes if set
    applyAxisCSS('barValueColour', '.container-1 > .container-2 > .bar > .bar-highlight > .barValue', 'color', '.container-1 > .container-2 > .bar > .bar-highlight > .barValue', 'color');

    // apply 'barSpacing' attributes if set
    applyAxisCSS('barSpacing', '.container-1 > .container-2', 'row-gap', '.container-1 > .container-2', 'gap');

    // apply 'barValueWeight' attributes if set
    applyAxisCSS('barValueWeight', '.container-1 > .container-2 > .bar > .bar-highlight > .barValue', 'font-weight', '.container-1 > .container-2 > .bar > .bar-highlight > .barValue', 'font-weight');


        let gridIncrement = chart['highestValue'];
    $(`${element} > .container-1 > .left`).css("align-content", 'space-between' );

    // apply default vertical CSS
    if(options['verticalAxis']){

      $(`${element} > #verticalIndex`).css('margin-left', `${$(`${element} .container-1 > .left > label`).outerWidth() }px` );
      $(`${element} > .container-1 > .left`).css("align-content", 'space-around' );


      $(`${element} > .container-1 > .container-2`).css("background-size", `calc( (1 / ${gridIncrement}) * 100% ) calc( (1 / ${chart['amountOfBars']} ) * 100% )` );

      if (chartOptions['barValuePosition'].toLowerCase() === 'top'){
        $(`${element} > .container-1 > .container-2 > .bar > .bar-highlight > .barValue`).css({"align-self": "center", "text-align": "right"});
      }
      else if (chartOptions['barValuePosition'].toLowerCase() === 'centre'){
        $(`${element} > .container-1 > .container-2 > .bar > .bar-highlight > .barValue`).css({"align-self": "center", "text-align": "center"});
      }
      else if (chartOptions['barValuePosition'].toLowerCase() === 'bottom'){
        $(`${element} > .container-1 > .container-2 > .bar > .bar-highlight > .barValue`).css({"align-self": "center", "text-align": "left"});
      }


    // apply default horizontal CSS
    } else {

      $(`${element} > .container-1 > .container-2`).css("background-size", `calc( (1 / ${chart['amountOfBars']}) * 100% ) calc( (1 / ${gridIncrement} ) * 100% )` );0

      if (chartOptions['barValuePosition'].toLowerCase() === 'top'){
          $(`${element} > .container-1 > .container-2 > .bar > .bar-highlight > .barValue`).css({"align-self": "baseline", "text-align": "center"});
      }
      else if (chartOptions['barValuePosition'].toLowerCase() === 'centre'){
          $(`${element} > .container-1 > .container-2 > .bar > .bar-highlight > .barValue`).css({"align-self": "center", "text-align": "center"});
      }
      else if (chartOptions['barValuePosition'].toLowerCase() === 'bottom'){
          $(`${element} > .container-1 > .container-2 > .bar > .bar-highlight > .barValue`).css({"align-self": "end", "text-align": "center"});
      }

    }



    // Stacked Test Material (Will be revised)
    if(chartOptions['stacked']){

      if(chartOptions['verticalAxis']){

        // Assign the "font-size" based on options['barValueFontSize']
        $(`${element} > .container-1 > .container-2`).css('flex-direction','row');
        $(`${element} > .container-1 > .container-2 > .bar`).css('height','50px');

        // copy the sidebar width for the margin-left
        $(`${element} > #verticalIndex`).css('margin-left', `${$(`${element} > .container-1 > #sidebar`).width() + 5}px` );

        // reset left-margin if window is resized
        window.addEventListener('resize', function() {

          // copy the sidebar width for the margin-left
          $(`${element} > #verticalIndex`).css('margin-left', `${$(`${element} > .container-1 > #sidebar`).width() + 5}px` );

        });

      // if horizontal & stacked
      } else {
        $(`${element} > .container-1 > .container-2`).css('flex-direction','column-reverse');
        $(`${element} > .container-1 > .container-2`).css('justify-content','stretch');
        $(`${element} > #horizontalIndex`).css('margin-left', `${$(`${element} > .container-1 > #sidebar`).width() + 10}px` );

        // reset left-margin if window is resized
        window.addEventListener('resize', function() {

          // copy the sidebar width for the margin-left
          $(`${element} > #horizontalIndex`).css('margin-left', `${$(`${element} > .container-1 > #sidebar`).width() + 10}px` );

          // copy the sidebar width for the margin-left
          $(`${element} > #horizontalIndex`).css('width', `${$(`${element} > .container-1 > .container-2`).width()}px` );

        });


        $(`${element} > .container-1 > .container-2 > .bar`).css('width','inherit');
        $(`${element} > .container-1 > .container-2 > .bar > .bar-highlight`).css('width','100%');
      }

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

          // loop through the colours
          colourIndex--;

          // assign the current bar the current barColour based on the current index.
          bar.style.backgroundColor = options['barColour'][colourIndex];
        }
      }
    }

  }

  // Draw the Chart
  drawChartLayout(data, options, element);

  setOptions(options, element);

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
