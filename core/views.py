from .serializer import StackSearchapi
from django.http import JsonResponse
import requests
import requests_cache
import json
from ratelimit.decorators import ratelimit
from django.core.paginator import Paginator
import datetime

requests_cache.install_cache('stackapi_cache', backend='sqlite', expire_after=180)


@ratelimit(key='user_or_ip', rate='5/m')
@ratelimit(key='user_or_ip', rate='100/d')
def stacksearch(request):
    if request.method == "POST":
        result = {}
        page = request.POST['page']
        pagesize = request.POST['pagesize']
        fromdate = request.POST['fromdate']
        todate = request.POST['todate']
        min = request.POST['min']
        order = request.POST['order']
        sort = request.POST['sort']
        q = request.POST['q']
        max = request.POST['max']
        accepted = request.POST['accepted']
        wiki = request.POST['wiki']
        views = request.POST['views']
        url = request.POST['url']
        user = request.POST['user']
        title = request.POST['title']
        tagged = request.POST['tagged']
        nottagged = request.POST['nottagged']
        notice = request.POST['notice']
        migrated = request.POST['migrated']
        closed = request.POST['closed']
        body = request.POST['body']
        answers = request.POST['answers']
        endpoint = 'https://api.stackexchange.com/2.2/search/advanced'
        payload = {"page": page,  # page number
                   "pagesize": pagesize,  # number of items per page
                   "fromdate": fromdate,  # minimum date
                   "todate": todate,  # maximum date
                   "min": min,  # minimum reputation
                   "max": max,  # maximum reputation
                   "order": order,  # sort order
                   "sort": sort,  # sort by
                   "q": q,  # search terms
                   "accepted": accepted,  # accepted answer only
                   "answers": answers,  # answers only
                   "body": body, # body only
                   "closed": closed, # closed only
                   "migrated": migrated,  # migrated only
                   "notice": notice, # notice only
                   "nottagged": nottagged, # not tagged only
                   "tagged": tagged, # tagged
                   "title": title,  # title only
                   "user": user,  # user only
                   "url": url, # url only
                   "views": views, # views only
                   "wiki": wiki, # wiki only
                   "site": "stackoverflow", # site
                   }
        response = requests.get(url=endpoint, params=payload)
        print("Time: {0} / Used Cache: {1}".format(datetime.datetime.now(), response.from_cache))

        if response.status_code == 200:  # SUCCESS
            try:
                result = response.json()
                result['success'] = True
            except json.decoder.JSONDecodeError as e:
                print(e)
        else:
            result['success'] = False
            if response.status_code == 404:  # NOT FOUND
                result['message'] = 'Entrada no encontrada'
            else:
                result['message'] = 'La API de la Stack no está disponible en este momento. Por favor, inténtelo de nuevo más tarde.'

        return JsonResponse(result)
