# News Aggregator

Pull articles from various sources and displays them in a clean, easy-to-read format.

# Technology Stack Used

1. Laravel
2. React (Binded with Gatsby) + TypeScript
3. MySQL
4. AntD

# News API Uses

PN: API keys are mandatory for this application to work!!

1. News API - click [here](https://newsapi.org/docs/get-startedguardain) to get the API key
2. Guardian API - click [here](https://bonobo.capi.gutools.co.uk/register/developer) to get the API key

# Folder(s)

There are 2 folders `backend` and `frontend`, each to be run individually.

# Installation & Up for Frontend

1. Clone this repo in local from master branch
2. cd `frontend`
3. npm i `(Installing all BE project dependencies)`
4. npm start, once step 3 completes
5. Open URL provided at the end of build

# Installation & Up for Frontend

1. Assuming you have cloned repo and on root level
2. cd `backend`
3. composer install `(Installing all BE project dependencies)`
4. php artisan migrate
5. php artisan serve
6. Open URL provided at after success of step 5