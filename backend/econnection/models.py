from django.db import models
from django.core.validators import MaxValueValidator
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    type = models.CharField(max_length=64)

    def __str__(self):
        return self.type


class Connection(models.Model):

    class GenderChoice(models.TextChoices):
        MALE = 'M', _('Male')
        FEMALE = 'F', _('Female')

    class OwnershipChoice(models.TextChoices):
        JOINT = 'JO', _('Joint')
        INDIVIDUAL = 'IN', _('Individual')

    class GovIdChoice(models.TextChoices):
        AADHAR = 'AA', _('Aadhar')
        VOTER_ID = 'VO', _('VOTER')
        PAN = 'PAN', _('PAN')
        PASSPORT = 'PASS', _('Passport')

    class StatusChoice(models.TextChoices):
        APPROVED = 'APR', _('Approved')
        PENDING = 'PE', _('Pending')
        CONNECTIONRELEASED = 'CONR', _('Connection Released')
        REJECTED = 'RE', _('Rejected')

    applicant_name = models.CharField(max_length=64)
    gender = models.CharField(max_length=2, choices=GenderChoice.choices)
    district = models.CharField(max_length=256)
    state = models.CharField(max_length=256)
    pincode = models.CharField(max_length=6)
    ownership = models.CharField(
        max_length=10, choices=OwnershipChoice.choices)
    gov_id_type = models.CharField(max_length=10, choices=GovIdChoice.choices)
    id_number = models.CharField(max_length=264)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    load_applied = models.IntegerField(validators=[MaxValueValidator(200)])
    date_of_application = models.DateField(auto_now_add=True)
    date_of_approval = models.DateField(blank=True, null=True)
    modified_date = models.DateField(blank=True, null=True)
    status = models.CharField(
        max_length=10, choices=StatusChoice.choices, default=StatusChoice.PENDING, blank=True, null=True)
    reviewer_id = models.IntegerField(blank=True, null=True)
    reviewer_name = models.CharField(max_length=256, blank=True, null=True)
    reviewer_comments = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.applicant_name

    class Meta:
        verbose_name = _("Connection")
        verbose_name_plural = _("Connections")
        ordering = ('-date_of_application',)
