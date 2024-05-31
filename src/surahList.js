const surahListNames = async () => {
  const url = "https://online-quran-api.p.rapidapi.com/surahs";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e262144e3cmsh3e010f98164499bp1d81d8jsn8750c6118366",
      "x-rapidapi-host": "online-quran-api.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);
    return data.surahList;
  } catch (error) {
    console.error(error);
  }
};

export default surahListNames;
