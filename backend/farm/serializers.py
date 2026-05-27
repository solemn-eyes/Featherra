from rest_framework import serializers
from datetime import date
from .models import Service, Product, Booking, Contact

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

    def validate_date(self, value):
        """
        Validate that the booking date is in the future.
        """
        if value < date.today():
            raise serializers.ValidationError("Booking date cannot be in the past.")
        return value


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

    def validate(self, data):
        """
        Ensure that inquiry submissions contain a message and name, 
        whereas newsletter subscriptions only require an email.
        """
        is_newsletter = data.get('is_newsletter', False)
        if not is_newsletter:
            if not data.get('name'):
                raise serializers.ValidationError({"name": "Name is required for contacting us."})
            if not data.get('message'):
                raise serializers.ValidationError({"message": "Message is required for contacting us."})
        return data
