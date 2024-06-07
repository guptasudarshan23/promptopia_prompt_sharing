import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export default async function handler(req, res) {
  const { id } = req.query;

  await connectToDB();

  if (req.method === "GET") {
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }
    return res.status(200).json(prompt);
  }

  if (req.method === "PATCH") {
    const { prompt, tag } = JSON.parse(req.body);
    const updatedPrompt = await Prompt.findByIdAndUpdate(id, { prompt, tag }, { new: true });
    if (!updatedPrompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }
    return res.status(200).json(updatedPrompt);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
