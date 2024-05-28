import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

async function getSurahs() {
  return new Promise((resolve, reject) => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

app.get("/", (req, res) => {
  getSurahs().then((data) => {
    res.render(join(__dirname, "views", "index.ejs"), {
      surahs: data,
    });
  });
});

async function getVerses(id) {
  const url = `https://api.quran.com/api/v4/verses/by_chapter/${id}?language=en`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (!data.verses) {
      throw new Error("No verses found in the API response.");
    }

    const enrichedVerses = data.verses.map((verse) => ({
      verse_number: verse.verse_number,
      verse_key: verse.verse_key,
      translations:
        verse.translations && verse.translations.length > 0
          ? verse.translations[0].text
          : "No translation available",
      arabicText:
        verse.words && verse.words.length > 0
          ? verse.words[0].text_uthmani
          : "No Arabic text available",
    }));

    return enrichedVerses;
  } catch (err) {
    console.error("Error fetching verses:", err);
    throw err;
  }
}

app.get("/surah/:id", async (req, res) => {
  try {
    const surahId = req.params.id;
    const verses = await getVerses(surahId);
    console.log(verses);
    if (Array.isArray(verses) && verses.length > 0) {
      // Render the surah.ejs view with the surah data
      res.render(join(__dirname, "views", "surah.ejs"), { surah: { verses } });
    } else {
      console.error(
        "Failed to fetch surah data or data is not in the expected format."
      );
      res.status(500).send("Error loading surah data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading surah data");
  }
});

app.get("/quran", (req, res) => {
  res.render(join(__dirname, "views", "quran.ejs"));
});

const port = 5500;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
