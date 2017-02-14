// Give all delete buttons action to delete respective entry
const del = document.querySelectorAll('.delete');

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