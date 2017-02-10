import Chart from 'chart.js';
import uniq from 'lodash/uniq';
import countBy from 'lodash/countBy'
import values from 'lodash/values'

import './styles/charts.scss'

// Define our chart elements
const typeElement = document.querySelector('#typeChart');
const methodElement = document.querySelector('#methodChart');

// Make an array of the kinds of data we want
const dataTypes = [
    'types',
    'methods'
];
let types = [];
let methods = [];

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
        }

        let typeDataObj = {
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
                    // hoverBackgroundColor: [
                    //     "#FF6384"
                    // ]
                }
            ]
        }
        let methodsDataObj = {
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
                    // hoverBackgroundColor: [
                    //     "#FF6384"
                    // ]
                }
            ]
        }
        
        // Make the charts!
        const typePieChart = new Chart(typeChart ,{
            type: 'pie',
            data: typeDataObj
        });
        const methodPieChart = new Chart(methodElement ,{
            type: 'pie',
            data: methodsDataObj
        });
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });