from django.db import models
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publication_date = models.DateField()
    genre = models.CharField(max_length=100)
    def __str__(self):
        return self.title
class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reviews")
    reviewer_name = models.CharField(max_length=255)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    review_text = models.TextField()
    def __str__(self):
        return f"{self.reviewer_name} - {self.book.title}"
