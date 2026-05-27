from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from datetime import date, timedelta
from .models import Service, Product, Booking, Contact

class FarmSeedingTestCase(APITestCase):
    """
    Verifies that the API automatically seeds default services 
    and products when the database is queried.
    """
    def test_auto_seeding_services(self):
        # Database starts empty
        self.assertEqual(Service.objects.count(), 0)
        
        # Querying the list endpoint triggers seeding
        url = reverse('service-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(Service.objects.count(), 0)
        self.assertEqual(Service.objects.first().title, "Featherra Farm Fresh Eggs")

    def test_auto_seeding_products(self):
        # Database starts empty
        self.assertEqual(Product.objects.count(), 0)
        
        # Querying the list endpoint triggers seeding
        url = reverse('product-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(Product.objects.count(), 0)
        self.assertEqual(Product.objects.first().name, "Pasture-Raised Heritage Eggs (Carton)")


class BookingValidationTestCase(APITestCase):
    """
    Verifies booking reservation business logic and rules.
    """
    def test_booking_valid_future_date(self):
        url = reverse('booking-list')
        future_date = date.today() + timedelta(days=7)
        data = {
            "name": "Jerome Carter",
            "email": "jerome@featherra.com",
            "phone": "555-901-2244",
            "workshop": "sustainable_poultry",
            "date": future_date.strftime("%Y-%m-%d"),
            "tickets": 2,
            "message": "Prefer window seating if applicable."
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Booking.objects.count(), 1)
        self.assertEqual(Booking.objects.first().name, "Jerome Carter")

    def test_booking_invalid_past_date(self):
        url = reverse('booking-list')
        past_date = date.today() - timedelta(days=1)
        data = {
            "name": "Jerome Carter",
            "email": "jerome@featherra.com",
            "phone": "555-901-2244",
            "workshop": "sustainable_poultry",
            "date": past_date.strftime("%Y-%m-%d"),
            "tickets": 2
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("date", response.data)
        self.assertEqual(Booking.objects.count(), 0)


class ContactValidationTestCase(APITestCase):
    """
    Verifies contact and newsletter subscription validation logics.
    """
    def test_newsletter_signup_success(self):
        url = reverse('contact-list')
        data = {
            "email": "clara@featherra.com",
            "is_newsletter": True
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Contact.objects.count(), 1)
        self.assertTrue(Contact.objects.first().is_newsletter)

    def test_inquiry_requires_name_and_message(self):
        url = reverse('contact-list')
        
        # Missing name and message
        data = {
            "email": "clara@featherra.com",
            "subject": "Question about Orpingtons",
            "is_newsletter": False
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)
        self.assertEqual(Contact.objects.count(), 0)
