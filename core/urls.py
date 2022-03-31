from django.urls import path, include

from . import views

urlpatterns = [
    path('api/stack', views.stacksearch, name='stacksearch'),
]
