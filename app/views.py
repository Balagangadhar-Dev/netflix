from django.shortcuts import render, redirect, get_object_or_404
from .movies import movies_data

from django.contrib.auth.decorators import login_required

from .models import Movie
from .forms import MovieForm

@login_required
def home(request):
    movies = Movie.objects.all()
    context = {"movies": movies}
    return render(request, "home.html", context)


@login_required
def addMovie(request):
    if request.method == "POST":
        form = MovieForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("home") # Redirects back to the movie list[cite: 1]
    else:
        form = MovieForm()
        
    return render(request, "add_movie.html", {"form": form})


@login_required
def manageMovies(request):
    movies = Movie.objects.all().order_by('-releaseYear')
    return render(request, "manage_movies.html", {"movies": movies})

@login_required
def editMovie(request, pk):
    movie = get_object_or_404(Movie, id=pk)
    
    if request.method == "POST":
        form = MovieForm(request.POST, instance=movie)
        if form.is_valid():
            form.save()
            return redirect("manage_movies")
    else:
        form = MovieForm(instance=movie)
    return render(request, "add_movie.html", {"form": form})


@login_required
def deleteMovie(request, pk):
    movie = get_object_or_404(Movie, id=pk)
    
    if request.method == "POST":
        movie.delete()
        return redirect("manage_movies")
        
    return render(request, "delete_movie.html", {"movie": movie})