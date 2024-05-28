const metaData = async () => {
  const url = "https://al-qur-an-all-translations.p.rapidapi.com/v1/meta";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e262144e3cmsh3e010f98164499bp1d81d8jsn8750c6118366",
      "x-rapidapi-host": "al-qur-an-all-translations.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();

    const data = JSON.parse(result);
    const surahs = data.data.surahs.references;
    return surahs;
  } catch (error) {
    console.error(error);
  }
};

const otherMetaData = async () => {
  const url = "https://al-qur-an-all-translations.p.rapidapi.com/v1/meta";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e262144e3cmsh3e010f98164499bp1d81d8jsn8750c6118366",
      "x-rapidapi-host": "al-qur-an-all-translations.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();

    const data = JSON.parse(result);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
export { metaData, otherMetaData };

