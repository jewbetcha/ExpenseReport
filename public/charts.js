import Chart from 'chart.js';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

const chartOne = document.querySelector('#chart');

// Get the data 
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
        // console.log(dataObj[0].type);
        for (let i in data) {
            let t = data[i].type
            types.push(t)
        }
        let typesUniq = uniq(types);
        console.log(types)
        console.log(typesUniq)
        let counts = {};
        let countsArray = [];
        for (let i of types) {
            counts[i] = (counts[i] || 0)+1;
        }
        console.log(counts)
        for (let i in counts) {
            countsArray.push(counts[i])
        }

        console.log(countsArray);
        let dataObj = {
            labels: typesUniq,
            datasets: [
                {
                    data: countsArray,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }
            ]
        }
        
        var myPieChart = new Chart(chartOne ,{
            type: 'pie',
            data: dataObj
        });
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });