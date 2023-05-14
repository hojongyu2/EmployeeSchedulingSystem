from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings

def send_confirmation_email(volunteer_shift):
    # Construct the confirmation link
    confirm_url = f"{settings.BASE_URL}/data/confirm-shift/{volunteer_shift.id}/yes"
    reject_url = f"{settings.BASE_URL}/data/confirm-shift/{volunteer_shift.id}/no"
    
    email_body = f"""
    Dear {volunteer_shift.volunteer.name},

    You have been assigned a new shift. Please confirm or reject this shift by clicking one of the links below:

    Confirm shift: {confirm_url}
    Reject shift: {reject_url}

    Thank you!
    """

    # send the email
    send_mail(
        'New Shift Assignment',
        email_body,
        settings.DEFAULT_FROM_EMAIL,
        [volunteer_shift.volunteer.email],
        fail_silently=False,
    )