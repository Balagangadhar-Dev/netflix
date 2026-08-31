from django.shortcuts import render, redirect
from .movies import movies_data

from django.contrib.auth.decorators import login_required


# Create your views here.
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