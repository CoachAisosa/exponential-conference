import NewsHero from "../components/News/NewsHero";
import FeaturedNews from "../components/News/FeaturedNews";
import NewsFilters from "../components/News/NewsFilters";
import NewsList from "../components/News/NewsList";
import NewsCTA from "../components/News/NewsCTA";

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
