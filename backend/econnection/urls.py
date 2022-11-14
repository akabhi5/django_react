
from django.urls import path
from .views import ConnectionList, ConnectionGraph, ConnectionDetail

urlpatterns = [
    path('', ConnectionList.as_view()),
    path('<int:pk>/', ConnectionDetail.as_view()),
    path('graph/', ConnectionGraph.as_view()),
]
