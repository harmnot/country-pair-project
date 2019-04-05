const axios = require("axios");
const pixabay = axios.create({
  baseURL: "https://pixabay.com/"
});

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
        const obj = {
          title: search[0].title,
          snippet: search[0].snippet,
          url: encodeURI(`https://en.wikipedia.org/wiki/${search[0].title}`)
        };
        return Promise.all([
          pixabay.get(
            `/api/?key=12093634-a561f8eccea50f0448c917ff4&q=${search[0].title}`
          ),
          obj
        ]);
      })
      .then(([getPic, objWiki]) => {
        const { data } = getPic;
        res.status(200).json({ dataWiki: objWiki, pic: data });
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      });
  }
}

module.exports = Wikipedia;
