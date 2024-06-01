const hadithData = async () => {
  const apiUrl =
    "https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$uYlNcaKQat4riNhe414YAu19NUOUIxAjmvxf1x5j7TgzfiEYelA6";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    return data.hadiths;
  } catch (error) {
    console.log(error);
  }
};

export default hadithData;
