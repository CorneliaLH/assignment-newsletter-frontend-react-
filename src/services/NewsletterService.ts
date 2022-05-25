import axios from "axios";

interface Newsletter {
  newsletter: boolean;
}

interface SubscriptionStatus {
  message: string;
}

export class NewsletterService {
  async getNewsletterSubscriber(userId: string | null) {
    let response = await axios.post<Newsletter>(
      "http://localhost:3001/newsletter",
      { userId: userId },

      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }
  async changeNewsletterSubscriber(userId: string | null) {
    let response = await axios.post<SubscriptionStatus>(
      "http://localhost:3001/newsletter/change",
      { userId: userId },

      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }
}
