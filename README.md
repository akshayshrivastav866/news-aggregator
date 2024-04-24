# News Aggregator

Pull articles from various sources and displays them in a clean, easy-to-read format.

# Technology Stack Used

1. Laravel
2. React (Binded with Gatsby) + TypeScript
3. MySQL
4. AntD

# Pre-requisites

1. Composer
2. Node
3. PHP v8.2
4. MySQL
5. PHPmyAdmin (Optional, if you want to see data visually)

# News API Uses

PN: API keys are mandatory for this application to work!!

1. News API - click [here](https://newsapi.org/docs/get-startedguardain) to get the API key
2. Guardian API - click [here](https://bonobo.capi.gutools.co.uk/register/developer) to get the API key

# Folder(s)

There are 2 folders `backend` and `frontend`, each to be run individually.

# Installation & Up for Backend

1. Assuming you have cloned repo and on root level
2. cd `backend`
3. composer install `(Installing all BE project dependencies)`
4. php artisan migrate
5. Open `backend/app/Http/Controllers/Controller.php` and input API keys acquired from respective sources
5. php artisan serve
6. Open URL provided at after success of step 5

# Installation & Up for Frontend

1. Clone this repo in local from master branch
2. cd `frontend`
3. npm i `(Installing all BE project dependencies)`
4. npm start, once step 3 completes
5. Copy local URL, generated after running laravel app and paste it in `frontend/src/apis/settings.ts` line no 4.
6. Open URL provided at the end of build
