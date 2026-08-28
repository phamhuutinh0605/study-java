package com.study_java.config;

import com.study_java.movie.Category;
import com.study_java.movie.CategoryRepository;
import com.study_java.movie.Movie;
import com.study_java.movie.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final MovieRepository movieRepository;

    public DataSeeder(CategoryRepository categoryRepository, MovieRepository movieRepository) {
        this.categoryRepository = categoryRepository;
        this.movieRepository = movieRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() > 0) {
            return; // Seed data already loaded
        }

        // 1. Seed Categories
        Category action = categoryRepository.save(new Category("Action & Adventure", "action"));
        Category sciFi = categoryRepository.save(new Category("Sci-Fi & Fantasy", "sci-fi"));
        Category drama = categoryRepository.save(new Category("Drama", "drama"));
        Category comedy = categoryRepository.save(new Category("Comedy", "comedy"));
        Category crime = categoryRepository.save(new Category("Crime & Thriller", "crime"));

        // 2. Seed Movies
        List<Movie> movies = List.of(
                new Movie(
                        "Stranger Things",
                        "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
                        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
                        "https://www.youtube.com/embed/b9EkMc79ZSU",
                        2022, 8.7, "4 Seasons", 98, "TV-14",
                        true, true, sciFi
                ),
                new Movie(
                        "Inception",
                        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=80",
                        "https://www.youtube.com/embed/YoHD9XEInc0",
                        2010, 8.8, "2h 28m", 97, "PG-13",
                        false, true, action
                ),
                new Movie(
                        "Interstellar",
                        "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
                        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80",
                        "https://www.youtube.com/embed/zSWdZVtXT7E",
                        2014, 8.7, "2h 49m", 96, "PG-13",
                        false, true, sciFi
                ),
                new Movie(
                        "The Dark Knight",
                        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80",
                        "https://www.youtube.com/embed/EXeTwQWrcwY",
                        2008, 9.0, "2h 32m", 99, "PG-13",
                        false, true, action
                ),
                new Movie(
                        "Cyberpunk Edgerunners",
                        "A street kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner.",
                        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
                        "https://www.youtube.com/embed/JtqIas3bYhg",
                        2022, 8.3, "1 Season", 94, "TV-MA",
                        false, true, sciFi
                ),
                new Movie(
                        "Breaking Bad",
                        "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's financial future.",
                        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
                        "https://www.youtube.com/embed/HhesaQXLuRY",
                        2013, 9.5, "5 Seasons", 99, "TV-MA",
                        false, false, crime
                ),
                new Movie(
                        "The Queen's Gambit",
                        "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and master the game of chess in 1960s America. But child stardom comes at a price.",
                        "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1600&q=80",
                        "https://www.youtube.com/embed/CDrieqwSDGw",
                        2020, 8.6, "1 Season", 95, "TV-MA",
                        false, false, drama
                )
        );

        movieRepository.saveAll(movies);
        System.out.println(">>> Netflix Movies initial seed data successfully loaded into H2 Database!");
    }
}
