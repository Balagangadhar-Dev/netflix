from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Movie
from .serializers import MovieSerializer

# ==============================================================================
# APPROACH 1 (RECOMMENDED & INDUSTRY STANDARD): ModelViewSet
# ModelViewSet provides complete CRUD functionality automatically:
# - GET    /api/movies/        --> list()            (Read All)
# - POST   /api/movies/        --> create()          (Create)
# - GET    /api/movies/<id>/   --> retrieve()        (Read Single)
# - PUT    /api/movies/<id>/   --> update()          (Full Update)
# - PATCH  /api/movies/<id>/   --> partial_update()  (Partial Update)
# - DELETE /api/movies/<id>/   --> destroy()         (Delete)
# ==============================================================================

class MovieViewSet(viewsets.ModelViewSet):
    """
    Complete CRUD operations for Movie model.
    Inherits from viewsets.ModelViewSet.
    """
    queryset = Movie.objects.all().order_by('-id')
    serializer_class = MovieSerializer


# ==============================================================================
# APPROACH 2 (EDUCATIONAL DEEP DIVE): Explicit APIViews
# If you want to show students what happens under the hood method by method,
# you can also teach these APIView classes!
# ==============================================================================

class MovieListCreateAPIView(APIView):
    """
    Handles GET (list all) and POST (create new).
    """
    def get(self, request):
        movies = Movie.objects.all().order_by('-id')
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovieDetailAPIView(APIView):
    """
    Handles GET (retrieve), PUT/PATCH (update), and DELETE (destroy) for a single movie.
    """
    def get_object(self, pk):
        return get_object_or_404(Movie, pk=pk)

    def get(self, request, pk):
        movie = self.get_object(pk)
        serializer = MovieSerializer(movie)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        movie = self.get_object(pk)
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        movie = self.get_object(pk)
        serializer = MovieSerializer(movie, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        movie = self.get_object(pk)
        movie.delete()
        return Response({"message": f"Movie '{movie.name}' deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
