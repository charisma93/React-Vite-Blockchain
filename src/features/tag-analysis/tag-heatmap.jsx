import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ComponentSpinner } from "@components/spinners";
import Highcharts from "highcharts";
import HeatmapModule from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";
HeatmapModule(Highcharts);

export const TagHeatmap = ({
  data,
  onHandleSelectedResources,
  showPercentages,
}) => {
  const [loading, setLoading] = useState(true);
  const [heatmapData, setHeatmapData] = useState({});

  useEffect(() => {
    const { xAxisLabels, yAxisLabels, heatmapSeries } = generateHeatmapSeries(
      data,
      showPercentages
    );
    setHeatmapData({ xAxisLabels, yAxisLabels, heatmapSeries });
    setLoading(false);
  }, [data, showPercentages]);

  const handleHeatmapClick = (x, y) => {
    const resource = heatmapData.xAxisLabels[x];
    const account = heatmapData.yAxisLabels[y];
    //loop through heatmap data and extract matching accounts/resources
    onHandleSelectedResources(account, resource);
  };

  const options = {
    chart: {
      type: "heatmap",
      marginTop: 125,
      marginBottom: 40,
      plotBorderWidth: 0,
      borderWidth: 0,
      height: (9 / 16) * 100 + "%",
      marginLeft: 380,

      events: {
        load: function () {
          const chart = this;
          const xAxis = chart.xAxis[0];
          const svgRenderer = chart.renderer;

          svgRenderer
            .rect(10, xAxis.top - 46, 0, 38)
            .attr({
              fill: "#F6F6F6",
              zIndex: 3, // Place the rectangle above the plot area
              width: "calc(100% - 20px)",
            })
            .add();
          
          console.log(chart)
        },
      },
    },

    title: {
      text: "",
      style: {
        fontSize: "1em",
      },
    },

    xAxis: {
      gridLineWidth: 0,
      categories: heatmapData.xAxisLabels,
      opposite: true,
      labels: {
        style: {
          fontWeight: "700",
          fontSize: "15px",
          lineHeight: "48.74px",
          fontFamily: "Inter",
        },
        formatter() {
          return this.value.charAt(0).toUpperCase() + this.value.slice(1);
        },
      },
    },

    yAxis: {
      gridLineWidth: 0,
      categories: heatmapData.yAxisLabels,
      title: null,
      reversed: true,
      labels: {
        align: "left",
        reserveSpace: true,
        style: {
          fontFamily: "Economica",
          fontWeight: "700",
          fontSize: "20px",
          lineHeight: "48.74px",
        },
      },
    },

    accessibility: {
      point: {
        descriptionFormat:
          "{(add index 1)}. " +
          "{series.xAxis.categories.(x)} sales " +
          "{series.yAxis.categories.(y)}, {value}.",
      },
    },

    colorAxis: {
      stops: [
        [0, "#117D00"],
        [0.25, "#EDF69F"],
        [0.5, "#9bcc02"],
        [0.75, "#f69320"],
        [0.9, "#ED1B24"],
      ],
      min: 0,
      labels: {
        format: "{value}",
        style: {
          fontFamily: "Inter",
          fontWeight: "bold",
        },
        formatter() {
          return this.value / 50 + "K";
        },
      },
    },

    legend: {
      align: "right",
      layout: "horizontal",
      verticalAlign: "top",
      symbolWidth: 280,
      symbolHeight: 7,
    },

    tooltip: {
      format:
        "<b>{series.yAxis.categories.(point.y)}</b> missing<br>" +
        `<b>{point.value}${showPercentages ? "%" : ""}</b> tags on <br>` +
        "<b>{series.xAxis.categories.(point.x)}</b> resources.",
    },

    series: [
      {
        borderWidth: 1,
        borderColor: "white",
        name: "Sales per employee",
        data: heatmapData.heatmapSeries,
        dataLabels: {
          enabled: true,
          color: "white",
          style: {
            fontSize: "14px", // Adjust the font size as needed
            textOutline: false,
          },
          formatter() {
            return showPercentages
              ? this.point.value * 20 + "%"
              : this.point.value * 20;
          },
        },
        //tshea
        style: {
          paddingRight: "5px",
        },
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              // alert('Category: ' + this.x + ', value: ' + this.y);
              handleHeatmapClick(this.x, this.y);
            },
          },
        },
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 560,
          },
          chartOptions: {
            yAxis: {
              labels: {
                format: "{substr value 0 1}",
              },
            },
          },
        },
      ],
    },
  };

  if (loading) {
    return <ComponentSpinner />;
  }

  return (
    <div className="mb-4">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

TagHeatmap.defaultProps = {
  showPercentages: false,
};

TagHeatmap.propTypes = {
  data: PropTypes.object,
  onHandleSelectedResources: PropTypes.func,
  showPercentages: PropTypes.bool,
};

const generateHeatmapSeries = (tagData, showPercentages) => {
  let heatmapData = [];

  const resources = Object.keys(tagData);

  const totalMissingTags = resources.reduce((accumulator, currentAccount) => {
    const missingTags = tagData[currentAccount].reduce(
      (acc, currentResource) => acc + currentResource.numMissingTags,
      0
    );
    return accumulator + missingTags;
  }, 0);

  //need to iterate through tagData and pull out unique instance types
  const resourceTypes = resources
    //first loop thru each resource and extract the resource type
    //this results in an array or arrays
    .map((resource) => tagData[resource].map((r) => r.resourceType))
    //to deal with the array of arrays, we reduce the multiple
    //arrays into a single array with each instance type found
    .reduce((prev, current) => [...prev, ...current])
    //filter out duplicate instance types
    .filter((type, index, currentVal) => currentVal.indexOf(type) === index);

  //already have Alkermes resource names in array
  const accountNames = resources;

  accountNames.map((account, i0) => {
    resourceTypes.map((type, i1) => {
      const initialCount = 0;
      const missingTagCount = tagData[account].reduce(
        (accumulator, currentResource) => {
          return currentResource.resourceType === type
            ? accumulator + currentResource.numMissingTags
            : accumulator;
        },
        initialCount
      );

      const dataValue = showPercentages
        ? Number(
            parseFloat((missingTagCount / totalMissingTags) * 100).toFixed(2)
          )
        : missingTagCount;
      // heatmapData.push([i1, i0, missingTagCount]);
      heatmapData.push([i1, i0, dataValue]);
    });
  });

  return {
    xAxisLabels: resourceTypes,
    yAxisLabels: accountNames,
    heatmapSeries: heatmapData,
  };
};
