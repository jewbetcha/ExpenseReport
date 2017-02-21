import Chart from 'chart.js';
import uniq from 'lodash/uniq';
import countBy from 'lodash/countBy'
import values from 'lodash/values'
import sortedUniq from 'lodash/sortedUniq'


// Define our chart elements
const typeElement = document.querySelector('#typeChart');
const methodElement = document.querySelector('#methodChart');
const monthlyElement = document.querySelector('#monthlyChart');
const totalElement = document.querySelector('.total');

// Make an array of the kinds of data we want
const dataTypes = [
    'types',
    'methods'
];
let types = [];
let methods = [];
let days = [];
let totalSpending = 0;

// Array to add up spending per month
let monthlySpending = [0,0,0,0,0,0,0,0,0,0,0,0];

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

            // Add up spending by month
            let d = data[i].date
            let c = parseInt(data[i].cost)
            let dateParts = d.split('-')
            let day = parseInt(dateParts[2])
            let month = parseInt(dateParts[1])

            monthlySpending[month-1] += c;

            // Add up total cost
            totalSpending += c;
        }
        console.log(monthlySpending);
        // Display total spending
        totalElement.innerHTML = `$ ${totalSpending}`;

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
            labels: months,
            datasets: [
                {
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    data: monthlySpending,
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
            type: 'bar',
            data: monthlyDataObj
        });

      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });