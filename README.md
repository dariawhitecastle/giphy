### Giphy app made with create-react-app

### To start the project

1. Install Docker
2. clone repo and navigate to project root - install deps - `npm install`
3. run `docker build -t birthday-gif .` this will take a minute
4. run `docker run -it -v ${PWD}:/usr/src/app -p 3000:3000 --rm birthday-gif`
5. the app should be running on port: 3000
6. Get your birthday gif!

