from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.loginPage, name="login"),
    path("signup/", views.signupPage, name="signup"),
    path("logout/", views.logoutPage, name="logout"),
]