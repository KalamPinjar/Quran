import express from "express";
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
  return new Promise((resolve, reject) => {
    const url = `https://api.quran.com/api/v4/verses/by_chapter/${id}`; // Assuming you still want to use chapter number
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const enrichedVerses = data.verses.map((verse) => ({
          ...verse,
          translations: verse.translations ? verse.translations[0].text : "", // Simplified for demonstration
        }));
        resolve(enrichedVerses);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

app.get("/surah/:id", async (req, res) => {
  try {
    const surahId = req.params.id;
    // Fetch the surah data based on the ID
    const surahData = await getVerses(surahId); // Assuming getVerses is correctly implemented

    // Check if surahData is not undefined and is an array
    if (Array.isArray(surahData)) {
      console.log("Fetched surah data:", surahData);
      res.render(join(__dirname, "views", "surah.ejs"), {
        surah: surahData,
      });
    } else {
      // Handle the case where surahData is not an array
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
