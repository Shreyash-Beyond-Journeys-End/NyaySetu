import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

class GeminiService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async searchLegalQuery(query, language = 'en') {
    try {
      const prompt = `
        As a legal expert in Indian law, provide comprehensive information for this query: "${query}"
        
        Please structure your response in this JSON format:
        {
          "legalDomain": "Primary area of law (e.g., Family Law, Criminal Law, etc.)",
          "possibleComplaints": ["List of possible legal complaints related to this query"],
          "relevantLaws": ["List of specific Indian laws, acts, and sections"],
          "userRights": ["List of user's legal rights in this situation"],
          "recommendedSteps": ["Step-by-step recommendations for the user"],
          "urgencyLevel": "low/medium/high",
          "additionalInfo": "Any additional important information"
        }
        
        Language: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : language === 'te' ? 'Telugu' : 'English'}
        Focus on Indian laws and constitution. Be accurate and helpful.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch {
        // Fallback if JSON parsing fails
        return {
          legalDomain: "General Legal Guidance",
          possibleComplaints: ["Legal consultation needed"],
          relevantLaws: ["Indian Constitution", "Relevant local laws"],
          userRights: ["Right to legal representation", "Right to fair trial"],
          recommendedSteps: [text],
          urgencyLevel: "medium",
          additionalInfo: "Please consult with a legal professional for specific advice."
        };
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to get legal information. Please try again.');
    }
  }

  async chatResponse(message, language = 'en', conversationHistory = []) {
    try {
      const context = conversationHistory.slice(-5).map(msg => 
        `${msg.sender}: ${msg.text}`
      ).join('\n');

      const prompt = `
        You are a helpful legal assistant specializing in Indian law. 
        Previous conversation:
        ${context}
        
        User message: "${message}"
        
        Provide helpful, accurate legal guidance in ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : language === 'te' ? 'Telugu' : 'English'}.
        Keep responses conversational but informative. Focus on Indian laws and regulations.
        If you're unsure about something, recommend consulting a legal professional.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini Chat Error:', error);
      return language === 'hi' ? 'क्षमा करें, मुझे कुछ समस्या हो रही है। कृपया पुनः प्रयास करें।' :
             language === 'mr' ? 'माफ करा, मला काही अडचण येत आहे. कृपया पुन्हा प्रयत्न करा.' :
             language === 'te' ? 'క్షమించండి, నాకు కొంత సమస్య వస్తోంది. దయచేసి మళ్లీ ప్రయత్నించండి.' :
             'Sorry, I\'m having some trouble. Please try again.';
    }
  }
}

export default new GeminiService();
