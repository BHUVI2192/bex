
import { NewsArticle } from "../components/NewsCard";

// Categories
export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: "fps", name: "FPS" },
  { id: "moba", name: "MOBA" },
  { id: "battle-royale", name: "Battle Royale" },
  { id: "sports", name: "Sports" },
  { id: "rpg", name: "RPG" },
  { id: "strategy", name: "Strategy" },
];

// Mock articles data
export const articles: NewsArticle[] = [
  {
    id: "1",
    title: "Valorant Champions Tour 2025 Announces Record Prize Pool",
    excerpt: "Riot Games has revealed the biggest prize pool in Valorant esports history for the upcoming VCT 2025 season.",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "FPS",
    date: "April 15, 2025",
    slug: "valorant-champions-tour-2025-announces-record-prize-pool",
  },
  {
    id: "2",
    title: "League of Legends World Championship Coming to Mumbai in 2026",
    excerpt: "Riot Games has announced that the 2026 League of Legends World Championship final will be held in Mumbai, India.",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    category: "MOBA",
    date: "April 14, 2025",
    slug: "league-of-legends-world-championship-coming-to-mumbai-in-2026",
  },
  {
    id: "3",
    title: "BGMI Pro League Season 5 Sets New Viewership Records",
    excerpt: "Battlegrounds Mobile India Pro League Season 5 has broken all previous viewership records with over 3 million concurrent viewers.",
    imageUrl: "https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Battle Royale",
    date: "April 12, 2025",
    slug: "bgmi-pro-league-season-5-sets-new-viewership-records",
  },
  {
    id: "4",
    title: "FIFA eSports World Cup Introduces New Format for 2025",
    excerpt: "EA Sports and FIFA have announced a completely revamped format for the FIFA eSports World Cup 2025.",
    imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Sports",
    date: "April 10, 2025",
    slug: "fifa-esports-world-cup-introduces-new-format-for-2025",
  },
  {
    id: "5",
    title: "Dota 2: Team Spirit Completes Roster with Controversial Transfer",
    excerpt: "Team Spirit has finalized their Dota 2 roster for the upcoming DPC season with a surprising and controversial player transfer.",
    imageUrl: "https://images.unsplash.com/photo-1558742619-fd82741daa99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "MOBA",
    date: "April 8, 2025",
    slug: "dota-2-team-spirit-completes-roster-with-controversial-transfer",
  },
  {
    id: "6",
    title: "Call of Duty League Expands with Three New Indian Teams",
    excerpt: "The Call of Duty League has announced a major expansion, adding three new franchise teams from India for the 2025-2026 season.",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1147&q=80",
    category: "FPS",
    date: "April 7, 2025",
    slug: "call-of-duty-league-expands-with-three-new-indian-teams",
  },
  {
    id: "7",
    title: "Apex Legends Introduces New Indian Legend in Season 25",
    excerpt: "Respawn Entertainment has unveiled a new Indian legend for Apex Legends Season 25, complete with unique abilities inspired by Indian mythology.",
    imageUrl: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "Battle Royale",
    date: "April 5, 2025",
    slug: "apex-legends-introduces-new-indian-legend-in-season-25",
  },
  {
    id: "8",
    title: "CS2 Major Championship to be Held in Delhi in 2025",
    excerpt: "Valve has announced that one of the CS2 Major Championships in 2025 will be hosted in New Delhi, India.",
    imageUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1084&q=80",
    category: "FPS",
    date: "April 3, 2025",
    slug: "cs2-major-championship-to-be-held-in-delhi-in-2025",
  },
  {
    id: "9",
    title: "Fortnite Partners with Bollywood for In-Game Concert Series",
    excerpt: "Epic Games has announced a partnership with major Bollywood stars for an upcoming in-game concert series in Fortnite.",
    imageUrl: "https://images.unsplash.com/photo-1589241062272-c0a000072145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "Battle Royale",
    date: "April 1, 2025",
    slug: "fortnite-partners-with-bollywood-for-in-game-concert-series",
  },
  {
    id: "10",
    title: "Age of Empires V Announces $1 Million Tournament for Indian Players",
    excerpt: "Microsoft has announced a $1 million Age of Empires V tournament exclusively for Indian players, set to take place later this year.",
    imageUrl: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Strategy",
    date: "March 30, 2025",
    slug: "age-of-empires-v-announces-1-million-tournament-for-indian-players",
  },
  {
    id: "11",
    title: "PlayStation 6 Revealed with Revolutionary VR Esports Features",
    excerpt: "Sony has officially unveiled the PlayStation 6, featuring groundbreaking VR technology specifically designed for competitive esports.",
    imageUrl: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    category: "FPS",
    date: "March 28, 2025",
    slug: "playstation-6-revealed-with-revolutionary-vr-esports-features",
  },
  {
    id: "12",
    title: "Minecraft Esports World Cup Announced with Innovative Format",
    excerpt: "Microsoft and Mojang have announced the first-ever Minecraft Esports World Cup with a unique competitive format that will test various player skills.",
    imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
    category: "Strategy",
    date: "March 25, 2025",
    slug: "minecraft-esports-world-cup-announced-with-innovative-format",
  },
];

// Article full content mock data
export interface FullArticle extends NewsArticle {
  content: string;
}

const fullArticleContent: Record<string, string> = {
  "valorant-champions-tour-2025-announces-record-prize-pool": `
    <p>Riot Games has unveiled the largest prize pool in Valorant esports history for the upcoming VCT 2025 season, setting a new benchmark for competitive FPS gaming.</p>
    
    <p>The total prize money across all VCT events in 2025 will exceed $10 million, representing a 40% increase from the previous year. This significant boost reflects Valorant's explosive growth in the global esports scene, particularly in emerging markets like India and Brazil.</p>
    
    <p>"We're committed to building a sustainable and thriving ecosystem for Valorant esports," said Anna Donlon, Executive Producer of Valorant at Riot Games. "This increased prize pool demonstrates our long-term investment in the competitive scene and our confidence in the game's future as a premier esport."</p>
    
    <h3>Regional League Expansion</h3>
    
    <p>In addition to the increased prize money, Riot Games is expanding the VCT's regional league structure. The Indian subcontinent will receive its own dedicated regional circuit starting in 2025, allowing more local talent to compete at a professional level without relocating to other regions.</p>
    
    <p>The VCT 2025 season will also introduce a new tournament format designed to create more high-stakes matches and compelling storylines throughout the year. The Champions event, which serves as the world championship for Valorant, will now feature 24 teams instead of 16, providing more opportunities for regional representation on the global stage.</p>
    
    <p>Teams and players have responded enthusiastically to the announcement, with many professional organizations now looking to expand their Valorant rosters in anticipation of the enhanced competitive calendar.</p>
    
    <h3>New Viewership Features</h3>
    
    <p>To enhance the viewer experience, Riot Games is also introducing new interactive features for VCT broadcasts. Spectators will be able to earn in-game rewards for watching matches and will have access to real-time statistics and player perspectives directly through the Valorant client.</p>
    
    <p>These innovations aim to push Valorant esports to new heights as the game continues to challenge established titles in the competitive gaming landscape.</p>
    
    <p>The VCT 2025 season will kick off in February with regional qualifiers, culminating in the Champions event scheduled for October in Seoul, South Korea.</p>
  `,
};

// Function to get full article content
export const getFullArticle = (slug: string): FullArticle | undefined => {
  const article = articles.find(a => a.slug === slug);
  if (!article) return undefined;
  
  return {
    ...article,
    content: fullArticleContent[slug] || `<p>Detailed content for "${article.title}" is coming soon.</p>`
  };
};

// Function to get filtered articles
export const getFilteredArticles = (categoryId: string | null, searchQuery: string | null) => {
  let filtered = [...articles];
  
  // Filter by category if specified
  if (categoryId) {
    filtered = filtered.filter(
      article => article.category.toLowerCase() === categoryId.toLowerCase()
    );
  }
  
  // Filter by search query if specified
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );
  }
  
  return filtered;
};

// Function to get related articles
export const getRelatedArticles = (currentArticleId: string, categoryId: string) => {
  return articles
    .filter(
      article => 
        article.id !== currentArticleId && 
        article.category.toLowerCase() === categoryId.toLowerCase()
    )
    .slice(0, 3);
};

// Mock refresh news data (simulates API call)
let lastRefreshTime = new Date();

export const shouldRefreshData = (): boolean => {
  const now = new Date();
  const timeDiff = now.getTime() - lastRefreshTime.getTime();
  const minutesPassed = Math.floor(timeDiff / 60000);
  
  // Return true if 30 minutes have passed
  return minutesPassed >= 30;
};

export const refreshNewsData = async (): Promise<NewsArticle[]> => {
  // In a real app, this would be an API call
  // For demo purposes, we'll just update the last refresh time
  return new Promise((resolve) => {
    setTimeout(() => {
      lastRefreshTime = new Date();
      resolve(articles);
    }, 1000);
  });
};
