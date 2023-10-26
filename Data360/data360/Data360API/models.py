from django.db import models

class Scripts(models.Model):
    scriptsId = models.AutoField(primary_key=True)
    scripts = models.TextField()
    
    def __str__(self):
        return self.name