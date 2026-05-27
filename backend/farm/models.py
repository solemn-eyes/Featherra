from django.db import models
from django.core.validators import MinValueValidator, EmailValidator

class Service(models.Model):
    """
    Represents a major service offered by Featherra poultry farm.
    """
    title = models.CharField(max_length=150)
    description = models.TextField(help_text="Short introductory text for the service card")
    details = models.TextField(help_text="Extended detailed information shown in modals")
    image_name = models.CharField(max_length=100, help_text="Asset image file name or key in the React frontend")
    cta_text = models.CharField(max_length=50, default="Learn More")
    icon = models.CharField(max_length=50, help_text="Lucide-react icon name representing this service")
    order = models.IntegerField(default=0, help_text="Ordering rank for display")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Product(models.Model):
    """
    Represents organic products available for order or inquiry.
    """
    CATEGORY_CHOICES = [
        ('eggs', 'Eggs'),
        ('meat', 'Poultry Meat'),
        ('chicks', 'Starter Chicks'),
        ('experiences', 'Farm Experiences'),
    ]

    name = models.CharField(max_length=150)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(0.0)])
    unit = models.CharField(max_length=30, help_text="e.g. dozen, kg, starter pack, ticket")
    image_name = models.CharField(max_length=100, help_text="Asset image name in the React frontend")
    is_available = models.BooleanField(default=True)
    is_organic = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} ({self.price}/{self.unit})"


class Booking(models.Model):
    """
    Saves details of workshop/tour bookings submitted by visitors.
    """
    WORKSHOP_CHOICES = [
        ('sustainable_poultry', 'Sustainable Poultry Farming Workshop (Saturdays, $45)'),
        ('farm_tour', 'Featherra Farm Guided Tour (Golden Hour, $20)'),
        ('flock_consulting', 'Starter Flock Consulting Session (1-on-1, $75)'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(validators=[EmailValidator()])
    phone = models.CharField(max_length=20)
    workshop = models.CharField(max_length=100, choices=WORKSHOP_CHOICES)
    date = models.DateField()
    tickets = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    message = models.TextField(blank=True, help_text="Optional custom requests or dietary needs")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.workshop} ({self.tickets} tickets)"


class Contact(models.Model):
    """
    Saves generic contact questions or newsletter subscriptions.
    """
    name = models.CharField(max_length=100, blank=True, null=True, help_text="Blank if only subscribing to newsletter")
    email = models.EmailField(validators=[EmailValidator()])
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    is_newsletter = models.BooleanField(default=False, help_text="True if this is a newsletter signup")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        form_type = "Newsletter Signup" if self.is_newsletter else "Inquiry"
        return f"{form_type} from {self.email} ({self.created_at.strftime('%Y-%m-%d')})"
