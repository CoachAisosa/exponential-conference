import NewsHero from "../components/news/NewsHero";
import FeaturedNews from "../components/news/FeaturedNews";
import NewsFilters from "../components/news/NewsFilters";
import NewsList from "../components/news/NewsList";
import NewsCTA from "../components/news/NewsCTA";

function NewsArticle() {
  return (
      <main className="newsPage">
      <NewsHero />

      <FeaturedNews />

      <NewsFilters />

      <NewsList />

      <NewsCTA />
    </main>
  )
}

export default NewsArticle
