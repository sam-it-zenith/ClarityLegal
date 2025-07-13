export interface GeminiAnalysis {
  summary: string;
  risks: string[];
  rights: string[];
  structure: string[];
}

export async function analyzeLegalDocument(text: string): Promise<GeminiAnalysis> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key not set. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env.local file.");

  const prompt = `You are ClarityLegal, a professional AI legal assistant for freelancers and small businesses.

Your job is to analyze **only legal documents** such as:
- Contracts
- Agreements
- Terms & Conditions
- NDAs
- MOUs
- Service/Work Agreements
- Etc. legal documents...

---

🎯 Expected Output:
Return ONLY a valid **JSON object** in this exact format:
{
  "summary": "plain English summary of the legal document",
  "risks": ["array of risky clauses or obligations"],
  "rights": ["array of user rights and duties"],
  "structure": ["array of main contract sections"]
}

---

⚠️ IMPORTANT RULES:
1. If the input text is **not a legal document** (e.g., ebook, blog post, receipt, invoice, resume, fiction, etc.), respond ONLY with this JSON:

{
  "error": "Please upload a valid legal document such as a contract, agreement, or terms of service."
}

2. Do not include any explanations, markdown, or code formatting. Just return the raw JSON.

3. If the document is extremely short and lacks legal language, assume it's not valid and return the error message above.

---

📄 Document to analyze:
${text}`;

  let response: Response;
  try {
    response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
  } catch (err) {
    throw new Error("Network error: Unable to reach Gemini API. Please check your connection.");
  }

  if (!response.ok) {
    let errorMsg = `Gemini API error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.error && errorData.error.message) {
        errorMsg += ` - ${errorData.error.message}`;
      }
    } catch {}
    throw new Error(errorMsg);
  }

  let data: any;
  try {
    data = await response.json();
  } catch {
    throw new Error("Failed to parse Gemini API response as JSON.");
  }

  // Gemini returns the output in data.candidates[0].content.parts[0].text
  const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!output) throw new Error("No output from Gemini. The document may be too long or the API did not return a result.");

  let parsed: any;
  try {
    // Clean the output to extract JSON from markdown code blocks if present
    let cleanedOutput = output.trim();
    
    // Remove markdown code block markers if present
    if (cleanedOutput.startsWith('```json')) {
      cleanedOutput = cleanedOutput.replace(/^```json\s*/, '');
    }
    if (cleanedOutput.startsWith('```')) {
      cleanedOutput = cleanedOutput.replace(/^```\s*/, '');
    }
    if (cleanedOutput.endsWith('```')) {
      cleanedOutput = cleanedOutput.replace(/\s*```$/, '');
    }
    
    // Parse the cleaned JSON
    parsed = JSON.parse(cleanedOutput);
    
    // Check if this is an error response for non-legal documents
    if (parsed.error) {
      throw new Error(parsed.error);
    }
    
    // Validate structure for legal document analysis
    if (
      typeof parsed.summary !== "string" ||
      !Array.isArray(parsed.risks) ||
      !Array.isArray(parsed.rights) ||
      !Array.isArray(parsed.structure)
    ) {
      throw new Error("Invalid JSON structure");
    }
    
    // Ensure all arrays contain strings
    if (!parsed.risks.every((risk: any) => typeof risk === "string") ||
        !parsed.rights.every((right: any) => typeof right === "string") ||
        !parsed.structure.every((section: any) => typeof section === "string")) {
      throw new Error("Invalid data types in arrays");
    }
    
  } catch (parseError) {
    console.error("Parsing error:", parseError);
    console.error("Raw output:", output);
    
    // If it's our specific error message, throw it directly
    if (parseError instanceof Error && parseError.message.includes("Please upload a valid legal document")) {
      throw parseError;
    }
    
    throw new Error("Failed to parse Gemini output as expected JSON. Please try a different document or contact support. Output: " + output);
  }
  
  return parsed as GeminiAnalysis;
} 