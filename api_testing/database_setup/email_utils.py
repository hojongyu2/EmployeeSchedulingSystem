from django.core.mail import EmailMultiAlternatives
from django.conf import settings

def send_confirmation_email(volunteer_shift):
    
    confirm_url = f"{settings.BASE_URL}/data/confirm-shift/{volunteer_shift.id}/yes"
    reject_url = f"{settings.BASE_URL}/data/confirm-shift/{volunteer_shift.id}/no"

    text_content = f"""
    Dear {volunteer_shift.volunteer.name},

    I hope this email finds you well! Based on your submitted availability, we have an event that you might be interested in.

    Event Details
    
    Event Name: {volunteer_shift.event_activity.event.name}
    Date: {volunteer_shift.event_activity.event.date_of_event}
    Start Time: {volunteer_shift.start_time}
    End Time: {volunteer_shift.end_time}
    
    Confirm shift: {confirm_url}
    Reject shift: {reject_url}

    Thank you!
    """
    
    html_content = f"""
    <p>Dear {volunteer_shift.volunteer.name},</p>

    <p>I hope this email finds you well! Based on your submitted availability, we have an event that you might be interested in.</p>

    <p>Event Details:<br/>
    Event Name: <strong>{volunteer_shift.event_activity.event.name}</strong><br/>
    Date: {volunteer_shift.event_activity.event.date_of_event}<br/>
    Start Time: {volunteer_shift.start_time}<br/>
    End Time: {volunteer_shift.end_time}</p>

    <p>To confirm your attendance for this event, please click on the following link: <a href="{confirm_url}">Confirm shift</a><br/></p>
    
    <p>If you are unable to attend, please click on the following link to decline: <a href="{reject_url}">Reject shift</a></p>

    <p>Thank you!</p>
    """

    
    email = EmailMultiAlternatives(
        'Volunteer Opportunity - Mt. Sinai',
        text_content,
        settings.DEFAULT_FROM_EMAIL,
        [volunteer_shift.volunteer.email]
    )
    email.attach_alternative(html_content, "text/html")

    email.send(fail_silently=False)
