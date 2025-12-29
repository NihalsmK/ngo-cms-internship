from django.urls import path
from . import views

urlpatterns = [
    path('donations/', views.DonationListCreateView.as_view(), name='donations'),
]
