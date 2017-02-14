import Chart from 'chart.js';
import uniq from 'lodash/uniq';
import countBy from 'lodash/countBy'
import values from 'lodash/values'
import sortedUniq from 'lodash/sortedUniq'

import './styles/charts.scss'

// Define our chart elements
const typeElement = document.querySelector('#typeChart');
const methodElement = document.querySelector('#methodChart');
const monthlyElement = document.querySelector('#monthlyChart');
// Make an array of the kinds of data we want
const dataTypes = [
    'types',
    'methods'
];
let types = [];
let methods = [];
let monthlyCost = [];
let days = [];

// Get the month for monthly spending chart
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
var d = new Date();
var month = d.getMonth();

fetch('/data')  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }

      // Use the data how we want
      response.json().then(function(data) {
        // Main loop divvying out the data  
        for (let i in data) {
            let t = data[i].type
            types.push(t)

            let m = data[i].method
            methods.push(m)

            // Check for spending this month, if data is part of this month, add to 
            // Monthly spending data
            let d = data[i].date
            let c = parseInt(data[i].cost)
            let dateParts = d.split('-')
            let day = parseInt(dateParts[2])
            if (parseInt(dateParts[1]) === (month + 1)) {
                monthlyCost.push(c)
                days.push(day)
            }
        }
        console.log(monthlyCost);
        console.log(days);
        const typeDataObj = {
            labels: uniq(types),
            datasets: [
                {
                    data: values(countBy(types)), // Count number of occurances, then make the values into an array
                    backgroundColor: [
                        "#D8DDE3",
                        "#A7AAAE",
                        "#D7E6F6",
                        "#7B7B81"
                    ]
                }
            ]
        }
        const methodsDataObj = {
            labels: uniq(methods),
            datasets: [
                {
                    data: values(countBy(methods)),
                    backgroundColor: [
                        "#D8DDE3",
                        "#A7AAAE",
                        "#D7E6F6",
                        "#7B7B81"
                    ]
                }
            ]
        }
        const monthlyDataObj = {
            labels: uniq(days),
            datasets: [
                {
                    label: 'Monthly Spending',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#7B7B81",
                    borderColor: "#7B7B81",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#D7E6F6",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#D7E6F6",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: monthlyCost,
                    spanGaps: false,
                }
            ]
        }
        // Make the charts!
        const typePieChart = new Chart(typeChart ,{
            type: 'doughnut',
            data: typeDataObj
        });
        const methodPieChart = new Chart(methodElement ,{
            type: 'doughnut',
            data: methodsDataObj
        });
        const monthlyLineChart = new Chart(monthlyElement ,{
            type: 'line',
            data: monthlyDataObj
        });

      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });