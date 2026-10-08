from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Movie

class MovieAPICRUDTests(APITestCase):
    """
    Test suite demonstrating all DRF CRUD operations:
    - Create (POST)
    - Read List (GET)
    - Read Detail (GET)
    - Update (PUT / PATCH)
    - Delete (DELETE)
    """

    def setUp(self):
        self.movie_payload = {
            "name": "Inception",
            "genre": "Sci-Fi",
            "releaseYear": 2010,
            "rating": "8.8",
            "duration": "148 mins",
            "director": "Christopher Nolan",
            "cast": "Leonardo DiCaprio, Joseph Gordon-Levitt",
            "description": "A thief who steals corporate secrets through dream-sharing technology.",
            "bannerUrl": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
            "trailer": "https://www.youtube.com/embed/YoHD9XEInc0"
        }
        self.movie = Movie.objects.create(**self.movie_payload)
        self.list_create_url = "/api/movies/"
        self.detail_url = f"/api/movies/{self.movie.id}/"

    def test_create_movie(self):
        """Test CREATE (POST): Adding a new movie via DRF"""
        new_movie_data = {
            "name": "Interstellar",
            "genre": "Sci-Fi",
            "releaseYear": 2014,
            "rating": "8.7",
            "duration": "169 mins",
            "director": "Christopher Nolan",
            "cast": "Matthew McConaughey, Anne Hathaway",
            "description": "A team of explorers travel through a wormhole in space.",
            "bannerUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
            "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E"
        }
        response = self.client.post(self.list_create_url, new_movie_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Interstellar")
        self.assertEqual(Movie.objects.count(), 2)

    def test_read_movies_list(self):
        """Test READ (GET List): Retrieving all movies"""
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_read_movie_detail(self):
        """Test READ (GET Detail): Retrieving a single movie by ID"""
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Inception")

    def test_update_movie_put(self):
        """Test UPDATE (PUT): Full update of a movie"""
        updated_data = self.movie_payload.copy()
        updated_data["rating"] = "9.0"
        response = self.client.put(self.detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["rating"], "9.0")

    def test_partial_update_movie_patch(self):
        """Test UPDATE (PATCH): Partial update of a movie field"""
        patch_data = {"genre": "Mind-Bending Sci-Fi"}
        response = self.client.patch(self.detail_url, patch_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["genre"], "Mind-Bending Sci-Fi")

    def test_delete_movie(self):
        """Test DELETE: Deleting a movie by ID"""
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Movie.objects.filter(id=self.movie.id).exists())
