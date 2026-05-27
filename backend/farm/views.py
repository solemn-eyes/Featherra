from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Service, Product, Booking, Contact
from .serializers import ServiceSerializer, ProductSerializer, BookingSerializer, ContactSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and managing farm services.
    Automatically seeds initial services if the database table is empty.
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def list(self, request, *args, **kwargs):
        # Auto-seed services if table is empty
        if not Service.objects.exists():
            self._seed_services()
        return super().list(request, *args, **kwargs)

    def _seed_services(self):
        initial_services = [
            {
                "title": "Featherra Farm Fresh Eggs",
                "description": "Discover the taste of real, pasture-raised eggs. Healthy, free-roaming hens produce the most nutritious, golden yolks.",
                "details": "Our heritage-breed hens spend their days roaming lush clover pastures, foraging on organic greens and seeds. Every single egg is hand-gathered daily at sunrise, gently inspected, and packed. Rich in Omega-3 and Vitamin D, these are farm-fresh eggs as nature intended.",
                "image_name": "eggs_service",
                "cta_text": "Learn More",
                "icon": "Egg",
                "order": 1
            },
            {
                "title": "Ethically Raised Poultry Meat",
                "description": "Savor the taste of responsible farming. Our chickens are raised in spacious, sun-drenched pastures with zero antibiotics.",
                "details": "We raise our slow-growing broiler flocks in mobile pasture coops that move daily to fresh grass. This ensures high welfare, natural stress-free foraging, and robust bird health. Ethically processed on our farm and air-chilled, our poultry meat delivers superior flavor, tenderness, and nutrition.",
                "image_name": "meat_service",
                "cta_text": "View Options",
                "icon": "Flame",
                "order": 2
            },
            {
                "title": "Starter Chicks & Hatchery Services",
                "description": "Begin your own homesteading journey with robust, high-quality chicks from our carefully managed breeding flock.",
                "details": "Start your backyard flock on the right foot. We hatch sturdy, vaccinated day-old chicks from premium dual-purpose breeds (including Buff Orpingtons, Rhode Island Reds, and Araucanas). Every purchase includes a digital homestead manual and lifetime husbandry consultation from our team.",
                "image_name": "chicks_service",
                "cta_text": "Hatchery Details",
                "icon": "Bird",
                "order": 3
            },
            {
                "title": "Poultry Workshops, Tours & Expert Advice",
                "description": "Learn sustainable farming methods, experience guided tours, or get premium consulting to optimize your flock.",
                "details": "Featherra is a center for learning. We open our farm gates for monthly hands-on workshops covering pasture management, organic feeding, predator-proofing, and coop builds. We also offer 1-on-1 on-site consulting for smallholders and guided farm experience walks for families.",
                "image_name": "tours_service",
                "cta_text": "Book a Visit",
                "icon": "BookOpen",
                "order": 4
            }
        ]
        for service_data in initial_services:
            Service.objects.create(**service_data)


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and managing organic products.
    Automatically seeds initial products if the database table is empty.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):
        # Auto-seed products if table is empty
        if not Product.objects.exists():
            self._seed_products()
        return super().list(request, *args, **kwargs)

    def _seed_products(self):
        initial_products = [
            {
                "name": "Pasture-Raised Heritage Eggs (Carton)",
                "category": "eggs",
                "description": "A gorgeous dozen of hand-picked multi-colored eggs ranging from deep chocolate browns to sky blues. Collected fresh daily from pasture-fed heritage layers.",
                "price": 6.50,
                "unit": "Dozen",
                "image_name": "heritage_eggs",
                "is_available": True,
                "is_organic": True,
                "order": 1
            },
            {
                "name": "Whole Pasture Broiler Chicken",
                "category": "meat",
                "description": "Fully processed and dressed, slow-grown broiler chicken. Perfect for roasting. Raised in moving shelters on dynamic pastures.",
                "price": 24.00,
                "unit": "Whole Bird (approx 2kg)",
                "image_name": "whole_broiler",
                "is_available": True,
                "is_organic": True,
                "order": 2
            },
            {
                "name": "Buff Orpington Starter Chicks Pack",
                "category": "chicks",
                "description": "A robust pack of 5 vaccinated day-old chicks. Buff Orpingtons are incredibly friendly, cold-hardy, and excellent brown-egg layers for backyard coops.",
                "price": 35.00,
                "unit": "Pack of 5 Day-Olds",
                "image_name": "starter_chicks",
                "is_available": True,
                "is_organic": False,
                "order": 3
            },
            {
                "name": "Featherra Golden Hour Farm Tour",
                "category": "experiences",
                "description": "Guided sunset farm experience. Walk through the pastures, interact with our heritage laying hens, explore the hatchery, and enjoy farm-fresh cider.",
                "price": 20.00,
                "unit": "Ticket / Person",
                "image_name": "workshop_ticket",
                "is_available": True,
                "is_organic": True,
                "order": 4
            }
        ]
        for product_data in initial_products:
            Product.objects.create(**product_data)


class BookingViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling farm tour and workshop bookings.
    """
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "status": "success",
                    "message": "Your booking request was successfully submitted! We look forward to seeing you at the farm.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing contact inquiries and newsletter subscriptions.
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()
            
            # Formulate response depending on subscription type
            if contact.is_newsletter:
                msg = "Thank you for subscribing to Featherra's newsletter! Get ready for fresh updates and cozy farm stories."
            else:
                msg = "Your inquiry has been successfully received. We will get back to you within 24 hours."
                
            return Response(
                {
                    "status": "success",
                    "message": msg,
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
