from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.http import FileResponse, Http404


def serve_spa(request):
    index_path = settings.FRONTEND_DIST / 'index.html'
    if not index_path.exists():
        raise Http404(
            'Frontend build not found. Run: cd frontend && npm run build'
        )
    return FileResponse(index_path.open('rb'), content_type='text/html')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('farm.urls')),
]

if settings.SERVE_FRONTEND:
    urlpatterns += [
        re_path(r'^(?!api/|admin/|static/).*$', serve_spa),
    ]
