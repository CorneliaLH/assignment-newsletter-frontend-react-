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
      "https://assignmentnewsletterbackend.herokuapp.com/newsletter",
      { userId: userId },

      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }
  async changeNewsletterSubscriber(userId: string | null) {
    let response = await axios.post<SubscriptionStatus>(
      "https://assignmentnewsletterbackend.herokuapp.com/newsletter/change",
      { userId: userId },

      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }
}
