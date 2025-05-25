class GeminiService {
  constructor() {
    // Replace with your actual Gemini API key
    this.apiKey = 'AIzaSyBdtC0uhXuNbCm9ieWnG_UGQPNI6Yxyuqs';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  }

  async makeGeminiRequest(prompt) {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response structure from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  async searchLegalQuery(query, language = 'en') {
    try {
      const languageInstruction = this.getLanguageInstruction(language);
      
      const prompt = `${languageInstruction}

As a legal expert in Indian law, provide comprehensive information for this query: "${query}"

Please structure your response in this exact JSON format (ensure it's valid JSON):
{
  "legalDomain": "Primary area of law (e.g., Family Law, Criminal Law, etc.)",
  "possibleComplaints": ["List of possible legal complaints related to this query"],
  "relevantLaws": ["List of specific Indian laws, acts, and sections"],
  "userRights": ["List of user's legal rights in this situation"],
  "recommendedSteps": ["Step-by-step recommendations for the user"],
  "urgencyLevel": "low/medium/high",
  "additionalInfo": "Any additional important information"
}

Focus on Indian laws and constitution. Be accurate and helpful. Respond only with valid JSON. Do not include any markdown formatting or code blocks.`;

      const response = await this.makeGeminiRequest(prompt);
      
      try {
        // Clean the response to ensure it's valid JSON
        let cleanResponse = response
          .replace(/```json\n?/g, '') // Remove JSON code block markers
          .replace(/```\n?/g, '')     // Remove any remaining code block markers
          .replace(/^\s*[\r\n]/gm, '') // Remove empty lines
          .trim();
        
        // If the response starts with a newline or whitespace, remove it
        cleanResponse = cleanResponse.replace(/^\s+/, '');
        
        // Parse the cleaned response
        const parsedResponse = JSON.parse(cleanResponse);
        
        // Ensure all required fields are present and properly formatted
        return {
          legalDomain: parsedResponse.legalDomain || "General Legal Guidance",
          possibleComplaints: Array.isArray(parsedResponse.possibleComplaints) ? parsedResponse.possibleComplaints : ["Legal consultation needed"],
          relevantLaws: Array.isArray(parsedResponse.relevantLaws) ? parsedResponse.relevantLaws : ["Indian Constitution"],
          userRights: Array.isArray(parsedResponse.userRights) ? parsedResponse.userRights : ["Right to legal representation"],
          recommendedSteps: Array.isArray(parsedResponse.recommendedSteps) ? parsedResponse.recommendedSteps : ["Consult with a legal professional"],
          urgencyLevel: ["low", "medium", "high"].includes(parsedResponse.urgencyLevel) ? parsedResponse.urgencyLevel : "medium",
          additionalInfo: parsedResponse.additionalInfo || "Please consult with a legal professional for specific advice."
        };
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        // Fallback response
        return {
          legalDomain: "General Legal Guidance",
          possibleComplaints: ["Legal consultation needed"],
          relevantLaws: ["Indian Constitution", "Relevant local laws"],
          userRights: ["Right to legal representation", "Right to fair trial"],
          recommendedSteps: ["Please consult with a legal professional for specific advice"],
          urgencyLevel: "medium",
          additionalInfo: "Please consult with a legal professional for specific advice."
        };
      }
    } catch (error) {
      console.error('Search Legal Query Error:', error);
      throw new Error('Failed to get legal information. Please try again.');
    }
  }

  async chatResponse(message, language = 'en', conversationHistory = []) {
    try {
      const languageInstruction = this.getLanguageInstruction(language);
      
      const context = conversationHistory.slice(-5).map(msg => 
        `${msg.sender}: ${msg.text}`
      ).join('\n');

      const prompt = `${languageInstruction}

You are a helpful legal assistant specializing in Indian law. 
Previous conversation:
${context}

User message: "${message}"

Provide helpful, accurate legal guidance. Keep responses conversational but informative. 
Focus on Indian laws and regulations. If you're unsure about something, recommend consulting a legal professional.
Respond directly without any formatting or JSON structure.`;

      return await this.makeGeminiRequest(prompt);
    } catch (error) {
      console.error('Chat Response Error:', error);
      return this.getErrorMessage(language);
    }
  }

  getLanguageInstruction(language) {
    switch (language) {
      case 'hi':
        return 'कृपया हिंदी में जवाब दें।';
      case 'mr':
        return 'कृपया मराठी में उत्तर द्या।';
      case 'te':
        return 'దయచేసి తెలుగులో సమాధానం ఇవ్వండి।';
      default:
        return 'Please respond in English.';
    }
  }

  getErrorMessage(language) {
    switch (language) {
      case 'hi':
        return 'क्षमा करें, मुझे कुछ समस्या हो रही है। कृपया पुनः प्रयास करें।';
      case 'mr':
        return 'माफ करा, मला काही अडचण येत आहे. कृपया पुन्हा प्रयत्न करा।';
      case 'te':
        return 'క్షమించండి, నాకు కొంత సమస్య వస్తోంది. దయచేసి మళ్లీ ప్రయత్నించండి।';
      default:
        return 'Sorry, I\'m having some trouble. Please try again.';
    }
  }
}

export default new GeminiService();