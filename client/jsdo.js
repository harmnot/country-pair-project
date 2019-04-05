(() => {
  document.querySelector("#submit").addEventListener("click", e => {
    e.preventDefault();
    const getVal = document.querySelector("#search").value;
    axios
      .get(`http://localhost:3000/wiki/${getVal}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  });
})();
