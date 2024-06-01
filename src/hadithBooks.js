const hadithBooks = async () => {
  const apiUrl =
    "https://www.hadithapi.com/api/books?apiKey=$2y$10$uYlNcaKQat4riNhe414YAu19NUOUIxAjmvxf1x5j7TgzfiEYelA6";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default hadithBooks;