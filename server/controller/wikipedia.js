const axios = require("axios");

class Wikipedia {
  static wiki(req, res, next) {
    const { data } = axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${
          req.params.search
        }`
      )
      .then(({ data }) => {
        // object keys: query => [search, tittle, snippet]
        // const url = encodeURI(`https://en.wikipedia.org/wiki/${title}`);
        // res.status(200).json(data);
        const {
          query: { searchinfo, search }
        } = data;
        // console.log(search, "iniii saerch");
        const obj = {
          title: search[0].title,
          snippet: search[0].snippet,
          url: encodeURI(`https://en.wikipedia.org/wiki/${search[0].title}`)
        };
        // console.log("ini obj", obj);
        res.status(200).json(obj);
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      });
  }
}

module.exports = Wikipedia;
