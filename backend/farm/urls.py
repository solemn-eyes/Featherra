from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, ProductViewSet, BookingViewSet, ContactViewSet

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'contacts', ContactViewSet, basename='contact')

urlpatterns = [
    path('', include(router.urls)),
]
