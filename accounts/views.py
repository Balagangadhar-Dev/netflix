from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login

def signupPage(request):

    if request.method == "POST":

        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]

        if User.objects.filter(username=username).exists():
            return render(request, "signup.html",
                          {"error":"Username already exists"})

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        login(request, user)

        return redirect("home")

    return render(request,"signup.html")










from django.contrib.auth import authenticate, login

def loginPage(request):

    if request.method == "POST":

        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)
            return redirect("home")

        return render(request,"login.html",
                      {"error":"Invalid Username or Password"})

    return render(request,"login.html")








from django.contrib.auth import logout

def logoutPage(request):

    logout(request)

    return redirect("login")