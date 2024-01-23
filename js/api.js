const config = {
  method: "GET", 
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ACCESS_TOKEN'
  }
}
fetch("https://jsonplaceholder.typicode.com/posts", config)
  .then(async response => {
    const data = await response.json()
    console.log(data);
  })

  fetch('http://www.omdbapi.com/?i=tt3896198&apikey=a2975156')
    .then(result => result.json())
    .then(response => response.json())
    .then(data => console.log(data))

    const loadList = (json) => {
      const list = document.querySelector('#submit');
      list.innerHTML = '';

      let item = document.createElement('div');
      item.classList.add('item');

      item.innerHTML = `<img src="${element.Poster}" /><h2>${element.Title}</h2>`

      list.appendChild('item');
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    