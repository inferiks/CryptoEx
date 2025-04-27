from django.db import models
from django.utils import timezone

class PaymentDetails(models.Model):
    FIAT = 'fiat'
    CRYPTO = 'crypto'
    TYPE_CHOICES = [
        (FIAT, 'Fiat'),
        (CRYPTO, 'Crypto'),
    ]

    currency_code = models.CharField(max_length=10)  # убираем уникальность, чтобы можно было иметь несколько записей с одним кодом
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.currency_code} ({self.type})"


class Order(models.Model):
    from_currency = models.CharField(max_length=10)
    to_currency = models.CharField(max_length=10)
    amount = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    rate = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    total = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    email = models.EmailField(max_length=255)
    payment_details = models.ForeignKey('PaymentDetails', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=50, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} from {self.from_currency} to {self.to_currency}"
