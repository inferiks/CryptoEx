from rest_framework import serializers
from .models import Order, PaymentDetails

class OrderSerializer(serializers.ModelSerializer):
    payment_address = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__' 

    def get_payment_address(self, obj):
        try:
            payment = PaymentDetails.objects.get(currency_code=obj.from_currency)
            return payment.address
        except PaymentDetails.DoesNotExist:
            return None
