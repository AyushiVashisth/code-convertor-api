const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const GPT_API_URL = "https://api.openai.com/v1/engines/davinci/completions";

// Code Conversion Service
app.post("/convert", async (req, res) => {
  try {
    const { code, targetLanguage } = req.body;

    // Use GPT to convert the code
    const gptResponse = await axios.post(
      GPT_API_URL,
      {
        prompt: `Convert the following ${code} into ${targetLanguage} programming language `,
        max_tokens: 7,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    const convertedCode = gptResponse.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Code Debugging Service
app.post("/debug", async (req, res) => {
  try {
    const { code } = req.body;

    // Use GPT to debug the code
    const gptResponse = await axios.post(
      GPT_API_URL,
      {
        prompt: `Debug the following ${code} of ${targetLanguage} programming language ,including all the variable declaration and syntext`,
        max_tokens: 7,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    const debuggedCode = gptResponse.data.choices[0].text.trim();
    res.json({ debuggedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Code Quality Check Service
app.post("/check-quality", async (req, res) => {
  try {
    const { code } = req.body;

    // Use GPT to check the code quality
    const gptResponse = await axios.post(
      GPT_API_URL,
      {
        prompt: `Can you please check the quality ot  the following code ${code} of ${targetLanguage} programming language and,how much % the given code is correct and how we can impore the quality of given code and you have give the entire code by fixing all variable names decleration,syntext and indentation`,
        max_tokens: 7,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    const qualityCheckResult = gptResponse.data.choices[0].text.trim();
    res.json({ qualityCheckResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
