// Cognitive Services, Text Analytics API - https://westus.dev.cognitive.microsoft.com/docs/services/TextAnalytics.V2.0/operations/56f30ceeeda5650db055a3c7

const API_KEY = 'dfbe75f2bbed4fe99d399770fdfe5e05';

const input = document.getElementById('input'),
  analyseButton = document.getElementById('analyseButton'),
  output = document.getElementById('output'),
  outputLength = document.getElementById('outputsLength');

function analyseText() {
  output.innerText = 'Loading...';

  const reqHeaders = new Headers({
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": API_KEY
  });

  const reqBody = {
    "documents": [
      {
        "language": "en",
        "id": 1,
        "text": input.value
      }
    ]
  };

  const reqObject = {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: reqHeaders
  };

  let request = new Request('https://keira.cognitiveservices.azure.com/text/analytics/v2.0/keyPhrases', reqObject);

  fetch(request)
    .then(response => {
      if (response.ok) {
        output.innerText = '';
        return response.json();
      } else {
        return Promise.reject(new Error(response.statusText))
      }
    })
    .then(data => {
      outputLength.innerText = data.documents[0].keyPhrases.length;
      data.documents[0].keyPhrases.forEach(item => {
        output.innerHTML += `<li>${item}</li>`
      })
    })
    .catch(error => {
      console.log(error);
      output.innerHTML = '';
    })
}

analyseButton.addEventListener('click', analyseText);