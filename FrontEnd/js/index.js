/* Scripts for css grid dashboard */

$(document).ready(() => {
  addResizeListeners();
  setSidenavListeners();
  setUserDropdownListener();
  renderChart();
  renderChart2();
  renderChart3();
  setMenuClickListener();
  setSidenavCloseListener();

});

// Set constants and grab needed elements
const sidenavEl = $('.sidenav');
const gridEl = $('.grid');
const SIDENAV_ACTIVE_CLASS = 'sidenav--active';
const GRID_NO_SCROLL_CLASS = 'grid--noscroll';

function toggleClass(el, className) {
  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.addClass(className);
  }
}

// User avatar dropdown functionality
function setUserDropdownListener() {
  const userAvatar = $('.header__avatar');

  userAvatar.on('click', function(e) {
    const dropdown = $(this).children('.dropdown');
    toggleClass(dropdown, 'dropdown--active');
  });
}

// Sidenav list sliding functionality
function setSidenavListeners() {
  const subHeadings = $('.navList__subheading'); console.log('subHeadings: ', subHeadings);
  const SUBHEADING_OPEN_CLASS = 'navList__subheading--open';
  const SUBLIST_HIDDEN_CLASS = 'subList--hidden';

  subHeadings.each((i, subHeadingEl) => {
    $(subHeadingEl).on('click', (e) => {
      const subListEl = $(subHeadingEl).siblings();

      // Add/remove selected styles to list category heading
      if (subHeadingEl) {
        toggleClass($(subHeadingEl), SUBHEADING_OPEN_CLASS);
      }

      // Reveal/hide the sublist
      if (subListEl && subListEl.length === 1) {
        toggleClass($(subListEl), SUBLIST_HIDDEN_CLASS);
      }
    });
  });
}

// Draw the chart
function renderChart() {
    AmCharts.makeChart( "chartdiv", {
    "type": "serial",
    "theme": "light",
    "dataProvider": [ {
      "month": "Jan",
      "visits": 2025
    }, {
      "month": "Feb",
      "visits": 1882
    }, {
      "month": "Mar",
      "visits": 1809
    }, {
      "month": "Apr",
      "visits": 1322
    }, {
      "month": "May",
      "visits": 1122
    }, {
      "month": "Jun",
      "visits": 1114
    }, {
      "month": "Jul",
      "visits": 984
    }, {
      "month": "Aug",
      "visits": 711
    }, {
      "month": "Sept",
      "visits": 665
    }, {
      "month": "Oct",
      "visits": 580
    } ],
    "valueAxes": [ {
      "gridColor": "#FFFFFF",
      "gridAlpha": 0.2,
      "dashLength": 0
    } ],
    "gridAboveGraphs": true,
    "startDuration": 1,
    "graphs": [ {
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "visits"
    } ],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "month",
    "categoryAxis": {
      "gridPosition": "start",
      "gridAlpha": 0,
      "tickPosition": "start",
      "tickLength": 20
    },
    "export": {
      "enabled": false
    }
  });
}

// Draw the chart
function renderChart2() {
  am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  var chart = am4core.create("chartdiv2", am4charts.PieChart);

  // Let's cut a hole in our Pie chart the size of 40% the radius
  chart.innerRadius = am4core.percent(40);

  // Add data
  chart.data = [{
    "country": "Lithuania",
    "litres": 501.9,
    "bottles": 1500
  }, {
    "country": "Czech Republic",
    "litres": 301.9,
    "bottles": 990
  }, {
    "country": "Ireland",
    "litres": 201.1,
    "bottles": 785
  }, {
    "country": "Germany",
    "litres": 165.8,
    "bottles": 255
  }, {
    "country": "Australia",
    "litres": 139.9,
    "bottles": 452
  }, {
    "country": "Austria",
    "litres": 128.3,
    "bottles": 332
  }, {
    "country": "UK",
    "litres": 99,
    "bottles": 150
  }, {
    "country": "Belgium",
    "litres": 60,
    "bottles": 178
  }, {
    "country": "The Netherlands",
    "litres": 50,
    "bottles": 50
  }];

  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "country";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;

  // Disabling labels and ticks on inner circle
  pieSeries.labels.template.disabled = true;
  pieSeries.ticks.template.disabled = true;

  // Disable sliding out of slices
  pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
  pieSeries.slices.template.states.getKey("hover").properties.scale = 0.9;

  // Add second series
  var pieSeries2 = chart.series.push(new am4charts.PieSeries());
  pieSeries2.dataFields.value = "bottles";
  pieSeries2.dataFields.category = "country";
  pieSeries2.slices.template.stroke = am4core.color("#fff");
  pieSeries2.slices.template.strokeWidth = 2;
  pieSeries2.slices.template.strokeOpacity = 1;
  pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
  pieSeries2.slices.template.states.getKey("hover").properties.scale = 1.1;

  }); // end am4core.ready()

}

function renderChart3() {
  am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart = am4core.create("chartdiv3", am4plugins_forceDirected.ForceDirectedTree);
  var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

  chart.data = [
    {
      name: "Core",
      children: [
        {
          name: "First",
          children: [
            { name: "A1", value: 100 },
            { name: "A2", value: 60 }
          ]
        },
        {
          name: "Second",
          children: [
            { name: "B1", value: 135 },
            { name: "B2", value: 98 }
          ]
        },
        {
          name: "Third",
          children: [
            {
              name: "C1",
              children: [
                { name: "EE1", value: 130 },
                { name: "EE2", value: 87 },
                { name: "EE3", value: 55 }
              ]
            },
            { name: "C2", value: 148 },
            {
              name: "C3", children: [
                { name: "CC1", value: 53 },
                { name: "CC2", value: 30 }
              ]
            },
            { name: "C4", value: 26 }
          ]
        },
        {
          name: "Fourth",
          children: [
            { name: "D1", value: 415 },
            { name: "D2", value: 148 },
            { name: "D3", value: 89 }
          ]
        },
        {
          name: "Fifth",
          children: [
            {
              name: "E1",
              children: [
                { name: "EE1", value: 33 },
                { name: "EE2", value: 40 },
                { name: "EE3", value: 89 }
              ]
            },
            {
              name: "E2",
              value: 148
            }
          ]
        }

      ]
    }
  ];

  networkSeries.dataFields.value = "value";
  networkSeries.dataFields.name = "name";
  networkSeries.dataFields.children = "children";
  networkSeries.nodes.template.tooltipText = "{name}:{value}";
  networkSeries.nodes.template.fillOpacity = 1;
  networkSeries.manyBodyStrength = -20;
  networkSeries.links.template.strength = 0.8;
  networkSeries.minRadius = am4core.percent(2);

  networkSeries.nodes.template.label.text = "{name}"
  networkSeries.fontSize = 10;

  });

}

function toggleClass(el, className) {
  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.addClass(className);
  }
}

// If user opens the menu and then expands the viewport from mobile size without closing the menu,
// make sure scrolling is enabled again and that sidenav active class is removed
function addResizeListeners() {
  $(window).resize(function(e) {
    const width = window.innerWidth; console.log('width: ', width);

    if (width > 750) {
      sidenavEl.removeClass(SIDENAV_ACTIVE_CLASS);
      gridEl.removeClass(GRID_NO_SCROLL_CLASS);
    }
  });
}

// Menu open sidenav icon, shown only on mobile
function setMenuClickListener() {
  $('.header__menu').on('click', function(e) { console.log('clicked menu icon');
    toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
    toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
  });
}

// Sidenav close icon
function setSidenavCloseListener() {
  $('.sidenav__brand-close').on('click', function(e) {
    toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
    toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
  });
}