const hadithChapters = async (name) => {
  const apiUrl = `https://www.hadithapi.com/api/${name}/chapters?apiKey=$2y$10$uYlNcaKQat4riNhe414YAu19NUOUIxAjmvxf1x5j7TgzfiEYelA6`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default hadithChapters;