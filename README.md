# News Aggregator

Pull articles from various sources and displays them in a clean, easy-to-read format.

# Technology Stack Used

1. Laravel
2. MySQL
3. AntD
4. React (Binded with Gatsby) + TypeScript

# Pre-requisites

1. Ubuntu/Mac or any system that support bash/sh scripts execution `(Sehr wichtig / Muy importante / Important)`
2. Composer (v2.7.2)
3. Docker (v26.1.2)
4. docker compose (v2.26.1)
5. PHPmyAdmin (Optional, if you want to see data visually)

# News API Uses

PN: API keys are mandatory for this application to work!!

1. News API - click [here](https://newsapi.org/docs/get-startedguardain) to get the API key
2. Guardian API - click [here](https://bonobo.capi.gutools.co.uk/register/developer) to get the API key

# Folder Structure

```
- news-aggregator
  |_ build.sh
  |_ docker-compose.yml
  |_ frontend
    |_ Dockerfile
  |_ backend
    |_ Dockerfile
```

# Project Installation and Setup

1. Clone [this repo](https://github.com/akshayshrivastav866/news-aggregator) in local from master branch
2. cd `news-aggregator`
3. run `./build.sh --env=local` (First build will take time as it will build BE + FE images)
4. Once build is completed run `docker compose up`
5. BE would be available on http://`defined_host_in_.env-global`:`defined_port_in_.env-global`
6. FE would be available on http://`defined_gatsby-host_in_.env-global`:`defined_gatsby-port_in_.env-global` (or keep an eye on gatsby build end)

# Important Notes

1. Setup localhost URL and ports via editing `.env-global` in root directory.
2. Upon editing `.env-global`, `backend/.env`, `frontend/.env.development`
    - Run this command on root directory of project `./.build/setup-env-file`
    - Then run `docker compose down && docker compose up` to take this changes in effect for running updated container
3. If these updated env files are being used inside FE or BE app for build (Ex: API calls, starting server), etc you might need to recreate images accordingly (Optional since step 2 will do the charm but just in case...)