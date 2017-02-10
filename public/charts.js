import Chart from 'chart.js';
import uniq from 'lodash/uniq';

import './styles/charts.scss'

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

        for (let i in data) {
            let t = data[i].type
            types.push(t)

            let m = data[i].method
            methods.push(m)
        }
        let typesUniq = uniq(types);
        let methodsUniq = uniq(methods)

        let typeCounts = {};
        let methodCounts = {};
        let typeCountsArray = [];
        let methodCountsArray = [];
        for (let i of types) {
            typeCounts[i] = (typeCounts[i] || 0)+1;
        }
        for (let i of methods) {
            methodCounts[i] = (methodCounts[i] || 0)+1;
        }
        for (let i in typeCounts) {
            typeCountsArray.push(typeCounts[i])
        }
        for (let i in methodCounts) {
            methodCountsArray.push(methodCounts[i])
        }

        let typeDataObj = {
            labels: typesUniq,
            datasets: [
                {
                    data:typeCountsArray,
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
            labels: methodsUniq,
            datasets: [
                {
                    data: methodCountsArray,
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