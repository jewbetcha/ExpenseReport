import './base.scss'
import './main.scss';


// const update = document.querySelector('#update');
const del = document.querySelectorAll('.delete');
console.log(del)
// update.addEventListener('click', () => {
//     fetch('quotes', {
//         method: 'put',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             'name': 'Darth Vader',
//             'quote': 'I find your lack of faith disturbing.'
//         })
//     })
//     .then(res => {
//         if (res.ok) return res.json()
//     })
//     .then(data => {
//         console.log(data)
//         window.location.reload(true)
//     })
// });

for (let i of del) {
  const name = i.getAttribute('name');
  i.addEventListener('click', () => {
    fetch('expenses', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name
      })
    })
    .then(res => {
      if (res.ok) return res.json()
    }).
    then(data => {
      console.log(data)
      window.location.reload(true)
    })
  })
}