import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { metaData, otherMetaData } from "./src/metaData.js";
import surahData from "./src/surah.js";
import audioData from "./src/Surahaudio.js";
import surahListNames from "./src/surahList.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render(join(__dirname, "views", "index.ejs"));
});

app.get("/surah/:id", async (req, res) => {
  const id = req.params.id;
  const Surahverses = await surahData(id);
  const surahList = await surahListNames();
  const audioId = await (surahList[id - 1]);
  const audio = await audioData(audioId.name);
  res.render(join(__dirname, "views", "surah.ejs"), {
    surah: Surahverses,
    audio: audio,
    surahList: surahList,
  });
});

app.get("/quran", async (req, res) => {
  const data = await metaData();
  const otherData = await otherMetaData();
  res.render(join(__dirname, "views", "quran.ejs"), {
    surahs: data,
    meta: otherData,
  });
});

const port = 5500;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
